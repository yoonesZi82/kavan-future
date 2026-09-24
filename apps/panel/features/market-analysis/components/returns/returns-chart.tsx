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
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Crosshair } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import {
  RETURNS_LABELS,
  RETURNS_RANGES,
  RETURNS_SERIES,
} from "@/features/market-analysis/data/mock-data"
import type { ReturnsRange } from "@/features/market-analysis/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const RANGE_LABELS: Record<ReturnsRange, string> = {
  "1M": "۱ماه",
  "3M": "۳ماه",
  "6M": "۶ماه",
  "1Y": "۱سال",
}

export function ReturnsChart() {
  const [range, setRange] = useState<ReturnsRange>("1M")

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels: RETURNS_LABELS,
      datasets: RETURNS_SERIES.map((item) => ({
        label: item.label,
        data: item.data,
        borderColor: item.color,
        backgroundColor: `${item.color}22`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        tension: 0.35,
        fill: false,
      })),
    }),
    []
  )

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          rtl: true,
          callbacks: {
            label: (ctx) => {
              const value = ctx.parsed.y
              if (value == null) return ctx.dataset.label ?? ""
              const sign = value > 0 ? "+" : ""
              return `${ctx.dataset.label}: ${sign}${value.toFixed(1)}٪`
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(128,128,128,0.08)" },
          ticks: { color: "#94a3b8", font: { size: 10 } },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(128,128,128,0.1)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 10 },
            callback: (value) => `${value}٪`,
          },
          border: { display: false },
        },
      },
    }),
    []
  )

  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="gap-2 border-b border-border px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Crosshair className="size-3.5 text-muted-foreground" aria-hidden />
            <CardTitle className="text-sm md:text-base">بازدهی دارایی‌ها</CardTitle>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {RETURNS_RANGES.map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={range === key ? "secondary" : "ghost"}
                className={cn("h-7 px-2 text-[11px]", range === key && "font-medium")}
                onClick={() => setRange(key)}
              >
                {RANGE_LABELS[key]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 px-3 py-2">
        <div className="h-full min-h-[180px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border px-3 py-2">
        {RETURNS_SERIES.map((item) => (
          <li key={item.id} className="flex items-center gap-1.5 text-[11px]">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-gain tabular-nums">{item.change}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
