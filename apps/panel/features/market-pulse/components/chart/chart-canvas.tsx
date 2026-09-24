"use client"

import { useEffect, useRef, useState } from "react"
import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type SeriesType,
} from "lightweight-charts"
import type {
  ChartType,
  IndicatorId,
  RangeKey,
  ScaleMode,
} from "@/features/market-pulse/components/chart/chart-options"
import { applyChartData } from "@/features/market-pulse/components/chart/apply-chart-data"
import { useChartDrawing } from "@/features/market-pulse/components/chart/use-chart-drawing"
import { useChartView } from "@/features/market-pulse/components/chart/use-chart-view"
import type { CandlePoint } from "@/features/market-pulse/types"

type ChartCanvasProps = {
  data: CandlePoint[] | undefined
  /** Changes when market or timeframe switches — triggers range fit. */
  dataKey: string
  isLoading: boolean
  chartType: ChartType
  scaleMode: ScaleMode
  range: RangeKey
  indicators: IndicatorId[]
  compareSymbol: string | null
  drawingType: string | null
  drawingPayload: string | null
  drawingAsIcon: boolean
  drawingsVisible: boolean
  drawingsVersion: number
  undoVersion: number
  isMagnet: boolean
  isLocked: boolean
  showGrid: boolean
  onHoverCandle: (candle: CandlePoint | null) => void
  onCanUndoChange: (canUndo: boolean) => void
  onStatus?: (message: string) => void
}

type ExtraSeries = {
  volume: ISeriesApi<"Histogram"> | null
  sma20: ISeriesApi<"Line"> | null
  sma50: ISeriesApi<"Line"> | null
  compare: ISeriesApi<"Line"> | null
}

const EMPTY_EXTRAS: ExtraSeries = {
  volume: null,
  sma20: null,
  sma50: null,
  compare: null,
}

export function ChartCanvas(props: ChartCanvasProps) {
  const {
    data,
    dataKey,
    isLoading,
    chartType,
    scaleMode,
    range,
    indicators,
    compareSymbol,
    drawingType,
    drawingPayload,
    drawingAsIcon,
    drawingsVisible,
    drawingsVersion,
    undoVersion,
    isMagnet,
    isLocked,
    showGrid,
    onHoverCandle,
    onCanUndoChange,
    onStatus,
  } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const extrasRef = useRef<ExtraSeries>(EMPTY_EXTRAS)
  const lastFitKeyRef = useRef<string>("")
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [chart, setChart] = useState<IChartApi | null>(null)
  const [main, setMain] = useState<{
    series: ISeriesApi<SeriesType>
    kind: ChartType
  } | null>(null)
  const [mounted, setMounted] = useState(false)

  useChartDrawing({
    chart,
    series: main?.series ?? null,
    container,
    drawingType,
    drawingPayload,
    drawingAsIcon,
    isLocked,
    isMagnet,
    drawingsVisible,
    drawingsVersion,
    undoVersion,
    candles: data,
    onCanUndoChange,
    onStatus,
  })
  useChartView({
    chart,
    scaleMode,
    isMagnet,
    showGrid,
    data,
    onHoverCandle,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setContainer(el)
    const next = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8A9E99",
      },
      grid: {
        vertLines: { color: "rgba(0,0,0,0.06)" },
        horzLines: { color: "rgba(0,0,0,0.06)" },
      },
      width: el.clientWidth || 600,
      height: el.clientHeight || 360,
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      crosshair: { mode: CrosshairMode.Normal },
    })
    setChart(next)
    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return
      next.applyOptions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      next.remove()
      setChart(null)
      setMain(null)
      setContainer(null)
      extrasRef.current = EMPTY_EXTRAS
    }
  }, [])

  useEffect(() => {
    if (!chart) return
    const created =
      chartType === "line"
        ? chart.addSeries(LineSeries, { color: "#299D7F", lineWidth: 2 })
        : chartType === "area"
          ? chart.addSeries(AreaSeries, {
              lineColor: "#299D7F",
              topColor: "rgba(41,157,127,0.35)",
              bottomColor: "rgba(41,157,127,0.02)",
            })
          : chart.addSeries(CandlestickSeries, {
              upColor: "#299D7F",
              downColor: "#C45A59",
              borderVisible: false,
              wickUpColor: "#299D7F",
              wickDownColor: "#C45A59",
            })
    created.priceScale().applyOptions({
      scaleMargins: { top: 0.1, bottom: 0.25 },
    })
    setMain({
      series: created as ISeriesApi<SeriesType>,
      kind: chartType,
    })
    return () => {
      setMain(null)
      try {
        chart.removeSeries(created)
      } catch {
        // chart already disposed
      }
      extrasRef.current = EMPTY_EXTRAS
    }
  }, [chart, chartType])

  useEffect(() => {
    if (!chart || !main || !data) return
    // ! Only re-fit on market/tf/range/chartType — live candle ticks keep user zoom
    const fitKey = `${dataKey}:${range}:${main.kind}`
    const resetVisibleRange = lastFitKeyRef.current !== fitKey
    lastFitKeyRef.current = fitKey
    extrasRef.current = applyChartData({
      chart,
      mainSeries: main.series,
      data,
      chartType: main.kind,
      indicators,
      compareSymbol,
      range,
      resetVisibleRange,
      extras: extrasRef.current,
    })
  }, [chart, main, data, dataKey, indicators, compareSymbol, range])

  return (
    <div className="relative min-h-0 flex-1">
      {mounted && isLoading ? (
        <div className="absolute inset-0 z-10 animate-pulse bg-muted/40" />
      ) : null}
      <div ref={containerRef} className="size-full min-h-[320px]" />
    </div>
  )
}
