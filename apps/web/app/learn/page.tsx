import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "آموزش‌ها",
  description: "مطالب و دوره‌های آموزشی آگاه پرداز پارس.",
  path: "/learn",
})

export default function LearnPage() {
  return (
    <PlaceholderLayout
      title="آکادمی آموزش"
      description="دوره‌های ویدئویی، راهنماهای قدم‌به‌قدم و محتوای آموزشی برای تسلط بر ابزارها و مفاهیم مالی بازار."
    />
  )
}
