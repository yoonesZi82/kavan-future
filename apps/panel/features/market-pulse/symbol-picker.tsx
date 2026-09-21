"use client"

import { useMemo, useState } from "react"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useMarketsQuery } from "@/features/market-pulse/hooks"
import type { MarketPair } from "@/features/market-pulse/types"

type SymbolPickerProps = {
  value: string | null
  onChange: (market: MarketPair) => void
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 4 })
}

function matchesQuery(market: MarketPair, query: string): boolean {
  if (!query) return true
  const q = query.trim().toLowerCase()
  return (
    market.symbol.toLowerCase().includes(q) ||
    market.src.toLowerCase().includes(q) ||
    market.dst.toLowerCase().includes(q) ||
    market.id.includes(q) ||
    market.ohlcSymbol.toLowerCase().includes(q)
  )
}

export function SymbolPicker({ value, onChange }: SymbolPickerProps) {
  const { data, isLoading } = useMarketsQuery()
  const [query, setQuery] = useState("")

  const selected = useMemo(
    () => data?.find((item) => item.id === value) ?? null,
    [data, value]
  )

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((item) => matchesQuery(item, query)).slice(0, 80)
  }, [data, query])

  const label = selected?.symbol ?? "انتخاب نماد"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs"
          />
        }
      >
        <SearchIcon className="size-3.5" />
        {label}
        <ChevronDownIcon className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 p-0">
        <div
          className="border-b border-border p-2"
          onKeyDown={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <Input
            value={query}
            onValueChange={setQuery}
            placeholder="جستجوی ارز (btc, eth, usdt…)"
            className="h-8"
            autoFocus
          />
        </div>
        {isLoading ? (
          <div className="space-y-2 p-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <ScrollArea className="h-64">
            <div className="p-1">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                  نتیجه‌ای پیدا نشد
                </p>
              ) : (
                filtered.map((market) => {
                  const isGain = market.dayChange >= 0
                  return (
                    <DropdownMenuItem
                      key={market.id}
                      className="flex items-center justify-between gap-2"
                      onClick={() => onChange(market)}
                    >
                      <span className="min-w-0">
                        <span className="block font-medium">{market.symbol}</span>
                        <span className="block text-[10px] text-muted-foreground">
                          {market.dst === "rls" ? "بازار ریالی" : "بازار تتری"}
                          {market.isClosed ? " · بسته" : ""}
                        </span>
                      </span>
                      <span
                        className="flex shrink-0 flex-col items-start text-[11px]"
                        dir="ltr"
                      >
                        <span>{formatPrice(market.latest)}</span>
                        <span className={isGain ? "text-gain" : "text-loss"}>
                          {isGain ? "+" : ""}
                          {market.dayChange.toFixed(2)}%
                        </span>
                      </span>
                    </DropdownMenuItem>
                  )
                })
              )}
            </div>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
