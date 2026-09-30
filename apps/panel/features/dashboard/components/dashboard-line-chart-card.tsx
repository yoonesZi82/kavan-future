"use client"

import { useMemo, type ReactNode } from "react"
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
import { ChevronDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import type { DashboardSeriesPoint } from "@/features/dashboard/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

type DashboardLineChartCardProps = {
  title: string
  icon: ReactNode
  periodLabel: string
  color: string
  points: readonly DashboardSeriesPoint[]
  formatValue?: (value: number) => string
}

export function DashboardLineChartCard({
  title,
  icon,
  periodLabel,
  color,
  points,
  formatValue = (value) => value.toLocaleString("fa-IR"),
}: DashboardLineChartCardProps) {
  const data: ChartData<"line"> = useMemo(
    () => ({
      labels: points.map((point) => point.label),
      datasets: [
        {
          data: points.map((point) => point.value),
          borderColor: color,
          backgroundColor: `${color}22`,
          borderWidth: 2.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: color,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [color, points]
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
              return formatValue(value)
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
              typeof value === "number" ? formatValue(value) : value,
          },
          border: { display: false },
        },
      },
    }),
    [formatValue]
  )

  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              {icon}
            </span>
            <CardTitle className="truncate text-sm font-semibold">
              {title}
            </CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 shrink-0 gap-1 px-2 text-[11px]"
          >
            {periodLabel}
            <ChevronDown className="size-3.5 opacity-60" aria-hidden />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 px-3 py-3">
        <div className="h-[220px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
