import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "lightweight-charts-drawing"],
}

export default nextConfig
