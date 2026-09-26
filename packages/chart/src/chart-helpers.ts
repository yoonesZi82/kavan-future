import type { CandlePoint } from "./types"
import type { RangeKey } from "./chart-options"
import { RANGE_SECONDS } from "./chart-options"

export function computeSma(
  data: CandlePoint[],
  period: number
): { time: number; value: number }[] {
  const result: { time: number; value: number }[] = []
  for (let i = 0; i < data.length; i += 1) {
    if (i + 1 < period) continue
    const point = data[i]
    if (!point) continue
    let sum = 0
    for (let j = i - period + 1; j <= i; j += 1) {
      const sample = data[j]
      if (!sample) continue
      sum += sample.close
    }
    result.push({ time: point.time, value: sum / period })
  }
  return result
}

export function getVisibleRange(
  data: CandlePoint[],
  range: RangeKey
): { from: number; to: number } | null {
  const first = data[0]
  const last = data[data.length - 1]
  if (!first || !last) return null
  const to = last.time
  if (range === "All") {
    return { from: first.time, to }
  }
  if (range === "YTD") {
    const date = new Date(to * 1000)
    const from = Math.floor(Date.UTC(date.getUTCFullYear(), 0, 1) / 1000)
    return { from: Math.max(from, first.time), to }
  }
  const seconds = RANGE_SECONDS[range]
  if (!seconds) return { from: first.time, to }
  return { from: Math.max(to - seconds, first.time), to }
}

export function getVisibleLogicalRange(
  data: CandlePoint[],
  range: RangeKey
): { from: number; to: number } | null {
  if (data.length < 2) return null
  const timeRange = getVisibleRange(data, range)
  if (!timeRange) return null
  let fromIndex = 0
  for (let i = 0; i < data.length; i += 1) {
    const point = data[i]
    if (point && point.time >= timeRange.from) {
      fromIndex = i
      break
    }
  }
  const toIndex = data.length - 1
  if (fromIndex >= toIndex) return null
  return { from: fromIndex, to: toIndex }
}

export function shiftSeries(
  data: CandlePoint[],
  ratio: number
): CandlePoint[] {
  return data.map((item) => ({
    ...item,
    open: item.open * ratio,
    high: item.high * ratio,
    low: item.low * ratio,
    close: item.close * ratio,
  }))
}
