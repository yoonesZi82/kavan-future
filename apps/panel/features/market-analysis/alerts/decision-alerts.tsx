"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { DECISION_ALERTS } from "@/features/market-analysis/mock-data"
import type {
  DecisionAlert,
  DecisionAlertTone,
} from "@/features/market-analysis/types"

const VALUE_TONE: Record<
  NonNullable<DecisionAlert["rows"][number]["valueTone"]>,
  string
> = {
  danger: "text-loss font-medium",
  warning: "text-amber-600 dark:text-amber-400 font-medium",
  muted: "text-foreground",
}

const TONE_DOT: Record<DecisionAlertTone, string> = {
  danger: "bg-loss",
  warning: "bg-amber-500",
  success: "bg-gain",
}

const TONE_TEXT: Record<DecisionAlertTone, string> = {
  danger: "text-loss",
  warning: "text-amber-600 dark:text-amber-400",
  success: "text-gain",
}

const TONE_CARD: Record<DecisionAlertTone, string> = {
  danger: "border-loss/30 bg-loss/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  success: "border-gain/30 bg-gain/5",
}

function StatusPulse({ tone }: { tone: DecisionAlertTone }) {
  const color = TONE_DOT[tone]
  return (
    <span className="relative flex size-2 shrink-0" aria-hidden>
      <span
        className={cn(
          "absolute inline-flex size-full animate-ping rounded-full opacity-75",
          color
        )}
      />
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  )
}

function DecisionAlertCard({
  alert,
  defaultOpen,
}: {
  alert: DecisionAlert
  defaultOpen: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <article
      className={cn("overflow-hidden rounded-lg border", TONE_CARD[alert.tone])}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-start",
          isOpen && "border-b border-border/80"
        )}
      >
        <StatusPulse tone={alert.tone} />
        <h3
          className={cn(
            "min-w-0 flex-1 text-sm font-medium",
            TONE_TEXT[alert.tone]
          )}
        >
          {alert.title}
        </h3>
        <ChevronDown
          className={cn(
            "ms-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      {isOpen ? (
        <dl className="flex flex-col px-3 py-1">
          {alert.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-2 border-b border-dashed border-border/70 py-2 text-xs last:border-b-0"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={VALUE_TONE[row.valueTone ?? "muted"]}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
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
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-3">
        {DECISION_ALERTS.map((alert, index) => (
          <DecisionAlertCard
            key={alert.id}
            alert={alert}
            defaultOpen={index === 0}
          />
        ))}
      </CardContent>
    </Card>
  )
}
