import type { ChartTimeframe } from "./types"
import { PANEL_CHART_TIMEFRAMES } from "./chart-options"

export type MarketingMarketConfig = {
  id: string
  nameFa: string
  symbol: string
  ohlcSymbol: string
  source: string
  timeframes: readonly string[]
  fallbackTimeframe: string
}

/** Same Bitycle markets as panel watchlist (chartable symbols). */
export const MARKETING_MARKETS: readonly MarketingMarketConfig[] = [
  {
    id: "btc-usdt",
    nameFa: "بیت‌کوین",
    symbol: "BTC/USDT",
    ohlcSymbol: "BTCUSDT",
    source: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "eth-usdt",
    nameFa: "اتریوم",
    symbol: "ETH/USDT",
    ohlcSymbol: "ETHUSDT",
    source: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "gold18-irt",
    nameFa: "طلا ۱۸ عیار",
    symbol: "طلا۱۸/IRT",
    ohlcSymbol: "GOLD18IRT",
    source: "brs",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "xau-usd",
    nameFa: "انس طلا",
    symbol: "انس‌طلا/USD",
    ohlcSymbol: "XAUUSD",
    source: "alpari",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "xag-usd",
    nameFa: "انس نقره",
    symbol: "انس‌نقره/USD",
    ohlcSymbol: "XAGUSD",
    source: "alpari",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "usdt-rls",
    nameFa: "تتر",
    symbol: "USDT/IRT",
    ohlcSymbol: "USDTIRT",
    source: "nobitex_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1h",
  },
  {
    id: "sekke-emami",
    nameFa: "سکه امامی",
    symbol: "سکه‌امامی/IRT",
    ohlcSymbol: "IRCOINEMIRT",
    source: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "rob-sekke",
    nameFa: "ربع سکه",
    symbol: "ربع‌سکه/IRT",
    ohlcSymbol: "IRCOINROBIRT",
    source: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "trx-usdt",
    nameFa: "ترون",
    symbol: "TRX/USDT",
    ohlcSymbol: "TRXUSDT",
    source: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "nim-sekke",
    nameFa: "نیم سکه",
    symbol: "نیم‌سکه/IRT",
    ohlcSymbol: "IRCOINNIMIRT",
    source: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "gold24-irt",
    nameFa: "طلا ۲۴ عیار",
    symbol: "طلا۲۴/IRT",
    ohlcSymbol: "GOLD24IRT",
    source: "brs",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
]

const BY_OHLC = new Map(
  MARKETING_MARKETS.map((market) => [market.ohlcSymbol, market])
)

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

export function getMarketingMarket(
  ohlcSymbol: string
): MarketingMarketConfig | undefined {
  return BY_OHLC.get(ohlcSymbol.toUpperCase())
}

export function resolveMarketingTimeframe(
  config: MarketingMarketConfig,
  timeframe: ChartTimeframe
): string {
  const mapped = TF_TO_BITYCLE[timeframe]
  if (config.timeframes.includes(mapped)) return mapped
  return config.fallbackTimeframe
}

export function getMarketingTimeframes(ohlcSymbol: string): ChartTimeframe[] {
  const config = getMarketingMarket(ohlcSymbol)
  if (!config) return [...PANEL_CHART_TIMEFRAMES]
  const supported = new Set(
    config.timeframes
      .map((tf) => BITYCLE_TO_CHART[tf])
      .filter((tf): tf is ChartTimeframe => Boolean(tf))
  )
  // * Marketing hero: only 1h / 4h / 1D / 1W (same as panel chart)
  return PANEL_CHART_TIMEFRAMES.filter((tf) => supported.has(tf))
}
