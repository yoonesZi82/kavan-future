import type {
  ActiveAlert,
  AnalysisIndicator,
  CandleMetric,
  CrisisCard,
  MarketCategory,
  ReturnsRange,
  ReturnsSeries,
} from "@/features/market-analysis/types"

export const MARKET_CATEGORIES: { id: MarketCategory; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "bourse", label: "بورس" },
  { id: "crypto", label: "کریپتو" },
  { id: "fx", label: "ارز" },
  { id: "gold", label: "طلا" },
]

export const MAIN_SIGNAL = {
  score: 78,
  trend: "صعودی",
  instant: "صعودی",
}

export const CANDLE_METRICS: CandleMetric[] = [
  {
    id: "structure",
    label: "ساختار",
    value: "شتاب صعودی",
    tone: "gain",
  },
  {
    id: "power",
    label: "قدرت",
    value: "بالا",
    tone: "info",
  },
  {
    id: "direction",
    label: "جهت",
    value: "صعودی",
    tone: "gain",
  },
]

export const CANDLE_FOOTER =
  "ساختار سه کندل ادامه روند صعودی را تایید می‌کند."

export const CRISIS_CARDS: CrisisCard[] = [
  {
    id: "c1",
    tone: "warning",
    title: "بحران: طلا نزدیک سطح مقاومت",
    detail: "احتمال شکست بالا",
    value: "۴٬۳۰۰٬۰۰۰",
    badge: "احتمال شکست: بالا",
  },
  {
    id: "c2",
    tone: "success",
    title: "شکست رو به بالا، اقدام کنید",
    detail: "ساختار تایید شد",
    badge: "ساختار تایید شد",
  },
  {
    id: "c3",
    tone: "warning",
    title: "ارزیابی ریسک",
    detail: "ریسک متوسط",
    value: "۴٬۲۱۰٬۰۰۰",
    badge: "ریسک متوسط",
  },
]

export const ACTIVE_ALERTS: ActiveAlert[] = [
  {
    id: "a1",
    tone: "warning",
    title: "بحران مقاومت",
    detail: "طلا نزدیک سطح ۴٬۳۰۰٬۰۰۰",
    time: "امروز ۱۱:۲۴",
  },
  {
    id: "a2",
    tone: "success",
    title: "شکست رو به بالا",
    detail: "ساختار تایید شد — اقدام کنید",
    time: "امروز ۱۰:۵۸",
  },
  {
    id: "a3",
    tone: "warning",
    title: "ریسک متوسط",
    detail: "سطح حمایتی ۴٬۲۱۰٬۰۰۰ زیر نظر",
    time: "امروز ۰۹:۴۱",
  },
]

export const ANALYSIS_INDICATORS: AnalysisIndicator[] = [
  {
    id: "bubble",
    name: "Gold Bubble 18",
    value: "۲٫۳٪",
    status: "warning",
    statusLabel: "هشدار",
    sparkline: [1.1, 1.4, 1.2, 1.8, 2.0, 1.9, 2.3],
  },
  {
    id: "real",
    name: "Real Value Gold 18",
    value: "۴٬۲۵۰٬۰۰۰",
    status: "neutral",
    statusLabel: "—",
    sparkline: [4200, 4220, 4210, 4235, 4240, 4245, 4250],
  },
  {
    id: "monthly",
    name: "Monthly Return",
    value: "+۱۲٫۴٪",
    status: "normal",
    statusLabel: "عادی",
    sparkline: [2, 4, 5, 7, 8, 10, 12.4],
  },
  {
    id: "strength",
    name: "Gold/USD Strength",
    value: "۶۸",
    status: "normal",
    statusLabel: "عادی",
    sparkline: [55, 58, 60, 62, 64, 66, 68],
  },
]

export const RETURNS_RANGES: ReturnsRange[] = ["1M", "3M", "6M", "1Y"]

export const RETURNS_LABELS = [
  "هفته ۱",
  "هفته ۲",
  "هفته ۳",
  "هفته ۴",
  "هفته ۵",
  "هفته ۶",
  "هفته ۷",
  "هفته ۸",
]

export const RETURNS_SERIES: ReturnsSeries[] = [
  {
    id: "gold",
    label: "طلا ۱۸ عیار",
    color: "#eab308",
    change: "+۱۲٫۴٪",
    data: [0, 2, 4, 5, 7, 9, 11, 12.4],
  },
  {
    id: "silver",
    label: "نقره",
    color: "#94a3b8",
    change: "+۸٫۷٪",
    data: [0, 1.5, 3, 4, 5.5, 6.5, 7.8, 8.7],
  },
  {
    id: "btc",
    label: "بیت‌کوین",
    color: "#f97316",
    change: "+۶٫۲٪",
    data: [0, -1, 1, 2.5, 3, 4.5, 5.5, 6.2],
  },
  {
    id: "eth",
    label: "اتریوم",
    color: "#a855f7",
    change: "+۴٫۱٪",
    data: [0, -0.5, 0.5, 1.5, 2, 3, 3.5, 4.1],
  },
  {
    id: "index",
    label: "شاخص کل",
    color: "#38bdf8",
    change: "+۲٫۸٪",
    data: [0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8],
  },
]
