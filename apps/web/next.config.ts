import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@workspace/ui"],
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
