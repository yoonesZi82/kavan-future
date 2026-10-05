import type {
  AnalysisCategoryOption,
  PreviousAnalysis,
} from "@/features/analyses/types"

export const ANALYSES_TABS = [
  { id: "magazine", label: "مجله" },
  { id: "articles", label: "مقالات" },
  { id: "compose", label: "تکمیل" },
] as const

export const ANALYSIS_CATEGORIES: readonly AnalysisCategoryOption[] = [
  { id: "index", label: "شاخص کل" },
  { id: "auto", label: "صنعت خودرو" },
  { id: "oil", label: "نفت و پتروشیمی" },
  { id: "fx", label: "بازار ارز" },
  { id: "crypto", label: "رمزارز" },
]

export const PREVIOUS_ANALYSES: readonly PreviousAnalysis[] = [
  {
    id: "1",
    title: "تحلیل شاخص کل بازار",
    dateLabel: "۱۴۰۴/۰۲/۲۰",
    timeLabel: "۱۲:۰۰",
    icon: "document",
  },
  {
    id: "2",
    title: "تحلیل صنعت خودرو",
    dateLabel: "۱۴۰۴/۰۲/۱۸",
    timeLabel: "۱۰:۳۰",
    icon: "trend",
  },
  {
    id: "3",
    title: "تحلیل شاخص تراز کل",
    dateLabel: "۱۴۰۴/۰۲/۱۶",
    timeLabel: "۰۹:۱۵",
    icon: "chart",
  },
  {
    id: "4",
    title: "تحلیل نفت و پتروشیمی",
    dateLabel: "۱۴۰۴/۰۲/۱۲",
    timeLabel: "۱۴:۲۰",
    icon: "oil",
  },
  {
    id: "5",
    title: "تحلیل بازار ارز",
    dateLabel: "۱۴۰۴/۰۲/۱۰",
    timeLabel: "۱۶:۴۵",
    icon: "coins",
  },
]
