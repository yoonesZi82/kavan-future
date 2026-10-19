import type {
  AllocationSlice,
  AnalysisBlock,
  Holding,
  Mover,
  PerformancePoint,
  PortfolioKpi,
  PortfolioStatusRow,
} from "./types"

export const PORTFOLIO_KPIS: readonly PortfolioKpi[] = [
  {
    id: "total-tmn",
    title: "ارزش کل سبد",
    value: "۲۹٬۷۵۰٬۸۶۰٬۰۰۰",
    changeLabel: "+۴٫۲٪ امروز",
    changeTone: "gain",
    sparkline: [22, 24, 23, 28, 30, 29, 33, 36, 35, 40],
  },
  {
    id: "total-usd",
    title: "ارزش کل سبد به دلار",
    value: "۹۸٬۵۴۰٫۲۳",
    changeLabel: "+۳٫۸٪ امروز",
    changeTone: "gain",
    sparkline: [18, 20, 19, 24, 26, 25, 29, 32, 31, 38],
  },
  {
    id: "realized",
    title: "سود و زیان تحقق‌یافته",
    value: "+۱٬۲۴۰٬۰۰۰٬۰۰۰",
    changeLabel: "+۱۲٫۴٪ ماه",
    changeTone: "gain",
    sparkline: [12, 16, 14, 20, 22, 28, 26, 30, 34, 40],
  },
  {
    id: "unrealized",
    title: "سود و زیان تحقق‌نیافته",
    value: "+۸۶۰٬۴۰۰٬۰۰۰",
    changeLabel: "+۶٫۱٪ هفته",
    changeTone: "gain",
    sparkline: [20, 18, 22, 21, 26, 24, 30, 28, 34, 36],
  },
]

export const PORTFOLIO_MIX_PERCENT = 72

export const ALLOCATION_SLICES: readonly AllocationSlice[] = [
  { id: "stocks", label: "سهام", percent: 34, color: "#38bdf8" },
  { id: "funds", label: "صندوق‌های درآمدی", percent: 22, color: "#a78bfa" },
  { id: "gold", label: "طلا و ارز", percent: 18, color: "#fbbf24" },
  { id: "crypto", label: "رمزارزها", percent: 16, color: "#34d399" },
  { id: "other", label: "سایر", percent: 10, color: "#fb7185" },
]

export const PORTFOLIO_STATUS: readonly PortfolioStatusRow[] = [
  { id: "assets", label: "تعداد کل دارایی‌ها", value: "۱۲", tone: "neutral" },
  { id: "winners", label: "دارایی‌های سودده", value: "۸", tone: "gain" },
  { id: "losers", label: "دارایی‌های زیان‌ده", value: "۴", tone: "loss" },
  {
    id: "best",
    label: "بهترین عملکرد",
    value: "بیت‌کوین ‎+۱۸٫۴٪",
    tone: "gain",
  },
  {
    id: "worst",
    label: "بدترین عملکرد",
    value: "شاخص کل ‎−۳٫۲٪",
    tone: "loss",
  },
]

export const HOLDINGS: readonly Holding[] = [
  {
    id: "gold18",
    name: "طلا ۱۸ عیار",
    symbol: "GOLD18",
    buyPrice: "۴٬۲۱۰٬۰۰۰",
    quantity: "۱۲۵ گرم",
    value: "۵٬۴۸۰٬۰۰۰٬۰۰۰",
    currentPrice: "۴٬۳۸۴٬۰۰۰",
    pnl: "+۲۱۸٬۰۰۰٬۰۰۰",
    pnlPercent: 4.1,
    accent: "#fbbf24",
  },
  {
    id: "btc",
    name: "بیت‌کوین",
    symbol: "BTC/USDT",
    buyPrice: "۶۲٬۴۰۰",
    quantity: "۰٫۴۸",
    value: "۳٬۱۲۰٬۰۰۰٬۰۰۰",
    currentPrice: "۶۸٬۲۵۰",
    pnl: "+۴۸۰٬۰۰۰٬۰۰۰",
    pnlPercent: 18.4,
    accent: "#f59e0b",
  },
  {
    id: "usd",
    name: "دلار آزاد",
    symbol: "USD",
    buyPrice: "۸۸٬۵۰۰",
    quantity: "۱۲٬۰۰۰",
    value: "۱٬۰۸۰٬۰۰۰٬۰۰۰",
    currentPrice: "۹۰٬۰۰۰",
    pnl: "+۱۸٬۰۰۰٬۰۰۰",
    pnlPercent: 1.7,
    accent: "#34d399",
  },
  {
    id: "index",
    name: "شاخص کل",
    symbol: "TEDPIX",
    buyPrice: "۲٬۱۸۰٬۰۰۰",
    quantity: "—",
    value: "۲٬۴۱۰٬۰۰۰٬۰۰۰",
    currentPrice: "۲٬۱۱۰٬۰۰۰",
    pnl: "−۷۸٬۰۰۰٬۰۰۰",
    pnlPercent: -3.2,
    accent: "#60a5fa",
  },
  {
    id: "eth",
    name: "اتریوم",
    symbol: "ETH/USDT",
    buyPrice: "۳٬۱۲۰",
    quantity: "۴٫۲",
    value: "۱٬۶۴۰٬۰۰۰٬۰۰۰",
    currentPrice: "۳٬۴۸۰",
    pnl: "+۱۶۵٬۰۰۰٬۰۰۰",
    pnlPercent: 11.2,
    accent: "#818cf8",
  },
  {
    id: "usdt",
    name: "تتر",
    symbol: "USDT",
    buyPrice: "۸۹٬۲۰۰",
    quantity: "۸٬۵۰۰",
    value: "۷۶۰٬۰۰۰٬۰۰۰",
    currentPrice: "۸۹٬۴۰۰",
    pnl: "+۱٬۷۰۰٬۰۰۰",
    pnlPercent: 0.2,
    accent: "#2dd4bf",
  },
]

export const PERFORMANCE_SERIES: readonly PerformancePoint[] = [
  { label: "فروردین", value: 24_200 },
  { label: "اردیبهشت", value: 24_800 },
  { label: "خرداد", value: 25_100 },
  { label: "تیر", value: 26_400 },
  { label: "مرداد", value: 25_900 },
  { label: "شهریور", value: 27_200 },
  { label: "مهر", value: 28_100 },
  { label: "آبان", value: 27_800 },
  { label: "آذر", value: 29_000 },
  { label: "دی", value: 29_750 },
]

export const ANALYSIS_BLOCKS: readonly AnalysisBlock[] = [
  {
    id: "health",
    title: "وضعیت کلی سبد",
    body: "ترکیب دارایی متعادل است و روند بازدهی در ۶ ماه اخیر صعودی مانده.",
    tone: "success",
    meta: "خوب",
  },
  {
    id: "drawdown",
    title: "حداکثر افت (Drawdown)",
    body: "بیشترین افت ثبت‌شده نسبت به اوج اخیر سبد.",
    tone: "danger",
    meta: "−۶٫۳۲٪",
  },
  {
    id: "risk",
    title: "ریسک نسبی",
    body: "نوسان سبد کمی بالاتر از میانگین بازار است؛ وزن رمزارز را بررسی کنید.",
    tone: "warning",
    meta: "متوسط",
  },
]

export const TOP_LOSERS: readonly Mover[] = [
  { id: "l1", name: "شاخص کل", changePercent: -3.2 },
  { id: "l2", name: "صندوق درآمد ثابت", changePercent: -1.4 },
  { id: "l3", name: "سکه امامی", changePercent: -0.9 },
]

export const TOP_GAINERS: readonly Mover[] = [
  { id: "g1", name: "بیت‌کوین", changePercent: 18.4 },
  { id: "g2", name: "اتریوم", changePercent: 11.2 },
  { id: "g3", name: "طلا ۱۸ عیار", changePercent: 4.1 },
]
