export type AnalysesTabId = "magazine" | "articles" | "compose"

export type AnalysisStatus = "draft" | "published"

export type AnalysisIconKind =
  | "document"
  | "trend"
  | "chart"
  | "oil"
  | "coins"

export type PreviousAnalysis = {
  id: string
  title: string
  dateLabel: string
  timeLabel: string
  icon: AnalysisIconKind
}

export type AnalysisCategoryOption = {
  id: string
  label: string
}
