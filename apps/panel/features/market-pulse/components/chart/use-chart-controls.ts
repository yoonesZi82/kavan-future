"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type {
  ChartType,
  DrawingToolId,
  IndicatorId,
  RangeKey,
  ScaleMode,
} from "@/features/market-pulse/components/chart/chart-options"
import { createDrawingToolHandler } from "@/features/market-pulse/components/chart/create-drawing-tool-handler"
import { getMarketChartTimeframes } from "@/features/market-pulse/data/bitycle-timeframes"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"
import type { ChartTimeframe, MarketPair } from "@/features/market-pulse/types"

const DEFAULT_MARKET_ID = "btc-usdt"
const DEFAULT_OHLC = "BTCUSDT"

type UseChartControlsOptions = {
  /** When set, only these timeframes appear (intersected with market support). */
  allowedTimeframes?: readonly ChartTimeframe[]
  defaultTimeframe?: ChartTimeframe
}

export function useChartControls(options: UseChartControlsOptions = {}) {
  const { allowedTimeframes, defaultTimeframe = "15m" } = options
  const marketsQuery = useMarketsQuery()
  const [marketId, setMarketId] = useState(DEFAULT_MARKET_ID)
  const [compareSymbol, setCompareSymbol] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<ChartTimeframe>(defaultTimeframe)
  const [range, setRange] = useState<RangeKey>("1D")
  const [scaleMode, setScaleMode] = useState<ScaleMode>("normal")
  const [chartType, setChartType] = useState<ChartType>("candle")
  const [indicators, setIndicators] = useState<IndicatorId[]>(["volume"])
  const [drawingTool, setDrawingTool] = useState<DrawingToolId>("crosshair")
  const [drawingType, setDrawingType] = useState<string | null>(null)
  const [drawingPayload, setDrawingPayload] = useState<string | null>(null)
  const [drawingAsIcon, setDrawingAsIcon] = useState(false)
  const [isMagnet, setIsMagnet] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [drawingsVisible, setDrawingsVisible] = useState(true)
  const [drawingsVersion, setDrawingsVersion] = useState(0)
  const [undoVersion, setUndoVersion] = useState(0)
  const [canUndo, setCanUndo] = useState(false)
  const canUndoRef = useRef(false)
  const [showSettings, setShowSettings] = useState(true)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  canUndoRef.current = canUndo

  const setCanUndoSafe = useCallback((value: boolean) => {
    canUndoRef.current = value
    setCanUndo(value)
  }, [])

  const market = useMemo(() => {
    return marketsQuery.data?.find((item) => item.id === marketId) ?? null
  }, [marketsQuery.data, marketId])

  const timeframeOptions = useMemo(() => {
    const available = getMarketChartTimeframes(
      market?.ohlcSymbol ?? DEFAULT_OHLC
    )
    if (!allowedTimeframes?.length) return available
    return allowedTimeframes.filter((tf) => available.includes(tf))
  }, [allowedTimeframes, market?.ohlcSymbol])

  useEffect(() => {
    if (market || !marketsQuery.data?.length) return
    const fallback =
      marketsQuery.data.find((item) => item.id === DEFAULT_MARKET_ID) ??
      marketsQuery.data[0]
    if (fallback) setMarketId(fallback.id)
  }, [market, marketsQuery.data])

  useEffect(() => {
    if (timeframeOptions.includes(timeframe)) return
    const next = timeframeOptions[0]
    if (next) setTimeframe(next)
  }, [timeframe, timeframeOptions])

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

  const handleDrawingTool = useCallback(
    createDrawingToolHandler({
      setIsMagnet,
      setIsLocked,
      setDrawingsVisible,
      setDrawingsVersion,
      setUndoVersion,
      getCanUndo: () => canUndoRef.current,
      setRange,
      setDrawingTool,
      setDrawingType,
      setDrawingPayload,
      setDrawingAsIcon,
      setStatusMessage,
    }),
    []
  )

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
      timeframeOptions,
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
      drawingType,
      drawingPayload,
      drawingAsIcon,
      handleDrawingTool,
      isMagnet,
      isLocked,
      drawingsVisible,
      drawingsVersion,
      undoVersion,
      canUndo,
      setCanUndo: setCanUndoSafe,
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
      timeframeOptions,
      range,
      scaleMode,
      chartType,
      cycleChartType,
      indicators,
      toggleIndicator,
      drawingTool,
      drawingType,
      drawingPayload,
      drawingAsIcon,
      handleDrawingTool,
      isMagnet,
      isLocked,
      drawingsVisible,
      drawingsVersion,
      undoVersion,
      canUndo,
      setCanUndoSafe,
      showSettings,
      statusMessage,
      addCompare,
      flashStatus,
    ]
  )
}
