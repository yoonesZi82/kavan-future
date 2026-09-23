import { Card } from "@workspace/ui/components/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export type MarketTickerCardProps = {
  symbol: string
  label: string
  price: string
  change: string
  positive: boolean
  tone?: "green" | "yellow" | "red" | "blue" | "teal" | "gray"
  badge?: string
}

const toneClass: Record<NonNullable<MarketTickerCardProps["tone"]>, string> = {
  green: "bg-gain/15 text-gain",
  yellow: "bg-primary/15 text-primary",
  red: "bg-loss/15 text-loss",
  blue: "bg-chart-4/15 text-chart-4",
  teal: "bg-gain/15 text-gain",
  gray: "bg-muted text-muted-foreground",
}

const strokeClass: Record<NonNullable<MarketTickerCardProps["tone"]>, string> = {
  green: "stroke-gain",
  yellow: "stroke-primary",
  red: "stroke-loss",
  blue: "stroke-chart-4",
  teal: "stroke-gain",
  gray: "stroke-muted-foreground",
}

function Sparkline({
  positive,
  tone,
}: {
  positive: boolean
  tone: NonNullable<MarketTickerCardProps["tone"]>
}) {
  const path = positive
    ? "M0,20 C10,18 20,10 30,12 C40,14 50,6 60,4"
    : "M0,4 C10,8 20,14 30,10 C40,6 50,16 60,18"

  return (
    <svg
      viewBox="0 0 60 24"
      className={cn("h-8 w-16", strokeClass[tone])}
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  )
}

export function MarketTickerCard({
  symbol,
  label,
  price,
  change,
  positive,
  tone = "green",
  badge,
}: MarketTickerCardProps) {
  return (
    <Card
      size="sm"
      className="hover:border-primary/40 cursor-pointer gap-2 border-border/60 bg-card p-3 transition-all hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold",
              toneClass[tone]
            )}
          >
            {symbol}
          </span>
          <span className="flex flex-col">
            <span className="text-muted-foreground text-[11px] font-medium">
              {label}
            </span>
            <span className="text-sm font-bold">{price}</span>
          </span>
        </div>
        {badge ? (
          <span className="bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <Sparkline positive={positive} tone={tone} />
        <span
          className={cn(
            "flex items-center gap-0.5 text-[11px] font-semibold",
            positive ? "text-gain" : "text-loss"
          )}
        >
          {positive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          {change}
        </span>
      </div>
    </Card>
  )
}
