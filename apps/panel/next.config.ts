import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@workspace/ui", "lightweight-charts-drawing"],
}

export default nextConfig
