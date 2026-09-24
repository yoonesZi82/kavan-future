"use client"

import { ActivityIcon } from "lucide-react"
import { CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

type MajorIndicesHeaderProps = {
  totalCount: number
}

export function MajorIndicesHeader({ totalCount }: MajorIndicesHeaderProps) {
  return (
    <div className="relative shrink-0 overflow-hidden border-b border-border px-3 pt-3 pb-2.5">
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
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold tracking-tight">
            واچ لیست
          </CardTitle>
          <Badge variant="outline" className="text-[10px] tabular-nums">
            {totalCount.toLocaleString("fa-IR")} مورد
          </Badge>
        </div>
      </div>
    </div>
  )
}
