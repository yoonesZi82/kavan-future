"use client"

import { ArrowUpRight, TriangleAlert } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { DECISION_ALERTS } from "@/features/market-analysis/mock-data"
import type { DecisionAlert } from "@/features/market-analysis/types"

const VALUE_TONE: Record<
  NonNullable<DecisionAlert["rows"][number]["valueTone"]>,
  string
> = {
  danger: "text-loss font-medium",
  warning: "text-amber-600 dark:text-amber-400 font-medium",
  muted: "text-foreground",
}

function DecisionAlertCard({ alert }: { alert: DecisionAlert }) {
  const isDanger = alert.tone === "danger"
  return (
    <article
      className={cn(
        "rounded-lg border px-3 py-2.5",
        isDanger
          ? "border-loss/30 bg-loss/5"
          : "border-gain/30 bg-gain/5"
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        {isDanger ? (
          <TriangleAlert className="size-4 shrink-0 text-loss" aria-hidden />
        ) : (
          <ArrowUpRight className="size-4 shrink-0 text-gain" aria-hidden />
        )}
        <h3
          className={cn(
            "text-sm font-medium",
            isDanger ? "text-loss" : "text-gain"
          )}
        >
          {alert.title}
        </h3>
      </div>
      <dl className="space-y-1.5">
        {alert.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className={VALUE_TONE[row.valueTone ?? "muted"]}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export function DecisionAlertsPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-3">
        <CardTitle className="text-sm md:text-base">
          هشدارهای تصمیم‌گیری (پلار)
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        {DECISION_ALERTS.map((alert) => (
          <DecisionAlertCard key={alert.id} alert={alert} />
        ))}
      </CardContent>
    </Card>
  )
}
