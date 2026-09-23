import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "مستندات",
  description: "راهنمای استفاده از پلتفرم آگاه پرداز پارس.",
  path: "/docs",
})

export default function DocsPage() {
  return (
    <PlaceholderLayout
      title="مستندات و راهنما"
      description="راهنمای کامل استفاده از پلتفرم، توضیح قابلیت‌ها، APIها و پاسخ به سوالات متداول فنی."
    />
  )
}
