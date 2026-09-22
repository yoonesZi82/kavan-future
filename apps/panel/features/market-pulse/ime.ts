import type { CandlePoint, MarketPair } from "@/features/market-pulse/types"

const IME_CDC_URL = "https://dataapi.ime.co.ir/api/CDC/CDCTrades"
/** گواهی شمش نقره */
const SILVER_FILTER = "21"
const LOOKBACK_DAYS = 365

const IME_SILVER_MARKET: MarketPair = {
  id: "ime-silver-cdc",
  src: "silver",
  dst: "rls",
  nameFa: "شمش نقره",
  symbol: "شمش‌نقره",
  ohlcSymbol: "IMESILVER",
  latest: 0,
  dayChange: 0,
  dayHigh: 0,
  dayLow: 0,
  dayOpen: 0,
  dayClose: 0,
  bestBuy: 0,
  bestSell: 0,
  isClosed: false,
  provider: "ime",
}

type ImeCdcRow = {
  DT?: string
  FirstPrice?: number
  MaxPrice?: number
  MinPrice?: number
  LastPrice?: number
  TradesVolume?: number
}

type ImeCdcBody = {
  Success?: boolean
  Data?: ImeCdcRow[]
}

function toIsoDate(daysAgo: number): string {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

function mapImeRows(rows: ImeCdcRow[]): CandlePoint[] {
  const candles: CandlePoint[] = []
  for (const row of rows) {
    if (!row.DT) continue
    const open = row.FirstPrice ?? 0
    const high = row.MaxPrice ?? 0
    const low = row.MinPrice ?? 0
    const close = row.LastPrice ?? 0
    if (open === 0 && high === 0 && low === 0 && close === 0) continue
    const day = row.DT.slice(0, 10)
    const time = Math.floor(new Date(`${day}T00:00:00Z`).getTime() / 1000)
    if (!Number.isFinite(time)) continue
    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume: row.TradesVolume ?? 0,
    })
  }
  return candles.sort((a, b) => a.time - b.time)
}

export async function fetchImeSilverChart(): Promise<CandlePoint[]> {
  const response = await fetch(IME_CDC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      fromDate: toIsoDate(LOOKBACK_DAYS),
      toDate: toIsoDate(0),
      pageNumber: 1,
      pageSize: 2000,
      customFilter: SILVER_FILTER,
      sortOrder: "asc",
    }),
  })
  if (!response.ok) {
    throw new Error(`IME CDC failed: ${response.status}`)
  }
  const body = (await response.json()) as ImeCdcBody
  if (body.Success === false) {
    throw new Error("IME CDC returned Success=false")
  }
  return mapImeRows(body.Data ?? [])
}

export async function fetchImeSilverMarket(): Promise<MarketPair> {
  try {
    const candles = await fetchImeSilverChart()
    const last = candles[candles.length - 1]
    const prev = candles[candles.length - 2]
    const latest = last?.close ?? 0
    return {
      ...IME_SILVER_MARKET,
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
  } catch {
    return IME_SILVER_MARKET
  }
}
