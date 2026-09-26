import { Award, Clock, FileText, Users } from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { StatItem } from "@/components/stat-item"

// * Home social proof: compact one-line stats + short analyst quote
const stats = [
  {
    icon: Award,
    value: "۹۸٪",
    label: "رضایت کاربران",
    iconClassName: "text-gain",
  },
  {
    icon: FileText,
    value: "+۱۲,۰۰۰",
    label: "تحلیل و گزارش",
    iconClassName: "text-chart-4",
  },
  {
    icon: Users,
    value: "+۸,۵۰۰",
    label: "کاربر فعال",
    iconClassName: "text-primary",
  },
  {
    icon: Clock,
    value: "۲۴/۷",
    label: "پایش بازار",
    iconClassName: "text-gain",
  },
]

export function StatsSection() {
  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="gap-0 overflow-hidden rounded-xl border-0 bg-slate-900 text-white ring-1 ring-white/10">
          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2.5 overflow-x-auto lg:gap-3">
              {stats.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>
            <div className="max-w-xs shrink-0 border-t border-white/10 pt-6 lg:max-w-sm lg:border-t-0 lg:border-s lg:pt-0 lg:ps-8">
              <blockquote className="text-sm leading-7 text-white/70">
                «این سامانه با ترکیب داده‌های خام بازار، تصویر قابل‌فهمی از
                وضعیت واقعی بازار در اختیار شما قرار می‌دهد.»
              </blockquote>
              <p className="mt-3 text-xs text-white/45">
                کاوه امین‌پناه · تحلیلگر بازار
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
