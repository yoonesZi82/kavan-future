import type { CandlePoint } from "./types"

/** Deterministic demo OHLC series for marketing surfaces (no network). */
export function createDemoCandles(count = 120): CandlePoint[] {
  const candles: CandlePoint[] = []
  let price = 64_200
  const now = Math.floor(Date.now() / 1000)
  const step = 3600

  for (let i = 0; i < count; i += 1) {
    const drift = Math.sin(i / 9) * 180 + Math.cos(i / 4) * 90
    const open = price
    const close = Math.max(1_000, open + drift + ((i % 7) - 3) * 35)
    const high = Math.max(open, close) + 80 + (i % 5) * 12
    const low = Math.min(open, close) - 70 - (i % 4) * 10
    const volume = 800 + (i % 11) * 120 + Math.abs(Math.round(drift))
    candles.push({
      time: now - (count - i) * step,
      open: roundPrice(open),
      high: roundPrice(high),
      low: roundPrice(low),
      close: roundPrice(close),
      volume,
    })
    price = close
  }

  return candles
}

function roundPrice(value: number): number {
  return Math.round(value * 100) / 100
}
