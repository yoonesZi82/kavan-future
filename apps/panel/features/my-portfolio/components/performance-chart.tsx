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
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { PERFORMANCE_SERIES } from "../mock-data"
import type { PerformanceRange } from "../types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const RANGES: readonly { id: PerformanceRange; label: string }[] = [
  { id: "1W", label: "۱ هفته" },
  { id: "1M", label: "۱ ماه" },
  { id: "6M", label: "۶ ماه" },
  { id: "1Y", label: "۱ سال" },
  { id: "ALL", label: "همه" },
]

export function PerformanceChart() {
  const [range, setRange] = useState<PerformanceRange>("6M")

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels: PERFORMANCE_SERIES.map((point) => point.label),
      datasets: [
        {
          data: PERFORMANCE_SERIES.map((point) => point.value),
          borderColor: "#38bdf8",
          backgroundColor: "#38bdf822",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: "#38bdf8",
          tension: 0.35,
          fill: true,
        },
      ],
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
              if (value == null) return ""
              return `${value.toLocaleString("fa-IR")} میلیارد`
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { size: 10 }, maxRotation: 0 },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(128,128,128,0.1)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 10 },
            callback: (value) =>
              typeof value === "number"
                ? `${value.toLocaleString("fa-IR")}B`
                : value,
          },
          border: { display: false },
        },
      },
    }),
    []
  )

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 gap-3 border-b border-border px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-semibold">عملکرد سبد</CardTitle>
          <div className="flex flex-wrap gap-1">
            {RANGES.map((item) => (
              <Button
                key={item.id}
                type="button"
                size="sm"
                variant={range === item.id ? "default" : "ghost"}
                className={cn(
                  "h-7 px-2.5 text-[11px]",
                  range !== item.id && "text-muted-foreground"
                )}
                onClick={() => setRange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 px-3 py-3">
        <div className="h-full min-h-[240px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
