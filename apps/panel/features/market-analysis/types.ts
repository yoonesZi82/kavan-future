export type DecisionAlertTone = "danger" | "warning" | "success"

export type DecisionAlert = {
  id: string
  tone: DecisionAlertTone
  title: string
  rows: { label: string; value: string; valueTone?: "danger" | "warning" | "muted" }[]
}

export type MyAlertTone = "danger" | "success" | "warning" | "info"

export type MyAlert = {
  id: string
  tone: MyAlertTone
  title: string
  asset: string
  description: string
  time: string
}

export type AssetMetricTone = "gain" | "loss" | "info" | "neutral"

export type AssetMetric = {
  id: string
  label: string
  value: string
  tone: AssetMetricTone
}

export type ReturnsSeries = {
  id: string
  label: string
  color: string
  data: number[]
}

export type ReturnsRange = "1M" | "3M" | "6M" | "YTD" | "1Y" | "ALL"
