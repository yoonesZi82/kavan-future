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
        source: "/api/tsetmc-overview",
        destination:
          "https://cdn.tsetmc.com/api/MarketData/GetMarketOverview/1",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
