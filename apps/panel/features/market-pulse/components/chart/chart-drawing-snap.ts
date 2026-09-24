import type { IChartApi, ISeriesApi, SeriesType, Time } from "lightweight-charts"
import type { Anchor } from "lightweight-charts-drawing"
import type { CandlePoint } from "@/features/market-pulse/types"

export function pointToAnchor(
  chart: IChartApi,
  series: ISeriesApi<SeriesType>,
  point: { x: number; y: number },
  time: Time | undefined
): Anchor | null {
  const resolvedTime = time ?? chart.timeScale().coordinateToTime(point.x)
  const price = series.coordinateToPrice(point.y)
  if (resolvedTime === null || price === null) return null
  return { time: resolvedTime, price }
}

/** Snap price to nearest OHLC of the candle closest to `anchor.time`. */
export function snapAnchorToCandle(
  anchor: Anchor,
  candles: CandlePoint[] | undefined,
  enabled: boolean
): Anchor {
  if (!enabled || !candles?.length) return anchor
  const time =
    typeof anchor.time === "number" ? anchor.time : Number(anchor.time)
  if (!Number.isFinite(time)) return anchor
  let nearest = candles[0]
  if (!nearest) return anchor
  let bestDistance = Math.abs(nearest.time - time)
  for (let i = 1; i < candles.length; i += 1) {
    const candle = candles[i]
    if (!candle) continue
    const distance = Math.abs(candle.time - time)
    if (distance < bestDistance) {
      nearest = candle
      bestDistance = distance
    }
  }
  const levels = [nearest.open, nearest.high, nearest.low, nearest.close]
  let snappedPrice = levels[0] ?? anchor.price
  let bestPriceDistance = Math.abs(snappedPrice - anchor.price)
  for (const level of levels) {
    const distance = Math.abs(level - anchor.price)
    if (distance < bestPriceDistance) {
      snappedPrice = level
      bestPriceDistance = distance
    }
  }
  return { time: nearest.time as Time, price: snappedPrice }
}
