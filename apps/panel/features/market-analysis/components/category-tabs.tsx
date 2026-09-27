"use client"

import { LayoutGroup, motion } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"
import { MARKET_CATEGORIES } from "@/features/market-analysis/data/mock-data"
import type { MarketCategory } from "@/features/market-analysis/types"

type CategoryTabsProps = {
  value: MarketCategory
  onChange: (value: MarketCategory) => void
}

const PILL_SPRING = { type: "spring" as const, stiffness: 420, damping: 34 }

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <LayoutGroup id="market-category-tabs">
      <div
        role="tablist"
        aria-label="دسته‌بندی بازار"
        className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl bg-muted/80 p-1 ring-1 ring-border/60 ring-inset [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                "relative shrink-0 rounded-lg px-3.5 py-1.5 text-sm transition-colors",
                isActive
                  ? "font-semibold text-primary-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="category-tab-pill"
                  className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                  transition={PILL_SPRING}
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
