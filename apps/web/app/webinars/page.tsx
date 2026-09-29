import { PlaceholderLayout } from "@/components/sections/placeholder-layout"
import { createMetadata } from "@/lib/seo/create-metadata"

export const metadata = createMetadata({
  title: "وبینارها",
  description: "وبینارهای هفتگی و رویدادهای آگه پرداز پارس.",
  path: "/webinars",
})

export default function WebinarsPage() {
  return (
    <PlaceholderLayout
      title="وبینارها و رویدادها"
      description="برنامه وبینارهای آموزشی هفتگی، کارگاه‌های تخصصی و رویدادهای آنلاین به‌زودی در این صفحه منتشر می‌شود."
      pagePath="/webinars"
    />
  )
}
