import { ActivityIcon } from "lucide-react"
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

const valueGlow =
  "[filter:drop-shadow(0_1px_2px_color-mix(in_oklab,currentColor_40%,transparent))_drop-shadow(0_0_12px_color-mix(in_oklab,currentColor_50%,transparent))_drop-shadow(0_0_24px_color-mix(in_oklab,currentColor_25%,transparent))]"

function isNegativePercent(value: string) {
  return /^[-−–]/.test(value.trim())
}

export function PortfolioStatusPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="relative overflow-hidden border-b border-border px-4 py-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,color-mix(in_oklab,var(--gain)_14%,transparent),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-1 bg-gradient-to-b from-gain via-gain/70 to-transparent"
        />
        <CardTitle className="relative flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-gain/15 text-gain shadow-[0_0_18px_color-mix(in_oklab,var(--gain)_28%,transparent)]">
            <ActivityIcon className="size-3.5" aria-hidden />
          </span>
          وضعیت سبد
        </CardTitle>
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
              <p
                className={cn(
                  "mt-1 text-xs font-bold",
                  metric.tone === "gain" && valueGlow
                )}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {RETURN_METRICS.map((metric) => {
            const isLoss = isNegativePercent(metric.value)
            return (
              <div
                key={metric.id}
                className="rounded-xl border border-border/70 bg-muted/20 px-3 py-2.5"
              >
                <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                <p
                  className={cn(
                    "mt-1 text-sm font-bold tabular-nums",
                    isLoss ? "text-loss" : "text-gain",
                    valueGlow
                  )}
                >
                  {metric.value}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
