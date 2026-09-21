import { Vazirmatn } from "next/font/google"
import "@workspace/ui/globals.css"
import { AppProviders } from "@/components/providers/app-providers"
import { createRootMetadata } from "@/lib/seo/create-metadata"
import { cn } from "@workspace/ui/lib/utils"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = createRootMetadata()

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
