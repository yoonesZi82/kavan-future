"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

const PANEL_URL = "https://kavan-panel-gamma.vercel.app/market-pulse/"

export function LoginForm() {
  const [email, setEmail] = useState("demo@agahpardaz.ir")
  const [password, setPassword] = useState("demo1234")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    window.setTimeout(() => setStatus("done"), 900)
  }

  return (
    <div>
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold text-primary">ورود به حساب</p>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          خوش آمدید
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
          <span className="flex items-center justify-between font-medium">
            رمز عبور
            <button
              type="button"
              className="text-xs text-primary hover:underline"
            >
              فراموشی رمز؟
            </button>
          </span>
          <span className="relative">
            <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onValueChange={setPassword}
              className="h-11 ps-10 pe-10"
              autoComplete="current-password"
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

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="mt-1 h-11 w-full cursor-pointer rounded-xl bg-gain text-white hover:bg-gain/90"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              در حال ورود...
            </>
          ) : (
            "ورود به پنل"
          )}
        </Button>
      </form>

      <AnimatePresence>
        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-gain/30 bg-gain/10 px-3 py-3 text-sm"
          >
            <p className="font-medium text-gain">ورود دمو موفق بود.</p>
            <Link
              href={PANEL_URL}
              className="mt-1 inline-block text-xs text-foreground underline-offset-4 hover:underline"
            >
              مشاهده داشبورد زنده →
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        حساب ندارید؟{" "}
        <Link
          href="/register"
          className={cn("font-medium text-primary hover:underline")}
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  )
}
