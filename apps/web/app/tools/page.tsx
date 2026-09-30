import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "ابزارها",
  description: "صفحه ابزارها به زودی راه‌اندازی می‌شود.",
  path: "/tools",
})

export default function ToolsPage() {
  return (
    <PlaceholderLayout
      title="صفحه ابزارها"
      description="ابزارهای تخصصی تحلیل بازار، ماشین حساب‌های مالی، شبیه‌سازها و ابزارهای سبدسازی به‌زودی در این بخش فعال می‌شوند."
    />
  )
}
