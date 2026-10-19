"use client"

import { LineChartIcon, Trash2Icon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import type { PortfolioTransaction } from "../types"
import { TypeBadge } from "./type-badge"

type HistoryTableProps = {
  rows: readonly PortfolioTransaction[]
  onImpact: (tx: PortfolioTransaction) => void
  onDelete: (tx: PortfolioTransaction) => void
}

export function HistoryTable({ rows, onImpact, onDelete }: HistoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-start">تاریخ</TableHead>
          <TableHead className="text-start">نوع تراکنش</TableHead>
          <TableHead className="text-start">دارایی</TableHead>
          <TableHead className="text-start">تعداد / مقدار</TableHead>
          <TableHead className="text-start">قیمت واحد</TableHead>
          <TableHead className="text-start">مبلغ کل</TableHead>
          <TableHead className="text-start">یادداشت</TableHead>
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
              معامله‌ای یافت نشد
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tabular-nums">
                <span className="block font-medium">{row.date}</span>
                <span className="text-[11px] text-muted-foreground">
                  {row.time}
                </span>
              </TableCell>
              <TableCell>
                <TypeBadge type={row.type} />
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
                    style={{ backgroundColor: row.accent }}
                    aria-hidden
                  >
                    {row.assetSymbol.slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">
                      {row.assetName}
                    </span>
                    <span
                      className="block text-[11px] text-muted-foreground"
                      dir="ltr"
                    >
                      {row.assetSymbol}
                    </span>
                  </span>
                </span>
              </TableCell>
              <TableCell className="tabular-nums">{row.quantity}</TableCell>
              <TableCell className="tabular-nums">{row.unitPrice}</TableCell>
              <TableCell className="font-medium tabular-nums">
                {row.totalAmount}
              </TableCell>
              <TableCell className="max-w-[10rem] truncate text-muted-foreground">
                {row.note}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onImpact(row)}
                  >
                    <LineChartIcon className="size-3.5" aria-hidden />
                    <span className="sr-only">تاثیر روی عملکرد</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-loss hover:bg-loss/10 hover:text-loss"
                    onClick={() => onDelete(row)}
                  >
                    <Trash2Icon className="size-3.5" aria-hidden />
                    <span className="sr-only">حذف</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
