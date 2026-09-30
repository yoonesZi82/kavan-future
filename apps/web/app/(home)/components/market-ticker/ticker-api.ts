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

type TgjuQuote = {
  p?: string
  d?: string
  dp?: number
}

type TgjuAjaxBody = {
  current?: {
    bourse?: TgjuQuote
  }
}

const BITYCLE_DIRECT =
  "https://widget-data.bitycle.com/c1/api/exchange/widget_data"
const FETCH_MS = 8_000

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

function withTimeout(ms: number): AbortSignal {
  return AbortSignal.timeout(ms)
}

function parseTgjuNumber(value: string | undefined): number {
  if (!value) return 0
  return Number(value.replace(/,/g, "")) || 0
}

async function readBitycleBody(
  response: Response,
  id: string
): Promise<TickerSnapshot> {
  if (!response.ok) return emptySnapshot(id)
  const body = (await response.json()) as BitycleWidgetBody
  if (body.status !== "success") return emptySnapshot(id)
  return snapshotFromCandles(id, body.data ?? [])
}

function bitycleQuery(market: BitycleTickerConfig): string {
  const end = Math.floor(Date.now() / 1000)
  return new URLSearchParams({
    symbol: market.ohlcSymbol,
    time_frame: market.timeFrame,
    source: market.source,
    end: String(end),
    is_first: "true",
    limit: "3",
  }).toString()
}

async function fetchBitycleSnapshot(
  market: BitycleTickerConfig
): Promise<TickerSnapshot> {
  const query = bitycleQuery(market)
  // * Prefer direct (Iran → Bitycle). CORS only allows localhost today; else rewrite.
  try {
    const direct = await fetch(`${BITYCLE_DIRECT}?${query}`, {
      signal: withTimeout(FETCH_MS),
    })
    if (direct.ok) return readBitycleBody(direct, market.id)
  } catch {
    // fall through to same-origin rewrite
  }
  const proxied = await fetch(`/api/market-chart?${query}`, {
    signal: withTimeout(FETCH_MS),
  })
  return readBitycleBody(proxied, market.id)
}

/** TSE index via TGJU — Cloudflare-backed; TSETMC CDN is unreachable from Vercel. */
async function fetchTseSnapshot(): Promise<TickerSnapshot> {
  const response = await fetch("/api/tgju-ajax", {
    signal: withTimeout(FETCH_MS),
  })
  if (!response.ok) return emptySnapshot("tse")
  const body = (await response.json()) as TgjuAjaxBody
  const quote = body.current?.bourse
  const latest = parseTgjuNumber(quote?.p)
  const dayChange = parseTgjuNumber(quote?.d)
  const changePercent =
    typeof quote?.dp === "number"
      ? quote.dp
      : latest - dayChange !== 0
        ? (dayChange / (latest - dayChange)) * 100
        : 0
  return { id: "tse", latest, dayChange, changePercent }
}

export async function fetchTseTickerSnapshot(): Promise<TickerSnapshot> {
  try {
    return await fetchTseSnapshot()
  } catch {
    return emptySnapshot("tse")
  }
}

export async function fetchOneTickerSnapshot(
  market: (typeof TICKER_MARKETS)[number]
): Promise<TickerSnapshot> {
  try {
    if (isBitycleTicker(market)) return await fetchBitycleSnapshot(market)
    return await fetchTseSnapshot()
  } catch {
    return emptySnapshot(isBitycleTicker(market) ? market.id : "tse")
  }
}

/** Parallel history/overview snapshots for the home ticker strip. */
export async function fetchTickerSnapshots(): Promise<TickerSnapshot[]> {
  return Promise.all(TICKER_MARKETS.map(fetchOneTickerSnapshot))
}
