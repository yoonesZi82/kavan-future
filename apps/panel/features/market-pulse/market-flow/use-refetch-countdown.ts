"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts down to the next refetch. Resets when a fetch finishes
 * (`isFetching` true → false) or when `dataUpdatedAt` advances.
 */
export function useRefetchCountdown(
  dataUpdatedAt: number,
  intervalMs: number,
  isFetching: boolean
): number {
  const totalSeconds = Math.ceil(intervalMs / 1000)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const wasFetchingRef = useRef(false)
  const anchorRef = useRef(dataUpdatedAt || Date.now())

  useEffect(() => {
    const fetchJustFinished = wasFetchingRef.current && !isFetching
    wasFetchingRef.current = isFetching

    if (fetchJustFinished && dataUpdatedAt) {
      anchorRef.current = dataUpdatedAt
      setSecondsLeft(totalSeconds)
    } else if (dataUpdatedAt && dataUpdatedAt !== anchorRef.current) {
      anchorRef.current = dataUpdatedAt
      setSecondsLeft(totalSeconds)
    }

    if (isFetching) return

    const tick = (): void => {
      const remainingMs = intervalMs - (Date.now() - anchorRef.current)
      setSecondsLeft(Math.max(0, Math.ceil(remainingMs / 1000)))
    }
    tick()
    const id = window.setInterval(tick, 200)
    return () => window.clearInterval(id)
  }, [dataUpdatedAt, intervalMs, isFetching, totalSeconds])

  return secondsLeft
}

export function formatCountdown(seconds: number): string {
  const safe = Math.max(0, seconds)
  const mins = Math.floor(safe / 60)
  const secs = safe % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

/** Soft green → yellow → red as remaining time approaches 0. */
export function countdownUrgencyStyle(
  secondsLeft: number,
  totalSeconds: number
): { color: string; borderColor: string; backgroundColor: string } {
  const t = Math.min(1, Math.max(0, secondsLeft / Math.max(1, totalSeconds)))
  const hue = Math.round(t * 145)
  return {
    color: `hsl(${hue} 72% 36%)`,
    borderColor: `hsl(${hue} 55% 42% / 0.45)`,
    backgroundColor: `hsl(${hue} 70% 48% / 0.14)`,
  }
}

