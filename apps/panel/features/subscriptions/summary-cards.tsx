import type { ReactNode } from "react"
import {
  BarChart3Icon,
  ChevronLeftIcon,
  CircleCheckIcon,
  TrendingUpIcon,
  UserXIcon,
} from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { SUMMARY_STATS } from "@/features/subscriptions/mock-data"
import type { SummaryStat } from "@/features/subscriptions/types"

const STAT_ICONS: Record<string, { icon: ReactNode; className: string }> = {
  income: {
    icon: <BarChart3Icon className="size-5" aria-hidden />,
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  "success-users": {
    icon: <CircleCheckIcon className="size-5" aria-hidden />,
    className: "bg-gain/15 text-gain",
  },
  "failed-users": {
    icon: <UserXIcon className="size-5" aria-hidden />,
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
}

function SummaryCard({ stat }: { stat: SummaryStat }) {
  const visual = STAT_ICONS[stat.id]
  const isUpGood = stat.changeTone === "up"

  return (
    <Card className="gap-3 p-4 ring-inset">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{stat.title}</span>
            <ChevronLeftIcon className="size-3.5 opacity-50" aria-hidden />
          </div>
          <p className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
            {stat.value}
            {stat.unit ? (
              <span className="ms-1 text-sm font-medium text-muted-foreground">
                {stat.unit}
              </span>
            ) : null}
          </p>
          <p
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              isUpGood ? "text-gain" : "text-loss"
            )}
          >
            <TrendingUpIcon className="size-3.5" aria-hidden />
            {`${stat.changePercent.toLocaleString("fa-IR", {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            })}٪ نسبت به دوره قبل`}
          </p>
        </div>
        {visual ? (
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full",
              visual.className
            )}
          >
            {visual.icon}
          </span>
        ) : null}
      </div>
    </Card>
  )
}

export function SummaryCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {SUMMARY_STATS.map((stat) => (
        <SummaryCard key={stat.id} stat={stat} />
      ))}
    </div>
  )
}
