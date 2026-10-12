import { createMetadata } from "@/lib/seo/create-metadata"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { HomeFaq } from "./(home)/components/home-faq"
import { HomeFeatures } from "./(home)/components/home-features"
import { HomeFooter } from "./(home)/components/home-footer"
import { HomeHeader } from "./(home)/components/home-header"
import { HomeHero } from "./(home)/components/home-hero"
import { HomeQuote } from "./(home)/components/home-quote"

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
    <div className="bg-background flex min-h-svh flex-col">
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
