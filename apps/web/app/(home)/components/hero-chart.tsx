"use client"

import { MarketingChart } from "@workspace/chart"

/** Live MarketingChart — fills hero column height on lg+. */
export function HeroChart() {
  return (
    <div className="h-[min(420px,70svh)] min-h-[280px] w-full overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)] ring-1 ring-border/50 sm:h-[340px] lg:h-full lg:min-h-0">
      <MarketingChart className="flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl py-0 ring-inset" />
    </div>
  )
}
