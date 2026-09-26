"use client"

import { useEffect, useState } from "react"
import { ActiveAlertsPanel } from "@/features/market-analysis/components/alerts/active-alerts"
import { pickMarketForCategory } from "@/features/market-analysis/data/category-markets"
import { CategoryTabs } from "@/features/market-analysis/components/category-tabs"
import { AnalysisDetailsPanel } from "@/features/market-analysis/components/details/analysis-details"
import { SelectedIndicatorChart } from "@/features/market-analysis/components/details/selected-indicator-chart"
import { ANALYSIS_INDICATORS } from "@/features/market-analysis/data/mock-data"
import { ReturnsChart } from "@/features/market-analysis/components/returns/returns-chart"
import { AnalysisSidebar } from "@/features/market-analysis/components/signal/analysis-sidebar"
import { CrisisBreakoutPanel } from "@/features/market-analysis/components/signal/crisis-panel"
import type { MarketCategory } from "@/features/market-analysis/types"
import { PANEL_CHART_TIMEFRAMES } from "@workspace/chart"
import { ChartPanel } from "@/features/market-pulse/components/chart/chart-panel"
import { useChartControls } from "@/features/market-pulse/components/chart/use-chart-controls"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"

const CELL = "min-h-[280px] w-full min-w-0 p-px md:min-h-[320px]"

export function MarketAnalysisGrid() {
  const [category, setCategory] = useState<MarketCategory>("all")
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(
    ANALYSIS_INDICATORS[0]?.id ?? ""
  )
  const marketsQuery = useMarketsQuery()
  const controls = useChartControls({
    allowedTimeframes: PANEL_CHART_TIMEFRAMES,
    defaultTimeframe: "1h",
  })

  // * Tab → chart: pick a market in that category (real OHLC when API has it)
  useEffect(() => {
    const markets = marketsQuery.data
    if (!markets?.length) return
    const next = pickMarketForCategory(markets, category)
    if (!next || next.id === controls.marketId) return
    controls.selectMarket(next)
  }, [category, marketsQuery.data, controls.marketId, controls.selectMarket])

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden md:gap-5">
      {/* * Market analysis layout — chart+signals, then returns/alerts/crisis, then details */}
      <CategoryTabs value={category} onChange={setCategory} />

      <div
        className={[
          "grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5",
          "xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.85fr)]",
        ].join(" ")}
      >
        {/* * xl: row height from sidebar; chart stretches to match */}
        <div className="h-[300px] min-h-0 w-full min-w-0 p-px md:h-[320px] xl:h-full">
          <ChartPanel controls={controls} />
        </div>
        <div className="w-full min-w-0 p-px xl:h-full">
          <AnalysisSidebar />
        </div>
      </div>

      <div
        className={[
          "grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5",
          "xl:grid-cols-3",
        ].join(" ")}
      >
        <div className={CELL}>
          <ReturnsChart />
        </div>
        <div className={CELL}>
          <ActiveAlertsPanel />
        </div>
        <div className={CELL}>
          <CrisisBreakoutPanel />
        </div>
      </div>

      <div
        className={[
          "grid w-full min-w-0 grid-cols-1 gap-4 md:gap-5",
          "xl:grid-cols-2",
        ].join(" ")}
      >
        <div className={CELL}>
          <AnalysisDetailsPanel
            selectedId={selectedIndicatorId}
            onSelect={setSelectedIndicatorId}
          />
        </div>
        <div className={CELL}>
          <SelectedIndicatorChart selectedId={selectedIndicatorId} />
        </div>
      </div>
    </div>
  )
}
