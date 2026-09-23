import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "تحلیل‌ها",
  description: "صفحه تحلیل‌ها به زودی راه‌اندازی می‌شود.",
  path: "/analyses",
})

export default function AnalysesPage() {
  return (
    <PlaceholderLayout
      title="صفحه تحلیل‌ها"
      description="در این صفحه به‌زودی تحلیل‌های روزانه بازار، گزارش‌های تخصصی و بینش‌های عمقی در اختیار شما قرار می‌گیرد."
    />
  )
}
