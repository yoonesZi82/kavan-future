export type WatchlistItem = {
  id: string
  symbol: string
  price: string
  change: number
  changePercent: number
}

export type MarketFlowItem = {
  id: string
  symbol: string
  volume: string
  tradeValue: string
  moneyInflow: number
  moneyInflowLabel: string
  buyPerCapita: string
  sellPerCapita: string
  buyPower: number
}

export type AlertItem = {
  id: string
  title: string
  isActive: boolean
}

export type CandlePoint = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type ChartTimeframe =
  | "1m"
  | "5m"
  | "15m"
  | "1h"
  | "4h"
  | "1D"
  | "1W"
  | "All"

export type MarketPair = {
  id: string
  src: string
  dst: string
  /** Full Persian display name (e.g. طلا ۱۸ عیار). */
  nameFa: string
  symbol: string
  ohlcSymbol: string
  latest: number
  dayChange: number
  dayHigh: number
  dayLow: number
  dayOpen: number
  dayClose: number
  bestBuy: number
  bestSell: number
  isClosed: boolean
  provider: "bitycle" | "tsetmc" | "ime"
}
