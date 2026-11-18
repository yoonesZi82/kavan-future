import { CrosshairIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { CURRENT_PORTFOLIO_USD, KEY_LEVELS } from "../mock-data"

const valueGlow =
  "[filter:drop-shadow(0_1px_2px_color-mix(in_oklab,currentColor_40%,transparent))_drop-shadow(0_0_12px_color-mix(in_oklab,currentColor_50%,transparent))_drop-shadow(0_0_24px_color-mix(in_oklab,currentColor_25%,transparent))]"

function isNegativePercent(value: string) {
  return /^[-−–]/.test(value.trim())
}

export function KeyLevelsPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="relative overflow-hidden border-b border-border px-4 py-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,color-mix(in_oklab,var(--chart-4)_14%,transparent),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-1 bg-gradient-to-b from-chart-4 via-chart-4/70 to-transparent"
        />
        <CardTitle className="relative flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-chart-4/15 text-chart-4 shadow-[0_0_18px_color-mix(in_oklab,var(--chart-4)_28%,transparent)]">
            <CrosshairIcon className="size-3.5" aria-hidden />
          </span>
          سطوح کلیدی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 py-3">
        <div className="relative overflow-hidden rounded-xl border border-gain/25 bg-gain/5 px-3 py-4 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gain/20 blur-3xl"
          />
          <p className="relative text-[11px] text-muted-foreground">
            ارزش فعلی سبد
          </p>
          <p
            className={cn(
              "relative mt-1 text-2xl font-bold tabular-nums text-gain sm:text-3xl",
              valueGlow
            )}
          >
            ${CURRENT_PORTFOLIO_USD}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border/70">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30 text-muted-foreground">
                <th className="px-2.5 py-2.5 text-start font-medium">سطح</th>
                <th className="px-2.5 py-2.5 text-start font-medium">دلار</th>
                <th className="px-2.5 py-2.5 text-start font-medium">فاصله</th>
              </tr>
            </thead>
            <tbody>
              {KEY_LEVELS.map((level) => {
                const isLoss = isNegativePercent(level.distance)
                return (
                  <tr
                    key={level.id}
                    className="border-b border-border/50 last:border-b-0"
                  >
                    <td className="px-2.5 py-3 font-medium text-foreground/80">
                      {level.label}
                    </td>
                    <td className="px-2.5 py-3 tabular-nums">${level.dollar}</td>
                    <td
                      className={cn(
                        "px-2.5 py-3 font-semibold tabular-nums",
                        isLoss ? "text-loss" : "text-gain",
                        valueGlow
                      )}
                    >
                      {level.distance}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
