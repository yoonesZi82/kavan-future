"use client"

import { ArrowUpRight, BarChart3, Boxes, Gauge } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import {
  ASSET_ANALYSIS_TEXT,
  ASSET_METRICS,
} from "@/features/market-analysis/mock-data"
import type { AssetMetricTone } from "@/features/market-analysis/types"

const METRIC_STYLE: Record<AssetMetricTone, string> = {
  gain: "border-gain/25 bg-gain/5 text-gain",
  loss: "border-loss/25 bg-loss/5 text-loss",
  info: "border-sky-500/25 bg-sky-500/5 text-sky-600 dark:text-sky-400",
  neutral: "border-border bg-muted/40 text-muted-foreground",
}

const METRIC_ICONS = [BarChart3, ArrowUpRight, Boxes, Gauge] as const

export function AssetAnalysisPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-sm md:text-base">تحلیل دارایی</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-300">
              XAU/IRT
            </span>
            <span>طلا ۱۸ عیار</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 py-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ASSET_METRICS.map((metric, index) => {
            const Icon = METRIC_ICONS[index] ?? BarChart3
            return (
              <div
                key={metric.id}
                className={cn(
                  "rounded-lg border px-2.5 py-2",
                  METRIC_STYLE[metric.tone]
                )}
              >
                <div className="mb-1.5 flex items-center justify-between gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    {metric.label}
                  </span>
                  <Icon className="size-3.5 shrink-0 opacity-80" aria-hidden />
                </div>
                <p className="text-xs font-medium text-foreground">
                  {metric.value}
                </p>
              </div>
            )
          })}
        </div>

        <section className="space-y-2">
          <h3 className="text-sm font-medium">تحلیل تکنیکال و فاندامنتال</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            {ASSET_ANALYSIS_TEXT}
          </p>
          <button
            type="button"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            تحلیل تکمیلی
          </button>
        </section>
      </CardContent>
    </Card>
  )
}
