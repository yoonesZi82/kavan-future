"use client"

import { Bell } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { ACTIVE_ALERTS } from "@/features/market-analysis/mock-data"
import type { DecisionAlertTone } from "@/features/market-analysis/types"

const DOT: Record<DecisionAlertTone, string> = {
  danger: "bg-loss",
  warning: "bg-amber-500",
  success: "bg-gain",
}

const CARD: Record<DecisionAlertTone, string> = {
  danger: "border-loss/25 bg-loss/5",
  warning: "border-amber-500/25 bg-amber-500/5",
  success: "border-gain/25 bg-gain/5",
}

export function ActiveAlertsPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" aria-hidden />
            <CardTitle className="text-sm md:text-base">هشدارهای فعال</CardTitle>
          </div>
          <button
            type="button"
            className="text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            مشاهده همه هشدارها
          </button>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {ACTIVE_ALERTS.map((alert) => (
          <article
            key={alert.id}
            className={cn("rounded-lg border px-3 py-2.5", CARD[alert.tone])}
          >
            <div className="flex items-start gap-2">
              <span
                className={cn("mt-1 size-2 shrink-0 rounded-full", DOT[alert.tone])}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-medium">{alert.title}</h3>
                  <time className="shrink-0 text-[10px] text-muted-foreground">
                    {alert.time}
                  </time>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{alert.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  )
}
