import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { RETURN_METRICS, STATUS_METRICS } from "../mock-data"

const toneClass = {
  gain: "border-gain/30 bg-gain/10 text-gain",
  neutral: "border-border bg-muted/30 text-foreground",
  info: "border-chart-4/30 bg-chart-4/10 text-chart-4",
} as const

export function PortfolioStatusPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">وضعیت سبد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 py-3">
        <div className="grid grid-cols-3 gap-2">
          {STATUS_METRICS.map((metric) => (
            <div
              key={metric.id}
              className={cn(
                "rounded-xl border px-2 py-2.5 text-center",
                toneClass[metric.tone]
              )}
            >
              <p className="text-[10px] font-medium opacity-80">{metric.label}</p>
              <p className="mt-1 text-xs font-bold">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {RETURN_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="rounded-xl border border-border/70 bg-muted/20 px-3 py-2.5"
            >
              <p className="text-[11px] text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-gain">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
