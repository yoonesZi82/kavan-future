"use client"

import type { ReactNode } from "react"
import {
  CalendarDaysIcon,
  CrownIcon,
  MailIcon,
  PhoneIcon,
  PowerIcon,
  UserRoundIcon,
  UserCogIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"
import { PAYMENT_STATUS_LABELS } from "@/features/users/mock-data"
import { PlanBadge, StatusDot } from "@/features/users/user-badges"
import type { PanelUser } from "@/features/users/types"

export function UserDetailBody({ user }: { user: PanelUser }) {
  return (
    <>
      <div className="scrollbar-brand flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <UserRoundIcon className="size-10" aria-hidden />
          </span>
          <div>
            <p className="text-base font-semibold">{user.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground" dir="ltr">
              {user.email}
            </p>
          </div>
          <StatusDot status={user.status} />
        </div>

        <ul className="flex flex-col gap-3 text-sm">
          <DetailRow
            icon={<PhoneIcon className="size-4" aria-hidden />}
            label="موبایل"
            value={user.mobile}
            ltr
          />
          <DetailRow
            icon={<CalendarDaysIcon className="size-4" aria-hidden />}
            label="تاریخ ثبت‌نام"
            value={user.registeredAt}
          />
          <li className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-muted-foreground">
              <CrownIcon className="size-4" aria-hidden />
              پلن فعلی
            </span>
            <PlanBadge plan={user.plan} />
          </li>
        </ul>

        <Separator />

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">تاریخچه پرداخت</h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 text-start text-xs">مبلغ</TableHead>
                <TableHead className="h-8 text-start text-xs">تاریخ</TableHead>
                <TableHead className="h-8 text-start text-xs">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="py-2 tabular-nums">
                    {payment.amount}
                  </TableCell>
                  <TableCell className="py-2 tabular-nums text-muted-foreground">
                    {payment.date}
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          payment.status === "success" ? "bg-gain" : "bg-loss"
                        )}
                        aria-hidden
                      />
                      {PAYMENT_STATUS_LABELS[payment.status]}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border p-4">
        <Button type="button" className="w-full">
          <UserCogIcon data-icon="inline-start" />
          تغییر پلن
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <PowerIcon data-icon="inline-start" />
          فعال/غیرفعال
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-sky-400/50 text-sky-700 hover:bg-sky-50 hover:text-sky-800 dark:text-sky-300 dark:hover:bg-sky-950"
        >
          <MailIcon data-icon="inline-start" />
          ارسال ایمیل
        </Button>
      </div>
    </>
  )
}

function DetailRow({
  icon,
  label,
  value,
  ltr,
}: {
  icon: ReactNode
  label: string
  value: string
  ltr?: boolean
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="font-medium tabular-nums" dir={ltr ? "ltr" : undefined}>
        {value}
      </span>
    </li>
  )
}
