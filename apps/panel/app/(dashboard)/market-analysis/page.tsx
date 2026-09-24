import { createMetadata } from "@/lib/seo/create-metadata"
import { MarketAnalysisGrid } from "@/features/market-analysis/market-analysis-grid"

// * Market analysis dashboard — mock UI matching product design; API later
export const metadata = createMetadata({
  title: "تحلیل بازار",
  description:
    "چارت تکنیکال، سیگنال اصلی، بازدهی دارایی‌ها، هشدارها و جزئیات تحلیل در پنل آینده‌کاوان.",
  path: "/market-analysis",
  keywords: [
    "تحلیل بازار",
    "چارت",
    "سیگنال",
    "بازدهی دارایی",
    "هشدار معاملاتی",
    "آینده‌کاوان",
  ],
})

export default function MarketAnalysisPage() {
  return <MarketAnalysisGrid />
}
