"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import {
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
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { JalaliDatePicker } from "@workspace/ui/components/jalali-date-picker"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"
import {
  getHoldingLotsPreview,
  getQuantityUnit,
} from "../manage-trades-mock"
import type { Holding } from "../types"

export type SellAssetPayload = {
  holding: Holding
  quantity: number
  unit: string
  unitPrice: string
  date: string
  total: number
  realizedPnl: number
  remaining: number
}

type SellAssetDialogProps = {
  holding: Holding | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: SellAssetPayload) => void
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"

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

function formatFaAmount(value: number, withSign = false): string {
  const abs = Math.abs(Math.round(value))
  const grouped = String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, "٬")
  const persian = grouped.replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit
  )
  if (!withSign) return value < 0 ? `${persian}-` : persian
  if (value > 0) return `${persian}+`
  if (value < 0) return `${persian}-`
  return persian
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

function formatFaNumber(value: number): string {
  const rounded =
    Number.isInteger(value) || Math.abs(value) >= 100
      ? Math.round(value)
      : Math.round(value * 100) / 100
  const text = String(rounded)
  return text.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

function parseHoldingQuantity(quantityLabel: string): number {
  return parseAmount(quantityLabel)
}

export function SellAssetDialog({
  holding,
  open,
  onOpenChange,
  onSubmit,
}: SellAssetDialogProps) {
  const [quantity, setQuantity] = useState("۵")
  const [unitPrice, setUnitPrice] = useState("")
  const [date, setDate] = useState("۱۴۰۳/۰۷/۰۲")

  const unit = holding ? getQuantityUnit(holding.quantity) : "واحد"
  const heldQty = holding ? parseHoldingQuantity(holding.quantity) : 0
  const preview = useMemo(
    () => (holding ? getHoldingLotsPreview(holding.id) : null),
    [holding]
  )

  // * Lots preview is the source of truth for gold18 sell mock; others use holding row.
  const avgBuyPrice = useMemo(() => {
    if (!holding) return 0
    if (holding.id === "gold18" && preview?.avgPriceLabel) {
      return parseAmount(preview.avgPriceLabel)
    }
    return parseAmount(holding.buyPrice)
  }, [holding, preview])

  const heldDisplayQty = useMemo(() => {
    if (!holding) return 0
    if (holding.id === "gold18" && preview?.totalVolumeLabel) {
      return parseAmount(preview.totalVolumeLabel)
    }
    return heldQty
  }, [holding, preview, heldQty])

  useEffect(() => {
    if (!holding || !open) return
    const defaultQty = Math.min(5, heldDisplayQty || heldQty || 5)
    setQuantity(formatQuantityInput(String(defaultQty)))
    setUnitPrice(formatAmountInput(holding.currentPrice))
    setDate("۱۴۰۳/۰۷/۰۲")
  }, [holding, open, heldDisplayQty, heldQty])

  const qtyValue = parseAmount(quantity)
  const priceValue = parseAmount(unitPrice)
  const total = qtyValue * priceValue
  const realizedPnl = (priceValue - avgBuyPrice) * qtyValue
  const remaining = Math.max(0, heldDisplayQty - qtyValue)
  const exceedsHolding = qtyValue > heldDisplayQty && heldDisplayQty > 0

  if (!holding) return null

  function handleSellAll() {
    setQuantity(formatQuantityInput(String(heldDisplayQty)))
  }

  function applyMarketPrice() {
    setUnitPrice(formatAmountInput(holding.currentPrice))
  }

  function handleSubmit() {
    if (!holding || qtyValue <= 0 || exceedsHolding) return
    onSubmit({
      holding,
      quantity: qtyValue,
      unit,
      unitPrice,
      date,
      total,
      realizedPnl,
      remaining,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(90vh,720px)] gap-4 overflow-y-auto sm:max-w-md"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{`فروش دارایی: ${holding.name}`}</DialogTitle>
        </DialogHeader>

        <div className="rounded-xl border border-border/70 bg-muted/25 px-4 py-3">
          <div className="space-y-2 text-sm">
            <SummaryRow
              label="موجودی فعلی:"
              value={`${formatFaNumber(heldDisplayQty)} ${unit}`}
            />
            <SummaryRow
              label="میانگین قیمت خرید:"
              value={`${formatFaAmount(avgBuyPrice)} تومان`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="sell-qty">تعداد / مقدار فروش</Label>
            <InputGroup className="h-10 bg-background font-sans">
              <InputGroupAddon align="inline-end" className="gap-1.5 pe-1.5">
                <span className="text-xs text-muted-foreground">{unit}</span>
                <InputGroupButton
                  variant="outline"
                  size="xs"
                  className="border-amber-500/50 text-amber-600 hover:bg-amber-500/10 hover:text-amber-500 dark:text-amber-400"
                  onClick={handleSellAll}
                >
                  فروش کل
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupInput
                id="sell-qty"
                value={quantity}
                onChange={(event) =>
                  setQuantity(formatQuantityInput(event.target.value))
                }
                inputMode="decimal"
                className="font-sans text-sm tabular-nums"
              />
            </InputGroup>
            {exceedsHolding ? (
              <p className="text-xs text-loss">
                مقدار فروش نمی‌تواند بیشتر از موجودی باشد.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sell-price">قیمت هر واحد (تومان)</Label>
            <InputGroup className="h-10 bg-background font-sans">
              <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                <CrosshairIcon className="size-3.5" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                id="sell-price"
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
              {`قیمت لحظه‌ای بازار: ${formatAmountInput(holding.currentPrice)} تومان`}
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sell-date">تاریخ فروش</Label>
            <JalaliDatePicker
              id="sell-date"
              value={date}
              onValueChange={setDate}
              size="default"
            />
          </div>
        </div>

        <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 px-4 py-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <ChartColumnIncreasingIcon className="size-3.5" aria-hidden />
            پیش‌نمایش فروش
          </div>
          <div className="space-y-2 text-sm">
            <SummaryRow
              label="مبلغ کل فروش:"
              value={`${formatFaAmount(total)} تومان`}
            />
            <SummaryRow
              label="سود/زیان تحقق‌یافته:"
              value={`${formatFaAmount(realizedPnl, true)} تومان`}
              valueClassName={
                realizedPnl >= 0 ? "text-gain" : "text-loss"
              }
            />
            <SummaryRow
              label="موجودی باقی‌مانده:"
              value={`${formatFaNumber(remaining)} ${unit}`}
            />
          </div>
        </div>

        <div className="flex w-full gap-2">
          <Button
            type="button"
            className="flex-1 bg-amber-400 text-amber-950 hover:bg-amber-300"
            disabled={qtyValue <= 0 || exceedsHolding}
            onClick={handleSubmit}
          >
            ثبت فروش
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

function SummaryRow({
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
