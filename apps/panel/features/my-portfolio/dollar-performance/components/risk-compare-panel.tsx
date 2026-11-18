"use client"

import { useMemo, useState } from "react"
import { InfoIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { cn } from "@workspace/ui/lib/utils"
import { COMPARE_ASSETS, DRAWDOWN_FROM_PEAK } from "../mock-data"

const COMPARE_ITEMS = COMPARE_ASSETS.map((asset) => ({
  label: asset.label,
  value: asset.id,
}))

function isNegativePercent(value: string) {
  return /^[-−–]/.test(value.trim())
}

export function RiskComparePanel() {
  const [compareId, setCompareId] = useState(COMPARE_ASSETS[0]?.id ?? "btc")

  const selected = useMemo(
    () => COMPARE_ASSETS.find((asset) => asset.id === compareId) ?? COMPARE_ASSETS[0],
    [compareId]
  )

  const isLoss = isNegativePercent(DRAWDOWN_FROM_PEAK)

  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">ریسک و مقایسه</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 px-0 py-0">
        <div className="relative flex flex-col items-center justify-center overflow-hidden border-e border-border/70 px-3 py-5 text-center sm:px-4">
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
              isLoss ? "bg-loss/25" : "bg-gain/25"
            )}
          />
          <p className="relative text-xs font-medium text-muted-foreground sm:text-sm">
            فاصله از اوج ارزش
          </p>
          <p
            className={cn(
              "relative mt-1.5 text-2xl font-bold tracking-tight tabular-nums sm:text-3xl",
              isLoss ? "text-loss" : "text-gain",
              "[filter:drop-shadow(0_1px_2px_color-mix(in_oklab,currentColor_40%,transparent))_drop-shadow(0_0_14px_color-mix(in_oklab,currentColor_55%,transparent))_drop-shadow(0_0_28px_color-mix(in_oklab,currentColor_28%,transparent))]"
            )}
          >
            {DRAWDOWN_FROM_PEAK}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2.5 px-3 py-5 text-center sm:px-4">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            مقایسه با
          </p>
          <Select
            items={COMPARE_ITEMS}
            value={compareId}
            onValueChange={(value) => {
              if (value === null) return
              setCompareId(value)
            }}
          >
            <SelectTrigger
              className="h-9 w-full min-w-0 bg-background data-[size=default]:h-9"
              dir="rtl"
              aria-label="دارایی مرجع برای مقایسه"
            >
              <SelectValue placeholder="انتخاب دارایی" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectGroup>
                {COMPARE_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selected ? (
            <div
              role="status"
              className="relative flex w-full items-start gap-2 overflow-hidden rounded-xl border border-sky-500/40 bg-sky-500/10 px-2.5 py-2.5 text-start shadow-[0_0_24px_color-mix(in_oklab,var(--color-sky-500)_16%,transparent)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -start-4 top-1/2 size-14 -translate-y-1/2 rounded-full bg-sky-400/25 blur-2xl"
              />
              <span className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">
                <InfoIcon className="size-3.5" aria-hidden />
              </span>
              <p className="relative text-xs font-medium leading-relaxed text-sky-900 dark:text-sky-100">
                {selected.note}
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
