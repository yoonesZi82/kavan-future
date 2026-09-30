import type { MarketTickerCardProps } from "@/components/market-ticker-card"

export type TickerTone = NonNullable<MarketTickerCardProps["tone"]>

export type BitycleTickerConfig = {
  id: string
  kind: "bitycle"
  label: string
  symbol: string
  tone: TickerTone
  ohlcSymbol: string
  /** History `source` for widget_data. */
  source: string
  /** Live WS `source` (may differ from history). */
  liveSource: string
  timeFrame: string
  unit?: string
}

export type TsetmcTickerConfig = {
  id: string
  kind: "tsetmc"
  label: string
  symbol: string
  tone: TickerTone
  unit?: string
}

export type TickerMarketConfig = BitycleTickerConfig | TsetmcTickerConfig

/** Home «نبض بازار» strip — Bitycle + TSETMC. */
export const TICKER_MARKETS: readonly TickerMarketConfig[] = [
  {
    id: "eth",
    kind: "bitycle",
    label: "اتریوم",
    symbol: "Ξ",
    tone: "blue",
    ohlcSymbol: "ETHUSDT",
    source: "binance_spot",
    liveSource: "binance_spot",
    timeFrame: "1d",
  },
  {
    id: "usdt",
    kind: "bitycle",
    label: "تتر",
    symbol: "T",
    tone: "green",
    ohlcSymbol: "USDTIRT",
    source: "nobitex_spot",
    liveSource: "nobitex_spot",
    timeFrame: "1h",
    unit: "تومان",
  },
  {
    id: "gold18",
    kind: "bitycle",
    label: "طلای ۱۸ عیار",
    symbol: "طلا",
    tone: "yellow",
    ohlcSymbol: "GOLD18IRT",
    source: "brs",
    liveSource: "tehran_cgf",
    timeFrame: "1d",
    unit: "تومان",
  },
  {
    id: "btc",
    kind: "bitycle",
    label: "بیت‌کوین",
    symbol: "₿",
    tone: "blue",
    ohlcSymbol: "BTCUSDT",
    source: "binance_spot",
    liveSource: "binance_spot",
    timeFrame: "1d",
  },
  {
    id: "sekke",
    kind: "bitycle",
    label: "سکه امامی",
    symbol: "سکه",
    tone: "red",
    ohlcSymbol: "IRCOINEMIRT",
    source: "bst",
    liveSource: "bst",
    timeFrame: "1d",
    unit: "تومان",
  },
  {
    id: "tse",
    kind: "tsetmc",
    label: "شاخص کل",
    symbol: "ش",
    tone: "teal",
  },
]

export function isBitycleTicker(
  market: TickerMarketConfig
): market is BitycleTickerConfig {
  return market.kind === "bitycle"
}
