import { createMetadata } from "@/lib/seo/create-metadata"
import { MarketPulseGrid } from "@/features/market-pulse/market-pulse-grid"

export const metadata = createMetadata({
  title: "نبض بازار",
  description:
    "نمودار زنده بازار، واچ‌لیست، جریان نقدینگی و هشدارهای معاملاتی در پنل آینده‌کاوان.",
  path: "/market-pulse",
  keywords: ["نبض بازار", "چارت", "بازار ارز", "واچ‌لیست", "آینده‌کاوان"],
})

export default function MarketPulsePage() {
  return <MarketPulseGrid />
}
