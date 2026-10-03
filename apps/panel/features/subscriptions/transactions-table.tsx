"use client"

import { EyeIcon, UserRoundIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  DiscountCodeBadge,
  PaymentStatusDot,
  SubPlanBadge,
} from "@/features/subscriptions/badges"
import type { Transaction } from "@/features/subscriptions/types"

type TransactionsTableProps = {
  rows: readonly Transaction[]
}

export function TransactionsTable({ rows }: TransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-start">کاربر</TableHead>
          <TableHead className="text-start">مبلغ</TableHead>
          <TableHead className="text-start">تاریخ</TableHead>
          <TableHead className="text-start">وضعیت</TableHead>
          <TableHead className="text-start">پلن اشتراکی</TableHead>
          <TableHead className="text-start">کد تخفیف</TableHead>
          <TableHead className="text-start">کد پیگیری</TableHead>
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
              تراکنشی یافت نشد
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <span className="flex items-center gap-2 font-medium">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <UserRoundIcon className="size-4" aria-hidden />
                  </span>
                  {row.userName}
                </span>
              </TableCell>
              <TableCell className="tabular-nums">{row.amount}</TableCell>
              <TableCell className="tabular-nums">{row.date}</TableCell>
              <TableCell>
                <PaymentStatusDot status={row.status} />
              </TableCell>
              <TableCell>
                <SubPlanBadge plan={row.plan} />
              </TableCell>
              <TableCell>
                <DiscountCodeBadge code={row.discountCode} />
              </TableCell>
              <TableCell className="tabular-nums" dir="ltr">
                {row.trackingCode}
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-amber-500/50 text-amber-700 hover:bg-amber-500/10 hover:text-amber-800 dark:text-amber-400"
                >
                  <EyeIcon data-icon="inline-start" />
                  مشاهده
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
