"use client"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import type { CandlePoint } from "@/features/market-pulse/types"

type ChartOhlcProps = {
  candle: CandlePoint | null
  livePrice?: number | null
  liveChange?: number | null
}

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
        "h-auto gap-1.5 rounded-md px-2 py-1 text-[11px] font-normal",
        className
      )}
    >
      <span className="opacity-70">{label}</span>
      <span className="font-semibold tabular-nums" dir="ltr">
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
  if (!candle && livePrice == null) return null

  const change =
    candle != null ? candle.close - candle.open : (liveChange ?? 0)
  const changePercent =
    candle != null && candle.open !== 0
      ? (change / candle.open) * 100
      : (liveChange ?? 0)
  const isGain = changePercent >= 0
  const changeText = `${isGain ? "+" : ""}${candle ? formatNum(change) : ""} (${isGain ? "+" : ""}${changePercent.toFixed(2)}٪)`

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-2 py-1.5">
      {livePrice != null ? (
        <StatBadge
          label="زنده"
          value={formatNum(livePrice)}
          className="border-sky-500/35 bg-sky-500/10 text-sky-700 dark:text-sky-300"
        />
      ) : null}
      {candle ? (
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
      ) : null}
      <StatBadge
        label="تغییر"
        value={changeText}
        className={
          isGain
            ? "border-gain/35 bg-gain/10 text-gain"
            : "border-loss/35 bg-loss/10 text-loss"
        }
      />
    </div>
  )
}
