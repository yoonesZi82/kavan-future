import { bitycleClient } from "@/lib/bitycle/client"
import {
  BITYCLE_MARKETS,
  emptyMarketPair,
  getBitycleMarket,
  resolveBitycleTimeframe,
  type BitycleMarketConfig,
} from "@/features/market-pulse/bitycle-markets"
import type {
  CandlePoint,
  ChartTimeframe,
  MarketPair,
} from "@/features/market-pulse/types"

type BitycleCandle = {
  o: number
  h: number
  l: number
  c: number
  t: number
  v: number
}

type BitycleWidgetBody = {
  status?: string
  message?: string
  data?: BitycleCandle[]
}

export function mapBitycleCandles(rows: BitycleCandle[]): CandlePoint[] {
  return rows.map((row) => ({
    time: row.t,
    open: row.o,
    high: row.h,
    low: row.l,
    close: row.c,
    volume: row.v ?? 0,
  }))
}

export async function fetchWidgetData(params: {
  symbol: string
  timeFrame: string
  source: string
  end?: number
  limit?: number
}): Promise<CandlePoint[]> {
  const end = params.end ?? Math.floor(Date.now() / 1000)
  const { data } = await bitycleClient.get<BitycleWidgetBody>(
    "/c1/api/exchange/widget_data",
    {
      params: {
        symbol: params.symbol,
        time_frame: params.timeFrame,
        source: params.source,
        end,
        limit: params.limit ?? 500,
      },
    }
  )
  if (data.status !== "success") {
    throw new Error(data.message || "Invalid Bitycle widget_data response")
  }
  return mapBitycleCandles(data.data ?? [])
}

export async function fetchBitycleChart(
  ohlcSymbol: string,
  timeframe: ChartTimeframe
): Promise<CandlePoint[]> {
  const config = getBitycleMarket(ohlcSymbol)
  if (!config) {
    throw new Error(`Unknown Bitycle market: ${ohlcSymbol}`)
  }
  return fetchWidgetData({
    symbol: config.ohlcSymbol,
    timeFrame: resolveBitycleTimeframe(config, timeframe),
    source: config.source,
  })
}

function marketFromCandles(
  config: BitycleMarketConfig,
  candles: CandlePoint[]
): MarketPair {
  const last = candles[candles.length - 1]
  const prev = candles[candles.length - 2]
  const latest = last?.close ?? 0
  return {
    ...emptyMarketPair(config),
    latest,
    dayChange:
      last && prev
        ? last.close - prev.close
        : last
          ? last.close - last.open
          : 0,
    dayHigh: last?.high ?? latest,
    dayLow: last?.low ?? latest,
    dayOpen: last?.open ?? latest,
    dayClose: latest,
    bestBuy: latest,
    bestSell: latest,
  }
}

export async function fetchBitycleMarket(
  config: BitycleMarketConfig
): Promise<MarketPair> {
  try {
    const candles = await fetchWidgetData({
      symbol: config.ohlcSymbol,
      timeFrame: config.fallbackTimeframe,
      source: config.source,
      limit: 3,
    })
    return marketFromCandles(config, candles)
  } catch {
    return emptyMarketPair(config)
  }
}

export async function fetchBitycleMarkets(): Promise<MarketPair[]> {
  return Promise.all(BITYCLE_MARKETS.map((market) => fetchBitycleMarket(market)))
}
