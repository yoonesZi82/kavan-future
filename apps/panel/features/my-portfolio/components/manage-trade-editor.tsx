"use client"

import { GlobeIcon, LockIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Input } from "@workspace/ui/components/input"
import { JalaliDatePicker } from "@workspace/ui/components/jalali-date-picker"
import { Label } from "@workspace/ui/components/label"
import type { HoldingLot } from "../manage-trades-mock"

type ManageTradeEditorProps = {
  assetName: string
  unit: string
  lot: HoldingLot
  onChange: (next: HoldingLot) => void
}

export function ManageTradeEditor({
  assetName,
  unit,
  lot,
  onChange,
}: ManageTradeEditorProps) {
  return (
    <div className="space-y-3 border-t border-border/60 px-3 pb-3 pt-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">نوع تراکنش:</span>
          <Badge
            variant="outline"
            className="rounded-full border-gain/40 bg-gain/10 text-gain"
          >
            {lot.type === "buy" ? "خرید" : "فروش"}
          </Badge>
        </div>
        <InputGroup className="h-9 max-w-56 bg-muted/40">
          <InputGroupAddon align="inline-end" className="pe-2.5">
            <LockIcon className="size-3.5 opacity-60" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput value={assetName} readOnly className="text-xs" />
        </InputGroup>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">تعداد / مقدار</Label>
          <InputGroup className="h-9 bg-background font-sans">
            <InputGroupAddon align="inline-end" className="pe-2.5 text-xs text-muted-foreground">
              {unit}
            </InputGroupAddon>
            <InputGroupInput
              value={lot.quantity}
              onChange={(event) =>
                onChange({ ...lot, quantity: event.target.value })
              }
              className="font-sans text-sm tabular-nums"
            />
          </InputGroup>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">قیمت هر واحد (تومان)</Label>
          <InputGroup className="h-9 bg-background font-sans">
            <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
              <GlobeIcon className="size-3.5" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={lot.unitPrice}
              onChange={(event) =>
                onChange({ ...lot, unitPrice: event.target.value })
              }
              className="font-sans text-sm tabular-nums"
            />
          </InputGroup>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">تاریخ معامله</Label>
          <JalaliDatePicker
            value={lot.date}
            onValueChange={(date) => onChange({ ...lot, date })}
            size="sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">یادداشت (اختیاری)</Label>
          <Input
            value={lot.note}
            onChange={(event) => onChange({ ...lot, note: event.target.value })}
            placeholder="توضیح اضافه..."
            className="h-9 bg-background text-xs"
          />
        </div>
      </div>
    </div>
  )
}
