"use client"

import { AssetAnalysisPanel } from "@/features/market-analysis/asset-analysis"
import { DecisionAlertsPanel } from "@/features/market-analysis/decision-alerts"
import { MyAlertsPanel } from "@/features/market-analysis/my-alerts"
import { ReturnsChart } from "@/features/market-analysis/returns-chart"
import { ChartPanel } from "@/features/market-pulse/chart-panel"
import { PANEL_CHART_TIMEFRAMES } from "@/features/market-pulse/chart-options"
import { useChartControls } from "@/features/market-pulse/use-chart-controls"

const HERO = "h-[400px] md:h-[460px]"
const BOTTOM = "min-h-[280px] md:min-h-[320px]"

export function MarketAnalysisGrid() {
  const controls = useChartControls({
    allowedTimeframes: PANEL_CHART_TIMEFRAMES,
    defaultTimeframe: "1D",
  })

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden md:gap-5">
      {/* * Market analysis: TV chart + Chart.js returns + Polar decision alerts */}
      <div
        className={[
          "grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5",
          "xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(240px,0.72fr)]",
          "xl:grid-rows-[minmax(400px,460px)_minmax(280px,auto)]",
        ].join(" ")}
      >
        <div className={`min-h-0 w-full min-w-0 p-px ${HERO} xl:h-full xl:min-h-0`}>
          <ChartPanel controls={controls} />
        </div>
        <div className={`min-h-0 w-full min-w-0 p-px ${HERO} xl:h-full xl:min-h-0`}>
          <ReturnsChart />
        </div>
        <div className={`min-h-0 w-full min-w-0 p-px ${HERO} xl:row-span-2 xl:h-full xl:min-h-0`}>
          <DecisionAlertsPanel />
        </div>
        <div className={`min-h-0 w-full min-w-0 p-px ${BOTTOM} xl:h-full xl:min-h-0`}>
          <MyAlertsPanel />
        </div>
        <div className={`min-h-0 w-full min-w-0 p-px ${BOTTOM} xl:h-full xl:min-h-0`}>
          <AssetAnalysisPanel />
        </div>
      </div>
    </div>
  )
}
