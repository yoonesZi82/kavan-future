import axios from "axios"
import type { CandlePoint } from "./types"
import {
  getMarketingMarket,
  MARKETING_MARKETS,
  resolveMarketingTimeframe,
  type MarketingMarketConfig,
} from "./marketing-markets"
import type { ChartMarketOption } from "./types"
import type { ChartTimeframe } from "./types"

const bitycleClient = axios.create({
  baseURL: "https://widget-data.bitycle.com",
  headers: { Accept: "application/json" },
})

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

function mapCandles(rows: BitycleCandle[]): CandlePoint[] {
  return rows.map((row) => ({
    time: row.t,
    open: row.o,
    high: row.h,
    low: row.l,
    close: row.c,
    volume: row.v ?? 0,
  }))
}

async function fetchWidgetData(params: {
  symbol: string
  timeFrame: string
  source: string
  limit?: number
}): Promise<CandlePoint[]> {
  const { data } = await bitycleClient.get<BitycleWidgetBody>(
    "/c1/api/exchange/widget_data",
    {
      params: {
        symbol: params.symbol,
        time_frame: params.timeFrame,
        source: params.source,
        end: Math.floor(Date.now() / 1000),
        limit: params.limit ?? 500,
      },
    }
  )
  if (data.status !== "success") {
    throw new Error(data.message || "Invalid Bitycle widget_data response")
  }
  return mapCandles(data.data ?? [])
}

function optionFromCandles(
  config: MarketingMarketConfig,
  candles: CandlePoint[]
): ChartMarketOption {
  const last = candles[candles.length - 1]
  const prev = candles[candles.length - 2]
  const latest = last?.close ?? 0
  return {
    id: config.id,
    nameFa: config.nameFa,
    symbol: config.symbol,
    ohlcSymbol: config.ohlcSymbol,
    latest,
    dayChange:
      last && prev
        ? last.close - prev.close
        : last
          ? last.close - last.open
          : 0,
  }
}

function emptyOption(config: MarketingMarketConfig): ChartMarketOption {
  return {
    id: config.id,
    nameFa: config.nameFa,
    symbol: config.symbol,
    ohlcSymbol: config.ohlcSymbol,
    latest: 0,
    dayChange: 0,
  }
}

export async function fetchMarketingMarkets(): Promise<ChartMarketOption[]> {
  return Promise.all(
    MARKETING_MARKETS.map(async (config) => {
      try {
        const candles = await fetchWidgetData({
          symbol: config.ohlcSymbol,
          timeFrame: config.fallbackTimeframe,
          source: config.source,
          limit: 3,
        })
        return optionFromCandles(config, candles)
      } catch {
        return emptyOption(config)
      }
    })
  )
}

export async function fetchMarketingChart(
  ohlcSymbol: string,
  timeframe: ChartTimeframe
): Promise<CandlePoint[]> {
  const config = getMarketingMarket(ohlcSymbol)
  if (!config) throw new Error(`Unknown market: ${ohlcSymbol}`)
  return fetchWidgetData({
    symbol: config.ohlcSymbol,
    timeFrame: resolveMarketingTimeframe(config, timeframe),
    source: config.source,
  })
}
