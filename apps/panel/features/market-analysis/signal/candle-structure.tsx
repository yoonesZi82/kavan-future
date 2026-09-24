"use client"

import { Activity, ArrowUpRight, SignalHigh } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import {
  CANDLE_FOOTER,
  CANDLE_METRICS,
} from "@/features/market-analysis/mock-data"
import type { CandleMetric } from "@/features/market-analysis/types"

const ICONS = {
  structure: Activity,
  power: SignalHigh,
  direction: ArrowUpRight,
} as const

const TONE: Record<CandleMetric["tone"], string> = {
  gain: "text-gain",
  loss: "text-loss",
  info: "text-sky-500",
}

export function CandleStructure() {
  return (
    <div className="space-y-2.5 px-3 py-3">
      <div className="grid grid-cols-3 gap-2">
        {CANDLE_METRICS.map((metric) => {
          const Icon = ICONS[metric.id as keyof typeof ICONS] ?? Activity
          return (
            <div
              key={metric.id}
              className="rounded-lg border border-border bg-muted/30 px-2 py-2 text-center"
            >
              <Icon
                className={cn("mx-auto mb-1 size-4", TONE[metric.tone])}
                aria-hidden
              />
              <p className="text-[10px] text-muted-foreground">{metric.label}</p>
              <p
                className={cn(
                  "mt-0.5 text-[11px] font-medium",
                  TONE[metric.tone]
                )}
              >
                {metric.value}
              </p>
            </div>
          )
        })}
      </div>
      <p className="text-[11px] leading-5 text-muted-foreground">
        {CANDLE_FOOTER}
      </p>
    </div>
  )
}
