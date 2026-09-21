"use client"

import { useQuery } from "@tanstack/react-query"
import {
  fetchAlerts,
  fetchChart,
  fetchMarketFlow,
  fetchMarkets,
} from "@/features/market-pulse/api"
import type { ChartTimeframe } from "@/features/market-pulse/types"
import { queryKeys } from "@/lib/api/query-keys"

const LIVE_MS = 15_000

export function useMarketsQuery() {
  return useQuery({
    queryKey: queryKeys.marketPulse.markets(),
    queryFn: () => fetchMarkets(),
    refetchInterval: LIVE_MS,
    staleTime: LIVE_MS,
  })
}

export function useMarketFlowQuery() {
  return useQuery({
    queryKey: queryKeys.marketPulse.marketFlow(),
    queryFn: fetchMarketFlow,
  })
}

export function useAlertsQuery() {
  return useQuery({
    queryKey: queryKeys.marketPulse.alerts(),
    queryFn: fetchAlerts,
  })
}

export function useChartQuery(
  ohlcSymbol: string | null,
  timeframe: ChartTimeframe
) {
  return useQuery({
    queryKey: queryKeys.marketPulse.chart(ohlcSymbol ?? "", timeframe),
    queryFn: () => fetchChart(ohlcSymbol!, timeframe),
    enabled: Boolean(ohlcSymbol),
    refetchInterval: LIVE_MS,
  })
}
