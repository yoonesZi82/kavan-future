import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "وبلاگ",
  description: "مقالات و مطالب آموزشی آگاه پرداز پارس.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <PlaceholderLayout
      title="وبلاگ و مقالات"
      description="مقالات آموزشی، تحلیل‌های بازار، راهنمای سرمایه‌گذاری و اخبار صنعت در این بخش منتشر خواهد شد."
    />
  )
}
