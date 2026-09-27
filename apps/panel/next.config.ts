import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: [
    "@workspace/ui",
    "@workspace/chart",
    "lightweight-charts-drawing",
  ],
  // * Same-origin proxies — browser must not call upstream (CORS on deploy)
  async rewrites() {
    return [
      {
        source: "/api/market-chart",
        destination:
          "https://widget-data.bitycle.com/c1/api/exchange/widget_data",
      },
      {
        source: "/api/market-flow",
        destination: "https://tradersarena.ir/data/market0",
      },
      {
        source: "/api/tsetmc-overview",
        destination:
          "https://cdn.tsetmc.com/api/MarketData/GetMarketOverview/1",
      },
      {
        source: "/api/ime-cdc",
        destination: "https://dataapi.ime.co.ir/api/CDC/CDCTrades",
      },
    ]
  },
}

export default nextConfig
