import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "سوالات متداول",
  description: "پاسخ به سوالات رایج کاربران.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <PlaceholderLayout
      title="سوالات متداول"
      description="پاسخ به بیش از ۱۰۰ سوال رایج درباره ثبت‌نام، استفاده از پلتفرم، حساب کاربری، طرح‌های اشتراک و موارد دیگر."
    />
  )
}
