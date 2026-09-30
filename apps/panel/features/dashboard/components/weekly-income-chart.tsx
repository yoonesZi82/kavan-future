"use client"

import { useMemo } from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { ChevronDown, Wallet } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { WEEKLY_INCOME } from "@/features/dashboard/mock-data"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const COLOR = "#f59e0b"

export function WeeklyIncomeChart() {
  const data: ChartData<"bar"> = useMemo(
    () => ({
      labels: WEEKLY_INCOME.map((point) => point.label.split("\n")),
      datasets: [
        {
          data: WEEKLY_INCOME.map((point) => point.value),
          backgroundColor: COLOR,
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 42,
        },
      ],
    }),
    []
  )

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
          ticks: { color: "#94a3b8", font: { size: 10 } },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(128,128,128,0.1)" },
          ticks: {
            color: "#94a3b8",
            font: { size: 10 },
            callback: (value) => `${value}B`,
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
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Wallet className="size-4" aria-hidden />
            </span>
            <CardTitle className="truncate text-sm font-semibold">
              رشد درآمد هفتگی
            </CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 shrink-0 gap-1 px-2 text-[11px]"
          >
            هفتگی
            <ChevronDown className="size-3.5 opacity-60" aria-hidden />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 px-3 py-3">
        <div className="h-[220px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
