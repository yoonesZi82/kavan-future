"use client"

import { useEffect, useState } from "react"
import { ActivityIcon } from "lucide-react"
import { CardTitle } from "@workspace/ui/components/card"

type MajorIndicesHeaderProps = {
  totalCount: number
  visibleCount: number
}

export function MajorIndicesHeader({
  totalCount,
  visibleCount,
}: MajorIndicesHeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const countLabel =
    mounted && totalCount > 0
      ? `${visibleCount.toLocaleString("fa-IR")} از ${totalCount.toLocaleString("fa-IR")}`
      : "—"

  return (
    <div className="shrink-0 border-b border-border">
      <div className="relative overflow-hidden px-3 pt-3 pb-2.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 left-1/2 size-28 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl"
        />
        <div className="relative flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
            <ActivityIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-sm font-semibold tracking-tight">
                واچ لیست
              </CardTitle>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
                {countLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
