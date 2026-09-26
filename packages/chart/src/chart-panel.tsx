"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Card } from "@workspace/ui/components/card"
import { ChartCanvas } from "./chart-canvas"
import { ChartDrawingTools } from "./chart-drawing-tools"
import { ChartFooter } from "./chart-footer"
import { ChartOhlc } from "./chart-ohlc"
import {
  ChartToolbar,
  type ChartToolbarMarketSelect,
} from "./chart-toolbar"
import type {
  ChartType,
  DrawingToolId,
  IndicatorId,
  RangeKey,
  ScaleMode,
} from "./chart-options"
import type { CandlePoint, ChartMarketInfo, ChartTimeframe } from "./types"

/** UI + interaction state the panel shell needs — data is passed separately. */
export type ChartPanelControls = {
  market: ChartMarketInfo | null
  compareSymbol: string | null
  timeframe: ChartTimeframe
  timeframeOptions: ChartTimeframe[]
  setTimeframe: (value: ChartTimeframe) => void
  range: RangeKey
  setRange: (value: RangeKey) => void
  scaleMode: ScaleMode
  setScaleMode: (value: ScaleMode) => void
  chartType: ChartType
  cycleChartType: () => void
  indicators: IndicatorId[]
  toggleIndicator: (id: IndicatorId) => void
  drawingTool: DrawingToolId
  drawingType: string | null
  drawingPayload: string | null
  drawingAsIcon: boolean
  handleDrawingTool: (
    id: DrawingToolId,
    type?: string,
    payload?: string | null
  ) => void
  isMagnet: boolean
  isLocked: boolean
  drawingsVisible: boolean
  drawingsVersion: number
  undoVersion: number
  canUndo: boolean
  setCanUndo: (value: boolean) => void
  showSettings: boolean
  setShowSettings: (value: boolean) => void
  statusMessage: string | null
  setStatusMessage: (value: string | null) => void
  addCompare: () => void
  flashStatus: (message: string) => void
}

type ChartPanelProps = {
  controls: ChartPanelControls
  data: CandlePoint[] | undefined
  isLoading?: boolean
  className?: string
  /** Hidden by default — pass only for hero / marketing chart. */
  marketSelect?: ChartToolbarMarketSelect
}

export function ChartPanel({
  controls,
  data,
  isLoading = false,
  className,
  marketSelect,
}: ChartPanelProps) {
  const [hoverCandle, setHoverCandle] = useState<CandlePoint | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const lastCandle = hoverCandle ?? data?.[data.length - 1] ?? null

  useEffect(() => {
    if (!controls.statusMessage) return
    const id = window.setTimeout(() => controls.setStatusMessage(null), 2200)
    return () => window.clearTimeout(id)
  }, [controls.statusMessage, controls.setStatusMessage])

  const handleSnapshot = useCallback(() => {
    const canvas = rootRef.current?.querySelector("canvas")
    const symbol = controls.market?.symbol ?? "chart"
    if (!canvas) {
      controls.flashStatus("عکس گرفته نشد")
      return
    }
    const link = document.createElement("a")
    link.download = `${symbol.replace("/", "-")}-${controls.timeframe}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
    controls.flashStatus("عکس ذخیره شد")
  }, [controls])

  const handleFullscreen = useCallback(() => {
    const node = rootRef.current
    if (!node) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      controls.flashStatus("خروج از تمام‌صفحه")
      return
    }
    void node.requestFullscreen()
    controls.flashStatus("حالت تمام‌صفحه")
  }, [controls])

  return (
    <Card
      ref={rootRef}
      className={
        className ??
        "flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset"
      }
    >
      <ChartToolbar
        timeframe={controls.timeframe}
        timeframeOptions={controls.timeframeOptions}
        onTimeframeChange={controls.setTimeframe}
        chartType={controls.chartType}
        onCycleChartType={controls.cycleChartType}
        indicators={controls.indicators}
        onToggleIndicator={controls.toggleIndicator}
        compareActive={Boolean(controls.compareSymbol)}
        onToggleCompare={controls.addCompare}
        showSettings={controls.showSettings}
        onToggleSettings={() =>
          controls.setShowSettings(!controls.showSettings)
        }
        onSnapshot={handleSnapshot}
        onFullscreen={handleFullscreen}
        marketSelect={marketSelect}
      />
      <ChartOhlc
        candle={lastCandle}
        liveChange={controls.market?.dayChange ?? null}
        livePrice={controls.market?.latest ?? null}
      />
      <div className="relative flex min-h-0 flex-1">
        <ChartDrawingTools
          activeTool={controls.drawingTool}
          isMagnet={controls.isMagnet}
          isLocked={controls.isLocked}
          drawingsVisible={controls.drawingsVisible}
          canUndo={controls.canUndo}
          onSelect={controls.handleDrawingTool}
        />
        <div className="relative flex min-w-0 flex-1 flex-col">
          <ChartCanvas
            data={data}
            dataKey={`${controls.market?.ohlcSymbol ?? controls.market?.symbol ?? ""}:${controls.timeframe}`}
            isLoading={isLoading}
            chartType={controls.chartType}
            scaleMode={controls.scaleMode}
            range={controls.range}
            indicators={controls.indicators}
            compareSymbol={controls.compareSymbol}
            drawingType={controls.drawingType}
            drawingPayload={controls.drawingPayload}
            drawingAsIcon={controls.drawingAsIcon}
            drawingsVisible={controls.drawingsVisible}
            drawingsVersion={controls.drawingsVersion}
            undoVersion={controls.undoVersion}
            isMagnet={controls.isMagnet}
            isLocked={controls.isLocked}
            showGrid={controls.showSettings}
            onHoverCandle={setHoverCandle}
            onCanUndoChange={controls.setCanUndo}
            onStatus={controls.flashStatus}
          />
        </div>
      </div>
      <ChartFooter
        range={controls.range}
        onRangeChange={controls.setRange}
        scaleMode={controls.scaleMode}
        onScaleChange={controls.setScaleMode}
        statusMessage={controls.statusMessage}
      />
    </Card>
  )
}
