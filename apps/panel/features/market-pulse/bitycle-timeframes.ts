import {
  getBitycleMarket,
  type BitycleMarketConfig,
} from "@/features/market-pulse/bitycle-markets"
import type { ChartTimeframe } from "@/features/market-pulse/types"

const TF_TO_BITYCLE: Record<ChartTimeframe, string> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "4h": "4h",
  "1D": "1d",
  "1W": "1w",
  All: "1w",
}

const BITYCLE_TO_CHART: Record<string, ChartTimeframe> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "4h": "4h",
  "1d": "1D",
  "1w": "1W",
}

export function resolveBitycleTimeframe(
  config: BitycleMarketConfig,
  timeframe: ChartTimeframe
): string {
  const mapped = TF_TO_BITYCLE[timeframe]
  if (config.timeframes.includes(mapped)) return mapped
  return config.fallbackTimeframe
}

export function chartTimeframeToBitycle(timeframe: ChartTimeframe): string {
  return TF_TO_BITYCLE[timeframe]
}

export function getMarketChartTimeframes(
  ohlcSymbol: string
): ChartTimeframe[] {
  const upper = ohlcSymbol.toUpperCase()
  if (upper === "TSEINDEX") return []
  if (upper === "IMESILVER") return ["1D"]
  const config = getBitycleMarket(ohlcSymbol)
  if (!config) return ["1h"]
  const values = config.timeframes
    .map((tf) => BITYCLE_TO_CHART[tf])
    .filter((tf): tf is ChartTimeframe => Boolean(tf))
  if (config.timeframes.includes("1w") && !values.includes("All")) {
    values.push("All")
  }
  return values
}
