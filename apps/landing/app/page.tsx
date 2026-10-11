import { createMetadata } from "@/lib/seo/create-metadata"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

// * SEO: home uses absolute title so template does not double the brand
export const metadata = createMetadata({
  title: BRAND_NAME,
  description: BRAND_TAGLINE,
  path: "/",
  absoluteTitle: true,
  keywords: ["آگاه پرداز", "بازار", "معاملات"],
})

export default function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{BRAND_NAME}</h1>
      <p className="text-muted-foreground max-w-md text-lg">{BRAND_TAGLINE}</p>
    </main>
  )
}
