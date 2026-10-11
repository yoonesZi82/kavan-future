"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check, Send, User2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { TELEGRAM_CHANNEL_URL } from "../constants"

const BURST = [
  { x: -72, y: -28, delay: 0.15, size: 6 },
  { x: 68, y: -36, delay: 0.22, size: 5 },
  { x: -48, y: 42, delay: 0.28, size: 4 },
  { x: 56, y: 38, delay: 0.34, size: 5 },
  { x: 0, y: -58, delay: 0.18, size: 4 },
  { x: -88, y: 8, delay: 0.4, size: 3 },
  { x: 90, y: 4, delay: 0.36, size: 3 },
] as const

export function WaitlistSuccess() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute start-1/2 -top-24 size-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -end-10 -bottom-20 size-48 rounded-full bg-[color-mix(in_oklab,var(--gain)_35%,transparent)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.1, 0.9, 1.1], opacity: [0.25, 0.55, 0.25] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="relative flex size-24 items-center justify-center">
          {!reduceMotion
            ? BURST.map((dot) => (
                <motion.span
                  key={`${dot.x}-${dot.y}`}
                  aria-hidden
                  className="absolute rounded-full bg-primary"
                  style={{ width: dot.size, height: dot.size }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: dot.x,
                    y: dot.y,
                    scale: [0, 1.2, 0.4],
                  }}
                  transition={{
                    duration: 1.1,
                    delay: dot.delay,
                    ease: "easeOut",
                  }}
                />
              ))
            : null}

          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.85, 1.35], opacity: [0.7, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeOut",
              repeatDelay: 0.4,
            }}
          />
          <motion.span
            className="relative z-10 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            initial={reduceMotion ? false : { scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 14,
              delay: 0.1,
            }}
          >
            <motion.span
              initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 16,
                delay: 0.28,
              }}
            >
              <Check className="size-8 stroke-[2.5]" />
            </motion.span>
          </motion.span>
        </div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <User2 className="size-4" />
            ثبت شد
          </p>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            عضویت شما ثبت شد
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            به‌محض باز شدن دسترسی، از طریق تلگرام با شما ارتباط برقرار می‌کنیم.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.55,
            type: "spring",
            stiffness: 220,
            damping: 20,
          }}
        >
          <Button
            size="lg"
            nativeButton={false}
            className="brand-action-gradient h-12 w-full border-0 text-base font-semibold shadow-md shadow-primary/25 hover:opacity-95"
            render={
              <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noreferrer" />
            }
          >
            <Send data-icon="inline-start" />
            مشاهده کانال تلگرام ما
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
