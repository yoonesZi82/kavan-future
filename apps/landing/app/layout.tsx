import { Vazirmatn } from "next/font/google"
import "@workspace/ui/globals.css"
import { createRootMetadata } from "@/lib/seo/create-metadata"
import { cn } from "@workspace/ui/lib/utils"
import { AppProviders } from "@/components/providers/app-providers"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = createRootMetadata()

// * Landing root: RTL + shared UI tokens; keep chrome out of layout until pages need it
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
      <body className="landing-theme">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
