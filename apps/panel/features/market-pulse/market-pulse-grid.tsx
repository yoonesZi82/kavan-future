"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AlertsPanel } from "@/features/market-pulse/components/alerts/alerts-panel"
import { PANEL_CHART_TIMEFRAMES } from "@workspace/chart"
import { ChartPanel } from "@/features/market-pulse/components/chart/chart-panel"
import { MajorIndicesPanel } from "@/features/market-pulse/components/watchlist/major-indices-panel"
import { MarketFlowPanel } from "@/features/market-pulse/components/market-flow/market-flow-panel"
import { useChartControls } from "@/features/market-pulse/components/chart/use-chart-controls"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

// * Mobile needs extra room so drawing rail + footer don't eat the candles
const HERO_HEIGHT = "h-[min(520px,70svh)] md:h-[460px]"
const FIT_CELL = "min-h-0 w-full self-start"

export function MarketPulseGrid() {
  const searchParams = useSearchParams()
  const marketsQuery = useMarketsQuery()
  const controls = useChartControls({
    allowedTimeframes: PANEL_CHART_TIMEFRAMES,
    defaultTimeframe: "1h",
  })

  // * Search dialog navigates here with ?market=id after adding to watchlist
  useEffect(() => {
    const marketId = searchParams.get("market")
    if (!marketId || !marketsQuery.data?.length) return
    const match = marketsQuery.data.find((item) => item.id === marketId)
    if (match) controls.selectMarket(match)
  }, [searchParams, marketsQuery.data, controls.selectMarket])

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden md:gap-5">
      <div className="flex w-full min-w-0 flex-col gap-4 lg:hidden">
        <div className={`min-h-0 w-full min-w-0 p-px ${HERO_HEIGHT}`}>
          <ChartPanel controls={controls} />
        </div>
        <div className={`min-h-0 w-full min-w-0 p-px ${HERO_HEIGHT}`}>
          <MajorIndicesPanel
            selectedId={controls.marketId}
            onSelect={controls.selectMarket}
          />
        </div>
      </div>

      <div className={`hidden w-full min-w-0 lg:block ${HERO_HEIGHT}`}>
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full w-full min-w-0 gap-0"
        >
          <ResizablePanel defaultSize="74%" minSize="58%" maxSize="80%">
            <div className="box-border h-full min-w-0 overflow-hidden p-px pe-2">
              <ChartPanel controls={controls} />
            </div>
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="w-1.5 rounded-full bg-border/80 transition-colors hover:bg-primary/50 data-[separator]:bg-border"
          />
          <ResizablePanel defaultSize="26%" minSize="20%" maxSize="42%">
            <div className="box-border h-full min-w-0 overflow-hidden p-px ps-2">
              <MajorIndicesPanel
                selectedId={controls.marketId}
                onSelect={controls.selectMarket}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* * Same 74/26 split as hero chart | markets panels */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,74fr)_minmax(0,26fr)]">
        <div className={FIT_CELL}>
          <MarketFlowPanel />
        </div>
        <div className={FIT_CELL}>
          <AlertsPanel />
        </div>
      </div>
    </div>
  )
}
