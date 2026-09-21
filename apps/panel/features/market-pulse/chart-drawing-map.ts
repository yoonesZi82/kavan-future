import type { DrawingStyle } from "lightweight-charts-drawing"
import type { DrawingToolId } from "@/features/market-pulse/chart-options"

/** Maps toolbar tools to lightweight-charts-drawing registry types. */
export const DRAWING_TOOL_TYPE: Partial<Record<DrawingToolId, string>> = {
  trend: "trend-line",
  fib: "fib-retracement",
  shape: "rectangle",
  text: "text-annotation",
  emoji: "flag-mark",
  measure: "price-range",
}

export const DRAWING_TOOL_COLOR: Record<string, string> = {
  "trend-line": "#299D7F",
  "fib-retracement": "#DEAF3C",
  rectangle: "#5B8DEF",
  "text-annotation": "#8A9E99",
  "flag-mark": "#C45A59",
  "price-range": "#9B59B6",
}

export function getDrawingStyle(toolType: string): Partial<DrawingStyle> {
  const color = DRAWING_TOOL_COLOR[toolType] ?? "#299D7F"
  const isFib = toolType.startsWith("fib-")
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

export function isDrawableTool(id: DrawingToolId): boolean {
  return id in DRAWING_TOOL_TYPE
}
