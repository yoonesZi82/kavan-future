"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/ui/components/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { MOCK_USERS } from "@/features/users/mock-data"
import { UserDetailPanel } from "@/features/users/user-detail-panel"
import { UsersDataTable } from "@/features/users/users-data-table"
import { UsersFilters } from "@/features/users/users-filters"
import type { PanelUser, UserStatusFilter } from "@/features/users/types"

const PANEL_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 }

function useIsXl(): boolean {
  const [isXl, setIsXl] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)")
    const sync = () => setIsXl(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])
  return isXl
}

/** Admin users list — mock data until user management API. */
export function UsersGrid() {
  const isXl = useIsXl()
  const [draftQuery, setDraftQuery] = useState("")
  const [draftStatus, setDraftStatus] = useState<UserStatusFilter>("all")
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<UserStatusFilter>("all")
  const [selected, setSelected] = useState<PanelUser | null>(null)

  const users = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return MOCK_USERS.filter((user) => {
      if (status !== "all" && user.status !== status) return false
      if (!normalized) return true
      return (
        user.name.includes(query.trim()) ||
        user.email.toLowerCase().includes(normalized) ||
        user.mobile.includes(query.trim())
      )
    })
  }, [query, status])

  const handleView = useCallback((user: PanelUser) => {
    setSelected(user)
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
  }, [])

  const hasSelection = selected !== null

  return (
    <div className="flex w-full min-w-0 gap-4">
      {/* * RTL: table first → right; panel second → left of table */}
      <Card className="min-w-0 flex-1 gap-0 overflow-hidden py-0 ring-inset">
        <CardHeader className="border-b border-border px-4 py-3">
          <UsersFilters
            query={draftQuery}
            status={draftStatus}
            onQueryChange={setDraftQuery}
            onStatusChange={setDraftStatus}
            onApply={() => {
              setQuery(draftQuery)
              setStatus(draftStatus)
            }}
          />
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <UsersDataTable
            users={users}
            selectedId={selected?.id ?? null}
            onView={handleView}
          />
        </CardContent>
      </Card>

      <AnimatePresence initial={false}>
        {selected && isXl ? (
          <motion.div
            key="user-detail"
            initial={{ opacity: 0, x: -28, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 360 }}
            exit={{ opacity: 0, x: -28, width: 0 }}
            transition={PANEL_SPRING}
            className="hidden min-h-[560px] shrink-0 overflow-hidden xl:block"
          >
            <Card className="h-full w-[360px] gap-0 overflow-hidden py-0 ring-inset">
              <UserDetailPanel user={selected} onClose={handleClose} />
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Sheet
        open={hasSelection && !isXl}
        onOpenChange={(open) => {
          if (!open) handleClose()
        }}
      >
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-full gap-0 p-0 sm:max-w-md"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>اطلاعات کاربر</SheetTitle>
          </SheetHeader>
          {selected ? (
            <UserDetailPanel user={selected} onClose={handleClose} />
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  )
}
