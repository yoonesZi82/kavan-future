import {
  Activity,
  Briefcase,
  LineChart,
  Newspaper,
  Network,
  Settings2,
  Shield,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  enabled: boolean
}

export const navItems: NavItem[] = [
  { title: "نبض بازار", href: "/market-pulse", icon: Activity, enabled: true },
  { title: "تحلیل بازار", href: "#", icon: LineChart, enabled: false },
  { title: "سناریوها", href: "#", icon: Network, enabled: false },
  { title: "سبد ریسک", href: "#", icon: Shield, enabled: false },
  { title: "سبد من", href: "#", icon: Briefcase, enabled: false },
  { title: "اتاق خبر", href: "#", icon: Newspaper, enabled: false },
  { title: "سفارشی سازی", href: "#", icon: Settings2, enabled: false },
]
