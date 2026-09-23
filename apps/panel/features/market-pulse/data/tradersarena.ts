import { tradersarenaClient } from "@/lib/tradersarena/client"
import type { MarketFlowItem } from "@/features/market-pulse/types"

/**
 * * market0 group rows — keys and labels reverse-engineered from
 * * tradersarena.ir product JS (indices 0–5 = volume…money inflow).
 * @see https://tradersarena.ir/data/market0
 */
const MARKET_GROUPS = [
  { key: "m", label: "بازار" },
  { key: "afl", label: "سهام، حق تقدم و ص.سهامی" },
  { key: "st", label: "سهام و حق تقدم" },
  { key: "sf", label: "صندوق سهامی و مختلط" },
  { key: "nsf", label: "صندوق درآمد ثابت" },
  { key: "lf", label: "صندوق اهرمی" },
  { key: "cf", label: "صندوق طلا" },
  { key: "scf", label: "صندوق نقره" },
  { key: "b", label: "پنجاه شرکت بزرگ" },
] as const

type Market0Response = Record<string, unknown>

const COL = {
  volume: 0,
  tradeValue: 1,
  buyPerCapita: 2,
  sellPerCapita: 3,
  buyPower: 4,
  moneyInflow: 5,
} as const

function asNumber(value: unknown): number {
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

function mapGroupRow(
  key: string,
  label: string,
  row: unknown
): MarketFlowItem | null {
  if (!Array.isArray(row) || row.length < 6) return null
  const moneyInflow = asNumber(row[COL.moneyInflow])
  return {
    id: key,
    symbol: label,
    volume: formatCompact(asNumber(row[COL.volume])),
    tradeValue: formatCompact(asNumber(row[COL.tradeValue])),
    moneyInflow,
    moneyInflowLabel: formatCompact(moneyInflow),
    buyPerCapita: formatCompact(asNumber(row[COL.buyPerCapita])),
    sellPerCapita: formatCompact(asNumber(row[COL.sellPerCapita])),
    buyPower: asNumber(row[COL.buyPower]),
  }
}

/** Market flow by fund/group buckets from tradersarena market0. */
export async function fetchTradersArenaMarket0(): Promise<MarketFlowItem[]> {
  const { data } = await tradersarenaClient.get<Market0Response>("/data/market0")
  if (!data || typeof data !== "object") return []
  return MARKET_GROUPS.map(({ key, label }) =>
    mapGroupRow(key, label, data[key])
  ).filter((row): row is MarketFlowItem => row !== null)
}
