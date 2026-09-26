import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: [
    "@workspace/ui",
    "@workspace/chart",
    "lightweight-charts-drawing",
  ],
}

export default nextConfig
