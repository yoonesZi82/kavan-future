import type {
  AlertItem,
  CandlePoint,
  ChartTimeframe,
  MarketFlowItem,
  MarketPair,
} from "@/features/market-pulse/types"
import {
  fetchBitycleChart,
  fetchBitycleMarkets,
} from "@/features/market-pulse/bitycle"
import {
  fetchImeSilverChart,
  fetchImeSilverMarket,
} from "@/features/market-pulse/ime"
import { fetchTseIndexMarket } from "@/features/market-pulse/tsetmc"
import { mockAlerts } from "@/features/market-pulse/mock-data"
import { fetchTradersArenaSymbols } from "@/features/market-pulse/tradersarena"

export async function fetchMarkets(): Promise<MarketPair[]> {
  const [bitycle, tse, silver] = await Promise.all([
    fetchBitycleMarkets(),
    fetchTseIndexMarket().catch(() => null),
    fetchImeSilverMarket(),
  ])
  const list = [...bitycle, silver]
  return tse ? [tse, ...list] : list
}

export async function fetchChart(
  ohlcSymbol: string,
  timeframe: ChartTimeframe
): Promise<CandlePoint[]> {
  const upper = ohlcSymbol.toUpperCase()
  if (upper === "TSEINDEX") return []
  if (upper === "IMESILVER") {
    void timeframe
    return fetchImeSilverChart()
  }
  return fetchBitycleChart(ohlcSymbol, timeframe)
}

export async function fetchMarketFlow(): Promise<MarketFlowItem[]> {
  return fetchTradersArenaSymbols()
}

export async function fetchAlerts(): Promise<AlertItem[]> {
  return mockAlerts
}
