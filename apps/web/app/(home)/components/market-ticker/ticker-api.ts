import {
  isBitycleTicker,
  TICKER_MARKETS,
  type BitycleTickerConfig,
} from "./ticker-markets"
import type { TickerSnapshot } from "./ticker-format"

type BitycleCandle = {
  o: number
  h: number
  l: number
  c: number
  t: number
  v?: number
}

type BitycleWidgetBody = {
  status?: string
  message?: string
  data?: BitycleCandle[]
}

type MarketOverviewBody = {
  marketOverview?: {
    indexLastValue?: number
    indexChange?: number
  }
}

function snapshotFromCandles(
  id: string,
  candles: BitycleCandle[]
): TickerSnapshot {
  const last = candles[candles.length - 1]
  const prev = candles[candles.length - 2]
  const latest = last?.c ?? 0
  const dayChange =
    last && prev ? last.c - prev.c : last ? last.c - last.o : 0
  const basis = latest - dayChange
  const changePercent = basis !== 0 ? (dayChange / basis) * 100 : 0
  return { id, latest, dayChange, changePercent }
}

function emptySnapshot(id: string): TickerSnapshot {
  return { id, latest: 0, dayChange: 0, changePercent: 0 }
}

async function fetchBitycleSnapshot(
  market: BitycleTickerConfig
): Promise<TickerSnapshot> {
  const end = Math.floor(Date.now() / 1000)
  const params = new URLSearchParams({
    symbol: market.ohlcSymbol,
    time_frame: market.timeFrame,
    source: market.source,
    end: String(end),
    is_first: "true",
    limit: "3",
  })
  // * Same-origin rewrite → Bitycle widget_data (see next.config)
  const response = await fetch(`/api/market-chart?${params.toString()}`)
  if (!response.ok) return emptySnapshot(market.id)
  const body = (await response.json()) as BitycleWidgetBody
  if (body.status !== "success") return emptySnapshot(market.id)
  return snapshotFromCandles(market.id, body.data ?? [])
}

async function fetchTseSnapshot(): Promise<TickerSnapshot> {
  const response = await fetch("/api/tsetmc-overview")
  if (!response.ok) return emptySnapshot("tse")
  const body = (await response.json()) as MarketOverviewBody
  const latest = body.marketOverview?.indexLastValue ?? 0
  const dayChange = body.marketOverview?.indexChange ?? 0
  const basis = latest - dayChange
  const changePercent = basis !== 0 ? (dayChange / basis) * 100 : 0
  return { id: "tse", latest, dayChange, changePercent }
}

export async function fetchTseTickerSnapshot(): Promise<TickerSnapshot> {
  try {
    return await fetchTseSnapshot()
  } catch {
    return emptySnapshot("tse")
  }
}

/** Parallel history/overview snapshots for the home ticker strip. */
export async function fetchTickerSnapshots(): Promise<TickerSnapshot[]> {
  return Promise.all(
    TICKER_MARKETS.map(async (market) => {
      if (isBitycleTicker(market)) {
        try {
          return await fetchBitycleSnapshot(market)
        } catch {
          return emptySnapshot(market.id)
        }
      }
      try {
        return await fetchTseSnapshot()
      } catch {
        return emptySnapshot("tse")
      }
    })
  )
}
