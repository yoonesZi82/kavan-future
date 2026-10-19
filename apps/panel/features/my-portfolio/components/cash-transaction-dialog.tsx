"use client"

import { useState, type ReactNode } from "react"
import {
  ArrowDownToLineIcon,
  ArrowUpFromLineIcon,
  CalendarIcon,
  CrosshairIcon,
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
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

type CashKind = "deposit" | "withdraw"

type CashTransactionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
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

function formatAmount(raw: string): string {
  const digits = toAsciiDigits(raw).replace(/\D/g, "")
  if (!digits) return ""
  // * Keep as string — Number() drops leading zeros and breaks mid-typing
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, "٬")
  return grouped.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

export function CashTransactionDialog({
  open,
  onOpenChange,
}: CashTransactionDialogProps) {
  const [kind, setKind] = useState<CashKind>("deposit")
  const [amount, setAmount] = useState("۵۰٬۰۰۰٬۰۰۰")
  const [date, setDate] = useState("۱۴۰۳/۰۵/۱۵")
  const [note, setNote] = useState("")

  function resetAndClose() {
    setKind("deposit")
    setAmount("۵۰٬۰۰۰٬۰۰۰")
    setDate("۱۴۰۳/۰۵/۱۵")
    setNote("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>ثبت تراکنش نقدی (شبیه‌سازی)</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <KindButton
            active={kind === "deposit"}
            label="واریز"
            tone="deposit"
            icon={<ArrowDownToLineIcon className="size-4" aria-hidden />}
            onClick={() => setKind("deposit")}
          />
          <KindButton
            active={kind === "withdraw"}
            label="برداشت"
            tone="withdraw"
            icon={<ArrowUpFromLineIcon className="size-4" aria-hidden />}
            onClick={() => setKind("withdraw")}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="cash-amount">مبلغ (تومان)</Label>
            <InputGroup className="h-10 bg-background">
              <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                <CrosshairIcon className="size-3.5" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                id="cash-amount"
                value={amount}
                onChange={(event) => setAmount(formatAmount(event.target.value))}
                inputMode="numeric"
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cash-date">تاریخ</Label>
            <InputGroup className="h-10 bg-background">
              <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                <CalendarIcon className="size-3.5" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                id="cash-date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cash-note">یادداشت (اختیاری)</Label>
            <Textarea
              id="cash-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="توضیحات مربوط به تراکنش..."
              className="min-h-24 resize-none bg-background"
            />
          </div>
        </div>

        <div className="flex w-full gap-2">
          <Button
            type="button"
            className="flex-1 bg-amber-400 text-amber-950 hover:bg-amber-300"
            onClick={resetAndClose}
          >
            تایید و ثبت
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gain/50 text-gain hover:bg-gain/10 hover:text-gain"
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
  icon,
  onClick,
}: {
  active: boolean
  label: string
  tone: CashKind
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
        active &&
          tone === "deposit" &&
          "border-gain bg-gain text-white shadow-sm",
        active &&
          tone === "withdraw" &&
          "border-amber-500 bg-amber-500 text-amber-950 shadow-sm",
        !active &&
          "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  )
}
