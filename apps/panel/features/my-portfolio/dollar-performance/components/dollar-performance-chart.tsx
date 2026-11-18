"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleDollarSignIcon,
  WalletIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import {
  CHART_MARKERS,
  PERFORMANCE_POINTS,
  RANGE_OPTIONS,
} from "../mock-data"
import type {
  ChartMarker,
  ChartPoint,
  ChartTradeRow,
  MarkerKind,
  PerformanceRange,
} from "../types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler
)

type ExternalTooltipState = {
  opacity: number
  /** Viewport X of the marker anchor */
  left: number
  /** Viewport Y of the marker anchor */
  top: number
  datetime: string
  trades: readonly ChartTradeRow[]
}

type MarkerPos = {
  key: string
  marker: ChartMarker
  left: number
  top: number
}

const RANGE_SLICE: Record<PerformanceRange, number> = {
  "1M": 8,
  "3M": 16,
  "6M": 20,
  "1Y": 24,
  ALL: 24,
}

const MARKER_COLOR: Record<MarkerKind, string> = {
  buy: "#22c55e",
  sell: "#ef4444",
  deposit: "#38bdf8",
  withdraw: "#fbbf24",
}

function slicePoints(range: PerformanceRange): readonly ChartPoint[] {
  return PERFORMANCE_POINTS.slice(-RANGE_SLICE[range])
}

function ExternalTradeTooltip({ state }: { state: ExternalTooltipState }) {
  const tipRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ left: 0, top: 0, placed: false })

  useLayoutEffect(() => {
    if (state.opacity === 0 || !tipRef.current) {
      setCoords((prev) => (prev.placed ? { left: 0, top: 0, placed: false } : prev))
      return
    }

    const tip = tipRef.current
    const tipWidth = tip.offsetWidth
    const tipHeight = tip.offsetHeight
    const gap = 14
    const pad = 8

    let left = state.left - tipWidth / 2
    let top = state.top - tipHeight - gap

    // * Flip below marker when there isn't room above
    if (top < pad) {
      top = state.top + gap
    }

    left = Math.min(
      Math.max(left, pad),
      window.innerWidth - tipWidth - pad
    )
    top = Math.min(
      Math.max(top, pad),
      window.innerHeight - tipHeight - pad
    )

    setCoords({ left, top, placed: true })
  }, [state.left, state.opacity, state.top, state.trades])

  if (state.opacity === 0 || state.trades.length === 0) return null
  if (typeof document === "undefined") return null

  return createPortal(
    <div
      ref={tipRef}
      className="pointer-events-none fixed z-[100] min-w-[280px] rounded-xl border border-border bg-popover/95 p-3 shadow-xl backdrop-blur-sm"
      style={{
        left: coords.left,
        top: coords.top,
        opacity: coords.placed ? state.opacity : 0,
      }}
    >
      <p className="mb-2 text-center text-[11px] font-semibold tabular-nums text-muted-foreground">
        {state.datetime}
      </p>
      <table className="w-full overflow-hidden rounded-lg text-[11px]">
        <thead>
          <tr className="border-b border-border/70 bg-muted/60 text-muted-foreground">
            <th className="bg-muted/60 px-1.5 py-1.5 text-start font-medium">
              دارایی
            </th>
            <th className="bg-muted/60 px-1.5 py-1.5 text-start font-medium">
              نوع معامله
            </th>
            <th className="bg-muted/60 px-1.5 py-1.5 text-start font-medium">
              سهم از سبد
            </th>
            <th className="bg-muted/60 px-1.5 py-1.5 text-start font-medium">
              مقدار پس از معامله
            </th>
          </tr>
        </thead>
        <tbody>
          {state.trades.map((trade) => (
            <tr
              key={`${trade.asset}-${trade.type}`}
              className="align-middle odd:bg-muted/25 even:bg-muted/10"
            >
              <td className="px-1.5 py-1.5 font-medium">{trade.asset}</td>
              <td className="px-1.5 py-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                    trade.type === "buy"
                      ? "bg-gain/15 text-gain"
                      : "bg-loss/15 text-loss"
                  )}
                >
                  {trade.type === "buy" ? (
                    <ArrowUpIcon className="size-2.5" aria-hidden />
                  ) : (
                    <ArrowDownIcon className="size-2.5" aria-hidden />
                  )}
                  {trade.type === "buy" ? "خرید" : "فروش"}
                </span>
              </td>
              <td className="px-1.5 py-1.5 tabular-nums">
                {trade.sharePercent}%
              </td>
              <td className="px-1.5 py-1.5 tabular-nums">{trade.amountAfter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>,
    document.body
  )
}

function ChartLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#fbbf24]" aria-hidden />
        برداشت
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#38bdf8]" aria-hidden />
        واریز
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ArrowDownIcon className="size-3 text-loss" aria-hidden />
        فروش
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ArrowUpIcon className="size-3 text-gain" aria-hidden />
        خرید
      </span>
    </div>
  )
}

function MarkerIcon({ kind }: { kind: MarkerKind }) {
  if (kind === "buy") return <ArrowUpIcon className="size-3" aria-hidden />
  if (kind === "sell") return <ArrowDownIcon className="size-3" aria-hidden />
  if (kind === "deposit") return <WalletIcon className="size-3" aria-hidden />
  return <CircleDollarSignIcon className="size-3" aria-hidden />
}

function PulsingMarker({
  kind,
  left,
  top,
  onEnter,
  onLeave,
}: {
  kind: MarkerKind
  left: number
  top: number
  onEnter: () => void
  onLeave: () => void
}) {
  const color = MARKER_COLOR[kind]

  return (
    <button
      type="button"
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
      style={{ left, top }}
      aria-label={kind}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      <span className="relative flex size-7 items-center justify-center">
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-35"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        <span
          className="absolute inset-0.5 rounded-full opacity-25"
          style={{
            backgroundColor: color,
            animation: "perf-marker-pulse 1.8s ease-out infinite",
          }}
          aria-hidden
        />
        <span
          className={cn(
            "relative flex size-5 items-center justify-center text-white shadow-md ring-2 ring-background",
            kind === "buy" || kind === "sell" ? "rounded-md" : "rounded-full"
          )}
          style={{ backgroundColor: color }}
        >
          <MarkerIcon kind={kind} />
        </span>
      </span>
    </button>
  )
}

export function DollarPerformanceChart() {
  const [range, setRange] = useState<PerformanceRange>("3M")
  const wrapRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ChartJS | null>(null)
  const [markerPositions, setMarkerPositions] = useState<MarkerPos[]>([])
  const [tooltip, setTooltip] = useState<ExternalTooltipState>({
    opacity: 0,
    left: 0,
    top: 0,
    datetime: "",
    trades: [],
  })

  const points = useMemo(() => slicePoints(range), [range])
  const offset = PERFORMANCE_POINTS.length - points.length

  const visibleMarkers = useMemo(() => {
    return CHART_MARKERS.filter(
      (marker) => marker.index >= offset && marker.index < offset + points.length
    )
  }, [offset, points.length])

  const syncMarkers = useCallback(() => {
    const chart = chartRef.current
    if (!chart) return

    const meta = chart.getDatasetMeta(0)
    if (!meta?.data?.length) return

    const counts = new Map<number, number>()
    const next: MarkerPos[] = []

    for (const marker of visibleMarkers) {
      const localIndex = marker.index - offset
      const point = meta.data[localIndex]
      if (!point || typeof point.x !== "number" || typeof point.y !== "number") {
        continue
      }

      const slot = counts.get(localIndex) ?? 0
      counts.set(localIndex, slot + 1)
      const nudge = slot === 0 ? 0 : slot % 2 === 1 ? 10 : -10

      next.push({
        key: `${marker.index}-${marker.kind}-${slot}`,
        marker,
        left: point.x + nudge,
        top: point.y,
      })
    }

    setMarkerPositions(next)
  }, [offset, visibleMarkers])

  useEffect(() => {
    const frame = requestAnimationFrame(syncMarkers)
    return () => cancelAnimationFrame(frame)
  }, [syncMarkers, points, range])

  const data: ChartData = useMemo(
    () => ({
      labels: points.map((point) => point.label),
      datasets: [
        {
          type: "line" as const,
          label: "return",
          data: points.map((point) => point.value),
          borderColor: "#fbbf24",
          backgroundColor: (ctx: ScriptableContext<"line">) => {
            const chart = ctx.chart
            const { ctx: c, chartArea } = chart
            if (!chartArea) return "#fbbf2428"
            const gradient = c.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            )
            gradient.addColorStop(0, "#fbbf2466")
            gradient.addColorStop(0.55, "#fbbf2428")
            gradient.addColorStop(1, "#fbbf2408")
            return gradient
          },
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
          tension: 0,
          // * Fill to chart bottom so gold area meets blue bars
          fill: "start",
          yAxisID: "y",
          order: 1,
        },
        {
          type: "bar" as const,
          label: "volume",
          data: points.map((point) => point.volume),
          backgroundColor: "#38bdf8aa",
          hoverBackgroundColor: "#38bdf8aa",
          borderRadius: 2,
          barPercentage: 0.5,
          categoryPercentage: 0.75,
          yAxisID: "y1",
          // * Drawn above fill so bars sit inside the gold area
          order: 2,
        },
      ],
    }),
    [points]
  )

  const options: ChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: false },
      animation: {
        duration: 400,
        onComplete: syncMarkers,
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#94a3b8",
            font: { size: 10, family: "ui-sans-serif, system-ui" },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7,
            callback(_, index) {
              const label = points[index]?.label
              return label || undefined
            },
          },
          border: { display: false },
        },
        y: {
          position: "left",
          min: -20,
          max: 80,
          grid: { color: "rgba(128,128,128,0.1)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 10, family: "ui-sans-serif, system-ui" },
            callback: (value) =>
              typeof value === "number" ? `${value}%` : value,
          },
          border: { display: false },
        },
        y1: {
          position: "right",
          display: false,
          // * Bars stay short and sit in the bottom of the gold fill
          min: 0,
          max: 70,
          grid: { drawOnChartArea: false },
        },
      },
      onResize: () => {
        requestAnimationFrame(syncMarkers)
      },
    }),
    [points, syncMarkers]
  )

  return (
    <Card className="flex w-full min-w-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <style>{`
        @keyframes perf-marker-pulse {
          0% { transform: scale(1); opacity: 0.35; }
          70% { transform: scale(1.85); opacity: 0; }
          100% { transform: scale(1.85); opacity: 0; }
        }
      `}</style>
      <CardHeader className="shrink-0 gap-3 border-b border-border px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex flex-wrap gap-0.5 rounded-lg border border-border bg-muted/20 p-0.5">
            {RANGE_OPTIONS.map((item) => (
              <Button
                key={item.id}
                type="button"
                size="sm"
                variant={range === item.id ? "default" : "ghost"}
                className={cn(
                  "h-7 px-2.5 text-[11px]",
                  range !== item.id && "text-muted-foreground"
                )}
                onClick={() => setRange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <ChartLegend />
        </div>
      </CardHeader>
      <CardContent className="relative px-3 py-3">
        <div
          ref={wrapRef}
          className="relative h-[240px] sm:h-[260px] xl:h-[280px]"
        >
          <Chart
            ref={(instance) => {
              chartRef.current = instance ?? null
            }}
            type="bar"
            data={data}
            options={options}
          />

          {markerPositions.map((item) => (
            <PulsingMarker
              key={item.key}
              kind={item.marker.kind}
              left={item.left}
              top={item.top}
              onEnter={() => {
                const wrap = wrapRef.current?.getBoundingClientRect()
                setTooltip({
                  opacity: 1,
                  left: (wrap?.left ?? 0) + item.left,
                  top: (wrap?.top ?? 0) + item.top,
                  datetime: item.marker.datetime,
                  trades: item.marker.trades,
                })
              }}
              onLeave={() =>
                setTooltip((prev) =>
                  prev.opacity === 0 ? prev : { ...prev, opacity: 0 }
                )
              }
            />
          ))}

          <ExternalTradeTooltip state={tooltip} />
        </div>
      </CardContent>
    </Card>
  )
}
