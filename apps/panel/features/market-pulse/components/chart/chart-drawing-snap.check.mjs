import assert from "node:assert/strict"

function snapAnchorToCandle(anchor, candles, enabled) {
  if (!enabled || !candles?.length) return anchor
  const time =
    typeof anchor.time === "number" ? anchor.time : Number(anchor.time)
  if (!Number.isFinite(time)) return anchor
  let nearest = candles[0]
  let bestDistance = Math.abs(nearest.time - time)
  for (let i = 1; i < candles.length; i += 1) {
    const candle = candles[i]
    const distance = Math.abs(candle.time - time)
    if (distance < bestDistance) {
      nearest = candle
      bestDistance = distance
    }
  }
  const levels = [nearest.open, nearest.high, nearest.low, nearest.close]
  let snappedPrice = levels[0]
  let bestPriceDistance = Math.abs(snappedPrice - anchor.price)
  for (const level of levels) {
    const distance = Math.abs(level - anchor.price)
    if (distance < bestPriceDistance) {
      snappedPrice = level
      bestPriceDistance = distance
    }
  }
  return { time: nearest.time, price: snappedPrice }
}

const candles = [
  { time: 100, open: 10, high: 12, low: 9, close: 11 },
  { time: 200, open: 11, high: 15, low: 10, close: 14 },
]
const snapped = snapAnchorToCandle({ time: 195, price: 14.8 }, candles, true)
assert.equal(snapped.time, 200)
assert.equal(snapped.price, 15)
console.log("chart-drawing-snap: ok")
