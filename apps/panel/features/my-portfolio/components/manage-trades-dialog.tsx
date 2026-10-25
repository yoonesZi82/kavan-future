"use client"

import { useEffect, useState } from "react"
import { ChartColumnIncreasingIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"
import {
  getHoldingLots,
  getHoldingLotsPreview,
  getQuantityUnit,
  type HoldingLot,
} from "../manage-trades-mock"
import type { Holding } from "../types"
import { ManageTradeEditor } from "./manage-trade-editor"

type ManageTradesDialogProps = {
  holding: Holding | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageTradesDialog({
  holding,
  open,
  onOpenChange,
}: ManageTradesDialogProps) {
  const [lots, setLots] = useState<HoldingLot[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!holding || !open) return
    const next = [...getHoldingLots(holding.id)]
    setLots(next)
    setExpanded(next[next.length - 1]?.id ?? null)
  }, [holding, open])

  if (!holding) return null

  const unit = getQuantityUnit(holding.quantity)
  const preview = getHoldingLotsPreview(holding.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(90vh,720px)] gap-4 overflow-y-auto sm:max-w-xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{`مدیریت معاملات: ${holding.name}`}</DialogTitle>
        </DialogHeader>

        <Accordion
          value={expanded ? [expanded] : []}
          onValueChange={(value) => {
            setExpanded(value[0] ?? null)
          }}
          className="gap-2"
        >
          {lots.map((lot) => {
            const isOpen = expanded === lot.id
            return (
              <AccordionItem
                key={lot.id}
                value={lot.id}
                className={cn(
                  "overflow-hidden rounded-xl border border-border/70 bg-muted/15 not-last:border-b",
                  isOpen && "border-amber-400/50 ring-1 ring-amber-400/30"
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "items-center gap-2 rounded-none border-transparent px-3 py-2.5 hover:bg-transparent",
                    isOpen && "border-r-2 border-r-amber-400"
                  )}
                >
                  <div className="flex w-full min-w-0 flex-wrap items-center gap-2 pe-2 text-xs">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
                      style={{ backgroundColor: holding.accent }}
                      aria-hidden
                    >
                      {holding.symbol.slice(0, 2)}
                    </span>
                    <span className="font-medium">{holding.name}</span>
                    <Badge
                      variant="outline"
                      className="rounded-full border-gain/40 bg-gain/10 text-gain"
                    >
                      {lot.type === "buy" ? "خرید" : "فروش"}
                    </Badge>
                    <span className="tabular-nums text-muted-foreground">
                      {`${lot.quantity} ${unit}`}
                    </span>
                    <span className="ms-auto tabular-nums text-muted-foreground">
                      {lot.totalLabel}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {lot.date}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ManageTradeEditor
                    assetName={holding.name}
                    unit={unit}
                    lot={lot}
                    onChange={(next) => {
                      setLots((current) =>
                        current.map((item) =>
                          item.id === next.id ? next : item
                        )
                      )
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 px-4 py-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <ChartColumnIncreasingIcon className="size-3.5" aria-hidden />
            پیش‌نمایش تغییرات سبد
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:divide-x sm:divide-border/70 sm:divide-x-reverse">
            <div>
              <p className="text-sm font-medium text-foreground/80">
                میانگین قیمت جدید:
              </p>
              <p className="mt-1 text-base font-bold text-amber-500 tabular-nums">
                {preview.avgPriceLabel}
              </p>
            </div>
            <div className="sm:ps-3">
              <p className="text-sm font-medium text-foreground/80">
                حجم کل جدید:
              </p>
              <p className="mt-1 text-base font-bold tabular-nums">
                {preview.totalVolumeLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <Button
            type="button"
            className="flex-1 bg-amber-400 text-amber-950 hover:bg-amber-300"
            onClick={() => onOpenChange(false)}
          >
            ثبت تغییرات
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-sky-500/40"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
