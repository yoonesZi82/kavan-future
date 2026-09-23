import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "تماس با ما",
  description: "راه‌های ارتباطی با تیم آگاه پرداز پارس.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <PlaceholderLayout
      title="تماس با ما"
      description="به‌زودی فرم تماس، شماره پشتیبانی، آدرس دفتر و سایر کانال‌های ارتباطی در این صفحه فعال خواهد شد."
    />
  )
}
