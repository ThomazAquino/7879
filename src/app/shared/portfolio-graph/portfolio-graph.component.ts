import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AreaStyleOptions, ChartOptions, createChart, DeepPartial, IChartApi, ISeriesApi, SeriesOptionsCommon } from 'lightweight-charts';
import { HerokuResponse, PortfolioService } from './portfolio.service';
import { IPortfolio, RealTimePriceQuote } from './portfolio.types';

@Component({
  selector: 'app-portfolio-graph',
  templateUrl: './portfolio-graph.component.html',
})
export class PortfolioGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chartEntry') private _chartEntry!: ElementRef;
  chart: IChartApi;
  areaSeries: ISeriesApi<"Area">;
  portfolio: IPortfolio;
  prices: RealTimePriceQuote;
  constructor(private _portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this._portfolioService.getMetalStreamUrl();
    this._portfolioService.XIgniteEvent.subscribe((prices: RealTimePriceQuote) => {
      console.log('**** prices');
      if (prices) {
        this.prices = prices;
      }
    });

    this._portfolioService.getPortfolio().subscribe((portfolio: HerokuResponse<IPortfolio>) => {
      console.log('**** portfolio');

      this.portfolio = portfolio.data.portfolio;
      if (this.areaSeries) {
        this.areaSeries.setData(this.getFormattedChartData(portfolio.data.portfolio));
      }
    })
  }

  ngAfterViewInit(): void {
    this.setupAreaChart();
    console.log('ngAfterViewInit prices', this.prices)
    console.log('ngAfterViewInit portfolio', this.portfolio)
  }

  setupAreaChart(): void {
    this.chart = createChart(this._chartEntry.nativeElement, {...chartOptions, width: this._chartEntry.nativeElement.clientWidth - 20});
    this.chart.timeScale().fitContent();
    this.areaSeries = this.chart.addAreaSeries(seriesOptions);
  }

  getFormattedChartData(portfolio: IPortfolio): {time: string, value: number}[] {
    return portfolio.history.map(historyItem => ({
      time: historyItem.date,
      value: historyItem.totalValue.amount,
    }));
  }


}


const chartOptions: DeepPartial<ChartOptions> = {
  height: 400,
  rightPriceScale: {
    scaleMargins: {
      top: 0.2,
      bottom: 0.2,
    },
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
  },
  layout: {
    backgroundColor: "#326985",
    textColor: "#ffffff",
  },
  grid: {
    horzLines: {
      color: "#eee",
      visible: false,
    },
    vertLines: {
      color: "#ffffff",
      visible: false,
    },
  },
  crosshair: {
    vertLine: {
      labelVisible: false,
    },
  },
};

const seriesOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
  topColor: "rgba(125, 162, 181, 0.7)",
  bottomColor: "rgba(125, 162, 181, 0.7)",
  lineColor: "#FFFFFF",
  lineWidth: 2,
};
