import { Activity, GitBranch, LineChart, Shield } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { SectionHeading } from "@/components/section-heading"
import { siteContainerClass } from "@/lib/site-container"
import { RevealItem, RevealStagger } from "./reveal"

const features = [
  {
    icon: Activity,
    title: "نبض بازار",
    description:
      "قیمت‌های لحظه‌ای، تغییرات ۲۴ ساعته و نمودارهای حرفه‌ای برای رصد سریع بازار",
    iconClassName: "text-chart-5",
    href: "/features",
  },
  {
    icon: LineChart,
    title: "تحلیل و تصمیم‌ها",
    description:
      "بررسی جهت، قدرت و ساختار حرکت بازار و دارایی‌ها در یک نمای یکپارچه",
    iconClassName: "text-gain",
    href: "/features",
  },
  {
    icon: GitBranch,
    title: "سناریو و احتمالات",
    description:
      "شبیه‌سازی سناریوهای محتمل و برآورد احتمال برای تصمیم‌گیری آگاهانه‌تر",
    iconClassName: "text-primary",
    href: "/features",
  },
  {
    icon: Shield,
    title: "سپر ریسک",
    description:
      "شناسایی محدوده‌ها، شکست‌ها و هشدارهای هوشمند برای مدیریت ریسک",
    iconClassName: "text-chart-4",
    href: "/features",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-8 sm:py-12">
      <RevealStagger className={siteContainerClass}>
        <RevealItem>
          <SectionHeading title="آنچه در یک نگاه می‌بینید" href="/features" />
        </RevealItem>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <RevealItem key={feature.title}>
              <FeatureCard {...feature} />
            </RevealItem>
          ))}
        </div>
      </RevealStagger>
    </section>
  )
}
