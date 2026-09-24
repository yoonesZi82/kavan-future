"use client"

import { cn } from "@workspace/ui/lib/utils"
import { CRISIS_CARDS } from "@/features/market-analysis/data/mock-data"
import type { DecisionAlertTone } from "@/features/market-analysis/types"

const CARD: Record<DecisionAlertTone, string> = {
  danger: "border-loss/35 bg-loss/10",
  warning: "border-amber-500/35 bg-amber-500/10",
  success: "border-gain/35 bg-gain/10",
}

const TITLE: Record<DecisionAlertTone, string> = {
  danger: "text-loss",
  warning: "text-amber-600 dark:text-amber-400",
  success: "text-gain",
}

const BADGE: Record<DecisionAlertTone, string> = {
  danger: "bg-loss/20 text-loss",
  warning: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  success: "bg-gain/20 text-gain",
}

export function CrisisBreakout() {
  return (
    <ul className="flex flex-col gap-2 px-3 py-3">
      {CRISIS_CARDS.map((card) => (
        <li
          key={card.id}
          className={cn("rounded-lg border px-3 py-2.5", CARD[card.tone])}
        >
          <p className={cn("text-sm font-medium", TITLE[card.tone])}>
            {card.title}
          </p>
          {card.value ? (
            <p className="mt-1 text-xs tabular-nums text-muted-foreground">
              {card.value}
            </p>
          ) : null}
          <span
            className={cn(
              "mt-2 inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium",
              BADGE[card.tone]
            )}
          >
            {card.badge}
          </span>
        </li>
      ))}
    </ul>
  )
}
