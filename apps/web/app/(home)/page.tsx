import { createMetadata } from "@/lib/seo/create-metadata"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { HeroSection } from "./components/hero-section"
import { MarketTicker } from "./components/market-ticker"
import { FeaturesSection } from "./components/features-section"
import { AnalysisSection } from "./components/analysis-section"
import { StatsSection } from "./components/stats-section"
import { CtaBanner } from "./components/cta-banner"

export const metadata = createMetadata({
  title: BRAND_NAME,
  absoluteTitle: true,
  description:
    "دستیار تصمیم‌سازی مالی آگاه پرداز پارس — قیمت لحظه‌ای طلا، دلار، سکه و رمزارز، تحلیل روز و داشبورد تصمیم‌گیری. قبل از تصمیم، تصویر کامل بازار را ببینید.",
  path: "/",
  keywords: [
    BRAND_NAME,
    BRAND_TAGLINE,
    "تحلیل بازار",
    "قیمت طلا",
    "طلای ۱۸ عیار",
    "قیمت دلار",
    "دلار آزاد",
    "سکه امامی",
    "بیت‌کوین",
    "رمزارز",
    "شاخص کل",
    "داشبورد معاملاتی",
    "تحلیل تکنیکال",
    "هشدار هوشمند",
  ],
  image: {
    url: "/chart.webp",
    width: 1200,
    height: 630,
    alt: `${BRAND_NAME} — چارت و تحلیل بازار`,
  },
})

// * Home: desktop = mockup large; mobile = stacked same sections
export default function HomePage() {
  return (
    <main className="flex-1">
      <MarketTicker />
      <HeroSection />
      <FeaturesSection />
      <AnalysisSection />
      <StatsSection />
      <CtaBanner />
    </main>
  )
}
