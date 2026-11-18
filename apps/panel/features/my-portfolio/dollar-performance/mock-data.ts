import type {
  ChartMarker,
  ChartPoint,
  CompareAsset,
  KeyLevel,
  PerformanceRange,
  ReturnMetric,
  StatusMetric,
  SummaryCheck,
} from "./types"

export const RANGE_OPTIONS: readonly {
  id: PerformanceRange
  label: string
}[] = [
  { id: "1M", label: "۱م" },
  { id: "3M", label: "۳م" },
  { id: "6M", label: "۶م" },
  { id: "1Y", label: "۱س" },
  { id: "ALL", label: "همه" },
]

/** Rising gold line — English digits on chart axes/labels. */
export const PERFORMANCE_POINTS: readonly ChartPoint[] = [
  { label: "1404/06/01", value: -8, volume: 14 },
  { label: "", value: -4, volume: 18 },
  { label: "", value: 2, volume: 11 },
  { label: "1404/06/08", value: 6, volume: 20 },
  { label: "", value: 4, volume: 15 },
  { label: "", value: 12, volume: 22 },
  { label: "1404/06/15", value: 18, volume: 17 },
  { label: "", value: 15, volume: 12 },
  { label: "", value: 22, volume: 24 },
  { label: "1404/06/22", value: 28, volume: 19 },
  { label: "", value: 25, volume: 14 },
  { label: "", value: 32, volume: 21 },
  { label: "1404/06/29", value: 38, volume: 26 },
  { label: "", value: 42, volume: 16 },
  { label: "", value: 48, volume: 23 },
  { label: "1404/07/05", value: 52, volume: 18 },
  { label: "", value: 55, volume: 13 },
  { label: "", value: 58, volume: 25 },
  { label: "1404/07/12", value: 62, volume: 17 },
  { label: "", value: 60, volume: 11 },
  { label: "", value: 66, volume: 22 },
  { label: "1404/07/19", value: 70, volume: 15 },
  { label: "", value: 72, volume: 20 },
  { label: "1404/07/26", value: 76, volume: 24 },
]

export const CHART_MARKERS: readonly ChartMarker[] = [
  {
    index: 3,
    kind: "buy",
    datetime: "1404/06/08 - 10:15",
    trades: [
      {
        asset: "اتریوم",
        type: "buy",
        sharePercent: 2,
        amountAfter: "1.5 ETH",
      },
    ],
  },
  {
    index: 6,
    kind: "deposit",
    datetime: "1404/06/15 - 09:40",
    trades: [
      {
        asset: "تتر",
        type: "buy",
        sharePercent: 4,
        amountAfter: "2,000 USDT",
      },
    ],
  },
  {
    index: 9,
    kind: "sell",
    datetime: "1404/06/22 - 11:00",
    trades: [
      {
        asset: "شاخص کل",
        type: "sell",
        sharePercent: 1.5,
        amountAfter: "—",
      },
    ],
  },
  {
    index: 12,
    kind: "buy",
    datetime: "1404/06/29 - 15:30",
    trades: [
      {
        asset: "طلا ۱۸ عیار",
        type: "buy",
        sharePercent: 5,
        amountAfter: "2.4 g",
      },
      {
        asset: "بیت‌کوین",
        type: "sell",
        sharePercent: 3,
        amountAfter: "0.08 BTC",
      },
    ],
  },
  {
    index: 12,
    kind: "sell",
    datetime: "1404/06/29 - 15:30",
    trades: [
      {
        asset: "طلا ۱۸ عیار",
        type: "buy",
        sharePercent: 5,
        amountAfter: "2.4 g",
      },
      {
        asset: "بیت‌کوین",
        type: "sell",
        sharePercent: 3,
        amountAfter: "0.08 BTC",
      },
    ],
  },
  {
    index: 15,
    kind: "withdraw",
    datetime: "1404/07/05 - 14:20",
    trades: [
      {
        asset: "دلار آزاد",
        type: "sell",
        sharePercent: 2,
        amountAfter: "800 USD",
      },
    ],
  },
  {
    index: 18,
    kind: "buy",
    datetime: "1404/07/12 - 12:05",
    trades: [
      {
        asset: "بیت‌کوین",
        type: "buy",
        sharePercent: 3.5,
        amountAfter: "0.12 BTC",
      },
    ],
  },
  {
    index: 21,
    kind: "deposit",
    datetime: "1404/07/19 - 16:45",
    trades: [
      {
        asset: "تتر",
        type: "buy",
        sharePercent: 6,
        amountAfter: "3,500 USDT",
      },
    ],
  },
]

export const STATUS_METRICS: readonly StatusMetric[] = [
  { id: "direction", label: "جهت رشد", value: "صعودی", tone: "gain" },
  { id: "intensity", label: "شدت حرکت", value: "متوسط", tone: "neutral" },
  { id: "structure", label: "ساختار حرکت", value: "شتاب‌دار", tone: "info" },
]

export const RETURN_METRICS: readonly ReturnMetric[] = [
  { id: "1m", label: "بازده ۱ ماهه", value: "+۱۲.۸٪" },
  { id: "1y", label: "بازده ۱ ساله", value: "+۷۴.۳٪" },
]

export const CURRENT_PORTFOLIO_USD = "۹۸٬۵۴۰"

export const KEY_LEVELS: readonly KeyLevel[] = [
  {
    id: "static-support",
    label: "حمایت استاتیک",
    dollar: "۹۲٬۴۰۰",
    distance: "−۶.۲٪",
  },
  {
    id: "dynamic-support",
    label: "حمایت داینامیک",
    dollar: "۹۵٬۱۰۰",
    distance: "−۳.۵٪",
  },
  {
    id: "static-resistance",
    label: "مقاومت استاتیک",
    dollar: "۱۰۴٬۲۰۰",
    distance: "+۵.۷٪",
  },
  {
    id: "dynamic-resistance",
    label: "مقاومت داینامیک",
    dollar: "۱۰۱٬۸۰۰",
    distance: "+۳.۳٪",
  },
]

export const CRISIS_MESSAGE = "نزدیک به سطح حمایت استاتیک"

export const DRAWDOWN_FROM_PEAK = "−۴.۲٪"

export const COMPARE_ASSETS: readonly CompareAsset[] = [
  {
    id: "btc",
    label: "بیت‌کوین",
    note: "بیت‌کوین در این بازه ۵٪ بهتر از سبد شما عمل کرده است.",
  },
  {
    id: "gold",
    label: "طلا ۱۸ عیار",
    note: "طلا در این بازه ۲.۱٪ ضعیف‌تر از سبد شما بوده است.",
  },
  {
    id: "index",
    label: "شاخص کل",
    note: "شاخص کل در این بازه ۸.۴٪ ضعیف‌تر از سبد شما بوده است.",
  },
]

export const SUMMARY_TEXT =
  "رشد پایدار سبد همراه با کنترل ریسک نشان می‌دهد استراتژی فعلی با شرایط بازار هم‌خوان است."

export const SUMMARY_CHECKS: readonly SummaryCheck[] = [
  { id: "trend", label: "روند کلی", value: "صعودی" },
  { id: "risk", label: "سطح ریسک", value: "متوسط" },
  { id: "market", label: "وضعیت بازار", value: "پایدار" },
]
