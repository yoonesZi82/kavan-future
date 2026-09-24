"use client"

import { useEffect, useState } from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"
import { MoreHorizontalIcon } from "lucide-react"
import type { CandlePoint } from "@/features/market-pulse/types"

type ChartOhlcProps = {
  candle: CandlePoint | null
  livePrice?: number | null
  liveChange?: number | null
}

const SHELL_CLASS =
  "flex h-10 flex-nowrap items-center gap-1.5 overflow-hidden border-b border-border px-2"

function formatNum(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

type StatBadgeProps = {
  label: string
  value: string
  className: string
}

function StatBadge({ label, value, className }: StatBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 min-w-0 gap-1 rounded-md px-1.5 py-0 text-[11px] font-normal",
        className
      )}
    >
      <span className="shrink-0 opacity-70">{label}</span>
      <span className="truncate font-semibold tabular-nums" dir="ltr">
        {value}
      </span>
    </Badge>
  )
}

export function ChartOhlc({
  candle,
  livePrice,
  liveChange,
}: ChartOhlcProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready || (!candle && livePrice == null)) {
    return <div className={SHELL_CLASS} aria-hidden />
  }

  const change =
    candle != null ? candle.close - candle.open : (liveChange ?? 0)
  const changePercent =
    candle != null && candle.open !== 0
      ? (change / candle.open) * 100
      : (liveChange ?? 0)
  const isGain = changePercent >= 0
  const changeText = `${isGain ? "+" : ""}${candle ? formatNum(change) : ""} (${isGain ? "+" : ""}${changePercent.toFixed(2)}٪)`
  const changeTone = isGain
    ? "border-gain/35 bg-gain/10 text-gain"
    : "border-loss/35 bg-loss/10 text-loss"

  const detailBadges = candle ? (
    <>
      <StatBadge
        label="باز"
        value={formatNum(candle.open)}
        className="border-violet-500/35 bg-violet-500/10 text-violet-700 dark:text-violet-300"
      />
      <StatBadge
        label="سقف"
        value={formatNum(candle.high)}
        className="border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      />
      <StatBadge
        label="کف"
        value={formatNum(candle.low)}
        className="border-amber-500/35 bg-amber-500/10 text-amber-800 dark:text-amber-300"
      />
      <StatBadge
        label="بسته"
        value={formatNum(candle.close)}
        className="border-blue-500/35 bg-blue-500/10 text-blue-700 dark:text-blue-300"
      />
    </>
  ) : null

  return (
    <div className={SHELL_CLASS}>
      {livePrice != null ? (
        <StatBadge
          label="زنده"
          value={formatNum(livePrice)}
          className="shrink border-sky-500/35 bg-sky-500/10 text-sky-700 dark:text-sky-300"
        />
      ) : null}
      <StatBadge
        label="تغییر"
        value={changeText}
        className={cn("shrink", changeTone)}
      />
      <div className="hidden min-w-0 flex-1 flex-nowrap items-center gap-1.5 overflow-hidden md:flex">
        {detailBadges}
      </div>
      {candle ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="ms-auto shrink-0 md:hidden"
                aria-label="جزئیات بیشتر OHLC"
              />
            }
          >
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex w-56 flex-col gap-1.5 p-2"
          >
            {detailBadges}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}
