import { createMetadata } from "@/lib/seo/create-metadata"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { Reveal } from "./components/reveal"
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

// * Home: each block reveals on scroll; inner grids stagger their items
export default function HomePage() {
  return (
    <main className="flex-1">
      <Reveal y={20}>
        <MarketTicker />
      </Reveal>
      <Reveal delay={0.05}>
        <HeroSection />
      </Reveal>
      <Reveal>
        <FeaturesSection />
      </Reveal>
      <Reveal>
        <AnalysisSection />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <Reveal>
        <CtaBanner />
      </Reveal>
    </main>
  )
}
