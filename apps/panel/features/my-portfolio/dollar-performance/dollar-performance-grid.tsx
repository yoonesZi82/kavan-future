"use client"

import { CrisisPanel } from "./components/crisis-panel"
import { DollarPerformanceChart } from "./components/dollar-performance-chart"
import { KeyLevelsPanel } from "./components/key-levels-panel"
import { PerformanceHeader } from "./components/performance-header"
import { PerformanceSummary } from "./components/performance-summary"
import { PortfolioStatusPanel } from "./components/portfolio-status-panel"
import { RiskComparePanel } from "./components/risk-compare-panel"

// * Dollar performance page — mock analytics until portfolio performance API
export function DollarPerformanceGrid() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <PerformanceHeader />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <DollarPerformanceChart />
          <CrisisPanel />
          <PerformanceSummary />
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <PortfolioStatusPanel />
          <KeyLevelsPanel />
          <RiskComparePanel />
        </div>
      </div>
    </div>
  )
}
