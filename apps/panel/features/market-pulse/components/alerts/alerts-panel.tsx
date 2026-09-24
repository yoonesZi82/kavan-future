"use client"

import { Bell, Info } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"
import { useAlertsQuery } from "@/features/market-pulse/data/hooks"
import type { AlertItem } from "@/features/market-pulse/types"

function AlertRow({ alert }: { alert: AlertItem }) {
  const isActive = alert.isActive

  return (
    <li
      className={cn(
        "group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-all duration-200",
        "ring-1 ring-inset",
        isActive
          ? "bg-gradient-to-l from-gain/12 via-gain/5 to-transparent ring-gain/25 hover:from-gain/18 hover:ring-gain/40"
          : "bg-muted/40 ring-border/80 hover:bg-muted/60"
      )}
    >
      {/* * Accent rail — status at a glance in RTL */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-2 start-0 w-1 rounded-full",
          isActive ? "bg-gain shadow-[0_0_10px_var(--color-gain)]" : "bg-loss/70"
        )}
      />
      <div className="flex min-w-0 items-center gap-2.5 ps-2">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            isActive
              ? "bg-gain/15 text-gain ring-1 ring-gain/20"
              : "bg-loss/10 text-loss/80 ring-1 ring-loss/15"
          )}
        >
          <Bell className="size-3.5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium tracking-tight">
            {alert.title}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {isActive ? "در حال پایش بازار" : "هشدار متوقف شده"}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium",
            isActive
              ? "bg-gain/15 text-gain ring-1 ring-gain/25"
              : "bg-loss/10 text-loss ring-1 ring-loss/20"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              isActive ? "animate-pulse bg-gain" : "bg-loss"
            )}
            aria-hidden
          />
          {isActive ? "فعال" : "غیرفعال"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground opacity-70 transition-opacity group-hover:opacity-100"
          aria-label={`جزئیات ${alert.title}`}
        >
          <Info />
        </Button>
      </div>
    </li>
  )
}

export function AlertsPanel() {
  const { data, isLoading } = useAlertsQuery()
  const activeCount = data?.filter((a) => a.isActive).length ?? 0

  return (
    <Card className="h-fit gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="relative gap-0 overflow-hidden border-b border-border px-4 py-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-amber-500/10 via-transparent to-transparent"
        />
        <div className="relative flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/25 dark:text-amber-400">
              <Bell className="size-4" aria-hidden />
            </span>
            <div>
              <CardTitle className="text-sm md:text-base">
                هشدارهای فعال بازار
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                اعلان‌های زنده دارایی‌ها
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium tabular-nums ring-1 ring-border backdrop-blur-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
            {data?.length ?? 0} مورد
            {activeCount > 0 ? (
              <span className="text-muted-foreground">· {activeCount} فعال</span>
            ) : null}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-3">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {data?.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
