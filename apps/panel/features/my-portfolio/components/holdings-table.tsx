import { Button } from "@workspace/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"
import type { Holding } from "../types"

type HoldingsTableProps = {
  rows: readonly Holding[]
  onEdit: (holding: Holding) => void
}

export function HoldingsTable({ rows, onEdit }: HoldingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-start">دارایی</TableHead>
          <TableHead className="text-start">قیمت خرید</TableHead>
          <TableHead className="text-start">تعداد</TableHead>
          <TableHead className="text-start">ارزش</TableHead>
          <TableHead className="text-start">قیمت فعلی</TableHead>
          <TableHead className="text-start">سود و زیان</TableHead>
          <TableHead className="text-start">٪</TableHead>
          <TableHead className="text-start">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={8}
              className="h-24 text-center text-muted-foreground"
            >
              دارایی‌ای یافت نشد
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => {
            const isGain = row.pnlPercent >= 0
            return (
              <TableRow key={row.id}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
                      style={{ backgroundColor: row.accent }}
                      aria-hidden
                    >
                      {row.symbol.slice(0, 2)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {row.name}
                      </span>
                      <span
                        className="block text-[11px] text-muted-foreground"
                        dir="ltr"
                      >
                        {row.symbol}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell className="tabular-nums">{row.buyPrice}</TableCell>
                <TableCell className="tabular-nums">{row.quantity}</TableCell>
                <TableCell className="font-medium tabular-nums">
                  {row.value}
                </TableCell>
                <TableCell className="tabular-nums">
                  {row.currentPrice}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-semibold tabular-nums",
                    isGain ? "text-gain" : "text-loss"
                  )}
                >
                  {row.pnl}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-semibold tabular-nums",
                    isGain ? "text-gain" : "text-loss"
                  )}
                >
                  {`${isGain ? "+" : ""}${row.pnlPercent.toLocaleString("fa-IR", {
                    maximumFractionDigits: 1,
                  })}٪`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(row)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-loss/40 text-loss hover:bg-loss/10 hover:text-loss"
                    >
                      فروش
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}
