import { Award, Clock, FileText, Quote, Users } from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { StatItem } from "@/components/stat-item"

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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative gap-0 overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--gain) 25%, transparent), transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:p-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-8">
              {stats.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary">
                <Quote />
              </div>
              <blockquote className="text-[15px] leading-8 text-white/85">
                «این سامانه با ترکیب داده‌های خام بازار، تصویر قابل‌فهمی از وضعیت
                واقعی بازار در اختیار شما قرار می‌دهد.»
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                  ک.ا
                </div>
                <div>
                  <p className="text-sm font-semibold">کاوه امین‌پناه</p>
                  <p className="text-xs text-white/60">تحلیلگر بازار</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
