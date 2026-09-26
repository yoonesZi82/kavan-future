"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import type {
  ChartType,
  DrawingToolId,
  IndicatorId,
  RangeKey,
  ScaleMode,
} from "./chart-options"
import { TIMEFRAME_OPTIONS } from "./chart-options"
import { createDrawingToolHandler } from "./create-drawing-tool-handler"
import type { ChartPanelControls } from "./chart-panel"
import type { ChartMarketInfo, ChartTimeframe } from "./types"

const DEMO_MARKET: ChartMarketInfo = {
  symbol: "BTC/USDT",
  ohlcSymbol: "BTCUSDT",
  dayChange: 1.24,
  latest: 68_450,
}

const DEFAULT_TIMEFRAMES: ChartTimeframe[] = TIMEFRAME_OPTIONS.map(
  (item) => item.value
)

type UseDemoChartControlsOptions = {
  market?: ChartMarketInfo
  timeframeOptions?: ChartTimeframe[]
  defaultTimeframe?: ChartTimeframe
}

/** Local controls for marketing / demo charts — no remote market list. */
export function useDemoChartControls(
  options: UseDemoChartControlsOptions = {}
): ChartPanelControls & {
  setMarket: (market: ChartMarketInfo) => void
} {
  const {
    market: initialMarket = DEMO_MARKET,
    timeframeOptions = DEFAULT_TIMEFRAMES,
    defaultTimeframe = "1h",
  } = options

  const [market, setMarket] = useState<ChartMarketInfo>(initialMarket)
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
  const [compareSymbol, setCompareSymbol] = useState<string | null>(null)

  canUndoRef.current = canUndo

  const setCanUndoSafe = useCallback((value: boolean) => {
    canUndoRef.current = value
    setCanUndo(value)
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
    setCompareSymbol((current) => {
      if (current) {
        setStatusMessage("مقایسه خاموش شد")
        return null
      }
      setStatusMessage("مقایسه در نسخه دمو فعال نیست")
      return null
    })
  }, [])

  const flashStatus = useCallback((message: string) => {
    setStatusMessage(message)
  }, [])

  const selectMarket = useCallback((next: ChartMarketInfo) => {
    setMarket(next)
    setStatusMessage(next.symbol)
  }, [])

  return useMemo(
    () => ({
      market,
      setMarket: selectMarket,
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
