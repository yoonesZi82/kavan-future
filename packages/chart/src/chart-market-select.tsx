"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"
import type { ChartMarketOption } from "./types"

type ChartMarketSelectProps = {
  markets: ChartMarketOption[]
  selectedId: string | null
  onSelect: (market: ChartMarketOption) => void
  isLoading?: boolean
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function formatChange(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

export function ChartMarketSelect({
  markets,
  selectedId,
  onSelect,
  isLoading = false,
}: ChartMarketSelectProps) {
  const selected =
    markets.find((item) => item.id === selectedId) ?? markets[0] ?? null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-7 max-w-[9.5rem] shrink-0 gap-1 px-2 text-xs"
            disabled={isLoading || markets.length === 0}
          />
        }
      >
        <span className="truncate">
          {isLoading ? "بازارها…" : (selected?.nameFa ?? "انتخاب نماد")}
        </span>
        <ChevronDownIcon className="size-3.5 shrink-0 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="chart-market-select-menu scrollbar-brand max-h-72 overflow-y-auto"
      >
        {markets.map((market) => {
          const isActive = market.id === selected?.id
          const isUp = market.dayChange > 0
          const isDown = market.dayChange < 0
          return (
            <DropdownMenuItem
              key={market.id}
              onClick={() => onSelect(market)}
              className={cn(
                "chart-market-select-item text-xs",
                isActive && "bg-accent"
              )}
            >
              <span className="truncate font-medium">{market.nameFa}</span>
              <span className="tabular-nums text-muted-foreground">
                {formatPrice(market.latest)}
              </span>
              <span
                className={cn(
                  "min-w-16 text-end tabular-nums",
                  isUp && "text-gain",
                  isDown && "text-loss"
                )}
              >
                {formatChange(market.dayChange)}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
