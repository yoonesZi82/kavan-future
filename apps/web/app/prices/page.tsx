import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "قیمت‌ها",
  description: "صفحه قیمت‌ها به زودی راه‌اندازی می‌شود.",
  path: "/prices",
})

export default function PricesPage() {
  return (
    <PlaceholderLayout
      title="صفحه قیمت‌ها"
      description="قیمت‌های لحظه‌ای ارزها، طلا، سکه، سهام و رمزارزها همراه با نمودارهای تعاملی و هشدارهای قیمت، به‌زودی در این صفحه."
    />
  )
}
