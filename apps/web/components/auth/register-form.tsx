"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

const PANEL_URL = "https://kavan-panel-gamma.vercel.app/market-pulse/"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    window.setTimeout(() => setStatus("done"), 1100)
  }

  return (
    <div>
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold text-primary">ساخت حساب</p>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          شروع رایگان
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">نام و نام خانوادگی</span>
          <span className="relative">
            <User className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              required
              value={name}
              onValueChange={setName}
              className="h-11 ps-10"
              placeholder="مثلاً محمد رضایی"
              autoComplete="name"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">ایمیل</span>
          <span className="relative">
            <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              required
              value={email}
              onValueChange={setEmail}
              className="h-11 ps-10"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">رمز عبور</span>
          <span className="relative">
            <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onValueChange={setPassword}
              className="h-11 ps-10 pe-10"
              placeholder="حداقل ۶ کاراکتر"
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </span>
        </label>

        <p className="text-[11px] leading-5 text-muted-foreground">
          با ادامه، شرایط استفاده و حریم خصوصی را می‌پذیرید. (دمو — بدون ذخیره
          واقعی داده)
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-11 w-full cursor-pointer rounded-xl bg-gain text-white hover:bg-gain/90"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              در حال ساخت حساب...
            </>
          ) : (
            "ایجاد حساب آزمایشی"
          )}
        </Button>
      </form>

      <AnimatePresence>
        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-3 py-3 text-sm"
          >
            <p className="font-medium text-primary">حساب دمو آماده شد.</p>
            <Link
              href={PANEL_URL}
              className="mt-1 inline-block text-xs text-foreground underline-offset-4 hover:underline"
            >
              ورود به داشبورد →
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link
          href="/login"
          className={cn("font-medium text-primary hover:underline")}
        >
          وارد شوید
        </Link>
      </p>
    </div>
  )
}
