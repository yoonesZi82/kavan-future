"use client"

import { useEffect } from "react"
import {
  CrosshairMode,
  PriceScaleMode,
  type IChartApi,
  type Time,
} from "lightweight-charts"
import type { ScaleMode } from "@/features/market-pulse/chart-options"
import type { CandlePoint } from "@/features/market-pulse/types"

type UseChartViewArgs = {
  chart: IChartApi | null
  scaleMode: ScaleMode
  isMagnet: boolean
  showGrid: boolean
  data: CandlePoint[] | undefined
  onHoverCandle: (candle: CandlePoint | null) => void
}

export function useChartView({
  chart,
  scaleMode,
  isMagnet,
  showGrid,
  data,
  onHoverCandle,
}: UseChartViewArgs): void {
  useEffect(() => {
    if (!chart) return
    const mode =
      scaleMode === "log"
        ? PriceScaleMode.Logarithmic
        : scaleMode === "percent"
          ? PriceScaleMode.Percentage
          : PriceScaleMode.Normal
    chart.priceScale("right").applyOptions({
      mode,
      autoScale: scaleMode === "normal" || scaleMode === "percent",
    })
  }, [chart, scaleMode])

  useEffect(() => {
    chart?.applyOptions({
      crosshair: {
        mode: isMagnet ? CrosshairMode.Magnet : CrosshairMode.Normal,
      },
    })
  }, [chart, isMagnet])

  useEffect(() => {
    chart?.applyOptions({
      grid: {
        vertLines: { visible: showGrid, color: "rgba(0,0,0,0.06)" },
        horzLines: { visible: showGrid, color: "rgba(0,0,0,0.06)" },
      },
    })
  }, [chart, showGrid])

  useEffect(() => {
    if (!chart || !data) return
    const handler = (param: { time?: Time }) => {
      if (!param.time) {
        onHoverCandle(null)
        return
      }
      onHoverCandle(
        data.find((item) => item.time === Number(param.time)) ?? null
      )
    }
    chart.subscribeCrosshairMove(handler)
    return () => chart.unsubscribeCrosshairMove(handler)
  }, [chart, data, onHoverCandle])
}
