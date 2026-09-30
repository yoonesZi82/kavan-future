export type KpiTone = "blue" | "purple" | "green" | "orange" | "teal"

export type KpiStat = {
  id: string
  title: string
  value: string
  changePercent: number
  tone: KpiTone
  sparkline: number[]
}

export type DashboardSeriesPoint = {
  label: string
  value: number
}

export type DashboardEventTone = "red" | "blue" | "green" | "purple"

export type DashboardEvent = {
  id: string
  title: string
  count: number
  timeLabel: string
  tone: DashboardEventTone
}
