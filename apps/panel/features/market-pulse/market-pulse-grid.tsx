"use client"

import { AlertsPanel } from "@/features/market-pulse/alerts-panel"
import { ChartPanel } from "@/features/market-pulse/chart-panel"
import { MajorIndicesPanel } from "@/features/market-pulse/major-indices-panel"
import { MarketFlowPanel } from "@/features/market-pulse/market-flow-panel"
import { useChartControls } from "@/features/market-pulse/use-chart-controls"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

const HERO_HEIGHT = "h-[400px] md:h-[460px]"
const FIT_CELL = "min-h-0 w-full self-start"

export function MarketPulseGrid() {
  const controls = useChartControls()

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

      <div
        className={`hidden w-full min-w-0 lg:block ${HERO_HEIGHT}`}
      >
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
