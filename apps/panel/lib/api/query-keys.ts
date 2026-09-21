export const queryKeys = {
  marketPulse: {
    all: ["market-pulse"] as const,
    markets: () => [...queryKeys.marketPulse.all, "markets"] as const,
    marketFlow: () => [...queryKeys.marketPulse.all, "market-flow"] as const,
    alerts: () => [...queryKeys.marketPulse.all, "alerts"] as const,
    chart: (symbol: string, timeframe: string) =>
      [...queryKeys.marketPulse.all, "chart", symbol, timeframe] as const,
  },
}
