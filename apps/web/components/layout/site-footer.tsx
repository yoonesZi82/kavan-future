import Link from "next/link"
import {
  Globe,
  MessageCircle,
  Share2,
  Send,
  TrendingUp,
  Video,
} from "lucide-react"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

const footerCols = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "تحلیل‌ها", href: "/analyses" },
      { label: "ابزارها", href: "/tools" },
      { label: "قیمت‌ها", href: "/prices" },
      { label: "وبینارها", href: "/webinars" },
    ],
  },
  {
    title: "منابع",
    links: [
      { label: "مقالات", href: "/blog" },
      { label: "آموزش‌ها", href: "/learn" },
      { label: "راهنمای استفاده", href: "/docs" },
      { label: "گزارش بازار", href: "/report" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "تماس با ما", href: "/contact" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "پشتیبانی کاربران", href: "/support" },
      { label: "درباره ما", href: "/about" },
    ],
  },
]

const socials = [
  { icon: Send, label: "تلگرام", href: "#" },
  { icon: MessageCircle, label: "اینستاگرام", href: "#" },
  { icon: Share2, label: "لینکدین", href: "#" },
  { icon: Globe, label: "وب", href: "#" },
  { icon: Video, label: "یوتیوب", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="bg-primary/15 text-primary flex size-10 items-center justify-center rounded-xl">
                <TrendingUp />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[15px] font-bold">{BRAND_NAME}</span>
                <span className="text-muted-foreground text-[11px]">
                  {BRAND_TAGLINE}
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground mt-5 max-w-sm text-[13px] leading-7">
              تبدیل داده‌های بازار به بینش‌های قابل‌فهم — برای تصمیم‌گیری
              سریع‌تر و هوشمندانه‌تر سرمایه‌گذاران.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50 transition-colors"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-[13px] font-bold">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-[13px] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-[11px] sm:flex-row">
          <p>
            © ۱۴۰۴ {BRAND_NAME}. تمامی حقوق محفوظ است.
          </p>
          <p>حریم خصوصی · شرایط استفاده</p>
        </div>
      </div>
    </footer>
  )
}
