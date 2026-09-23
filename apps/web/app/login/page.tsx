import { createMetadata } from "@/lib/seo/create-metadata"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

// * Login demo UI — no real auth yet; full-bleed via SiteChrome
export const metadata = createMetadata({
  title: "ورود به حساب کاربری",
  description:
    "ورود به پنل تصمیم‌سازی مالی آگاه پرداز پارس — داشبورد، تحلیل بازار و هشدارهای هوشمند.",
  path: "/login",
  noIndex: true,
})

export default function LoginPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  )
}
