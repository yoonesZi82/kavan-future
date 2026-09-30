import {
  FileSearchIcon,
  QuoteIcon,
  ScanEyeIcon,
  StarIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { siteContainerClass } from "@/lib/site-container"
import { RevealItem, RevealStagger } from "./reveal"

const FEATURES = [
  {
    icon: StarIcon,
    title: "تصمیم‌سازی هوشمند",
    subtitle: "با تکیه بر هندسه بازار",
  },
  {
    icon: FileSearchIcon,
    title: "پایش لحظه‌ای",
    subtitle: "بازارهای مالی",
  },
  {
    icon: TimerIcon,
    title: "تحلیل ساختاری",
    subtitle: "بدون اتکا به هوش مصنوعی",
  },
  {
    icon: ScanEyeIcon,
    title: "داده‌های معتبر",
    subtitle: "از منابع رسمی بازار",
  },
] as const

function FeatureCell({
  icon: Icon,
  title,
  subtitle,
}: (typeof FEATURES)[number]) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-3 py-6 text-center sm:py-7">
      <Icon className="size-6 text-primary" strokeWidth={1.5} />
      <p className="text-sm font-bold tracking-tight text-white">{title}</p>
      <p className="text-xs text-white/55">{subtitle}</p>
    </div>
  )
}

function GlowDivider() {
  return (
    <div
      aria-hidden
      className="hidden w-px shrink-0 self-center bg-linear-to-b from-transparent via-white/30 to-transparent lg:block lg:h-16"
    />
  )
}

/** Dark trust strip — feature pillars + quote, matched to brand bar. */
export function StatsSection() {
  return (
    <section className="py-6 sm:py-8">
      <div className={siteContainerClass}>
        <Card className="gap-0 overflow-hidden rounded-2xl border-0 bg-[#0a0e17] py-0 text-white ring-1 ring-white/10">
          <RevealStagger className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:divide-white/10 lg:flex lg:flex-1 lg:divide-x-0">
              {FEATURES.map((feature, index) => (
                <RevealItem
                  key={feature.title}
                  className="flex min-w-0 flex-1"
                >
                  {index > 0 ? <GlowDivider /> : null}
                  <FeatureCell {...feature} />
                </RevealItem>
              ))}
            </div>

            <GlowDivider />

            <RevealItem className="flex flex-col items-center justify-center gap-3 border-t border-white/10 px-5 py-6 text-center sm:py-7 lg:w-[min(100%,17.5rem)] lg:shrink-0 lg:border-t-0">
              <QuoteIcon className="size-5 text-primary" strokeWidth={1.5} />
              <p className="max-w-[16rem] text-sm leading-7 font-medium text-white/90">
                داده‌های دقیق، تحلیل عمیق، تصمیم‌های بهتر برای آینده مالی شما…
              </p>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="flex size-6 items-center justify-center rounded-full bg-white/10">
                  <UserIcon className="size-3.5" />
                </span>
                کاربران آگاه‌پرداز · تهران
              </div>
            </RevealItem>
          </RevealStagger>
        </Card>
      </div>
    </section>
  )
}
