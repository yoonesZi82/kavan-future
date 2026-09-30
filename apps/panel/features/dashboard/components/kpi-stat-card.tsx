import type { ReactNode } from "react"
import { TrendingUp } from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import type { KpiStat, KpiTone } from "@/features/dashboard/types"

const toneIcon: Record<KpiTone, string> = {
  blue: "bg-chart-4/15 text-chart-4",
  purple: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  green: "bg-gain/15 text-gain",
  orange: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  teal: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
}

const toneStroke: Record<KpiTone, string> = {
  blue: "text-chart-4",
  purple: "text-violet-500",
  green: "text-gain",
  orange: "text-amber-500",
  teal: "text-teal-500",
}

function MiniSparkline({
  values,
  tone,
}: {
  values: number[]
  tone: KpiTone
}) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 60
      const y = 22 - ((value - min) / span) * 18
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox="0 0 60 24" className={cn("h-8 w-16", toneStroke[tone])} aria-hidden>
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

type KpiStatCardProps = {
  stat: KpiStat
  icon: ReactNode
}

export function KpiStatCard({ stat, icon }: KpiStatCardProps) {
  return (
    <Card className="gap-3 p-4 ring-inset">
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full",
            toneIcon[stat.tone]
          )}
        >
          {icon}
        </span>
        <MiniSparkline values={stat.sparkline} tone={stat.tone} />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{stat.title}</p>
        <p className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
          {stat.value}
        </p>
      </div>
      <p className="flex items-center gap-1 text-xs font-semibold text-gain">
        <TrendingUp className="size-3.5" aria-hidden />
        {`+${stat.changePercent.toLocaleString("fa-IR", {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })}٪`}
      </p>
    </Card>
  )
}
