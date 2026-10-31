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

type TradeKind = "buy" | "sell"

export type AddTradePayload = {
  asset: SearchableAsset
  kind: TradeKind
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
  return raw.replace(/[۰-۹٠-٩]/g, (char) => {
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
  const digits = toAsciiDigits(raw).replace(/\D/g, "")
  if (!digits) return ""
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, "٬")
  return grouped.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
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
  const [kind, setKind] = useState<TradeKind>("buy")
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
    setKind("buy")
    setQuantity("۵")
    setUnit(getUnitsForAsset(asset.id)[0]?.value ?? "واحد")
    setUnitPrice(formatAmountInput(asset.price))
    setDate("۱۴۰۳/۰۷/۰۲")
    setNote("")
  }, [asset, open])

  const qtyValue = parseAmount(quantity)
  const priceValue = parseAmount(unitPrice)
  const total = qtyValue * priceValue
  const balanceAfter =
    kind === "buy" ? cashBalance - total : cashBalance + total
  const insufficientCash = kind === "buy" && balanceAfter < 0

  if (!asset) return null

  function handleClose(nextOpen: boolean) {
    onOpenChange(nextOpen)
  }

  function handleSubmit() {
    if (!asset || insufficientCash) return
    onSubmit({
      asset,
      kind,
      quantity,
      unit,
      unitPrice,
      date,
      note,
      total,
    })
  }

  function applyMarketPrice() {
    setUnitPrice(formatAmountInput(asset.price))
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[min(90vh,720px)] gap-4 overflow-y-auto sm:max-w-md"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{`افزودن معامله: ${asset.name}`}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <KindButton
            active={kind === "buy"}
            label="خرید"
            tone="buy"
            onClick={() => setKind("buy")}
          />
          <KindButton
            active={kind === "sell"}
            label="فروش"
            tone="sell"
            onClick={() => setKind("sell")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
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
          </div>

          <div className="space-y-2">
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
              {`قیمت لحظه‌ای بازار: ${formatAmountInput(asset.price)} تومان`}
            </button>
          </div>

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
              className="min-h-20 resize-none bg-background"
            />
          </div>
        </div>

        <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 px-4 py-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <ChartColumnIncreasingIcon className="size-3.5" aria-hidden />
            پیش‌نمایش و موجودی
          </div>
          <div className="space-y-2 text-sm">
            <PreviewRow
              label={kind === "buy" ? "مبلغ خرید:" : "مبلغ فروش:"}
              value={`${formatFaAmount(total)} تومان`}
            />
            <PreviewRow
              label="موجودی نقد فعلی:"
              value={`${formatFaAmount(cashBalance)} تومان`}
            />
            <PreviewRow
              label={
                kind === "buy" ? "موجودی پس از خرید:" : "موجودی پس از فروش:"
              }
              value={`${formatFaAmount(balanceAfter)} تومان`}
              valueClassName={
                balanceAfter < 0 ? "text-loss" : "text-foreground"
              }
            />
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

function KindButton({
  active,
  label,
  tone,
  onClick,
}: {
  active: boolean
  label: string
  tone: TradeKind
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors",
        active &&
          tone === "buy" &&
          "border-gain bg-gain text-white shadow-sm",
        active &&
          tone === "sell" &&
          "border-loss bg-loss text-white shadow-sm",
        !active &&
          "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

function PreviewRow({
  label,
  value,
  valueClassName,
}: {
  label: ReactNode
  value: ReactNode
  valueClassName?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-foreground/75">{label}</span>
      <span
        className={cn(
          "font-semibold tabular-nums text-foreground",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  )
}
