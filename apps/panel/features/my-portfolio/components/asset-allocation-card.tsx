"use client"

import { useMemo } from "react"
import {
  ArcElement,
  Chart as ChartJS,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { ALLOCATION_SLICES } from "../mock-data"

ChartJS.register(ArcElement, Tooltip)

export function AssetAllocationCard() {
  const data: ChartData<"doughnut"> = useMemo(
    () => ({
      labels: ALLOCATION_SLICES.map((slice) => slice.label),
      datasets: [
        {
          data: ALLOCATION_SLICES.map((slice) => slice.percent),
          backgroundColor: ALLOCATION_SLICES.map((slice) => slice.color),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }),
    []
  )

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          rtl: true,
          callbacks: {
            label: (ctx) => {
              const value = ctx.parsed
              return `${ctx.label}: ${value.toLocaleString("fa-IR")}٪`
            },
          },
        },
      },
    }),
    []
  )

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">تخصیص دارایی</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col justify-center gap-4 px-4 py-4 sm:flex-row sm:items-center">
        <div className="mx-auto aspect-square h-[140px] w-[140px] shrink-0 sm:h-[150px] sm:w-[150px]">
          <Doughnut data={data} options={options} />
        </div>
        <ul className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          {ALLOCATION_SLICES.map((slice) => (
            <li
              key={slice.id}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                  aria-hidden
                />
                <span className="truncate font-medium text-foreground/70">
                  {slice.label}
                </span>
              </span>
              <span className="font-semibold tabular-nums">
                {slice.percent.toLocaleString("fa-IR")}٪
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
