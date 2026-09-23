import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "درباره ما",
  description: "آشنایی با تیم و داستان آگاه پرداز پارس.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <PlaceholderLayout
      title="درباره ما"
      description="آگاه پرداز پارس با هدف دستیابی به ابزارهای تصمیم‌گیری مالی مدرن و در دسترس برای همه سرمایه‌گذاران ایرانی، شکل گرفته است."
    />
  )
}
