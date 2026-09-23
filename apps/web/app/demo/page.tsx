import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "دمو معرفی",
  description: "ویدیوی معرفی و دمو کار با آگاه پرداز پارس.",
  path: "/demo",
})

export default function DemoPage() {
  return (
    <PlaceholderLayout
      title="دمو و آموزش"
      description="ویدیوهای آموزشی کار با پلتفرم، معرفی قابلیت‌ها و راهنمای قدم‌به‌قدم استفاده از ابزارها، به‌زودی در این بخش قرار می‌گیرد."
    />
  )
}
