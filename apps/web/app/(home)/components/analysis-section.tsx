import { AnalysisNewsCarousel } from "@/app/(home)/components/analysis-news-carousel"
import type { AnalysisCardProps } from "@/components/analysis-card"
import { siteContainerClass } from "@/lib/site-container"

const NEWS_ITEMS: AnalysisCardProps[] = [
  {
    title: "تحلیل روند طلای ۱۸ عیار؛ تداوم قدرت خریداران در محدوده حمایتی",
    date: "۱۰:۴۵ · ۱۸ شهریور ۱۴۰۴",
    source: "آگاه‌پرداز",
    imageSrc: "/chart.webp",
    imageAlt: "تحلیل طلا و سکه",
    category: "طلا و سکه",
    href: "/analyses",
  },
  {
    title: "بررسی روند دلار آزاد در محدوده مقاومتی",
    date: "۰۹:۲۰ · ۱۸ شهریور ۱۴۰۴",
    source: "آگاه‌پرداز",
    imageSrc: "/chart.webp",
    imageAlt: "تحلیل دلار",
    category: "دلار و ارز",
    href: "/analyses",
  },
  {
    title: "تحلیل بیت‌کوین؛ تثبیت بالای محدوده حمایتی",
    date: "۰۸:۰۵ · ۱۸ شهریور ۱۴۰۴",
    source: "آگاه‌پرداز",
    imageSrc: "/chart.webp",
    imageAlt: "تحلیل بیت‌کوین",
    category: "رمزارزها",
    href: "/analyses",
  },
  {
    title: "شاخص بورس؛ واکنش به حمایت روانی بازار",
    date: "۱۶:۱۰ · ۱۷ شهریور ۱۴۰۴",
    source: "آگاه‌پرداز",
    imageSrc: "/chart.webp",
    imageAlt: "تحلیل بورس",
    category: "بورس",
    href: "/analyses",
  },
]

export function AnalysisSection() {
  return (
    <section className="bg-muted/30 py-8 sm:py-12">
      <div className={siteContainerClass}>
        <AnalysisNewsCarousel title="اخبار روز" items={NEWS_ITEMS} />
      </div>
    </section>
  )
}
