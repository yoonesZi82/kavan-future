"use client"

import { AnimatePresence, motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { UserDetailBody } from "@/features/users/user-detail-body"
import type { PanelUser } from "@/features/users/types"

const CONTENT_EASE = [0.22, 1, 0.36, 1] as const

type UserDetailPanelProps = {
  user: PanelUser
  onClose: () => void
}

export function UserDetailPanel({ user, onClose }: UserDetailPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">اطلاعات کاربر</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="بستن"
        >
          <XIcon />
        </Button>
      </div>

      {/* * Soft fade/blur when switching users while panel stays open */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={user.id}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            transition={{ duration: 0.32, ease: CONTENT_EASE }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <UserDetailBody user={user} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
