import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { PORTFOLIO_KPIS, PORTFOLIO_MIX_PERCENT } from "../mock-data"
import type { PortfolioKpi } from "../types"

function MiniSparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 72
      const y = 24 - ((value - min) / span) * 18
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox="0 0 72 28" className="h-8 w-20 text-gain" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KpiCard({ kpi }: { kpi: PortfolioKpi }) {
  const isGain = kpi.changeTone === "gain"
  const isLoss = kpi.changeTone === "loss"
  const TrendIcon = isLoss ? TrendingDownIcon : TrendingUpIcon

  return (
    <Card className="gap-3 p-4 ring-inset">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-foreground/70">{kpi.title}</p>
        <MiniSparkline values={kpi.sparkline} />
      </div>
      <p className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
        {kpi.value}
      </p>
      <p
        className={cn(
          "flex items-center gap-1 text-xs font-semibold",
          isGain && "text-gain",
          isLoss && "text-loss",
          !isGain && !isLoss && "text-muted-foreground"
        )}
      >
        <TrendIcon className="size-3.5" aria-hidden />
        {kpi.changeLabel}
      </p>
    </Card>
  )
}

function MixCard() {
  const circumference = 2 * Math.PI * 18
  const offset = circumference * (1 - PORTFOLIO_MIX_PERCENT / 100)

  return (
    <Card className="flex flex-row items-center gap-4 p-4 ring-inset">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-xs font-medium text-foreground/70">نسبت کلی سبد</p>
        <p className="text-xl font-bold tabular-nums sm:text-2xl">
          {PORTFOLIO_MIX_PERCENT.toLocaleString("fa-IR")}٪
        </p>
        <p className="text-xs font-medium text-foreground/70">پوشش اهداف تخصیص</p>
      </div>
      <svg viewBox="0 0 48 48" className="size-14 shrink-0" aria-hidden>
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-muted/40"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="origin-center -rotate-90 text-chart-4"
        />
      </svg>
    </Card>
  )
}

export function PortfolioKpiCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {PORTFOLIO_KPIS.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
      <MixCard />
    </div>
  )
}
