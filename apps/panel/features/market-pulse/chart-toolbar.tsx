"use client"

import {
  CameraIcon,
  CandlestickChartIcon,
  ChevronDownIcon,
  FullscreenIcon,
  LayoutTemplateIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  INDICATOR_OPTIONS,
  TIMEFRAME_OPTIONS,
  type ChartType,
  type IndicatorId,
} from "@/features/market-pulse/chart-options"
import { SymbolPicker } from "@/features/market-pulse/symbol-picker"
import type { ChartTimeframe, MarketPair } from "@/features/market-pulse/types"

type ChartToolbarProps = {
  marketId: string | null
  onMarketChange: (market: MarketPair) => void
  timeframe: ChartTimeframe
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

const CHART_TYPE_LABEL: Record<ChartType, string> = {
  candle: "کندل",
  line: "خطی",
  area: "ناحیه‌ای",
}

export function ChartToolbar({
  marketId,
  onMarketChange,
  timeframe,
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
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
      <SymbolPicker value={marketId} onChange={onMarketChange} />

      <Tabs
        value={timeframe}
        onValueChange={(value) => {
          if (typeof value === "string") {
            onTimeframeChange(value as ChartTimeframe)
          }
        }}
      >
        <TabsList className="h-7">
          {TIMEFRAME_OPTIONS.map((item) => (
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

      <Button
        variant={compareActive ? "secondary" : "ghost"}
        size="icon-sm"
        aria-label="مقایسه بازار"
        onClick={onToggleCompare}
      >
        <PlusIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`نوع چارت: ${CHART_TYPE_LABEL[chartType]}`}
        title={CHART_TYPE_LABEL[chartType]}
        onClick={onCycleChartType}
      >
        <CandlestickChartIcon />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
            />
          }
        >
          اندیکاتورها
          <ChevronDownIcon className="size-3.5 opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>اندیکاتورها</DropdownMenuLabel>
            {INDICATOR_OPTIONS.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.id}
                checked={indicators.includes(item.id)}
                onCheckedChange={() => onToggleIndicator(item.id)}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ms-auto flex items-center gap-0.5">
        <Button
          variant={showSettings ? "secondary" : "ghost"}
          size="icon-sm"
          aria-label="نمایش شبکه"
          onClick={onToggleSettings}
        >
          <LayoutTemplateIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="تنظیمات"
          onClick={onToggleSettings}
        >
          <SettingsIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="عکس"
          onClick={onSnapshot}
        >
          <CameraIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="تمام‌صفحه"
          onClick={onFullscreen}
        >
          <FullscreenIcon />
        </Button>
      </div>
    </div>
  )
}
