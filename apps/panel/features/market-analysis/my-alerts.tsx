"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Info,
  TriangleAlert,
} from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { MY_ALERTS } from "@/features/market-analysis/mock-data"
import type { MyAlertTone } from "@/features/market-analysis/types"

const TONE_ICON: Record<
  MyAlertTone,
  { Icon: typeof TriangleAlert; className: string }
> = {
  danger: { Icon: TriangleAlert, className: "bg-loss/15 text-loss" },
  success: { Icon: ArrowUpRight, className: "bg-gain/15 text-gain" },
  warning: {
    Icon: ArrowDownRight,
    className: "bg-amber-500/15 text-amber-600",
  },
  info: { Icon: Info, className: "bg-sky-500/15 text-sky-600" },
}

const DOT: Record<MyAlertTone, string> = {
  danger: "bg-loss",
  success: "bg-gain",
  warning: "bg-amber-500",
  info: "bg-sky-500",
}

export function MyAlertsPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Bell
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <CardTitle className="truncate text-sm md:text-base">
              هشدارهای فعال من
            </CardTitle>
          </div>
          <Badge variant="outline">
            {MY_ALERTS.length.toLocaleString("fa-IR")} مورد
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <ul className="divide-y divide-border">
          {MY_ALERTS.map((alert) => {
            const { Icon, className } = TONE_ICON[alert.tone]
            return (
              <li
                key={alert.id}
                className="flex items-center gap-3 px-2 py-2.5"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    className
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">
                      {alert.title}
                    </p>
                    <time className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                      {alert.time}
                    </time>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      {alert.asset}
                    </span>
                    {" — "}
                    {alert.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    DOT[alert.tone]
                  )}
                  aria-hidden
                />
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
