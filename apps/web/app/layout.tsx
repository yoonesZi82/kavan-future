import { Vazirmatn } from "next/font/google"
import "@workspace/ui/globals.css"
import { createRootMetadata } from "@/lib/seo/create-metadata"
import { cn } from "@workspace/ui/lib/utils"
import { SiteChrome } from "@/components/layout/site-chrome"
import { AppProviders } from "@/components/providers/app-providers"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = createRootMetadata()

// * Root chrome: marketing header/footer; auth routes go full-bleed
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn("font-sans antialiased", vazirmatn.variable)}
    >
      <body>
        <AppProviders>
          <SiteChrome>{children}</SiteChrome>
        </AppProviders>
      </body>
    </html>
  )
}
