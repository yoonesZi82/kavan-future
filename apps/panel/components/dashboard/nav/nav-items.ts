import {
  Activity,
  Briefcase,
  LayoutDashboard,
  LineChart,
  Newspaper,
  Network,
  Settings2,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  enabled: boolean
}

export const navItems: NavItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
    enabled: true,
  },
  { title: "کاربران", href: "/users", icon: Users, enabled: true },
  { title: "نبض بازار", href: "/market-pulse", icon: Activity, enabled: true },
  {
    title: "تحلیل بازار",
    href: "/market-analysis",
    icon: LineChart,
    enabled: true,
  },
  { title: "سناریوها", href: "#", icon: Network, enabled: false },
  { title: "سبد ریسک", href: "#", icon: Shield, enabled: false },
  { title: "سبد من", href: "#", icon: Briefcase, enabled: false },
  { title: "اتاق خبر", href: "#", icon: Newspaper, enabled: false },
  { title: "سفارشی سازی", href: "#", icon: Settings2, enabled: false },
]
