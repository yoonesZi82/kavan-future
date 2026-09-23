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
} from "@/features/market-pulse/data/bitycle"
import {
  fetchImeSilverChart,
  fetchImeSilverMarket,
} from "@/features/market-pulse/data/ime"
import { fetchTseIndexMarket } from "@/features/market-pulse/data/tsetmc"
import { mockAlerts } from "@/features/market-pulse/data/mock-data"
import { fetchTradersArenaMarket0 } from "@/features/market-pulse/data/tradersarena"

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
  return fetchTradersArenaMarket0()
}

export async function fetchAlerts(): Promise<AlertItem[]> {
  return mockAlerts
}
