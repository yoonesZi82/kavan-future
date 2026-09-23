import {
  CompactAnalysisCard,
  FeaturedAnalysisCard,
} from "@/components/analysis-card"
import { SectionHeading } from "@/components/section-heading"

export function AnalysisSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="تحلیل روز" href="/analyses" />
        <div className="grid gap-4 lg:grid-cols-3">
          <FeaturedAnalysisCard
            className="lg:col-span-2"
            title="تحلیل روند طلای ۱۸ عیار؛ تداوم قدرت خریداران در محدوده حمایتی"
            date="سه‌شنبه ۱۸ شهریور ۱۴۰۴ · ۱۰:۴۵"
            excerpt="با توجه به حفظ سطوح حمایتی کلیدی و افزایش تقاضا در بازار داخلی، احتمال ادامه روند صعودی در کوتاه‌مدت وجود دارد."
            imageSrc="/chart.webp"
            imageAlt="تحلیل طلا و سکه"
            category="طلا و سکه"
            href="/analyses"
          />
          <div className="flex flex-col gap-4">
            <CompactAnalysisCard
              title="بررسی روند دلار آزاد در محدوده مقاومتی"
              date="سه‌شنبه ۱۸ شهریور ۱۴۰۴ · ۰۹:۲۰"
              imageSrc="/chart.webp"
              imageAlt="تحلیل دلار"
              category="دلار و ارز"
              href="/analyses"
            />
            <CompactAnalysisCard
              title="تحلیل بیت‌کوین؛ تثبیت بالای محدوده حمایتی"
              date="سه‌شنبه ۱۸ شهریور ۱۴۰۴ · ۰۸:۰۵"
              imageSrc="/chart.webp"
              imageAlt="تحلیل بیت‌کوین"
              category="رمزارزها"
              href="/analyses"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
