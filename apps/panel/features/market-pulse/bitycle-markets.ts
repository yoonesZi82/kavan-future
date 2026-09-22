import type { ChartTimeframe, MarketPair } from "@/features/market-pulse/types"

export type BitycleMarketConfig = {
  id: string
  src: string
  dst: string
  nameFa: string
  symbol: string
  ohlcSymbol: string
  /** History `source` query param for widget_data. */
  source: string
  /** Live WS `source` (defaults to `source`). */
  liveSource: string
  timeframes: readonly string[]
  fallbackTimeframe: string
}

export const BITYCLE_MARKETS: readonly BitycleMarketConfig[] = [
  {
    id: "btc-usdt",
    src: "btc",
    dst: "usdt",
    nameFa: "بیت‌کوین",
    symbol: "BTC/USDT",
    ohlcSymbol: "BTCUSDT",
    source: "binance_spot",
    liveSource: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "eth-usdt",
    src: "eth",
    dst: "usdt",
    nameFa: "اتریوم",
    symbol: "ETH/USDT",
    ohlcSymbol: "ETHUSDT",
    source: "binance_spot",
    liveSource: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "gold18-irt",
    src: "gold18",
    dst: "rls",
    nameFa: "طلا ۱۸ عیار",
    symbol: "طلا۱۸/IRT",
    ohlcSymbol: "GOLD18IRT",
    source: "brs",
    liveSource: "tehran_cgf",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "xau-usd",
    src: "xau",
    dst: "usdt",
    nameFa: "انس طلا",
    symbol: "انس‌طلا/USD",
    ohlcSymbol: "XAUUSD",
    source: "alpari",
    liveSource: "alpari",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "xag-usd",
    src: "xag",
    dst: "usdt",
    nameFa: "انس نقره",
    symbol: "انس‌نقره/USD",
    ohlcSymbol: "XAGUSD",
    source: "alpari",
    liveSource: "alpari",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "usdt-rls",
    src: "usdt",
    dst: "rls",
    nameFa: "تتر",
    symbol: "USDT/IRT",
    ohlcSymbol: "USDTIRT",
    source: "nobitex_spot",
    liveSource: "nobitex_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1h",
  },
]

const BY_OHLC = new Map(
  BITYCLE_MARKETS.map((market) => [market.ohlcSymbol, market])
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

export function getBitycleMarket(
  ohlcSymbol: string
): BitycleMarketConfig | undefined {
  return BY_OHLC.get(ohlcSymbol.toUpperCase())
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

export function emptyMarketPair(config: BitycleMarketConfig): MarketPair {
  return {
    id: config.id,
    src: config.src,
    dst: config.dst,
    nameFa: config.nameFa,
    symbol: config.symbol,
    ohlcSymbol: config.ohlcSymbol,
    latest: 0,
    dayChange: 0,
    dayHigh: 0,
    dayLow: 0,
    dayOpen: 0,
    dayClose: 0,
    bestBuy: 0,
    bestSell: 0,
    isClosed: false,
    provider: "bitycle",
  }
}
