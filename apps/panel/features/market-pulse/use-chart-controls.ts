"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type {
  ChartType,
  DrawingToolId,
  IndicatorId,
  RangeKey,
  ScaleMode,
} from "@/features/market-pulse/chart-options"
import { useMarketsQuery } from "@/features/market-pulse/hooks"
import type { ChartTimeframe, MarketPair } from "@/features/market-pulse/types"

const DEFAULT_MARKET_ID = "btc-rls"

export function useChartControls() {
  const marketsQuery = useMarketsQuery()
  const [marketId, setMarketId] = useState(DEFAULT_MARKET_ID)
  const [compareSymbol, setCompareSymbol] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("15m")
  const [range, setRange] = useState<RangeKey>("1D")
  const [scaleMode, setScaleMode] = useState<ScaleMode>("normal")
  const [chartType, setChartType] = useState<ChartType>("candle")
  const [indicators, setIndicators] = useState<IndicatorId[]>(["volume"])
  const [drawingTool, setDrawingTool] = useState<DrawingToolId>("crosshair")
  const [isMagnet, setIsMagnet] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [drawingsVisible, setDrawingsVisible] = useState(true)
  const [drawingsVersion, setDrawingsVersion] = useState(0)
  const [showSettings, setShowSettings] = useState(true)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const market = useMemo(() => {
    return marketsQuery.data?.find((item) => item.id === marketId) ?? null
  }, [marketsQuery.data, marketId])

  useEffect(() => {
    if (market || !marketsQuery.data?.length) return
    const fallback =
      marketsQuery.data.find((item) => item.id === DEFAULT_MARKET_ID) ??
      marketsQuery.data[0]
    if (fallback) setMarketId(fallback.id)
  }, [market, marketsQuery.data])

  const selectMarket = useCallback((next: MarketPair) => {
    setMarketId(next.id)
    setCompareSymbol(null)
    setStatusMessage(next.symbol)
  }, [])

  const cycleChartType = useCallback(() => {
    setChartType((current) => {
      if (current === "candle") return "line"
      if (current === "line") return "area"
      return "candle"
    })
  }, [])

  const toggleIndicator = useCallback((id: IndicatorId) => {
    setIndicators((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }, [])

  const handleDrawingTool = useCallback((id: DrawingToolId) => {
    if (id === "magnet") {
      setIsMagnet((value) => !value)
      setDrawingTool("crosshair")
      return
    }
    if (id === "lock") {
      setIsLocked((value) => !value)
      return
    }
    if (id === "hide") {
      setDrawingsVisible((value) => !value)
      return
    }
    if (id === "trash") {
      setDrawingsVersion((value) => value + 1)
      setStatusMessage("رسم‌ها پاک شد")
      return
    }
    if (id === "zoom") {
      setRange("All")
      setStatusMessage("نمای کامل چارت")
      setDrawingTool("crosshair")
      return
    }
    setDrawingTool(id)
    const labels: Partial<Record<DrawingToolId, string>> = {
      crosshair: "نشانگر فعال شد",
      trend: "ابزار خط روند فعال شد",
      fib: "ابزار فیبوناچی فعال شد",
      shape: "اشکال هندسی فعال شد",
      text: "ابزار متن فعال شد",
      emoji: "آیکون‌ها فعال شد",
      measure: "اندازه‌گیری فعال شد",
    }
    if (labels[id]) setStatusMessage(labels[id] ?? null)
  }, [])

  const addCompare = useCallback(() => {
    const alt = marketsQuery.data?.find(
      (item) => item.src === market?.src && item.id !== marketId
    )
    if (!alt) {
      setStatusMessage("بازار دومی برای این ارز نیست")
      return
    }
    setCompareSymbol((current) => {
      if (current) {
        setStatusMessage("مقایسه خاموش شد")
        return null
      }
      setStatusMessage(`مقایسه با ${alt.symbol}`)
      return alt.symbol
    })
  }, [market?.src, marketId, marketsQuery.data])

  const flashStatus = useCallback((message: string) => {
    setStatusMessage(message)
  }, [])

  return useMemo(
    () => ({
      market,
      marketId,
      selectMarket,
      compareSymbol,
      timeframe,
      setTimeframe,
      range,
      setRange,
      scaleMode,
      setScaleMode,
      chartType,
      cycleChartType,
      indicators,
      toggleIndicator,
      drawingTool,
      handleDrawingTool,
      isMagnet,
      isLocked,
      drawingsVisible,
      drawingsVersion,
      showSettings,
      setShowSettings,
      statusMessage,
      setStatusMessage,
      addCompare,
      flashStatus,
    }),
    [
      market,
      marketId,
      selectMarket,
      compareSymbol,
      timeframe,
      range,
      scaleMode,
      chartType,
      cycleChartType,
      indicators,
      toggleIndicator,
      drawingTool,
      handleDrawingTool,
      isMagnet,
      isLocked,
      drawingsVisible,
      drawingsVersion,
      showSettings,
      statusMessage,
      addCompare,
      flashStatus,
    ]
  )
}
