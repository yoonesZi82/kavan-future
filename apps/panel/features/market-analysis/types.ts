export type MarketCategory = "all" | "bourse" | "crypto" | "fx" | "gold"

export type DecisionAlertTone = "danger" | "warning" | "success"

export type CrisisCard = {
  id: string
  tone: DecisionAlertTone
  title: string
  detail: string
  value?: string
  badge: string
}

export type ActiveAlert = {
  id: string
  tone: DecisionAlertTone
  title: string
  detail: string
  time: string
}

export type AnalysisTab = "indicators" | "levels" | "history"

export type IndicatorStatus = "warning" | "normal" | "neutral"

export type AnalysisIndicator = {
  id: string
  name: string
  value: string
  status: IndicatorStatus
  statusLabel: string
  sparkline: number[]
}

export type CandleMetric = {
  id: string
  label: string
  value: string
  tone: "gain" | "loss" | "info"
}

export type ReturnsSeries = {
  id: string
  label: string
  color: string
  change: string
  data: number[]
}

export type ReturnsRange = "1M" | "3M" | "6M" | "1Y"
