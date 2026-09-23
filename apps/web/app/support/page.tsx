import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "پشتیبانی",
  description: "پشتیبانی کاربران آگاه پرداز پارس.",
  path: "/support",
  noIndex: true,
})

export default function SupportPage() {
  return (
    <PlaceholderLayout
      title="مرکز پشتیبانی"
      description="تیکتینگ پشتیبانی، چت آنلاین، تماس تلفنی و راهنماهای رفع اشکال به‌زودی در این صفحه فعال خواهد شد."
    />
  )
}
