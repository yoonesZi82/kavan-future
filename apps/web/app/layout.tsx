import { Vazirmatn } from "next/font/google"
import "@workspace/ui/globals.css"
import { createRootMetadata } from "@/lib/seo/create-metadata"
import { cn } from "@workspace/ui/lib/utils"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { AppProviders } from "@/components/providers/app-providers"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = createRootMetadata()

// * Root chrome: header + footer once for all marketing routes
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
          <div className="flex min-h-svh flex-col bg-background">
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
