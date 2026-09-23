"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Activity, ShieldCheck, Sparkles } from "lucide-react"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

const FLOATS = [
  {
    title: "طلا ۱۸ عیار",
    value: "+۱٫۲۴٪",
    tone: "text-gain",
    delay: 0.2,
    className: "top-[18%] start-[8%]",
  },
  {
    title: "بیت‌کوین",
    value: "۸۵٬۳۷۸",
    tone: "text-primary",
    delay: 0.45,
    className: "top-[42%] end-[6%]",
  },
  {
    title: "هشدار پلار",
    value: "فعال",
    tone: "text-gain",
    delay: 0.7,
    className: "bottom-[22%] start-[12%]",
  },
] as const

export function AuthVisualPanel({
  headline,
  subline,
}: {
  headline: string
  subline: string
}) {
  const { resolvedTheme } = useTheme()
  const chartSrc =
    resolvedTheme === "dark" ? "/dark-chart.webp" : "/chart.webp"

  return (
    <div className="relative hidden min-h-svh overflow-hidden lg:block">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent),radial-gradient(ellipse_70%_50%_at_80%_80%,color-mix(in_oklab,var(--gain)_18%,transparent),transparent)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Activity className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold">{BRAND_NAME}</p>
            <p className="text-xs text-muted-foreground">{BRAND_TAGLINE}</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 shadow-xl backdrop-blur-sm"
          >
            <Image
              src={chartSrc}
              alt="نمای داشبورد و چارت بازار"
              width={1000}
              height={1000}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          {FLOATS.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.55 }}
              className={`absolute rounded-xl border border-border/60 bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md ${item.className}`}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4 + item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-[11px] text-muted-foreground">{item.title}</p>
                <p className={`text-sm font-semibold tabular-nums ${item.tone}`}>
                  {item.value}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-md space-y-3">
          <h2 className="text-2xl font-black leading-snug tracking-tight xl:text-3xl">
            {headline}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">{subline}</p>
          <ul className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-gain" />
              امنیت لایهٔ بانکی
            </li>
            <li className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              هشدارهای هوشمند پلار
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
