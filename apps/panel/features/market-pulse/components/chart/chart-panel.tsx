"use client"

import { ChartPanel as BaseChartPanel } from "@workspace/chart"
import { useChartQuery } from "@/features/market-pulse/data/hooks"
import type { useChartControls } from "@/features/market-pulse/components/chart/use-chart-controls"

export type ChartControls = ReturnType<typeof useChartControls>

type ChartPanelProps = {
  controls: ChartControls
}

/** Panel shell: loads OHLC via TanStack Query, renders shared ChartPanel. */
export function ChartPanel({ controls }: ChartPanelProps) {
  const { data, isLoading } = useChartQuery(
    controls.market?.ohlcSymbol ?? null,
    controls.timeframe
  )

  return (
    <BaseChartPanel controls={controls} data={data} isLoading={isLoading} />
  )
}
