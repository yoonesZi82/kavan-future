export type TickerSnapshot = {
  id: string
  latest: number
  dayChange: number
  changePercent: number
}

/** Keep day-change basis when a live tick updates last price. */
export function withLivePrice(
  snapshot: TickerSnapshot,
  price: number
): TickerSnapshot {
  const basis = snapshot.latest - snapshot.dayChange
  const dayChange = price - basis
  const changePercent = basis !== 0 ? (dayChange / basis) * 100 : 0
  return { ...snapshot, latest: price, dayChange, changePercent }
}

export function formatTickerPrice(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "—"
  const digits = value >= 1000 ? 0 : value >= 10 ? 2 : 4
  return value.toLocaleString("fa-IR", { maximumFractionDigits: digits })
}

export function formatTickerPercent(value: number): string {
  if (!Number.isFinite(value)) return "—"
  const sign = value > 0 ? "+" : value < 0 ? "−" : ""
  const abs = Math.abs(value).toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return `${sign}${abs}٪`
}
