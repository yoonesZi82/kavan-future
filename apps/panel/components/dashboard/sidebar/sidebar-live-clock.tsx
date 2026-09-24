"use client"

import { useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

type SidebarLiveClockProps = {
  className?: string
}

export function SidebarLiveClock({ className }: SidebarLiveClockProps) {
  const [nowLabel, setNowLabel] = useState("")

  useEffect(() => {
    const tick = () => setNowLabel(dateFormatter.format(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p
      className={cn(
        "min-h-[14px] truncate text-[10px] text-muted-foreground",
        className
      )}
    >
      {nowLabel}
    </p>
  )
}
