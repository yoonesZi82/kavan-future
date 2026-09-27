"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

type AnimatedMarketNumberProps = {
  value: number
  format: (value: number) => string
  className?: string
}

/** Tweens ticker digits and flashes green/red on change (no framer dep). */
export function AnimatedMarketNumber({
  value,
  format,
  className,
}: AnimatedMarketNumberProps) {
  const [display, setDisplay] = useState(() => format(value))
  const [flash, setFlash] = useState<"up" | "down" | null>(null)
  const prevRef = useRef(value)
  const formatRef = useRef(format)
  const rafRef = useRef(0)
  formatRef.current = format

  useEffect(() => {
    const prev = prevRef.current
    if (prev === value) {
      setDisplay(formatRef.current(value))
      return
    }
    setFlash(value > prev ? "up" : "down")
    prevRef.current = value
    const flashTimer = window.setTimeout(() => setFlash(null), 480)
    const start = performance.now()
    const from = prev
    const duration = 400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) * (1 - t)
      setDisplay(formatRef.current(from + (value - from) * eased))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      setDisplay(formatRef.current(value))
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.clearTimeout(flashTimer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [value])

  return (
    <span
      className={cn(
        "transition-colors duration-300",
        className,
        flash === "up" && "text-gain",
        flash === "down" && "text-loss"
      )}
    >
      {display}
    </span>
  )
}
