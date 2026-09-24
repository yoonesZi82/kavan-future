"use client"

import { useMemo, useState } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import {
  INDICATOR_CHART_OPTIONS,
  INDICATOR_NAMES_FA,
  INDICATOR_RANGES,
  buildIndicatorChartData,
  buildIndicatorSeries,
  endValueBadgePlugin,
  type IndicatorChartRange,
} from "@/features/market-analysis/components/details/indicator-chart-config"
import { ANALYSIS_INDICATORS } from "@/features/market-analysis/data/mock-data"
import type { IndicatorStatus } from "@/features/market-analysis/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const STATUS_DOT: Record<IndicatorStatus, string> = {
  warning: "bg-amber-500",
  normal: "bg-emerald-500",
  neutral: "bg-muted-foreground/40",
}

type SelectedIndicatorChartProps = {
  selectedId: string
}

export function SelectedIndicatorChart({
  selectedId,
}: SelectedIndicatorChartProps) {
  const [range, setRange] = useState<IndicatorChartRange>("1Y")
  const selected =
    ANALYSIS_INDICATORS.find((item) => item.id === selectedId) ??
    ANALYSIS_INDICATORS[0]
  const series = useMemo(
    () => buildIndicatorSeries(selected?.sparkline ?? [0, 1, 2]),
    [selected]
  )
  const endLabel = selected?.value ?? ""
  const data = useMemo(() => buildIndicatorChartData(series), [series])
  const plugins = useMemo(() => [endValueBadgePlugin(endLabel)], [endLabel])

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border px-3 py-3">
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-sm md:text-base">
            نمودار شاخص انتخابی
          </CardTitle>
          {selected ? (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  STATUS_DOT[selected.status]
                )}
              />
              {INDICATOR_NAMES_FA[selected.id] ?? selected.name}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-muted/60 p-0.5">
          {INDICATOR_RANGES.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="xs"
              variant={range === item.id ? "secondary" : "ghost"}
              className={cn(
                "h-6 rounded-full px-2 text-[10px]",
                range === item.id && "bg-background shadow-sm"
              )}
              onClick={() => setRange(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="relative min-h-0 flex-1 p-3">
        <div className="h-full min-h-[180px]">
          <Line
            data={data}
            options={INDICATOR_CHART_OPTIONS}
            plugins={plugins}
          />
        </div>
      </CardContent>
    </Card>
  )
}
