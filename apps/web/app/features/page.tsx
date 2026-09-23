import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "ویژگی‌ها",
  description: "کلیه ویژگی‌ها و قابلیت‌های آگاه پرداز پارس.",
  path: "/features",
})

export default function FeaturesPage() {
  return (
    <PlaceholderLayout
      title="همه ویژگی‌ها"
      description="در این صفحه به‌زودی معرفی کامل و جزئیات کلیه قابلیت‌های پلتفرم آگاه پرداز پارس را مشاهده خواهید کرد."
    />
  )
}
