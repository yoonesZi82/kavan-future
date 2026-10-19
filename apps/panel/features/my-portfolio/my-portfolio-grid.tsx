"use client"

import { AssetAllocationCard } from "./components/asset-allocation-card"
import { HoldingsCard } from "./components/holdings-card"
import { MoversPanel } from "./components/movers-panel"
import { PerformanceAnalysis } from "./components/performance-analysis"
import { PerformanceChart } from "./components/performance-chart"
import { PortfolioKpiCards } from "./components/portfolio-kpi-cards"
import { PortfolioStatusCard } from "./components/portfolio-status-card"

// * Portfolio dashboard body — toolbar lives in my-portfolio/layout
export function MyPortfolioGrid() {
  return (
    <>
      <PortfolioKpiCards />

      {/* * Middle row: left stack + holdings share one height; no dead gaps */}
      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.8fr)] xl:min-h-[520px]">
        <div className="flex h-full min-h-0 min-w-0 flex-col gap-4">
          <div className="flex min-h-0 flex-[1.15] flex-col">
            <AssetAllocationCard />
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <PortfolioStatusCard />
          </div>
        </div>
        <HoldingsCard />
      </div>

      {/* * Bottom row: chart / analysis / movers stretch to the same height */}
      <div className="grid items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-[1.25fr_1fr_minmax(220px,0.75fr)] xl:min-h-[360px]">
        <PerformanceChart />
        <PerformanceAnalysis />
        <MoversPanel />
      </div>
    </>
  )
}
