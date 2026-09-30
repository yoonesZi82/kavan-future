"use client"

import { useMemo } from "react"
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
import { ChevronDown, TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { YEARLY_INCOME } from "@/features/dashboard/mock-data"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const COLOR = "#14b8a6"

export function YearlyIncomeChart() {
  const data: ChartData<"line"> = useMemo(
    () => ({
      labels: YEARLY_INCOME.map((point) => point.label),
      datasets: [
        {
          data: YEARLY_INCOME.map((point) => point.value),
          borderColor: COLOR,
          backgroundColor: `${COLOR}28`,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: COLOR,
          tension: 0.4,
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
              return `${value.toLocaleString("fa-IR", {
                maximumFractionDigits: 2,
              })}T`
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { size: 9 }, maxRotation: 0 },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(128,128,128,0.1)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 10 },
            callback: (value) => `${value}T`,
          },
          border: { display: false },
        },
      },
    }),
    []
  )

  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <TrendingUp className="size-4" aria-hidden />
            </span>
            <CardTitle className="truncate text-sm font-semibold">
              رشد درآمد سالانه
            </CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 shrink-0 gap-1 px-2 text-[11px]"
          >
            سالانه
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
