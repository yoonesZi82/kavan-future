import { createMetadata } from "@/lib/seo/create-metadata"
import { AnalysesGrid } from "@/features/analyses/analyses-grid"

// * Analyses CMS — mock add/edit + previous list until content API
export const metadata = createMetadata({
  title: "تحلیل‌ها",
  description:
    "افزودن و ویرایش تحلیل‌های مجله و مقالات در پنل آینده‌کاوان — مدیریت محتوا و انتشار.",
  path: "/analyses",
  keywords: [
    "تحلیل‌ها",
    "مقالات",
    "مجله",
    "محتوای تحلیلی",
    "آینده‌کاوان",
  ],
  noIndex: true,
})

export default function AnalysesPage() {
  return <AnalysesGrid />
}
