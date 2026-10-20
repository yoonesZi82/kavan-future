"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check, Send } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { TELEGRAM_CHANNEL_HANDLE, TELEGRAM_CHANNEL_URL } from "../constants"

type WaitlistSuccessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const soft = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export function WaitlistSuccessDialog({
  open,
  onOpenChange,
}: WaitlistSuccessDialogProps) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 24 }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        {/* * key remounts stagger sequence each time the dialog opens */}
        <DialogHeader
          key={open ? "open" : "closed"}
          className="items-center text-center sm:items-center"
        >
          <motion.span
            className="mb-2 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 16, delay: 0.05 }
            }
          >
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 400, damping: 14, delay: 0.22 }
              }
            >
              <Check className="size-7 stroke-[2.5]" />
            </motion.span>
          </motion.span>

          <motion.div
            initial={reduceMotion ? false : soft.hidden}
            animate={soft.show}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.28 }}
          >
            <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
              عضویت شما ثبت شد
            </DialogTitle>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : soft.hidden}
            animate={soft.show}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.42 }}
          >
            <DialogDescription className="text-base leading-relaxed">
              به‌محض باز شدن دسترسی، از طریق راه‌های ارتباطی با شما تماس
              می‌گیریم. برای محتوای بازار به کانال تلگرام بپیوندید.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <DialogFooter
          key={open ? "footer-open" : "footer-closed"}
          className="border-0 bg-transparent sm:justify-stretch"
        >
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row">
            <motion.div
              className="flex-1"
              initial={reduceMotion ? false : soft.hidden}
              animate={soft.show}
              transition={{ ...transition, delay: reduceMotion ? 0 : 0.68 }}
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full"
                onClick={() => onOpenChange(false)}
              >
                بازگشت
              </Button>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={reduceMotion ? false : soft.hidden}
              animate={soft.show}
              transition={{ ...transition, delay: reduceMotion ? 0 : 0.56 }}
            >
              <Button
                size="lg"
                nativeButton={false}
                className="brand-action-gradient h-11 w-full border-0 font-semibold shadow-md shadow-primary/25 hover:opacity-95"
                render={
                  <a
                    href={TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                <Send data-icon="inline-start" />
                {TELEGRAM_CHANNEL_HANDLE}
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
