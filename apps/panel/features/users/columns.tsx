"use client"

import { EyeIcon, UserRoundIcon } from "lucide-react"
import { createColumnHelper } from "@tanstack/react-table"
import { Button } from "@workspace/ui/components/button"
import {
  usersTableFeatures,
  type UsersTableFeatures,
} from "@/features/users/data-table-features"
import { PlanBadge, StatusDot } from "@/features/users/user-badges"
import type { PanelUser } from "@/features/users/types"

const columnHelper = createColumnHelper<UsersTableFeatures, PanelUser>()

export function createUsersColumns(onView: (user: PanelUser) => void) {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      header: "نام",
      cell: ({ row }) => (
        <span className="flex items-center gap-2 font-medium">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <UserRoundIcon className="size-4" aria-hidden />
          </span>
          {row.original.name}
        </span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "ایمیل",
      cell: ({ getValue }) => (
        <span className="text-muted-foreground" dir="ltr">
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("mobile", {
      header: "موبایل",
      cell: ({ getValue }) => (
        <span className="tabular-nums" dir="ltr">
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("registeredAt", {
      header: "تاریخ ثبت‌نام",
      cell: ({ getValue }) => (
        <span className="tabular-nums">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("plan", {
      header: "پلن فعلی",
      cell: ({ getValue }) => <PlanBadge plan={getValue()} />,
    }),
    columnHelper.accessor("status", {
      header: "وضعیت",
      cell: ({ getValue }) => <StatusDot status={getValue()} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
          onClick={() => onView(row.original)}
        >
          <EyeIcon data-icon="inline-start" />
          مشاهده
        </Button>
      ),
    }),
  ])
}

export { usersTableFeatures }
