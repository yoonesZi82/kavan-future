"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"
import { Menu, TrendingUp } from "lucide-react"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { AnimatedThemeToggler } from "@workspace/ui/components/animated-theme-toggler"

const navItems = [
  { label: "خانه", href: "/" },
  { label: "تحلیل‌ها", href: "/analyses" },
  { label: "ابزارها", href: "/tools" },
  { label: "قیمت‌ها", href: "/prices" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
]

function NavLink({
  href,
  label,
  isActive,
  onNavigate,
  className,
}: {
  href: string
  label: string
  isActive: boolean
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative px-3 py-2 text-sm transition-colors",
        isActive
          ? "font-medium text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full bg-primary transition-transform duration-300 ease-out",
          isActive ? "scale-x-100" : "scale-x-0"
        )}
      />
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <TrendingUp />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-bold">{BRAND_NAME}</span>
            <span className="text-[11px] text-muted-foreground">
              {BRAND_TAGLINE}
            </span>
          </span>
        </Link>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={item.href === pathname}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              ورود
            </Link>
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "sm", variant: "default" }))}
            >
              ثبت‌نام
            </Link>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <Menu />
              <span className="sr-only">منو</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,20rem)] gap-0 p-0"
            >
              <SheetHeader className="border-b border-border/60">
                <SheetTitle>{BRAND_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={item.href === pathname}
                    onNavigate={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base"
                  />
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t border-border/60 p-4 sm:hidden">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full"
                  )}
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full bg-gain text-white hover:bg-gain/90"
                  )}
                >
                  ثبت‌نام
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
