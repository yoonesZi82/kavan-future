"use client"

import { cn } from "@workspace/ui/lib/utils"
import { ANALYSES_TABS } from "@/features/analyses/mock-data"
import type { AnalysesTabId } from "@/features/analyses/types"

type AnalysesTabsProps = {
  value: AnalysesTabId
  onChange: (value: AnalysesTabId) => void
}

export function AnalysesTabs({ value, onChange }: AnalysesTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="بخش تحلیل‌ها"
      className="flex w-full items-center gap-6 border-b border-border"
    >
      {ANALYSES_TABS.map((tab) => {
        const isActive = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative -mb-px pb-3 text-sm transition-colors",
              isActive
                ? "font-bold text-foreground"
                : "font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {isActive ? (
              <span
                className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-primary"
                aria-hidden
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
