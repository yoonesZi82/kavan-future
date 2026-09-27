import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: [
    "@workspace/ui",
    "@workspace/chart",
    "lightweight-charts-drawing",
  ],
  // * Marketing chart: same-origin proxy → Bitycle (avoids browser CORS)
  async rewrites() {
    return [
      {
        source: "/api/market-chart",
        destination:
          "https://widget-data.bitycle.com/c1/api/exchange/widget_data",
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
