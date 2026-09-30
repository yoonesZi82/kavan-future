import { createMetadata } from "@/lib/seo/create-metadata"
import { DashboardGrid } from "@/features/dashboard/dashboard-grid"

// * Admin home dashboard — mock KPIs/charts until product analytics API
export const metadata = createMetadata({
  title: "داشبورد",
  description:
    "نمای کلی کاربران، درآمد و رویدادهای اخیر پنل آینده‌کاوان — صفحه اصلی داشبورد.",
  path: "/",
  keywords: [
    "داشبورد",
    "آمار کاربران",
    "درآمد",
    "رویدادها",
    "آینده‌کاوان",
  ],
})

export default function DashboardPage() {
  return <DashboardGrid />
}
