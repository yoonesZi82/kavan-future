"use client"

import { useQuery } from "@tanstack/react-query"
import {
  fetchAlerts,
  fetchChart,
  fetchMarketFlow,
  fetchMarkets,
} from "@/features/market-pulse/data/api"
import { useBitycleLive } from "@/features/market-pulse/data/use-bitycle-live"
import type { ChartTimeframe } from "@/features/market-pulse/types"
import { queryKeys } from "@/lib/api/query-keys"

/** Backup poll; live prices/candles come from Bitycle WS. */
export const MARKET_FLOW_REFETCH_MS = 60_000
const BACKUP_MS = MARKET_FLOW_REFETCH_MS
const TSE_POLL_MS = 15_000

export function useMarketsQuery() {
  useBitycleLive()
  return useQuery({
    queryKey: queryKeys.marketPulse.markets(),
    queryFn: fetchMarkets,
    refetchInterval: TSE_POLL_MS,
    staleTime: TSE_POLL_MS,
  })
}

export function useMarketFlowQuery() {
  return useQuery({
    queryKey: queryKeys.marketPulse.marketFlow(),
    queryFn: fetchMarketFlow,
    refetchInterval: MARKET_FLOW_REFETCH_MS,
    // * Keep stale so interval refetch always hits the network and bumps dataUpdatedAt
    staleTime: 0,
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
  useBitycleLive(
    ohlcSymbol ? { ohlcSymbol, timeframe } : undefined
  )
  return useQuery({
    queryKey: queryKeys.marketPulse.chart(ohlcSymbol ?? "", timeframe),
    queryFn: () => fetchChart(ohlcSymbol!, timeframe),
    enabled:
      Boolean(ohlcSymbol) &&
      (ohlcSymbol?.toUpperCase() ?? "") !== "TSEINDEX",
    refetchInterval: BACKUP_MS,
  })
}
