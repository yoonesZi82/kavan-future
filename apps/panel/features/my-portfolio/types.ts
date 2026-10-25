export type PortfolioKpi = {
  id: string
  title: string
  value: string
  changeLabel: string
  changeTone: "gain" | "loss" | "neutral"
  sparkline: number[]
}

export type AllocationSlice = {
  id: string
  label: string
  percent: number
  color: string
}

export type PortfolioStatusRow = {
  id: string
  label: string
  value: string
  tone: "gain" | "loss" | "neutral"
}

export type Holding = {
  id: string
  name: string
  symbol: string
  buyPrice: string
  quantity: string
  value: string
  currentPrice: string
  pnl: string
  pnlPercent: number
  accent: string
}

/** Search catalog entry — converted into a Holding when added to the table. */
export type SearchableAsset = {
  id: string
  name: string
  symbol: string
  price: string
  changePercent: number
  accent: string
}

export type PerformanceRange = "1W" | "1M" | "6M" | "1Y" | "ALL"

export type PerformancePoint = {
  label: string
  value: number
}

export type AnalysisBlock = {
  id: string
  title: string
  body: string
  tone: "info" | "warning" | "danger" | "success"
  meta?: string
}

export type Mover = {
  id: string
  name: string
  changePercent: number
}
