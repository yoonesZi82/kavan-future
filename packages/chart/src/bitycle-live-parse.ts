import type { CandlePoint } from "./types"

type LiveCandleTuple = [number, number, number, number, number, number, number]

export type BitycleMpMessage = {
  type: "mp"
  d: { p: number; s: string }
}

export type BitycleMdMessage = {
  type: "md"
  d: { c: LiveCandleTuple; s: string; t: string }
}

export function isMpMessage(value: unknown): value is BitycleMpMessage {
  if (!value || typeof value !== "object") return false
  const row = value as { type?: unknown; d?: unknown }
  if (row.type !== "mp" || !row.d || typeof row.d !== "object") return false
  const data = row.d as { s?: unknown; p?: unknown }
  return typeof data.s === "string" && typeof data.p === "number"
}

export function isMdMessage(value: unknown): value is BitycleMdMessage {
  if (!value || typeof value !== "object") return false
  const row = value as { type?: unknown; d?: unknown }
  if (row.type !== "md" || !row.d || typeof row.d !== "object") return false
  const data = row.d as { s?: unknown; t?: unknown; c?: unknown }
  return (
    typeof data.s === "string" &&
    typeof data.t === "string" &&
    Array.isArray(data.c) &&
    data.c.length >= 6
  )
}

export function candleFromTuple(tuple: LiveCandleTuple): CandlePoint {
  return {
    time: tuple[0],
    open: tuple[1],
    high: tuple[2],
    low: tuple[3],
    close: tuple[4],
    volume: tuple[5] ?? 0,
  }
}

export function mergeLiveCandle(
  candles: CandlePoint[],
  live: CandlePoint
): CandlePoint[] {
  if (!candles.length) return [live]
  const last = candles[candles.length - 1]
  if (!last) return [live]
  if (live.time === last.time) return [...candles.slice(0, -1), live]
  if (live.time > last.time) return [...candles, live]
  return candles
}
