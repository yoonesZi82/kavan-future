"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import {
  MarketTickerCard,
  type MarketTickerCardProps,
} from "@/components/market-ticker-card"
import { siteContainerClass } from "@/lib/site-container"
import {
  fetchOneTickerSnapshot,
  fetchTseTickerSnapshot,
} from "./ticker-api"
import {
  formatTickerPercent,
  formatTickerPrice,
  withLivePrice,
  type TickerSnapshot,
} from "./ticker-format"
import { isBitycleTicker, TICKER_MARKETS } from "./ticker-markets"
import { useTickerLive } from "./use-ticker-live"
import { RevealItem, RevealStagger } from "../reveal"

function toCard(
  market: (typeof TICKER_MARKETS)[number],
  snapshot: TickerSnapshot | undefined
): MarketTickerCardProps {
  const latest = snapshot?.latest ?? 0
  const changePercent = snapshot?.changePercent ?? 0
  return {
    symbol: market.symbol,
    label: market.label,
    price: formatTickerPrice(latest),
    change: formatTickerPercent(changePercent),
    positive: changePercent >= 0,
    tone: market.tone,
    unit: market.unit,
  }
}

function upsertSnapshot(
  current: TickerSnapshot[],
  next: TickerSnapshot
): TickerSnapshot[] {
  const index = current.findIndex((row) => row.id === next.id)
  if (index < 0) return [...current, next]
  const copy = current.slice()
  copy[index] = next
  return copy
}

// * Client island: history via rewrite + live Bitycle WS (WS must not wait on HTTP)
export function MarketTicker() {
  const [snapshots, setSnapshots] = useState<TickerSnapshot[]>([])

  useEffect(() => {
    let cancelled = false
    // * Per-market: Bitycle must not wait for TSETMC (Vercel→TSETMC often hangs)
    for (const market of TICKER_MARKETS) {
      void fetchOneTickerSnapshot(market).then((row) => {
        if (!cancelled) {
          setSnapshots((current) => upsertSnapshot(current, row))
        }
      })
    }
    const timer = window.setInterval(() => {
      void fetchTseTickerSnapshot().then((tse) => {
        if (cancelled || tse.latest === 0) return
        setSnapshots((current) => upsertSnapshot(current, tse))
      })
    }, 60_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const onPrice = useCallback((ohlcSymbol: string, price: number) => {
    const market = TICKER_MARKETS.find(
      (row) => isBitycleTicker(row) && row.ohlcSymbol === ohlcSymbol
    )
    if (!market) return
    setSnapshots((current) => {
      const existing = current.find((row) => row.id === market.id)
      const base = existing ?? {
        id: market.id,
        latest: price,
        dayChange: 0,
        changePercent: 0,
      }
      return upsertSnapshot(current, withLivePrice(base, price))
    })
  }, [])

  useTickerLive({ onPrice })

  const byId = new Map(snapshots.map((row) => [row.id, row]))

  return (
    <section className="w-full overflow-x-clip border-b border-border/50 py-4 sm:py-5">
      <RevealStagger className={siteContainerClass} stagger={0.05}>
        <RevealItem>
          <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0 shrink">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                نبض بازار
              </h2>
              <div className="mt-1.5 h-1 w-10 rounded-full bg-primary" />
            </div>
            <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground sm:gap-3">
              <Badge
                variant="success"
                className="h-5 gap-1 px-1.5 text-[10px]"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-gain" />
                بازار باز است
              </Badge>
              <span className="hidden sm:inline">امروز · به‌روز لحظه‌ای</span>
            </div>
          </div>
        </RevealItem>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 touch-pan-x [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 lg:touch-auto [&::-webkit-scrollbar]:hidden">
          {TICKER_MARKETS.map((market) => (
            <RevealItem
              key={market.id}
              className="w-[min(78vw,17rem)] shrink-0 snap-center lg:w-auto lg:snap-none"
            >
              <Link href="/prices" className="block">
                <MarketTickerCard {...toCard(market, byId.get(market.id))} />
              </Link>
            </RevealItem>
          ))}
        </div>
      </RevealStagger>
    </section>
  )
}
