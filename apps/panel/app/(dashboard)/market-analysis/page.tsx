import { createMetadata } from "@/lib/seo/create-metadata"
import { MarketAnalysisGrid } from "@/features/market-analysis/market-analysis-grid"

// * Market analysis dashboard — UI shell; charts reuse market-pulse + Chart.js
export const metadata = createMetadata({
  title: "تحلیل بازار",
  description:
    "چارت تکنیکال، بازدهی دارایی‌ها، هشدارهای تصمیم‌گیری و تحلیل دارایی در پنل آینده‌کاوان.",
  path: "/market-analysis",
  keywords: [
    "تحلیل بازار",
    "چارت",
    "بازدهی دارایی",
    "هشدار معاملاتی",
    "آینده‌کاوان",
  ],
})

export default function MarketAnalysisPage() {
  return <MarketAnalysisGrid />
}
