"use client"

import {
  CameraIcon,
  CandlestickChartIcon,
  ChevronDownIcon,
  FullscreenIcon,
  LayoutTemplateIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  INDICATOR_OPTIONS,
  type ChartType,
  type IndicatorId,
} from "@/features/market-pulse/components/chart/chart-options"

const CHART_TYPE_LABEL: Record<ChartType, string> = {
  candle: "کندل",
  line: "خطی",
  area: "ناحیه‌ای",
}

type ChartToolbarMoreProps = {
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

export function ChartToolbarMore(props: ChartToolbarMoreProps) {
  const {
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
  } = props

  return (
    <>
      <div className="ms-auto hidden items-center gap-0.5 md:flex">
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

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="ms-auto shrink-0 md:hidden"
              aria-label="ابزارهای بیشتر"
            />
          }
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>ابزارها</DropdownMenuLabel>
            <DropdownMenuItem onClick={onToggleCompare}>
              <PlusIcon />
              {compareActive ? "خاموش کردن مقایسه" : "مقایسه بازار"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCycleChartType}>
              <CandlestickChartIcon />
              نوع چارت: {CHART_TYPE_LABEL[chartType]}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleSettings}>
              <LayoutTemplateIcon />
              {showSettings ? "مخفی کردن شبکه" : "نمایش شبکه"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSnapshot}>
              <CameraIcon />
              عکس
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onFullscreen}>
              <FullscreenIcon />
              تمام‌صفحه
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
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
    </>
  )
}
