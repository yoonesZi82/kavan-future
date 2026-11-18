import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { CURRENT_PORTFOLIO_USD, KEY_LEVELS } from "../mock-data"

export function KeyLevelsPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">سطوح کلیدی</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col justify-between gap-3 px-3 py-3">
        <div className="rounded-xl border border-gain/25 bg-gain/5 px-3 py-4 text-center">
          <p className="text-[11px] text-muted-foreground">ارزش فعلی سبد</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-gain sm:text-3xl">
            ${CURRENT_PORTFOLIO_USD}
          </p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/70">
          <table className="w-full flex-1 text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30 text-muted-foreground">
                <th className="px-2.5 py-2.5 text-start font-medium">سطح</th>
                <th className="px-2.5 py-2.5 text-start font-medium">دلار</th>
                <th className="px-2.5 py-2.5 text-start font-medium">فاصله</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:h-[1px]">
              {KEY_LEVELS.map((level) => (
                <tr
                  key={level.id}
                  className="border-b border-border/50 last:border-b-0"
                >
                  <td className="px-2.5 py-3 font-medium text-foreground/80">
                    {level.label}
                  </td>
                  <td className="px-2.5 py-3 tabular-nums">${level.dollar}</td>
                  <td className="px-2.5 py-3 font-semibold tabular-nums text-muted-foreground">
                    {level.distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
