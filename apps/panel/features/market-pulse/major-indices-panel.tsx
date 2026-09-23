"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"
import { useMarketsQuery } from "@/features/market-pulse/hooks"
import { MajorIndicesHeader } from "@/features/market-pulse/major-indices-header"
import {
  WATCHLIST_COL,
  WATCHLIST_DIVIDER,
  WATCHLIST_GRID,
} from "@/features/market-pulse/watchlist-layout"
import type { MarketPair } from "@/features/market-pulse/types"

type MajorIndicesPanelProps = {
  selectedId: string | null
  onSelect: (market: MarketPair) => void
}

const PAGE_SIZE = 40

const COLUMN_LABEL =
  "text-[10px] font-medium tracking-wide text-muted-foreground"

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function marketInitials(nameFa: string): string {
  return nameFa.slice(0, 2)
}

function WatchlistColumnLabels() {
  return (
    <div
      className={cn(
        WATCHLIST_GRID,
        "sticky top-0 z-10 border-b border-border bg-card px-0 py-2"
      )}
      role="row"
    >
      <span className={cn(WATCHLIST_COL, COLUMN_LABEL)}>نماد</span>
      <span className={WATCHLIST_DIVIDER} aria-hidden>
        |
      </span>
      <span className={cn(WATCHLIST_COL, COLUMN_LABEL)}>قیمت</span>
      <span className={WATCHLIST_DIVIDER} aria-hidden>
        |
      </span>
      <span className={cn(WATCHLIST_COL, COLUMN_LABEL)}>تغییر قیمت</span>
    </div>
  )
}

export function MajorIndicesPanel({
  selectedId,
  onSelect,
}: MajorIndicesPanelProps) {
  const { data, isLoading } = useMarketsQuery()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  // ! Avoid SSR/client cache mismatch on count + list (TanStack may already have data)
  const [mounted, setMounted] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const rows = (data ?? []).slice(0, visibleCount)
  const totalCount = mounted ? (data?.length ?? 0) : 0
  const hasMore = visibleCount < totalCount
  const showList = mounted && !isLoading

  useEffect(() => {
    const root = listRef.current
    const sentinel = sentinelRef.current
    if (!root || !sentinel || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, totalCount))
      },
      { root, rootMargin: "120px" }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, rows.length, totalCount])

  return (
    <Card className="flex h-full flex-col overflow-hidden py-0 ring-inset">
      <MajorIndicesHeader totalCount={totalCount} />
      <CardContent className="min-h-0 flex-1 px-0 py-0">
        {!showList ? (
          <div className="space-y-2 px-3 py-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div
            ref={listRef}
            className="scrollbar-brand h-full overflow-y-auto px-3"
          >
            <WatchlistColumnLabels />
            <ul className="flex flex-col gap-1 py-1">
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
                        WATCHLIST_GRID,
                        "cursor-pointer rounded-lg py-2.5 transition-colors",
                        isActive
                          ? "bg-primary/10 ring-1 ring-primary/30 ring-inset"
                          : "hover:bg-muted/70"
                      )}
                    >
                      <span
                        className={cn(
                          WATCHLIST_COL,
                          "flex flex-row items-center gap-1"
                        )}
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {marketInitials(row.nameFa)}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <span className="w-full truncate text-start text-sm font-medium">
                            {row.nameFa}
                          </span>
                          <span className="max-w-full truncate rounded bg-muted px-1.5 py-0.5 text-start text-[10px] text-muted-foreground">
                            {row.symbol}
                          </span>
                        </div>
                      </span>
                      <span className={WATCHLIST_DIVIDER} aria-hidden>
                        |
                      </span>
                      <span
                        className={cn(
                          WATCHLIST_COL,
                          "text-sm font-semibold tabular-nums"
                        )}
                      >
                        {formatPrice(row.latest)}
                      </span>
                      <span className={WATCHLIST_DIVIDER} aria-hidden>
                        |
                      </span>
                      <span className={WATCHLIST_COL}>
                        <Badge
                          variant="outline"
                          className={cn(
                            "h-5 min-w-12 justify-center px-1.5 text-[10px] tabular-nums",
                            isGain
                              ? "border-gain/35 bg-gain/10 text-gain"
                              : "border-loss/35 bg-loss/10 text-loss"
                          )}
                        >
                          {formatSigned(row.dayChange)}
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
              {!hasMore && totalCount === 0 ? (
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
