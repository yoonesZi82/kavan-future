"use client"

import { BellIcon, MaximizeIcon, SearchIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { DASHBOARD_HEADER_HEIGHT_CLASS } from "@/components/dashboard/chrome"
import { MarketStatus } from "@/components/dashboard/market-status"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"

export function AppHeader() {
  const nowLabel = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date())

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background/90 backdrop-blur">
      <div
        className={`flex w-full items-center justify-between gap-3 px-4 md:gap-4 md:px-6 ${DASHBOARD_HEADER_HEIGHT_CLASS}`}
      >
        <div className="flex shrink-0 items-center gap-2">
          <SidebarTrigger />
          <div className="leading-tight">
            <p className="text-sm font-semibold">آینده‌کاوان</p>
            <p className="text-[11px] text-muted-foreground">{nowLabel}</p>
          </div>
        </div>

        <div className="relative min-w-0 flex-1 md:max-w-2xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-8 w-full pr-9"
            placeholder="جستجوی دارایی، شاخص، نماد..."
            aria-label="جستجو"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <MarketStatus />
          <Button variant="ghost" size="icon-sm" aria-label="تمام‌صفحه">
            <MaximizeIcon />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="اعلان‌ها"
            className="relative"
          >
            <BellIcon />
            <Badge className="absolute -top-1 -left-1 size-4 justify-center rounded-full p-0 text-[10px]">
              ۳
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
