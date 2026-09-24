"use client"

import { cn } from "@workspace/ui/lib/utils"
import { MARKET_CATEGORIES } from "@/features/market-analysis/data/mock-data"
import type { MarketCategory } from "@/features/market-analysis/types"

type CategoryTabsProps = {
  value: MarketCategory
  onChange: (value: MarketCategory) => void
}

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="دسته‌بندی بازار"
      className="flex items-center gap-1 overflow-x-auto border-b border-border"
    >
      {MARKET_CATEGORIES.map((item) => {
        const isActive = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative shrink-0 px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "font-medium text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {isActive ? (
              <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary" />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
