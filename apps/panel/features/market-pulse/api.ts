import type {
  AlertItem,
  CandlePoint,
  ChartTimeframe,
  MarketFlowItem,
  MarketPair,
} from "@/features/market-pulse/types"
import { mockAlerts, mockMarketFlow } from "@/features/market-pulse/mock-data"
import {
  mapHistoryToCandles,
  parseMarketStats,
} from "@/features/market-pulse/nobitex-parse"
import { nobitexClient } from "@/lib/nobitex/client"

const TIMEFRAME_RESOLUTION: Record<ChartTimeframe, string> = {
  "1m": "1",
  "5m": "5",
  "15m": "15",
  "1h": "60",
  "4h": "240",
  "1D": "D",
  "1W": "D",
  All: "D",
}

const TIMEFRAME_LOOKBACK_SECONDS: Record<ChartTimeframe, number> = {
  "1m": 86_400,
  "5m": 86_400 * 3,
  "15m": 86_400 * 7,
  "1h": 86_400 * 30,
  "4h": 86_400 * 90,
  "1D": 86_400 * 365,
  "1W": 86_400 * 365 * 2,
  All: 86_400 * 365 * 5,
}

type StatsBody = {
  status?: string
  stats?: Record<string, Record<string, string | boolean | null>>
}

type HistoryBody = {
  s: string
  errmsg?: string
  t?: number[]
  o?: number[]
  h?: number[]
  l?: number[]
  c?: number[]
  v?: number[]
}

export async function fetchMarkets(params?: {
  srcCurrency?: string
  dstCurrency?: string
}): Promise<MarketPair[]> {
  const { data } = await nobitexClient.get<StatsBody>("/market/stats", {
    params,
  })
  if (data.status !== "ok" || !data.stats) {
    throw new Error("Invalid market stats response")
  }
  return parseMarketStats(data.stats)
}

export async function fetchChart(
  ohlcSymbol: string,
  timeframe: ChartTimeframe
): Promise<CandlePoint[]> {
  const to = Math.floor(Date.now() / 1000)
  const from = to - TIMEFRAME_LOOKBACK_SECONDS[timeframe]
  const { data } = await nobitexClient.get<HistoryBody>("/market/udf/history", {
    params: {
      symbol: ohlcSymbol.toUpperCase(),
      resolution: TIMEFRAME_RESOLUTION[timeframe],
      from,
      to,
    },
  })
  if (data.s === "no_data") return []
  if (data.s !== "ok") {
    throw new Error(data.errmsg ?? "Invalid history response")
  }
  return mapHistoryToCandles(data)
}

export async function fetchMarketFlow(): Promise<MarketFlowItem[]> {
  return mockMarketFlow
}

export async function fetchAlerts(): Promise<AlertItem[]> {
  return mockAlerts
}
