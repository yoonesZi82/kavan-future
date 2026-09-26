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

/** Minimal market fields the chart UI needs for OHLC header / snapshot name. */
export type ChartMarketInfo = {
  symbol: string
  ohlcSymbol?: string
  dayChange: number
  latest: number
}

/** Market row for the optional toolbar select (hero / marketing). */
export type ChartMarketOption = ChartMarketInfo & {
  id: string
  nameFa: string
}
