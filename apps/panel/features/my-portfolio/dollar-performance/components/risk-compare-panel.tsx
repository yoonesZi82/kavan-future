"use client"

import { useMemo, useState } from "react"
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
import { COMPARE_ASSETS, DRAWDOWN_FROM_PEAK } from "../mock-data"

const COMPARE_ITEMS = COMPARE_ASSETS.map((asset) => ({
  label: asset.label,
  value: asset.id,
}))

export function RiskComparePanel() {
  const [compareId, setCompareId] = useState(COMPARE_ASSETS[0]?.id ?? "btc")

  const selected = useMemo(
    () => COMPARE_ASSETS.find((asset) => asset.id === compareId) ?? COMPARE_ASSETS[0],
    [compareId]
  )

  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">ریسک و مقایسه</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 py-3">
        <div className="rounded-xl border border-border/70 bg-muted/20 px-3 py-2.5">
          <p className="text-[11px] text-muted-foreground">فاصله از اوج ارزش</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-loss">
            {DRAWDOWN_FROM_PEAK}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] text-muted-foreground">مقایسه با</p>
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
            <p className="text-xs leading-relaxed text-muted-foreground">
              {selected.note}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
