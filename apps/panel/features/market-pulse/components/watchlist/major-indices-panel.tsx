"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"
import { useMarketsQuery } from "@/features/market-pulse/data/hooks"
import { useWatchlist } from "@/features/market-pulse/data/use-watchlist"
import { MajorIndicesHeader } from "@/features/market-pulse/components/watchlist/major-indices-header"
import {
  WATCHLIST_COL,
  WATCHLIST_COL_SYMBOL,
  WATCHLIST_DIVIDER,
  WATCHLIST_GRID,
} from "@/features/market-pulse/components/watchlist/watchlist-layout"
import { AnimatedMarketNumber } from "@/features/market-pulse/components/watchlist/animated-market-number"
import type { MarketPair } from "@/features/market-pulse/types"

type MajorIndicesPanelProps = {
  selectedId: string | null
  onSelect: (market: MarketPair) => void
}

const PAGE_SIZE = 40

const COLUMN_LABEL =
  "text-[10px] font-medium tracking-wide text-muted-foreground"

function dayChangePercent(latest: number, dayChange: number): number {
  const basis = latest - dayChange
  if (!Number.isFinite(basis) || basis === 0) return 0
  return (dayChange / basis) * 100
}

function formatPercentChange(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : ""
  const abs = Math.abs(value).toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return `${sign}${abs}٪`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function WatchlistColumnLabels() {
  return (
    <div
      className={cn(
        WATCHLIST_GRID,
        "sticky top-0 z-10 border-b border-border bg-card px-2.5 py-2"
      )}
      role="row"
    >
      <span className={cn(WATCHLIST_COL_SYMBOL, COLUMN_LABEL)}>نماد</span>
      <span className={WATCHLIST_DIVIDER} aria-hidden>
        |
      </span>
      <span className={cn(WATCHLIST_COL, COLUMN_LABEL)}>قیمت</span>
      <span className={WATCHLIST_DIVIDER} aria-hidden>
        |
      </span>
      <span className={cn(WATCHLIST_COL, COLUMN_LABEL)}>تغییر ٪</span>
    </div>
  )
}

export function MajorIndicesPanel({
  selectedId,
  onSelect,
}: MajorIndicesPanelProps) {
  const { data, isLoading } = useMarketsQuery()
  const { ids: watchlistIds, ready: watchlistReady } = useWatchlist()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  // ! Avoid SSR/client cache mismatch on count + list (TanStack may already have data)
  const [mounted, setMounted] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const watchlistRows = (data ?? []).filter((row) =>
    watchlistIds.includes(row.id)
  )
  // * Keep watchlist order (newest added first)
  const ordered = watchlistIds
    .map((id) => watchlistRows.find((row) => row.id === id))
    .filter((row): row is MarketPair => Boolean(row))

  const rows = ordered.slice(0, visibleCount)
  const totalCount = mounted && watchlistReady ? ordered.length : 0
  const hasMore = visibleCount < totalCount
  const showList = mounted && watchlistReady && !isLoading

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
                const percent = dayChangePercent(row.latest, row.dayChange)
                const isGain = percent >= 0
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
                        "cursor-pointer rounded-lg px-2.5 py-2.5 transition-colors",
                        isActive
                          ? "bg-primary/10 ring-1 ring-primary/30 ring-inset"
                          : "hover:bg-muted/70"
                      )}
                    >
                      <span
                        className={cn(
                          WATCHLIST_COL_SYMBOL,
                          "flex flex-col items-stretch gap-0.5"
                        )}
                      >
                        <span className="truncate text-sm font-medium leading-tight">
                          {row.nameFa}
                        </span>
                        <span className="w-fit max-w-full truncate rounded bg-muted px-1.5 py-0.5 text-[10px] leading-tight text-muted-foreground">
                          {row.symbol}
                        </span>
                      </span>
                      <span className={WATCHLIST_DIVIDER} aria-hidden>
                        |
                      </span>
                      <AnimatedMarketNumber
                        value={row.latest}
                        format={formatPrice}
                        className={cn(
                          WATCHLIST_COL,
                          "block text-sm font-semibold"
                        )}
                      />
                      <span className={WATCHLIST_DIVIDER} aria-hidden>
                        |
                      </span>
                      <span
                        className={cn(
                          WATCHLIST_COL,
                          "inline-flex items-center justify-center gap-1 text-xs font-medium",
                          isGain ? "text-gain" : "text-loss"
                        )}
                      >
                        {isGain ? (
                          <TrendingUpIcon className="size-3.5 shrink-0" />
                        ) : (
                          <TrendingDownIcon className="size-3.5 shrink-0" />
                        )}
                        <AnimatedMarketNumber
                          value={percent}
                          format={formatPercentChange}
                        />
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
                  از جستجو یک نماد به واچ‌لیست اضافه کنید
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
