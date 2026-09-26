"use client"

import { useEffect, useState } from "react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel"
import { cn } from "@workspace/ui/lib/utils"
import type { CandlePoint } from "./types"

type ChartOhlcProps = {
  candle: CandlePoint | null
  livePrice?: number | null
  liveChange?: number | null
}

const SHELL_CLASS = "h-10 border-b border-border px-2"

const BADGE_BASE =
  "ohlc-stat-badge h-7 min-w-0 gap-1 rounded-md border-0 px-1.5 py-0 text-[11px] font-normal text-foreground"

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
    <Badge variant="outline" className={cn(BADGE_BASE, className)}>
      <span className="shrink-0 opacity-80">{label}</span>
      <span className="truncate font-semibold tabular-nums" dir="ltr">
        {value}
      </span>
    </Badge>
  )
}

type OhlcSlide = {
  key: string
  label: string
  value: string
  className: string
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

  const slides: OhlcSlide[] = []
  if (livePrice != null) {
    slides.push({
      key: "live",
      label: "زنده",
      value: formatNum(livePrice),
      className: "ohlc-stat-live",
    })
  }
  slides.push({
    key: "change",
    label: "تغییر",
    value: changeText,
    className: isGain ? "ohlc-stat-gain" : "ohlc-stat-loss",
  })
  if (candle) {
    slides.push(
      {
        key: "open",
        label: "باز",
        value: formatNum(candle.open),
        className: "ohlc-stat-open",
      },
      {
        key: "high",
        label: "سقف",
        value: formatNum(candle.high),
        className: "ohlc-stat-high",
      },
      {
        key: "low",
        label: "کف",
        value: formatNum(candle.low),
        className: "ohlc-stat-low",
      },
      {
        key: "close",
        label: "بسته",
        value: formatNum(candle.close),
        className: "ohlc-stat-close",
      }
    )
  }

  return (
    <Carousel
      opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
      className={cn(SHELL_CLASS, "w-full")}
    >
      <CarouselContent className="-ml-1.5 h-10 items-center">
        {slides.map((slide) => (
          <CarouselItem key={slide.key} className="basis-auto pl-1.5">
            <StatBadge
              label={slide.label}
              value={slide.value}
              className={slide.className}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
