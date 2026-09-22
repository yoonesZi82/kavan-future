"use client"

import { useEffect, useState } from "react"
import { BellIcon, MaximizeIcon, SearchIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { DASHBOARD_HEADER_HEIGHT_CLASS } from "@/components/dashboard/chrome"
import { MarketStatus } from "@/components/dashboard/market-status"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { useGlobalSearch } from "@/components/dashboard/global-search-context"

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export function AppHeader() {
  const [nowLabel, setNowLabel] = useState("")
  const { openSearch } = useGlobalSearch()

  useEffect(() => {
    const tick = () => setNowLabel(dateFormatter.format(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background/90 backdrop-blur">
      <div
        className={`flex w-full items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-6 ${DASHBOARD_HEADER_HEIGHT_CLASS}`}
      >
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <SidebarTrigger />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">آینده‌کاوان</p>
            <p className="hidden min-h-[14px] text-[11px] text-muted-foreground md:block">
              {nowLabel}
            </p>
          </div>
        </div>

        {/* * Opens shared GlobalSearchDialog — does not filter the watchlist */}
        <div className="relative hidden min-w-0 flex-1 md:block md:max-w-2xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 right-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-8 w-full cursor-pointer pr-9"
            readOnly
            placeholder="جستجوی دارایی، شاخص، نماد..."
            aria-label="جستجو"
            onFocus={(event) => {
              event.currentTarget.blur()
              openSearch()
            }}
            onClick={openSearch}
          />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <MarketStatus />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="تمام‌صفحه"
            className="hidden md:inline-flex"
          >
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
