import { createMetadata } from "@/lib/seo/create-metadata"
import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

// * Register demo UI — no real auth yet; full-bleed via SiteChrome
export const metadata = createMetadata({
  title: "ثبت‌نام",
  description:
    "ساخت حساب رایگان در آگاه پرداز پارس و دسترسی به داشبورد تحلیل و هشدارهای تصمیم‌گیری.",
  path: "/register",
  noIndex: true,
})

export default function RegisterPage() {
  return (
    <AuthShell mode="register">
      <RegisterForm />
    </AuthShell>
  )
}
