"use client"

import { useMemo } from "react"
import { useTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { createUsersColumns } from "@/features/users/columns"
import { usersTableFeatures } from "@/features/users/data-table-features"
import type { PanelUser } from "@/features/users/types"

type UsersDataTableProps = {
  users: readonly PanelUser[]
  selectedId: string | null
  onView: (user: PanelUser) => void
}

/** shadcn-style Data Table — TanStack Table v9 + table primitives. */
export function UsersDataTable({
  users,
  selectedId,
  onView,
}: UsersDataTableProps) {
  const columns = useMemo(() => createUsersColumns(onView), [onView])
  const data = useMemo(() => [...users], [users])

  const table = useTable({
    features: usersTableFeatures,
    columns,
    data,
    getRowId: (row) => row.id,
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="text-start">
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              کاربری یافت نشد
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={selectedId === row.id ? "selected" : undefined}
            >
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
