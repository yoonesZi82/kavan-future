import type { MarketPair } from "@/features/market-pulse/types"
import { tsetmcClient } from "@/lib/tsetmc/client"

const TSE_INDEX_MARKET: MarketPair = {
  id: "tse-index",
  src: "tse",
  dst: "index",
  symbol: "شاخص‌کل",
  ohlcSymbol: "TSEINDEX",
  latest: 0,
  dayChange: 0,
  dayHigh: 0,
  dayLow: 0,
  dayOpen: 0,
  dayClose: 0,
  bestBuy: 0,
  bestSell: 0,
  isClosed: false,
  provider: "tsetmc",
}

type MarketOverviewBody = {
  marketOverview?: {
    indexLastValue?: number
    indexChange?: number
    marketState?: string
  }
}

/** Fetch TSE overall index snapshot for market pulse. */
export async function fetchTseIndexMarket(): Promise<MarketPair> {
  const { data } = await tsetmcClient.get<MarketOverviewBody>(
    "/api/MarketData/GetMarketOverview/1"
  )
  const overview = data.marketOverview
  const latest = overview?.indexLastValue ?? 0
  const dayChange = overview?.indexChange ?? 0
  return {
    ...TSE_INDEX_MARKET,
    latest,
    dayChange,
    dayHigh: latest,
    dayLow: latest,
    dayOpen: latest - dayChange,
    dayClose: latest,
    bestBuy: latest,
    bestSell: latest,
    isClosed: overview?.marketState === "C",
  }
}
