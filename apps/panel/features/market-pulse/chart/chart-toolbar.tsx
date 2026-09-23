"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  TIMEFRAME_OPTIONS,
  type ChartType,
  type IndicatorId,
} from "@/features/market-pulse/chart/chart-options"
import { ChartToolbarMore } from "@/features/market-pulse/chart/chart-toolbar-more"
import type { ChartTimeframe } from "@/features/market-pulse/types"

type ChartToolbarProps = {
  timeframe: ChartTimeframe
  timeframeOptions: ChartTimeframe[]
  onTimeframeChange: (value: ChartTimeframe) => void
  chartType: ChartType
  onCycleChartType: () => void
  indicators: IndicatorId[]
  onToggleIndicator: (id: IndicatorId) => void
  compareActive: boolean
  onToggleCompare: () => void
  showSettings: boolean
  onToggleSettings: () => void
  onSnapshot: () => void
  onFullscreen: () => void
}

export function ChartToolbar({
  timeframe,
  timeframeOptions,
  onTimeframeChange,
  chartType,
  onCycleChartType,
  indicators,
  onToggleIndicator,
  compareActive,
  onToggleCompare,
  showSettings,
  onToggleSettings,
  onSnapshot,
  onFullscreen,
}: ChartToolbarProps) {
  const options = TIMEFRAME_OPTIONS.filter((item) =>
    timeframeOptions.includes(item.value)
  )
  const timeframeLabel =
    options.find((item) => item.value === timeframe)?.label ??
    options[0]?.label ??
    "—"

  return (
    <div className="flex flex-nowrap items-center gap-1 overflow-hidden border-b border-border px-2 py-1.5">
      {options.length > 0 ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 gap-1 px-2 text-xs md:hidden"
                />
              }
            >
              {timeframeLabel}
              <ChevronDownIcon className="size-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>بازه زمانی</DropdownMenuLabel>
                {options.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => onTimeframeChange(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tabs
            value={timeframe}
            onValueChange={(value) => {
              if (typeof value === "string") {
                onTimeframeChange(value as ChartTimeframe)
              }
            }}
            className="hidden min-w-0 md:block"
          >
            <TabsList className="h-7">
              {options.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="px-1.5 text-[11px]"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </>
      ) : (
        <span className="px-1 text-[11px] text-muted-foreground">
          بدون تاریخچه چارت
        </span>
      )}
      <ChartToolbarMore
        chartType={chartType}
        onCycleChartType={onCycleChartType}
        indicators={indicators}
        onToggleIndicator={onToggleIndicator}
        compareActive={compareActive}
        onToggleCompare={onToggleCompare}
        showSettings={showSettings}
        onToggleSettings={onToggleSettings}
        onSnapshot={onSnapshot}
        onFullscreen={onFullscreen}
      />
    </div>
  )
}
