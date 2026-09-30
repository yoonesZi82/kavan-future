"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import {
  MarketTickerCard,
  type MarketTickerCardProps,
} from "@/components/market-ticker-card"
import { siteContainerClass } from "@/lib/site-container"
import { fetchTickerSnapshots, fetchTseTickerSnapshot } from "./ticker-api"
import {
  formatTickerPercent,
  formatTickerPrice,
  withLivePrice,
  type TickerSnapshot,
} from "./ticker-format"
import { isBitycleTicker, TICKER_MARKETS } from "./ticker-markets"
import { useTickerLive } from "./use-ticker-live"

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

// * Client island: history via rewrite + live Bitycle WS / TSETMC overview
export function MarketTicker() {
  const [snapshots, setSnapshots] = useState<TickerSnapshot[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    void fetchTickerSnapshots()
      .then((rows) => {
        if (!cancelled) setSnapshots(rows)
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    // * TSETMC has no WS — poll overview only (do not refetch Bitycle candles)
    const timer = window.setInterval(() => {
      void fetchTseTickerSnapshot().then((tse) => {
        if (cancelled) return
        setSnapshots((current) =>
          current.map((row) => (row.id === "tse" ? tse : row))
        )
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
    setSnapshots((current) =>
      current.map((row) =>
        row.id === market.id ? withLivePrice(row, price) : row
      )
    )
  }, [])

  useTickerLive({ enabled: ready, onPrice })

  const byId = new Map(snapshots.map((row) => [row.id, row]))

  return (
    <section className="w-full overflow-x-clip border-b border-border/50 py-4 sm:py-5">
      <div className={siteContainerClass}>
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

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 touch-pan-x [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 lg:touch-auto [&::-webkit-scrollbar]:hidden">
          {TICKER_MARKETS.map((market) => (
            <div
              key={market.id}
              className="w-[min(78vw,17rem)] shrink-0 snap-center lg:w-auto lg:snap-none"
            >
              <Link href="/prices" className="block">
                <MarketTickerCard {...toCard(market, byId.get(market.id))} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
