export interface IItem {
  image: string;
  sku: string;
  name: string;
  purchasePrice: number;
  weight: number;
  metal: "gold" | "platinum";
}

export interface IPortfolio {
  id: string;
  currentBalance: {
    goldBalance: number;
    platinumBalance: number;
  };
  history: {
    date: string;
    goldValue: {
      currency: string;
      amount: number;
    };
    platinumValue: {
      currency: string;
      amount: number;
    };
    totalValue: {
      currency: string;
      amount: number;
    };
  }[];
  portfolioItems: IItem[];
}

export enum IMetalSymbols {
  GOLD = "XAU",
  PLATINUM = "XPT",
}

export interface IRealtimePrice {
  value: number;
  diff: number;
}

export interface RealtimeProps {
  [IMetalSymbols.GOLD]: IRealtimePrice;
  [IMetalSymbols.PLATINUM]: IRealtimePrice;
  goldPrice: number;
  platinumPrice: number;
}
export interface IRealtimePrice {
  value: number;
  diff: number;
}

export enum XigniteMetalSymbols {
  GOLD = "XAUKG",
  PLATINUM = "XPTKG",
}
export interface IXIgnitePrice {
  Spread: number;
  Ask: number;
  Mid: number;
  Bid: number;
  Outcome: string;
  Source: string;
  Time: string;
  Date: string;
  Currency: string;
  QuoteType: string;
  Unit: string;
  Symbol: XigniteMetalSymbols;
  Name: string;
  Identity: null;
  Message: null;
}

export type XIgniteEvent = Event & { data: string };

export interface RealTimePriceQuote {
  [IMetalSymbols.GOLD]: IRealtimePrice;
  [IMetalSymbols.PLATINUM]: IRealtimePrice;
  goldPrice: number;
  platinumPrice: number;
}
