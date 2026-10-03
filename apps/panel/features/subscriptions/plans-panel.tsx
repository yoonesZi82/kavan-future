"use client"

import {
  CopyIcon,
  FileTextIcon,
  GiftIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  ActiveStatusDot,
  SubPlanBadge,
} from "@/features/subscriptions/badges"
import {
  DISCOUNT_TYPE_LABELS,
  MOCK_PLAN_DISCOUNTS,
} from "@/features/subscriptions/mock-data"

export function PlansPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-base font-bold">مدیریت پلن‌ها</CardTitle>
        <CardAction>
          <Button type="button" className="h-9 shrink-0 px-4">
            <GiftIcon data-icon="inline-start" />
            ایجاد کد تخفیف جدید
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-start">پلن</TableHead>
              <TableHead className="text-start">نوع تخفیف</TableHead>
              <TableHead className="text-start">مقدار تخفیف</TableHead>
              <TableHead className="text-start">مدت اعتبار</TableHead>
              <TableHead className="text-start">وضعیت</TableHead>
              <TableHead className="text-start">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PLAN_DISCOUNTS.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <FileTextIcon
                      className="size-4 text-muted-foreground"
                      aria-hidden
                    />
                    <SubPlanBadge plan={row.plan} showCrown />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="کپی شناسه پلن"
                    >
                      <CopyIcon />
                    </Button>
                  </span>
                </TableCell>
                <TableCell>{DISCOUNT_TYPE_LABELS[row.discountType]}</TableCell>
                <TableCell className="tabular-nums">
                  {row.discountValue}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {`${row.validFrom} تا ${row.validTo}`}
                </TableCell>
                <TableCell>
                  <ActiveStatusDot />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-amber-500/50 text-amber-700 hover:bg-amber-500/10 hover:text-amber-800 dark:text-amber-400"
                    >
                      <PencilIcon data-icon="inline-start" />
                      ویرایش
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-destructive/40 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2Icon data-icon="inline-start" />
                      حذف
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
