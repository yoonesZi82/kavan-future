import type { CandlePoint, MarketPair } from "@/features/market-pulse/types"

const DST_DISPLAY: Record<string, string> = {
  rls: "IRT",
  usdt: "USDT",
}

function toNumber(value: string | boolean | null | undefined): number {
  if (typeof value !== "string") return 0
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toOhlcSymbol(src: string, dst: string): string {
  const quote = dst === "rls" ? "IRT" : dst.toUpperCase()
  return `${src.toUpperCase()}${quote}`
}

function toDisplaySymbol(src: string, dst: string): string {
  const quote = DST_DISPLAY[dst] ?? dst.toUpperCase()
  return `${src.toUpperCase()}/${quote}`
}

export function parseMarketStats(
  stats: Record<string, Record<string, string | boolean | null>>
): MarketPair[] {
  const markets: MarketPair[] = []
  for (const [id, row] of Object.entries(stats)) {
    const [src, dst] = id.split("-")
    if (!src || !dst) continue
    markets.push({
      id,
      src,
      dst,
      symbol: toDisplaySymbol(src, dst),
      ohlcSymbol: toOhlcSymbol(src, dst),
      latest: toNumber(row.latest),
      dayChange: toNumber(row.dayChange),
      dayHigh: toNumber(row.dayHigh),
      dayLow: toNumber(row.dayLow),
      dayOpen: toNumber(row.dayOpen),
      dayClose: toNumber(row.dayClose),
      bestBuy: toNumber(row.bestBuy),
      bestSell: toNumber(row.bestSell),
      isClosed: row.isClosed === true,
    })
  }
  return markets.sort((a, b) => a.symbol.localeCompare(b.symbol))
}

export function mergeMarketStatsLive(
  current: MarketPair[] | undefined,
  patch: Record<string, Record<string, string | boolean | null>>
): MarketPair[] {
  if (!current?.length) return parseMarketStats(patch)
  const byId = new Map(current.map((market) => [market.id, market]))
  for (const [id, row] of Object.entries(patch)) {
    const existing = byId.get(id)
    if (existing) {
      byId.set(id, {
        ...existing,
        latest: toNumber(row.latest),
        dayChange: toNumber(row.dayChange),
        dayHigh: toNumber(row.dayHigh),
        dayLow: toNumber(row.dayLow),
        dayOpen: toNumber(row.dayOpen),
        dayClose: toNumber(row.dayClose),
        bestBuy: toNumber(row.bestBuy),
        bestSell: toNumber(row.bestSell),
        isClosed: row.isClosed === true,
      })
      continue
    }
    const [src, dst] = id.split("-")
    if (!src || !dst) continue
    byId.set(id, {
      id,
      src,
      dst,
      symbol: toDisplaySymbol(src, dst),
      ohlcSymbol: toOhlcSymbol(src, dst),
      latest: toNumber(row.latest),
      dayChange: toNumber(row.dayChange),
      dayHigh: toNumber(row.dayHigh),
      dayLow: toNumber(row.dayLow),
      dayOpen: toNumber(row.dayOpen),
      dayClose: toNumber(row.dayClose),
      bestBuy: toNumber(row.bestBuy),
      bestSell: toNumber(row.bestSell),
      isClosed: row.isClosed === true,
    })
  }
  return Array.from(byId.values()).sort((a, b) =>
    a.symbol.localeCompare(b.symbol)
  )
}

type HistoryArrays = {
  t?: number[]
  o?: number[]
  h?: number[]
  l?: number[]
  c?: number[]
  v?: number[]
}

export function mapHistoryToCandles(body: HistoryArrays): CandlePoint[] {
  const times = body.t ?? []
  const opens = body.o ?? []
  const highs = body.h ?? []
  const lows = body.l ?? []
  const closes = body.c ?? []
  const volumes = body.v ?? []
  const candles: CandlePoint[] = []
  for (let i = 0; i < times.length; i += 1) {
    const time = times[i]
    const open = opens[i]
    const high = highs[i]
    const low = lows[i]
    const close = closes[i]
    if (
      time === undefined ||
      open === undefined ||
      high === undefined ||
      low === undefined ||
      close === undefined
    ) {
      continue
    }
    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume: volumes[i] ?? 0,
    })
  }
  return candles
}
