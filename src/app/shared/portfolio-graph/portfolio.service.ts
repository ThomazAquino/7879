import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { applyPatch } from 'fast-json-patch';
import gql from 'graphql-tag';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { HerokuResponse, IMetalSymbols, IPortfolio, IXIgnitePrice, RealTimePriceQuote, XIgniteEvent, XigniteMetalSymbols } from './portfolio.types';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  basePath = `https://morning-dusk-57594.herokuapp.com`;
  realtimeData: IXIgnitePrice[] = [];
  lastUpdate: number = 0;
  XIgniteEvent = new Subject<RealTimePriceQuote>();
  data: RealTimePriceQuote = {
    [IMetalSymbols.GOLD]: {
      diff: 0,
      value: 48.90807,
    },
    [IMetalSymbols.PLATINUM]: {
      diff: 0,
      value: 25.31755,
    },
    goldPrice: 48.90807,
    platinumPrice: 25.31755,
  };


  constructor(private http: HttpClient, private apollo: Apollo) {}

  getPortfolio(): Observable<HerokuResponse<IPortfolio>> {
    return this.apollo
      .watchQuery<any>({
        query: PORTFOLIO_QUERY,
      })
      .valueChanges.pipe();
  }

  getMetalStreamUrl(): any {
    this.apollo
      .watchQuery<any>({
        query: STREAM_QUERY,
      })
      .valueChanges.pipe(
        switchMap((response: any) => {
          this.startStream(response.data.streamUrl)
          return of()
        })
      ).subscribe();
  }

  startStream(streamUrl: string): any {
    let eventSource = new EventSource(streamUrl);

    eventSource.addEventListener("data", (event) => {
      this.realtimeData = JSON.parse((event as XIgniteEvent).data);
      this.lastUpdate = findTimestampInPrices(this.realtimeData, XigniteMetalSymbols.GOLD);
      console.log('DATA')
      this.XIgniteEvent.next(event.data)
    });


    eventSource.addEventListener("patch", (event) => {
      console.log(JSON.parse((event as XIgniteEvent).data));


      this.realtimeData = applyPatch(
        this.realtimeData,
        JSON.parse((event as XIgniteEvent).data)
      ).newDocument;

      const goldTimestampUpdate = findTimestampInPrices(
        this.realtimeData,
        XigniteMetalSymbols.GOLD
      );


      if (goldTimestampUpdate - this.lastUpdate >= 2000) {
      // if (true) {
        this.lastUpdate = goldTimestampUpdate;
        this.data = mapXIgniteToData(this.data, this.realtimeData);
        this.XIgniteEvent.next(this.data)
      }
    });
  }

 }

const PORTFOLIO_QUERY = gql`
  query portfolioQuery {
    portfolio {
      id
      currentBalance {
        goldBalance
        platinumBalance
      }
      history {
        date
        totalValue {
          currency
          amount
        }
      }
      portfolioItems {
        image
        sku
        name
        purchasePrice
        weight
        metal
      }
    }
  }
`;

const STREAM_QUERY = gql`
  query {
    streamUrl
  }
`;



const findTimestampInPrices = (
  prices: IXIgnitePrice[],
  symbol: XigniteMetalSymbols
) => {
  const symbolUpdate = prices.find((u) => u.Symbol === symbol);
  if (!symbolUpdate) {
    return 0;
  }
  return new Date(`${symbolUpdate.Date} ${symbolUpdate.Time}`).getTime();
};

const PRECISION = 10;


const mapXIgniteToData = (
  prev: RealTimePriceQuote,
  data: IXIgnitePrice[]
): RealTimePriceQuote => {
  const prices = data.reduce((acc, d) => {
    const gram = Math.round(d.Mid * PRECISION) / (PRECISION * 1000);
    return {
      ...acc,
      [d.Symbol.replace("KG", "")]: {
        value: gram,
        diff:
          gram - prev?.[d.Symbol.replace("KG", "") as IMetalSymbols]?.value ||
          0,
      },
    };
  }, {} as RealTimePriceQuote);

  return {
    ...prices,
    goldPrice: prices[IMetalSymbols.GOLD]?.value,
    platinumPrice: prices[IMetalSymbols.PLATINUM]?.value,
  };
};




