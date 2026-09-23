import { Activity, GitBranch, LineChart, Shield } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { SectionHeading } from "@/components/section-heading"

const features = [
  {
    icon: Activity,
    title: "نبض بازار",
    description:
      "قیمت‌های لحظه‌ای، تغییرات ۲۴ ساعته و نمودارهای حرفه‌ای برای رصد سریع بازار",
    iconClassName: "bg-chart-5/15 text-chart-5",
    href: "/features",
  },
  {
    icon: LineChart,
    title: "تحلیل و تصمیم‌ها",
    description:
      "بررسی جهت، قدرت و ساختار حرکت بازار و دارایی‌ها در یک نمای یکپارچه",
    iconClassName: "bg-gain/15 text-gain",
    href: "/features",
  },
  {
    icon: GitBranch,
    title: "سناریو و احتمالات",
    description:
      "شبیه‌سازی سناریوهای محتمل و برآورد احتمال برای تصمیم‌گیری آگاهانه‌تر",
    iconClassName: "bg-primary/15 text-primary",
    href: "/features",
  },
  {
    icon: Shield,
    title: "سپر ریسک",
    description:
      "شناسایی محدوده‌ها، شکست‌ها و هشدارهای هوشمند برای مدیریت ریسک",
    iconClassName: "bg-chart-4/15 text-chart-4",
    href: "/features",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="آنچه در یک نگاه می‌بینید" href="/features" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
