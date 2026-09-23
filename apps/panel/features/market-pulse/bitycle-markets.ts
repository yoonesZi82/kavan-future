import type { MarketPair } from "@/features/market-pulse/types"

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
  {
    id: "sekke-emami",
    src: "emami",
    dst: "rls",
    nameFa: "سکه امامی",
    symbol: "سکه‌امامی/IRT",
    ohlcSymbol: "IRCOINEMIRT",
    source: "bst",
    liveSource: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "rob-sekke",
    src: "rob",
    dst: "rls",
    nameFa: "ربع سکه",
    symbol: "ربع‌سکه/IRT",
    ohlcSymbol: "IRCOINROBIRT",
    source: "bst",
    liveSource: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "trx-usdt",
    src: "trx",
    dst: "usdt",
    nameFa: "ترون",
    symbol: "TRX/USDT",
    ohlcSymbol: "TRXUSDT",
    source: "binance_spot",
    liveSource: "binance_spot",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "nim-sekke",
    src: "nim",
    dst: "rls",
    nameFa: "نیم سکه",
    symbol: "نیم‌سکه/IRT",
    ohlcSymbol: "IRCOINNIMIRT",
    source: "bst",
    liveSource: "bst",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
  {
    id: "gold24-irt",
    src: "gold24",
    dst: "rls",
    nameFa: "طلا ۲۴ عیار",
    symbol: "طلا۲۴/IRT",
    ohlcSymbol: "GOLD24IRT",
    source: "brs",
    liveSource: "tehran_cgf",
    timeframes: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
    fallbackTimeframe: "1d",
  },
]

const BY_OHLC = new Map(
  BITYCLE_MARKETS.map((market) => [market.ohlcSymbol, market])
)

export function getBitycleMarket(
  ohlcSymbol: string
): BitycleMarketConfig | undefined {
  return BY_OHLC.get(ohlcSymbol.toUpperCase())
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
