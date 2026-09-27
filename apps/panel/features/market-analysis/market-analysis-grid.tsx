"use client"

import { useEffect, useRef, useState } from "react"
import { ActiveAlertsPanel } from "@/features/market-analysis/components/alerts/active-alerts"
import { CategoryTabs } from "@/features/market-analysis/components/category-tabs"
import { AnalysisDetailsPanel } from "@/features/market-analysis/components/details/analysis-details"
import { IndicatorSummaryRow } from "@/features/market-analysis/components/details/indicator-summary-row"
import { SelectedIndicatorChart } from "@/features/market-analysis/components/details/selected-indicator-chart"
import { ReturnsChart } from "@/features/market-analysis/components/returns/returns-chart"
import { AnalysisSidebar } from "@/features/market-analysis/components/signal/analysis-sidebar"
import { CrisisBreakoutPanel } from "@/features/market-analysis/components/signal/crisis-panel"
import { pickMarketForCategory } from "@/features/market-analysis/data/category-markets"
import { ANALYSIS_INDICATORS } from "@/features/market-analysis/data/mock-data"
import type { MarketCategory } from "@/features/market-analysis/types"
import { PANEL_CHART_TIMEFRAMES } from "@workspace/chart"
import { ChartPanel } from "@/features/market-pulse/components/chart/chart-panel"
import { useChartControls } from "@/features/market-pulse/components/chart/use-chart-controls"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"

const CELL = "min-h-[280px] w-full min-w-0 p-px md:min-h-[320px]"
// * Mobile hero chart — tall enough for candles + drawing rail (mockup)
const MOBILE_CHART = "h-[min(420px,58svh)] w-full min-w-0 p-px"

export function MarketAnalysisGrid() {
  const [category, setCategory] = useState<MarketCategory>("all")
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(
    ANALYSIS_INDICATORS[0]?.id ?? ""
  )
  const mobileDetailsRef = useRef<HTMLDivElement>(null)
  const desktopDetailsRef = useRef<HTMLDivElement>(null)
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

  function scrollToDetails() {
    const target =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1280px)").matches
        ? desktopDetailsRef.current
        : mobileDetailsRef.current
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden md:gap-5">
      <CategoryTabs value={category} onChange={setCategory} />

      {/* * Mobile stack — matches mockup: chart → metrics → signals → crisis → today → alerts → returns */}
      <div className="flex w-full min-w-0 flex-col gap-4 xl:hidden">
        <div className={MOBILE_CHART}>
          <ChartPanel controls={controls} />
        </div>
        <IndicatorSummaryRow />
        <AnalysisSidebar onViewTodayAnalysis={scrollToDetails} />
        <div className="min-h-[220px] w-full min-w-0 p-px">
          <CrisisBreakoutPanel />
        </div>
        <div className="min-h-[240px] w-full min-w-0 p-px">
          <ActiveAlertsPanel />
        </div>
        <div className="min-h-[260px] w-full min-w-0 p-px">
          <ReturnsChart />
        </div>
        <div ref={mobileDetailsRef} className={CELL}>
          <AnalysisDetailsPanel
            selectedId={selectedIndicatorId}
            onSelect={setSelectedIndicatorId}
          />
        </div>
        <div className={CELL}>
          <SelectedIndicatorChart selectedId={selectedIndicatorId} />
        </div>
      </div>

      {/* * Desktop — chart+signals, then returns/alerts/crisis, then details */}
      <div className="hidden w-full min-w-0 flex-col gap-5 xl:flex">
        <div
          className={[
            "grid w-full min-w-0 grid-cols-1 gap-5",
            "xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.85fr)]",
          ].join(" ")}
        >
          <div className="h-[320px] min-h-0 w-full min-w-0 p-px xl:h-full">
            <ChartPanel controls={controls} />
          </div>
          <div className="w-full min-w-0 p-px xl:h-full">
            <AnalysisSidebar onViewTodayAnalysis={scrollToDetails} />
          </div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-3 gap-5">
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

        <div className="grid w-full min-w-0 grid-cols-2 gap-5">
          <div ref={desktopDetailsRef} className={CELL}>
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
    </div>
  )
}
