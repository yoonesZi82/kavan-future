"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"
import { BRAND_NAME } from "@/lib/brand"
import { AuthVisualPanel } from "@/components/auth/auth-visual-panel"

type AuthShellProps = {
  mode: "login" | "register"
  children: React.ReactNode
}

const COPY = {
  login: {
    headline: "با یک نگاه، تصویر کامل بازار",
    subline:
      "ورود به فضای تصمیم‌سازی؛ قیمت لحظه‌ای، ساختار، سناریو و هشدار در یک پنل.",
  },
  register: {
    headline: "از امروز، تصمیم‌های دقیق‌تر",
    subline:
      "ثبت‌نام رایگان؛ دسترسی به داشبورد، تحلیل دارایی و هشدارهای تصمیم‌گیری.",
  },
} as const

export function AuthShell({ mode, children }: AuthShellProps) {
  const copy = COPY[mode]

  return (
    <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <AuthVisualPanel headline={copy.headline} subline={copy.subline} />

      <div className="relative flex min-h-svh flex-col justify-center px-5 py-10 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent)] lg:bg-none"
        />

        <div className="mb-8 flex items-center lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <TrendingUp className="size-4" />
            </span>
            <span className="text-sm font-bold">{BRAND_NAME}</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[400px]"
        >
          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-lg ring-1 ring-foreground/5 backdrop-blur-sm sm:p-8">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowRight className="size-3.5" />
              بازگشت به خانه
            </Link>
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
