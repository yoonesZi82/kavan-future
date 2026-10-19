import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { TOP_GAINERS, TOP_LOSERS } from "../mock-data"
import type { Mover } from "../types"

function MoverList({
  title,
  items,
  tone,
}: {
  title: string
  items: readonly Mover[]
  tone: "gain" | "loss"
}) {
  const Icon = tone === "gain" ? TrendingUpIcon : TrendingDownIcon

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 border-b border-border px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Icon
            className={cn(
              "size-3.5",
              tone === "gain" ? "text-gain" : "text-loss"
            )}
            aria-hidden
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col px-2 py-2">
        <ul className="flex h-full flex-col justify-between">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-1 items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs"
            >
              <span className="truncate text-muted-foreground">{item.name}</span>
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  tone === "gain" ? "text-gain" : "text-loss"
                )}
              >
                {`${item.changePercent > 0 ? "+" : ""}${item.changePercent.toLocaleString(
                  "fa-IR",
                  { maximumFractionDigits: 1 }
                )}٪`}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export function MoversPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex min-h-0 flex-1 flex-col">
        <MoverList title="بیشترین کاهش‌ها" items={TOP_LOSERS} tone="loss" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <MoverList title="بیشترین افزایش‌ها" items={TOP_GAINERS} tone="gain" />
      </div>
    </div>
  )
}
