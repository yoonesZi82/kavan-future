import { PlaceholderLayout } from "@/components/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "ثبت‌نام",
  description: "ساخت حساب کاربری در آگاه پرداز پارس.",
  path: "/register",
  noIndex: true,
})

export default function RegisterPage() {
  return (
    <PlaceholderLayout
      title="صفحه ثبت‌نام"
      description="به‌زودی می‌توانید به‌صورت رایگان در پلتفرم آگاه پرداز پارس ثبت‌نام کنید و از امکانات آن استفاده نمایید."
    />
  )
}
