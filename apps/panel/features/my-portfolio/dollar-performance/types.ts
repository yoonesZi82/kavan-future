export type PerformanceRange = "1M" | "3M" | "6M" | "1Y" | "ALL"

export type MarkerKind = "buy" | "sell" | "deposit" | "withdraw"

export type ChartTradeRow = {
  asset: string
  type: "buy" | "sell"
  sharePercent: number
  amountAfter: string
}

export type ChartPoint = {
  label: string
  /** Return % vs period start */
  value: number
  volume: number
}

export type ChartMarker = {
  index: number
  kind: MarkerKind
  datetime: string
  trades: readonly ChartTradeRow[]
}

export type StatusMetric = {
  id: string
  label: string
  value: string
  tone: "gain" | "neutral" | "info"
}

export type ReturnMetric = {
  id: string
  label: string
  value: string
}

export type KeyLevel = {
  id: string
  label: string
  dollar: string
  distance: string
}

export type CompareAsset = {
  id: string
  label: string
  note: string
}

export type SummaryCheck = {
  id: string
  label: string
  value: string
}
