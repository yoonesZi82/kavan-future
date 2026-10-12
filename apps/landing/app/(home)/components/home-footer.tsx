import Link from "next/link"
import { BRAND_NAME } from "@/lib/brand"
import { BrandMark } from "./brand-mark"

const FOOTER_LINKS = [
  { href: "#", label: "درباره ما" },
  { href: "#", label: "تماس" },
  { href: "#", label: "حریم خصوصی" },
] as const

export function HomeFooter() {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-primary/15">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent"
      />
      <div className="relative container flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-start">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <BrandMark />
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              منطق تصمیم را شفاف می‌کند — انتخاب نهایی همیشه با شماست.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-border/60 flex flex-col items-center gap-3 border-t pt-6 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2026 {BRAND_NAME}
          </p>
          <p className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            ابزار تحلیل — بدون توصیه خرید یا فروش
          </p>
        </div>
      </div>
    </footer>
  )
}
