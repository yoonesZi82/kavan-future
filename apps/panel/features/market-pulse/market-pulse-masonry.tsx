"use client"

import Masonry from "react-masonry-css"
import { AlertsPanel } from "@/features/market-pulse/alerts-panel"
import { ChartPanel } from "@/features/market-pulse/chart-panel"
import { MarketFlowPanel } from "@/features/market-pulse/market-flow-panel"
import { WatchlistPanel } from "@/features/market-pulse/watchlist-panel"

const BREAKPOINT_COLS = {
  default: 2,
  768: 1,
}

export function MarketPulseMasonry() {
  return (
    <Masonry
      breakpointCols={BREAKPOINT_COLS}
      className="market-pulse-masonry"
      columnClassName="market-pulse-masonry-column"
    >
      <div className="market-pulse-masonry-item">
        <ChartPanel />
      </div>
      <div className="market-pulse-masonry-item">
        <WatchlistPanel />
      </div>
      <div className="market-pulse-masonry-item">
        <MarketFlowPanel />
      </div>
      <div className="market-pulse-masonry-item">
        <AlertsPanel />
      </div>
    </Masonry>
  )
}
