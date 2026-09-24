import type { DrawingOptions, DrawingStyle } from "lightweight-charts-drawing"
import type { DrawingToolId } from "@/features/market-pulse/components/chart/chart-options"

export type DrawingMenuItem = {
  type: string
  label: string
  payload?: string
}

/** Default package type when a toolbar tool is activated without a submenu pick. */
export const DRAWING_TOOL_TYPE: Partial<Record<DrawingToolId, string>> = {
  trend: "trend-line",
  fib: "fib-retracement",
  shape: "rectangle",
  text: "text-annotation",
  emoji: "text-annotation",
  measure: "date-price-range",
}

export const TREND_MENU: DrawingMenuItem[] = [
  { type: "trend-line", label: "خط روند" },
  { type: "horizontal-line", label: "خط افقی" },
  { type: "ray", label: "پرتو" },
  { type: "extended-line", label: "خط امتداد" },
]

export const FIB_MENU: DrawingMenuItem[] = [
  { type: "fib-retracement", label: "فیبوناچی اصلاحی" },
  { type: "fib-extension", label: "فیبوناچی گسترشی" },
  { type: "gann-fan", label: "بادبزن گن" },
  { type: "gann-box", label: "جعبه گن" },
]

export const SHAPE_MENU: DrawingMenuItem[] = [
  { type: "rectangle", label: "مستطیل" },
  { type: "circle", label: "دایره" },
  { type: "ellipse", label: "بیضی" },
  { type: "triangle", label: "مثلث" },
]

export const EMOJI_MENU: DrawingMenuItem[] = [
  { type: "text-annotation", label: "🚀", payload: "🚀" },
  { type: "text-annotation", label: "📉", payload: "📉" },
  { type: "text-annotation", label: "📈", payload: "📈" },
  { type: "text-annotation", label: "⭐", payload: "⭐" },
  { type: "text-annotation", label: "🔥", payload: "🔥" },
  { type: "text-annotation", label: "⚠️", payload: "⚠️" },
  { type: "flag-mark", label: "پرچم", payload: "flag" },
]

export const DRAWING_TOOL_COLOR: Record<string, string> = {
  "trend-line": "#299D7F",
  "horizontal-line": "#299D7F",
  ray: "#299D7F",
  "extended-line": "#299D7F",
  "fib-retracement": "#DEAF3C",
  "fib-extension": "#DEAF3C",
  "gann-fan": "#E67E22",
  "gann-box": "#E67E22",
  rectangle: "#5B8DEF",
  circle: "#5B8DEF",
  ellipse: "#5B8DEF",
  triangle: "#5B8DEF",
  "text-annotation": "#8A9E99",
  "flag-mark": "#C45A59",
  "date-price-range": "#9B59B6",
  "price-range": "#9B59B6",
}

export type DrawingCreateOptions = Partial<DrawingOptions> & {
  text?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  backgroundColor?: string
  borderColor?: string
  padding?: number
  flagColor?: "red" | "green" | "blue" | "yellow" | "purple" | "custom"
  label?: string
  size?: number
}

export const TREND_UP_COLOR = "#299D7F"
export const TREND_DOWN_COLOR = "#C45A59"

const SLOPE_COLORED_TOOLS = new Set([
  "trend-line",
  "ray",
  "extended-line",
])

export function isSlopeColoredTool(toolType: string): boolean {
  return SLOPE_COLORED_TOOLS.has(toolType)
}

/** Green if rising, red if falling (by price from first→last anchor). */
export function slopeLineColor(
  anchors: { price: number }[]
): string | null {
  const first = anchors[0]
  const last = anchors[anchors.length - 1]
  if (!first || !last || anchors.length < 2) return null
  if (last.price > first.price) return TREND_UP_COLOR
  if (last.price < first.price) return TREND_DOWN_COLOR
  return TREND_UP_COLOR
}

export function getDrawingStyle(
  toolType: string,
  anchors?: { price: number }[]
): Partial<DrawingStyle> {
  const slopeColor =
    anchors && isSlopeColoredTool(toolType) ? slopeLineColor(anchors) : null
  const color =
    slopeColor ?? DRAWING_TOOL_COLOR[toolType] ?? TREND_UP_COLOR
  const isFib = toolType.startsWith("fib-") || toolType.startsWith("gann-")
  return {
    lineColor: color,
    lineWidth: 2,
    fillColor: `${color}33`,
    showLabels: true,
    labelColor: "#ffffff",
    labelFont: isFib
      ? "600 18px ui-sans-serif, system-ui, sans-serif"
      : "600 16px ui-sans-serif, system-ui, sans-serif",
  }
}

export function getDrawingCreateOptions(
  toolType: string,
  payload: string | null,
  locked: boolean,
  visible: boolean,
  asIcon = false
): DrawingCreateOptions {
  const base: DrawingCreateOptions = { locked, visible }
  if (toolType === "flag-mark") {
    return { ...base, flagColor: "red", size: 22, label: "" }
  }
  if (toolType !== "text-annotation") return base
  if (asIcon && payload) {
    return {
      ...base,
      text: payload,
      fontSize: 22,
      fontWeight: "600",
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
    }
  }
  return {
    ...base,
    text: payload || "متن",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: "#8A9E99",
    padding: 6,
  }
}

export function isDrawableTool(id: DrawingToolId): boolean {
  return id in DRAWING_TOOL_TYPE
}
