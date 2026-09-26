"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@workspace/ui/components/badge"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { cn } from "@workspace/ui/lib/utils"
import { useGlobalSearch } from "@/components/dashboard/search/global-search-context"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"
import { useWatchlist } from "@/features/market-pulse/data/use-watchlist"
import type { MarketPair } from "@/features/market-pulse/types"

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function MarketResultRow({
  market,
  inWatchlist,
}: {
  market: MarketPair
  inWatchlist: boolean
}) {
  const isGain = market.dayChange >= 0
  return (
    <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="block truncate text-sm font-medium">
            {market.nameFa}
          </span>
          {inWatchlist ? (
            <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
              در واچ‌لیست
            </Badge>
          ) : null}
        </span>
        <span className="text-[10px] text-muted-foreground" dir="ltr">
          {market.symbol}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-sm font-semibold tabular-nums">
          {formatPrice(market.latest)}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "h-5 min-w-12 justify-center px-1.5 text-[10px] tabular-nums",
            isGain
              ? "border-gain/35 bg-gain/10 text-gain"
              : "border-loss/35 bg-loss/10 text-loss"
          )}
        >
          {formatSigned(market.dayChange)}
        </Badge>
      </span>
    </span>
  )
}

/** Asset picker — search markets and add the choice to the watchlist. */
export function GlobalSearchDialog() {
  const router = useRouter()
  const { open, setOpen } = useGlobalSearch()
  const [query, setQuery] = useState("")
  const { data: markets } = useMarketsQuery()
  const { add, has } = useWatchlist()

  const marketItems = useMemo(() => markets ?? [], [markets])

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) setQuery("")
  }

  function handleSelect(market: MarketPair) {
    add(market.id)
    setOpen(false)
    setQuery("")
    router.push(`/market-pulse?market=${encodeURIComponent(market.id)}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="جستجوی نماد"
      description="جستجو و افزودن دارایی به واچ‌لیست"
      className="sm:max-w-lg"
    >
      <Command shouldFilter>
        <CommandInput
          placeholder="نام یا نماد ارز را جستجو کنید..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>نمادی پیدا نشد</CommandEmpty>
          <CommandGroup heading="بازارها">
            {marketItems.map((market) => (
              <CommandItem
                key={market.id}
                value={`${market.nameFa} ${market.symbol} ${market.src} ${market.dst} ${market.ohlcSymbol}`}
                onSelect={() => handleSelect(market)}
                className="items-center py-2.5"
              >
                <MarketResultRow
                  market={market}
                  inWatchlist={has(market.id)}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
