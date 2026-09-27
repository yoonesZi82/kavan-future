"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useMotionValue } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

type AnimatedMarketNumberProps = {
  value: number
  format: (value: number) => string
  className?: string
}

/** Tweens numeric ticker values and flashes green/red on tick. */
export function AnimatedMarketNumber({
  value,
  format,
  className,
}: AnimatedMarketNumberProps) {
  const motionValue = useMotionValue(value)
  const [display, setDisplay] = useState(() => format(value))
  const [flash, setFlash] = useState<"up" | "down" | null>(null)
  const prevRef = useRef(value)
  const formatRef = useRef(format)
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
    const controls = animate(motionValue, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(formatRef.current(latest)),
      onComplete: () => setDisplay(formatRef.current(value)),
    })
    return () => {
      window.clearTimeout(flashTimer)
      controls.stop()
    }
  }, [value, motionValue])

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
