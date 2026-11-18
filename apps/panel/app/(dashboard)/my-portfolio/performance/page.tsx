import { createMetadata } from "@/lib/seo/create-metadata"
import { DollarPerformanceGrid } from "@/features/my-portfolio/dollar-performance/dollar-performance-grid"

// * Dollar performance analytics — mock until portfolio performance API
export const metadata = createMetadata({
  title: "عملکرد دلاری سبد",
  description:
    "نمودار عملکرد دلاری سبد، سطوح کلیدی، ریسک و مقایسه با دارایی‌های مرجع در پنل آینده‌کاوان.",
  path: "/my-portfolio/performance",
  keywords: [
    "عملکرد سبد",
    "عملکرد دلاری",
    "پرتفوی",
    "سبد من",
    "آینده‌کاوان",
  ],
  noIndex: true,
})

export default function PortfolioPerformancePage() {
  return <DollarPerformanceGrid />
}
