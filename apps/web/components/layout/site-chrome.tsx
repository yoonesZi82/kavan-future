"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

const AUTH_PATHS = new Set(["/login", "/register"])

/** Hides marketing chrome on auth routes for a full-bleed demo. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = AUTH_PATHS.has(pathname)

  if (isAuth) {
    return <div className="flex min-h-svh flex-col bg-background">{children}</div>
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  )
}
