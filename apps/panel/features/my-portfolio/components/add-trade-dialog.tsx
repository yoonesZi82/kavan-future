"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import {
  AlertTriangleIcon,
  ChartColumnIncreasingIcon,
  CrosshairIcon,
  RefreshCwIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { JalaliDatePicker } from "@workspace/ui/components/jalali-date-picker"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import type { SearchableAsset } from "../types"

export type AddTradePayload = {
  asset: SearchableAsset
  quantity: string
  unit: string
  unitPrice: string
  date: string
  note: string
  total: number
}

type AddTradeDialogProps = {
  asset: SearchableAsset | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: AddTradePayload) => void
  /** Mock cash balance in toman (ASCII digits). */
  cashBalance?: number
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const MOCK_CASH_BALANCE = 20_000_000

const UNIT_ITEMS_BY_ASSET: Record<string, { value: string; label: string }[]> =
  {
    gold18: [
      { value: "گرم", label: "گرم" },
      { value: "مثقال", label: "مثقال" },
    ],
    silver: [
      { value: "گرم", label: "گرم" },
      { value: "مثقال", label: "مثقال" },
    ],
  }

const DEFAULT_UNITS = [{ value: "واحد", label: "واحد" }]

function toAsciiDigits(raw: string): string {
  return raw.replace(/٫/g, ".").replace(/[۰-۹٠-٩]/g, (char) => {
    const persian = PERSIAN_DIGITS.indexOf(char)
    if (persian >= 0) return String(persian)
    const arabic = "٠١٢٣٤٥٦٧٨٩".indexOf(char)
    return arabic >= 0 ? String(arabic) : char
  })
}

function parseAmount(raw: string): number {
  const digits = toAsciiDigits(raw).replace(/[^\d.]/g, "")
  if (!digits) return 0
  return Number(digits)
}

function formatFaAmount(value: number): string {
  const abs = Math.abs(Math.round(value))
  const grouped = String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, "٬")
  const persian = grouped.replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit
  )
  return value < 0 ? `${persian}-` : persian
}

function formatAmountInput(raw: string): string {
  const ascii = toAsciiDigits(raw).replace(/[^\d.]/g, "")
  if (!ascii) return ""
  const [whole = "", ...rest] = ascii.split(".")
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "٬")
  const text = rest.length > 0 ? `${grouped}٫${rest.join("")}` : grouped
  return text.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

function formatQuantityInput(raw: string): string {
  const ascii = toAsciiDigits(raw).replace(/[^\d.]/g, "")
  if (!ascii) return ""
  const [whole = "", fraction] = ascii.split(".")
  const persianWhole = whole.replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit
  )
  if (fraction === undefined) return persianWhole
  const persianFraction = fraction.replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit
  )
  return `${persianWhole}.${persianFraction}`
}

function getUnitsForAsset(assetId: string) {
  return UNIT_ITEMS_BY_ASSET[assetId] ?? DEFAULT_UNITS
}

export function AddTradeDialog({
  asset,
  open,
  onOpenChange,
  onSubmit,
  cashBalance = MOCK_CASH_BALANCE,
}: AddTradeDialogProps) {
  const [quantity, setQuantity] = useState("۵")
  const [unit, setUnit] = useState("واحد")
  const [unitPrice, setUnitPrice] = useState("")
  const [date, setDate] = useState("۱۴۰۳/۰۷/۰۲")
  const [note, setNote] = useState("")

  const units = useMemo(
    () => (asset ? getUnitsForAsset(asset.id) : DEFAULT_UNITS),
    [asset]
  )

  useEffect(() => {
    if (!asset || !open) return
    setQuantity("۵")
    setUnit(getUnitsForAsset(asset.id)[0]?.value ?? "واحد")
    setUnitPrice(formatAmountInput(asset.price))
    setDate("۱۴۰۳/۰۷/۰۲")
    setNote("")
  }, [asset, open])

  const qtyValue = parseAmount(quantity)
  const priceValue = parseAmount(unitPrice)
  const total = qtyValue * priceValue
  const balanceAfter = cashBalance - total
  const insufficientCash = balanceAfter < 0

  if (!asset) return null
  const selectedAsset = asset

  function handleClose(nextOpen: boolean) {
    onOpenChange(nextOpen)
  }

  function handleSubmit() {
    if (insufficientCash) return
    onSubmit({
      asset: selectedAsset,
      quantity,
      unit,
      unitPrice,
      date,
      note,
      total,
    })
  }

  function applyMarketPrice() {
    setUnitPrice(formatAmountInput(selectedAsset.price))
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[min(90vh,720px)] gap-4 overflow-y-auto sm:max-w-md"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{`افزودن معامله: ${selectedAsset.name}`}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <FieldSection>
            <Label htmlFor="add-trade-qty">تعداد / مقدار</Label>
            <InputGroup className="h-10 bg-background font-sans">
              <InputGroupAddon align="inline-end" className="pe-1.5">
                <Select
                  items={units}
                  value={unit}
                  onValueChange={(value) => {
                    if (value === null) return
                    setUnit(value)
                  }}
                >
                  <SelectTrigger
                    className="h-8 min-w-20 border-0 bg-transparent shadow-none dark:bg-transparent dark:hover:bg-transparent"
                    size="sm"
                    dir="rtl"
                    aria-label="واحد"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectGroup>
                      {units.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </InputGroupAddon>
              <InputGroupInput
                id="add-trade-qty"
                value={quantity}
                onChange={(event) =>
                  setQuantity(formatQuantityInput(event.target.value))
                }
                inputMode="decimal"
                className="font-sans text-sm tabular-nums"
              />
            </InputGroup>
          </FieldSection>

          <FieldSection>
            <Label htmlFor="add-trade-price">قیمت هر واحد (تومان)</Label>
            <InputGroup className="h-10 bg-background font-sans">
              <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                <CrosshairIcon className="size-3.5" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                id="add-trade-price"
                value={unitPrice}
                onChange={(event) =>
                  setUnitPrice(formatAmountInput(event.target.value))
                }
                inputMode="numeric"
                className="font-sans text-sm tabular-nums"
              />
            </InputGroup>
            <button
              type="button"
              onClick={applyMarketPrice}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <RefreshCwIcon className="size-3" aria-hidden />
              {`قیمت لحظه‌ای بازار: ${formatAmountInput(selectedAsset.price)} تومان`}
            </button>
          </FieldSection>

          <FieldSection>
            <div className="space-y-2">
              <Label htmlFor="add-trade-date">تاریخ معامله</Label>
              <JalaliDatePicker
                id="add-trade-date"
                value={date}
                onValueChange={setDate}
                size="default"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-trade-note">یادداشت (اختیاری)</Label>
              <Textarea
                id="add-trade-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="توضیح اضافه..."
                className="min-h-14 resize-none bg-background"
              />
            </div>
          </FieldSection>
        </div>

        <div className="rounded-xl border border-sky-500/50 bg-sky-500/5">
          <div className="flex items-center gap-2 border-b border-sky-500/20 px-4 py-3 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <ChartColumnIncreasingIcon className="size-3.5" aria-hidden />
            پیش‌نمایش و موجودی
          </div>
          <div className="divide-y divide-border/60 px-4 text-sm">
            <PreviewRow label="مبلغ کل خرید:" amount={total} emphasize />
            <PreviewRow label="موجودی نقد فعلی:" amount={cashBalance} />
            <PreviewRow label="موجودی پس از خرید:" amount={balanceAfter} />
          </div>
        </div>

        {insufficientCash ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-loss/30 bg-loss/10 px-3 py-2.5 text-xs text-loss"
          >
            <AlertTriangleIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <p>
              موجودی نقد کافی نیست. لطفاً ابتدا مبلغ مورد نیاز را واریز کنید.
            </p>
          </div>
        ) : null}

        <div className="flex w-full gap-2">
          <Button
            type="button"
            className="flex-1 bg-amber-400 text-amber-950 hover:bg-amber-300 disabled:bg-amber-400/40 disabled:text-amber-950/50"
            disabled={insufficientCash || total <= 0}
            onClick={handleSubmit}
          >
            ثبت معامله
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FieldSection({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl border border-border/70 bg-muted/20 p-3">
      {children}
    </div>
  )
}

function PreviewRow({
  label,
  amount,
  emphasize = false,
}: {
  label: ReactNode
  amount: number
  emphasize?: boolean
}) {
  const negative = amount < 0
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-foreground/75">{label}</span>
      <span
        className={cn(
          "flex items-baseline gap-1.5",
          negative ? "text-loss" : "text-foreground"
        )}
      >
        <span
          className={cn(
            "font-semibold tabular-nums",
            emphasize ? "text-base font-bold" : "text-sm"
          )}
        >
          {formatFaAmount(amount)}
        </span>
        <span
          className={cn(
            "text-xs",
            negative ? "text-loss" : "text-muted-foreground"
          )}
        >
          تومان
        </span>
      </span>
    </div>
  )
}
