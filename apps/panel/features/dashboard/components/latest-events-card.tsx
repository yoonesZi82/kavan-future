import Link from "next/link"
import {
  ChevronLeft,
  ShoppingCart,
  UserMinus,
  UserPlus,
  XCircle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { LATEST_EVENTS } from "@/features/dashboard/mock-data"
import type { DashboardEventTone } from "@/features/dashboard/types"

const toneClass: Record<DashboardEventTone, string> = {
  red: "bg-loss/15 text-loss",
  blue: "bg-chart-4/15 text-chart-4",
  green: "bg-gain/15 text-gain",
  purple: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
}

const toneIcon: Record<DashboardEventTone, typeof XCircle> = {
  red: XCircle,
  blue: UserMinus,
  green: ShoppingCart,
  purple: UserPlus,
}

export function LatestEventsCard() {
  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold">آخرین رویدادها</CardTitle>
          <Link
            href="#"
            className="text-[11px] font-medium text-primary hover:underline"
          >
            مشاهده همه
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-2 py-2">
        <ul className="flex flex-col">
          {LATEST_EVENTS.map((event) => {
            const Icon = toneIcon[event.tone]
            return (
              <li key={event.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-start transition-colors hover:bg-muted/70"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      toneClass[event.tone]
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {event.title}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="font-semibold tabular-nums text-foreground">
                        {event.count.toLocaleString("fa-IR")}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{event.timeLabel}</span>
                    </span>
                  </span>
                  <ChevronLeft
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
