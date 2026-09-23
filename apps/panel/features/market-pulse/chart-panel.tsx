"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Card } from "@workspace/ui/components/card"
import { ChartCanvas } from "@/features/market-pulse/chart-canvas"
import { ChartDrawingTools } from "@/features/market-pulse/chart-drawing-tools"
import { ChartFooter } from "@/features/market-pulse/chart-footer"
import { ChartOhlc } from "@/features/market-pulse/chart-ohlc"
import { ChartToolbar } from "@/features/market-pulse/chart-toolbar"
import { useChartQuery } from "@/features/market-pulse/hooks"
import type { useChartControls } from "@/features/market-pulse/use-chart-controls"
import type { CandlePoint } from "@/features/market-pulse/types"

export type ChartControls = ReturnType<typeof useChartControls>

type ChartPanelProps = {
  controls: ChartControls
}

export function ChartPanel({ controls }: ChartPanelProps) {
  const { data, isLoading } = useChartQuery(
    controls.market?.ohlcSymbol ?? null,
    controls.timeframe
  )
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
      className="flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset"
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
          onSelect={controls.handleDrawingTool}
        />
        <div className="relative flex min-w-0 flex-1 flex-col">
          <ChartCanvas
            data={data}
            dataKey={`${controls.market?.ohlcSymbol ?? ""}:${controls.timeframe}`}
            isLoading={isLoading}
            chartType={controls.chartType}
            scaleMode={controls.scaleMode}
            range={controls.range}
            indicators={controls.indicators}
            compareSymbol={controls.compareSymbol}
            activeTool={controls.drawingTool}
            drawingsVisible={controls.drawingsVisible}
            drawingsVersion={controls.drawingsVersion}
            isMagnet={controls.isMagnet}
            isLocked={controls.isLocked}
            showGrid={controls.showSettings}
            onHoverCandle={setHoverCandle}
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
