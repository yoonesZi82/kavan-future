"use client"

import { Trash2Icon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import type { PortfolioTransaction } from "../types"

type DeleteDialogProps = {
  transaction: PortfolioTransaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteDialog({
  transaction,
  open,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-loss/15 text-loss">
              <Trash2Icon className="size-3.5" aria-hidden />
            </span>
            حذف معامله
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? `آیا از حذف معامله «${transaction.assetName}» مطمئن هستید؟ این عمل قابل بازگشت نیست و عملکرد سبد دوباره محاسبه می‌شود.`
              : "آیا از حذف این معامله مطمئن هستید؟"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            حذف
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
