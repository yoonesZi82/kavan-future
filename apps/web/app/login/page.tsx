import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "ورود به حساب کاربری",
  description: "ورود به پنل کاربری آگاه پرداز پارس.",
  path: "/login",
  noIndex: true,
})

export default function LoginPage() {
  return (
    <PlaceholderLayout
      title="صفحه ورود"
      description="صفحه احراز هویت و ورود به حساب کاربری به‌زودی راه‌اندازی می‌شود. در ضمن می‌توانید از صفحه اصلی استفاده کنید."
    />
  )
}
