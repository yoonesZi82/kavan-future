import { createMetadata } from "@/lib/seo/create-metadata"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { HomeFaq } from "./components/home-faq"
import { HomeFeatures } from "./components/home-features"
import { HomeFooter } from "./components/home-footer"
import { HomeHeader } from "./components/home-header"
import { HomeHero } from "./components/home-hero"
import { HomeQuote } from "./components/home-quote"

// * SEO: home uses absolute title so template does not double the brand
export const metadata = createMetadata({
  title: BRAND_NAME,
  description: `${BRAND_TAGLINE} — تصمیم‌های مالی شفاف بدون سیگنال‌دهی و پیش‌بینی آماده.`,
  path: "/",
  absoluteTitle: true,
  keywords: ["داده محور", "تحلیل بازار", "تصمیم‌گیری مالی", "لیست انتظار"],
})

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <HomeHeader />
      <main className="flex-1">
        <HomeHero />
        <HomeFeatures />
        <HomeQuote />
        <HomeFaq />
      </main>
      <HomeFooter />
    </div>
  )
}
