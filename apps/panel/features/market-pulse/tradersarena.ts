import { tradersarenaClient } from "@/lib/tradersarena/client"
import type { MarketFlowItem } from "@/features/market-pulse/types"

/** Raw tuple from https://tradersarena.ir/data/mainwatch/symbols */
type RawSymbolRow = (string | number)[]

// * Index map for tradersarena mainwatch symbols rows
const COL = {
  id: 0,
  name: 2,
  volume: 3,
  tradeValue: 4,
  buyPerCapita: 9,
  sellPerCapita: 10,
  buyPower: 11,
  moneyInflow: 12,
} as const

function asNumber(value: string | number | undefined): number {
  return typeof value === "number" ? value : Number(value) || 0
}

function formatCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? "−" : ""
  const body =
    abs >= 1e12
      ? `${(abs / 1e12).toFixed(2)}T`
      : abs >= 1e9
        ? `${(abs / 1e9).toFixed(2)}B`
        : abs >= 1e6
          ? `${(abs / 1e6).toFixed(2)}M`
          : abs.toLocaleString("en-US", { maximumFractionDigits: 2 })
  return `${sign}${body}`
}

function mapSymbolRow(row: RawSymbolRow): MarketFlowItem | null {
  const id = row[COL.id]
  const name = row[COL.name]
  if (id == null || name == null) return null
  return {
    id: String(id),
    symbol: String(name),
    volume: formatCompact(asNumber(row[COL.volume])),
    tradeValue: formatCompact(asNumber(row[COL.tradeValue])),
    moneyInflow: asNumber(row[COL.moneyInflow]),
    moneyInflowLabel: formatCompact(asNumber(row[COL.moneyInflow])),
    buyPerCapita: formatCompact(asNumber(row[COL.buyPerCapita])),
    sellPerCapita: formatCompact(asNumber(row[COL.sellPerCapita])),
    buyPower: asNumber(row[COL.buyPower]),
  }
}

export async function fetchTradersArenaSymbols(): Promise<MarketFlowItem[]> {
  const { data } = await tradersarenaClient.get<RawSymbolRow[]>(
    "/data/mainwatch/symbols"
  )
  if (!Array.isArray(data)) return []
  return data
    .map(mapSymbolRow)
    .filter((row): row is MarketFlowItem => row !== null)
}
