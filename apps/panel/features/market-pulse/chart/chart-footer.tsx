"use client"

import { useEffect, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import {
  RANGE_OPTIONS,
  type RangeKey,
  type ScaleMode,
} from "@/features/market-pulse/chart/chart-options"

type ChartFooterProps = {
  range: RangeKey
  onRangeChange: (value: RangeKey) => void
  scaleMode: ScaleMode
  onScaleChange: (value: ScaleMode) => void
  statusMessage: string | null
}

const SCALES: { value: ScaleMode; label: string }[] = [
  { value: "percent", label: "٪" },
  { value: "log", label: "لگاریتمی" },
  { value: "normal", label: "خودکار" },
]

export function ChartFooter({
  range,
  onRangeChange,
  scaleMode,
  onScaleChange,
  statusMessage,
}: ChartFooterProps) {
  const [clock, setClock] = useState("")

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Tehran",
        }).format(new Date())
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    // * Narrow widths: ranges scroll horizontally instead of wrapping into the chart
    <div className="flex shrink-0 items-center gap-1 border-t border-border px-2 py-1">
      <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
        {RANGE_OPTIONS.map((item) => (
          <Button
            key={item.value}
            variant="ghost"
            size="sm"
            className={cn(
              "h-6 shrink-0 px-1.5 text-[11px]",
              range === item.value && "bg-muted font-medium text-foreground"
            )}
            onClick={() => onRangeChange(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
        {statusMessage ? (
          <span className="max-w-20 truncate text-sidebar-primary sm:max-w-none">
            {statusMessage}
          </span>
        ) : null}
        <span className="tabular-nums">{clock}</span>
        <div className="flex items-center gap-0.5">
          {SCALES.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 shrink-0 px-1.5 text-[11px]",
                scaleMode === item.value &&
                  "bg-muted font-medium text-foreground"
              )}
              onClick={() => onScaleChange(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
