"use client"

import { MarketingChart } from "@workspace/chart"

/** Live MarketingChart — height matched to hero copy column (~content). */
export function HeroChart() {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)] ring-1 ring-border/50 sm:h-[340px] lg:h-[360px]">
      <MarketingChart className="flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl py-0 ring-inset" />
    </div>
  )
}
