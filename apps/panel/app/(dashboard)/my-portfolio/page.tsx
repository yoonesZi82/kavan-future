import { createMetadata } from "@/lib/seo/create-metadata"
import { MyPortfolioGrid } from "@/features/my-portfolio/my-portfolio-grid"

// * My portfolio — mock holdings/allocation/performance until portfolio API
export const metadata = createMetadata({
  title: "سبد من",
  description:
    "نمای ارزش سبد، تخصیص دارایی‌ها، جدول دارایی‌ها و عملکرد پرتفوی در پنل آینده‌کاوان.",
  path: "/my-portfolio",
  keywords: [
    "سبد من",
    "پرتفوی",
    "تخصیص دارایی",
    "سود و زیان",
    "عملکرد سبد",
    "آینده‌کاوان",
  ],
  noIndex: true,
})

export default function MyPortfolioPage() {
  return <MyPortfolioGrid />
}
