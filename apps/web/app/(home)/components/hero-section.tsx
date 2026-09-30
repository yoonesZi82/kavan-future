"use client"

import Link from "next/link"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import {
  ArrowLeft,
  Database,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { HeroChart } from "@/app/(home)/components/hero-chart"
import { HeroTodayAnalysis } from "@/app/(home)/components/hero-today-analysis"
import { RevealItem, RevealStagger } from "@/app/(home)/components/reveal"
import { siteContainerClass } from "@/lib/site-container"

const TRUST = [
  { icon: Sparkles, label: "تحلیل تخصصی" },
  { icon: Database, label: "منابع داده معتبر" },
  { icon: ShieldCheck, label: "بدون اطلاعات بانکی" },
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent)]"
      />
      <div className={siteContainerClass}>
        {/* * Mobile: copy → chart → analysis; lg RTL: analysis | chart | copy */}
        <RevealStagger className="grid items-start gap-6 lg:grid-cols-[minmax(200px,0.72fr)_minmax(0,1.4fr)_minmax(0,0.95fr)] lg:gap-5">
          <RevealItem className="order-1 flex flex-col justify-center lg:order-3 lg:self-center">
            <p className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              پلتفرم جامع تحلیل و تصمیم‌سازی مالی
            </p>
            <h1 className="text-3xl leading-[1.35] font-black tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem]">
              قبل از تصمیم،
              <br />
              تصویر کامل بازار را ببینید
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
              با داده‌های لحظه‌ای، ساختار بازار و سناریوهای ریسک، تصمیم مالی را
              شفاف‌تر و آگاهانه‌تر بگیرید.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="https://kavan-panel-gamma.vercel.app/market-pulse/"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-none hover:bg-primary/90"
                )}
              >
                شروع تحلیل رایگان
                <ArrowLeft data-icon="inline-end" />
              </Link>
              <Link
                href="/demo"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 gap-2 rounded-xl border-primary/50 px-5 text-sm font-medium text-primary hover:bg-primary/10"
                )}
              >
                <PlayCircle data-icon="inline-start" className="text-primary" />
                آشنایی با روش تحلیل
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted-foreground">
              {TRUST.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="flex size-7 items-center justify-center rounded-full border border-primary/30 text-primary">
                    <Icon className="size-3.5" />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="order-2 flex min-h-0 min-w-0 lg:order-2">
            <HeroChart />
          </RevealItem>

          <RevealItem className="order-3 min-h-0 lg:order-1">
            <HeroTodayAnalysis />
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
