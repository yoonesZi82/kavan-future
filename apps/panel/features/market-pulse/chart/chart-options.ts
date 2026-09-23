import type { ChartTimeframe } from "@/features/market-pulse/types"

export type ChartType = "candle" | "line" | "area"
export type ScaleMode = "normal" | "percent" | "log"
export type RangeKey =
  | "1D"
  | "5D"
  | "1M"
  | "3M"
  | "6M"
  | "YTD"
  | "1Y"
  | "5Y"
  | "All"

export type IndicatorId = "sma20" | "sma50" | "volume"

export type DrawingToolId =
  | "crosshair"
  | "trend"
  | "fib"
  | "shape"
  | "text"
  | "emoji"
  | "measure"
  | "zoom"
  | "magnet"
  | "lock"
  | "hide"
  | "trash"

export const TIMEFRAME_OPTIONS: { value: ChartTimeframe; label: string }[] = [
  { value: "1m", label: "۱د" },
  { value: "5m", label: "۵د" },
  { value: "15m", label: "۱۵د" },
  { value: "1h", label: "۱س" },
  { value: "4h", label: "۴س" },
  { value: "1D", label: "۱روز" },
  { value: "1W", label: "۱هفته" },
  { value: "All", label: "همه" },
]

/** Panel charts: 1h / 4h / 1D / 1W only */
export const PANEL_CHART_TIMEFRAMES: readonly ChartTimeframe[] = [
  "1h",
  "4h",
  "1D",
  "1W",
]

export const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "1D", label: "۱روز" },
  { value: "5D", label: "۵روز" },
  { value: "1M", label: "۱ماه" },
  { value: "3M", label: "۳ماه" },
  { value: "6M", label: "۶ماه" },
  { value: "YTD", label: "از اول سال" },
  { value: "1Y", label: "۱سال" },
  { value: "5Y", label: "۵سال" },
  { value: "All", label: "همه" },
]

export const INDICATOR_OPTIONS: { id: IndicatorId; label: string }[] = [
  { id: "sma20", label: "میانگین ۲۰" },
  { id: "sma50", label: "میانگین ۵۰" },
  { id: "volume", label: "حجم معاملات" },
]

export const RANGE_SECONDS: Record<RangeKey, number | null> = {
  "1D": 86_400,
  "5D": 86_400 * 5,
  "1M": 86_400 * 30,
  "3M": 86_400 * 90,
  "6M": 86_400 * 180,
  YTD: null,
  "1Y": 86_400 * 365,
  "5Y": 86_400 * 365 * 5,
  All: null,
}
