"use client"

import {
  Coins,
  Droplets,
  FileText,
  LineChart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { PREVIOUS_ANALYSES } from "@/features/analyses/mock-data"
import type { AnalysisIconKind } from "@/features/analyses/types"

const ICON_MAP: Record<AnalysisIconKind, LucideIcon> = {
  document: FileText,
  trend: TrendingUp,
  chart: LineChart,
  oil: Droplets,
  coins: Coins,
}

type PreviousAnalysesListProps = {
  selectedId: string | null
  onSelect: (id: string) => void
  onAddNew: () => void
}

export function PreviousAnalysesList({
  selectedId,
  onSelect,
  onAddNew,
}: PreviousAnalysesListProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col gap-4">
      <Button
        type="button"
        className="h-11 w-full gap-1.5 text-sm font-semibold"
        onClick={onAddNew}
      >
        <span aria-hidden>+</span>
        افزودن تحلیل جدید
      </Button>

      <div className="min-h-0 flex-1">
        <h3 className="mb-3 text-sm font-bold">تحلیل‌های پیشین</h3>
        <ul className="flex flex-col gap-2.5">
          {PREVIOUS_ANALYSES.map((item) => {
            const Icon = ICON_MAP[item.icon]
            const isActive = item.id === selectedId
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-start transition-colors",
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/70 bg-muted/40 hover:bg-muted/70"
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground tabular-nums">
                      {item.dateLabel} • {item.timeLabel}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
