import type { ChartData, ChartOptions, Plugin } from "chart.js"

export const INDICATOR_LINE = "#f59e0b"

export const INDICATOR_RANGES = [
  { id: "1M", label: "۱م" },
  { id: "1W", label: "۱س" },
  { id: "5D", label: "۵ر" },
  { id: "1Y", label: "۱ی" },
] as const

export type IndicatorChartRange = (typeof INDICATOR_RANGES)[number]["id"]

export const INDICATOR_NAMES_FA: Record<string, string> = {
  bubble: "حباب طلا ۱۸",
  real: "ارزش واقعی طلا ۱۸",
  monthly: "بازدهی ماهانه",
  strength: "قدرت طلا/دلار",
}

export const INDICATOR_DATE_LABELS = [
  "17 Apr",
  "24 Apr",
  "1 May",
  "8 May",
  "15 May",
]

export function buildIndicatorSeries(sparkline: number[]): number[] {
  if (sparkline.length >= INDICATOR_DATE_LABELS.length) return sparkline
  const out: number[] = []
  for (let i = 0; i < INDICATOR_DATE_LABELS.length; i++) {
    const t = i / (INDICATOR_DATE_LABELS.length - 1)
    const src = t * (sparkline.length - 1)
    const lo = Math.floor(src)
    const hi = Math.min(lo + 1, sparkline.length - 1)
    const a = sparkline[lo] ?? 0
    const b = sparkline[hi] ?? a
    out.push(a + (b - a) * (src - lo))
  }
  return out
}

export function endValueBadgePlugin(label: string): Plugin<"line"> {
  return {
    id: "endValueBadge",
    afterDatasetsDraw(chart) {
      const meta = chart.getDatasetMeta(0)
      const point = meta.data[meta.data.length - 1]
      if (!point) return
      const { ctx } = chart
      const { x, y } = point
      ctx.save()
      ctx.font = "600 11px sans-serif"
      const padX = 6
      const w = ctx.measureText(label).width + padX * 2
      const h = 18
      const bx = x - w / 2
      const by = y - h - 10
      ctx.fillStyle = INDICATOR_LINE
      ctx.beginPath()
      ctx.roundRect(bx, by, w, h, 4)
      ctx.fill()
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, x, by + h / 2)
      ctx.restore()
    },
  }
}

export function buildIndicatorChartData(
  series: number[]
): ChartData<"line"> {
  return {
    labels: INDICATOR_DATE_LABELS,
    datasets: [
      {
        data: series,
        borderColor: INDICATOR_LINE,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        pointBackgroundColor: INDICATOR_LINE,
        pointBorderColor: INDICATOR_LINE,
        pointBorderWidth: 0,
        tension: 0.35,
        fill: true,
        backgroundColor: (ctx) => {
          const { chart } = ctx
          const area = chart.chartArea
          if (!area) return "rgba(245,158,11,0.12)"
          const g = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom)
          g.addColorStop(0, "rgba(245,158,11,0.35)")
          g.addColorStop(1, "rgba(245,158,11,0)")
          return g
        },
      },
    ],
  }
}

export const INDICATOR_CHART_OPTIONS: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 28, right: 12 } },
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (item) => {
          const y = item.parsed.y
          if (y == null) return ""
          return `${y.toFixed(1)}٪`
        },
      },
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(148,163,184,0.12)" },
      ticks: { color: "#94a3b8", font: { size: 10 }, maxRotation: 0 },
      border: { display: false },
    },
    y: {
      grid: { color: "rgba(148,163,184,0.12)" },
      ticks: {
        color: "#94a3b8",
        font: { size: 10 },
        callback: (value) => `${value}%`,
      },
      border: { display: false },
    },
  },
}
