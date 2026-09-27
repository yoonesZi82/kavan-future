"use client"

import { Activity, Thermometer } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { ANALYSIS_INDICATORS } from "@/features/market-analysis/data/mock-data"
import type { IndicatorStatus } from "@/features/market-analysis/types"

const BADGE: Record<IndicatorStatus, string> = {
  warning: "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  normal: "border-gain/40 bg-gain/15 text-gain",
  neutral: "border-border bg-muted text-muted-foreground",
}

const ICONS = {
  bubble: Thermometer,
  strength: Activity,
} as const

const LABELS: Record<string, string> = {
  bubble: "حباب طلا ۱۸",
  strength: "نسبت طلا به دلار",
}

/** * Mobile: two metric chips under the chart (mockup row). */
export function IndicatorSummaryRow() {
  const items = ANALYSIS_INDICATORS.filter(
    (item) => item.id === "bubble" || item.id === "strength"
  )
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((item) => {
        const Icon = ICONS[item.id as keyof typeof ICONS] ?? Activity
        return (
          <article
            key={item.id}
            className="flex min-w-0 flex-col gap-2 rounded-xl border border-border bg-card p-3 ring-inset"
          >
            <div className="flex items-start gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  {LABELS[item.id] ?? item.name}
                </p>
                <p className="mt-0.5 text-base font-semibold tabular-nums tracking-tight">
                  {item.value}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex w-fit rounded-md border px-2 py-0.5 text-[11px] font-medium",
                BADGE[item.status]
              )}
            >
              {item.statusLabel}
            </span>
          </article>
        )
      })}
    </div>
  )
}
