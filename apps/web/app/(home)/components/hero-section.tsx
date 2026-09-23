"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, CircleCheck, PlayCircle } from "lucide-react"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_70%_0%,color-mix(in_oklab,var(--gain)_12%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold text-primary">
              دستیار تصمیم‌گیری مالی
            </p>
            <h1 className="text-3xl leading-[1.3] font-black tracking-tight sm:text-4xl lg:text-[42px]">
              قبل از تصمیم،
              <br />
              تصویر کامل بازار را ببینید
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">
              دسترسی به قیمت‌های لحظه‌ای، تحلیل هندسی قیمت، ساختار بازار،
              سناریوها و احتمال‌ها، پایش سبد دارایی و هشدارهای هوشمند در یک محیط
              یکپارچه.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="https://kavan-panel-gamma.vercel.app/market-pulse/"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-xl bg-gain px-6 text-sm font-semibold text-white hover:bg-gain/90"
                )}
              >
                مشاهده داشبورد
                <ArrowLeft data-icon="inline-end" />
              </Link>
              <Link
                href="/demo"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 gap-2 rounded-xl px-5 text-sm font-medium"
                )}
              >
                <PlayCircle data-icon="inline-start" className="text-gain" />
                آشنایی با روش تحلیل
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CircleCheck className="size-3.5 text-gain" />
                بدون نیاز به ثبت‌نام
              </span>
              <span className="flex items-center gap-1.5">
                <CircleCheck className="size-3.5 text-gain" />
                مبتنی بر داده و رفتار بازار
              </span>
            </div>
          </div>
          <Image
            src={isDark ? "/dark-chart.webp" : "/chart.webp"}
            alt="چارت تحلیل تکنیکال بازار"
            width={1000}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}
