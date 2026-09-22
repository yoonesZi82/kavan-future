"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"
import { useMarketsQuery } from "@/features/market-pulse/hooks"
import { MajorIndicesHeader } from "@/features/market-pulse/major-indices-header"
import type { MarketPair } from "@/features/market-pulse/types"

type MajorIndicesPanelProps = {
  selectedId: string | null
  onSelect: (market: MarketPair) => void
}

const PAGE_SIZE = 40

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function marketInitials(symbol: string): string {
  return symbol.split("/")[0]?.slice(0, 3).toUpperCase() ?? "?"
}

export function MajorIndicesPanel({
  selectedId,
  onSelect,
}: MajorIndicesPanelProps) {
  const { data, isLoading } = useMarketsQuery()
  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const listRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLLIElement | null>(null)

  const filtered = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(
      (item) =>
        item.symbol.toLowerCase().includes(q) ||
        item.src.toLowerCase().includes(q) ||
        item.dst.toLowerCase().includes(q)
    )
  }, [data, query])

  const rows = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query])

  useEffect(() => {
    const root = listRef.current
    const sentinel = sentinelRef.current
    if (!root || !sentinel || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        setVisibleCount((count) =>
          Math.min(count + PAGE_SIZE, filtered.length)
        )
      },
      { root, rootMargin: "120px" }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [filtered.length, hasMore, rows.length])

  return (
    <Card className="flex h-full flex-col overflow-hidden py-0 ring-inset">
      <MajorIndicesHeader
        query={query}
        onQueryChange={setQuery}
        totalCount={filtered.length}
        visibleCount={rows.length}
      />
      <CardContent className="min-h-0 flex-1 px-0 py-0">
        {isLoading ? (
          <div className="space-y-2 px-3 py-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div ref={listRef} className="scrollbar-brand h-full overflow-y-auto px-2 py-1">
            <ul className="flex flex-col gap-1">
              {rows.map((row) => {
                const isGain = row.dayChange >= 0
                const isActive = row.id === selectedId
                return (
                  <li
                    key={row.id}
                    className="border-b border-dashed border-border/70 pb-1 last:border-b-0 last:pb-0"
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(row)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2.5 text-start transition-colors",
                        isActive
                          ? "bg-primary/10 ring-1 ring-primary/30 ring-inset"
                          : "hover:bg-muted/70"
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {marketInitials(row.symbol)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {row.symbol.split("/")[0]}
                        </span>
                        <span
                          className="mt-0.5 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          dir="ltr"
                        >
                          {row.symbol}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-col items-start gap-0.5" dir="ltr">
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(row.latest)}
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
                          {formatSigned(row.dayChange)}٪
                        </Badge>
                      </span>
                    </button>
                  </li>
                )
              })}
              {hasMore ? (
                <li
                  ref={sentinelRef}
                  className="py-3 text-center text-[11px] text-muted-foreground"
                >
                  در حال بارگذاری…
                </li>
              ) : null}
              {!hasMore && filtered.length === 0 ? (
                <li className="px-2 py-6 text-center text-xs text-muted-foreground">
                  نتیجه‌ای پیدا نشد
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
