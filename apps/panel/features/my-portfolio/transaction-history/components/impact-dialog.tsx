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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"
import type { PortfolioTransaction } from "../types"
import { TypeBadge } from "./type-badge"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

type ImpactDialogProps = {
  transaction: PortfolioTransaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImpactDialog({
  transaction,
  open,
  onOpenChange,
}: ImpactDialogProps) {
  const labels = useMemo(
    () => Array.from({ length: 21 }, (_, i) => String(i - 10)),
    []
  )

  const data: ChartData<"line"> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: transaction ? [...transaction.impactSeries] : [],
          borderColor: "#38bdf8",
          backgroundColor: "#38bdf822",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [labels, transaction]
  )

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          rtl: true,
          callbacks: {
            title: (items) => {
              const day = Number(items[0]?.label ?? 0)
              if (day === 0) return "روز معامله"
              return day > 0 ? `${day} روز بعد` : `${Math.abs(day)} روز قبل`
            },
            label: (ctx) => {
              const value = ctx.parsed.y
              if (value == null) return ""
              return `${value.toLocaleString("fa-IR", {
                maximumFractionDigits: 2,
              })}٪`
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(128,128,128,0.08)" },
          ticks: { color: "#94a3b8", font: { size: 10 }, maxTicksLimit: 7 },
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>تاثیر این معامله بر عملکرد سبد</DialogTitle>
          {transaction ? (
            <DialogDescription className="flex flex-wrap items-center gap-2 pt-1">
              <span>
                {transaction.assetName} ({transaction.assetSymbol})
              </span>
              <TypeBadge type={transaction.type} />
              <span className="tabular-nums">{transaction.date}</span>
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="relative h-[220px] rounded-xl border border-border/60 bg-muted/20 px-2 py-3">
          <div className="pointer-events-none absolute inset-y-3 start-1/2 z-10 w-px -translate-x-1/2 border-s border-dashed border-amber-400/80" />
          <span className="pointer-events-none absolute top-2 start-1/2 z-10 -translate-x-1/2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
            روز معامله
          </span>
          <Line data={data} options={options} />
        </div>
        {transaction ? (
          <div className="grid gap-2 sm:grid-cols-3">
            <Stat
              label="ارزش سبد قبل از معامله"
              value={`${transaction.impactBefore.toLocaleString("fa-IR", {
                maximumFractionDigits: 2,
              })}٪`}
            />
            <Stat
              label="تغییر در عملکرد"
              value={`${transaction.impactChange > 0 ? "+" : ""}${transaction.impactChange.toLocaleString(
                "fa-IR",
                { maximumFractionDigits: 2 }
              )}٪`}
              tone={transaction.impactChange >= 0 ? "gain" : "loss"}
            />
            <Stat
              label="ارزش سبد بعد از معامله"
              value={`${transaction.impactAfter.toLocaleString("fa-IR", {
                maximumFractionDigits: 2,
              })}٪`}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: "gain" | "loss"
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 text-center">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-sm font-bold tabular-nums",
          tone === "gain" && "text-gain",
          tone === "loss" && "text-loss"
        )}
      >
        {value}
      </p>
    </div>
  )
}
