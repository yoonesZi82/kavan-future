import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "گزارش خطا",
  description: "گزارش مشکلات و خطاهای فنی.",
  path: "/report",
  noIndex: true,
})

export default function ReportPage() {
  return (
    <PlaceholderLayout
      title="گزارش خطا و پیشنهاد"
      description="به‌زودی فرم گزارش مشکلات فنی، پیشنهادات و درخواست‌های ویژگی جدید در این صفحه قرار داده خواهد شد."
    />
  )
}
