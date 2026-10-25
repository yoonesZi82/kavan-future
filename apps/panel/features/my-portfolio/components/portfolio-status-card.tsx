import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { PORTFOLIO_STATUS } from "../mock-data"

const toneDot = {
  gain: "bg-gain",
  loss: "bg-loss",
  neutral: "bg-muted-foreground",
} as const

const toneValue = {
  gain: "text-gain",
  loss: "text-loss",
  neutral: "text-foreground",
} as const

export function PortfolioStatusCard() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          خلاصه وضعیت سبد
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <div className="flex min-h-full flex-col justify-between gap-1">
        {PORTFOLIO_STATUS.map((row) => (
          <div
            key={row.id}
            className="flex shrink-0 items-center justify-between gap-3 rounded-lg px-2 py-2"
          >
            <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-foreground/70">
              <span
                className={cn("size-2 shrink-0 rounded-full", toneDot[row.tone])}
                aria-hidden
              />
              {row.label}
            </span>
            <span
              className={cn(
                "shrink-0 text-xs font-semibold tabular-nums",
                toneValue[row.tone]
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}
