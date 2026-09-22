"use client"

import { useEffect, useState } from "react"
import { ActivityIcon, SearchIcon } from "lucide-react"
import { CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

type MajorIndicesHeaderProps = {
  query: string
  onQueryChange: (value: string) => void
  totalCount: number
  visibleCount: number
}

export function MajorIndicesHeader({
  query,
  onQueryChange,
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
                بازارهای اصلی
              </CardTitle>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
                {countLabel}
              </span>
            </div>
          </div>
        </div>
        <label className="relative mt-2.5 block">
          <SearchIcon className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onValueChange={onQueryChange}
            placeholder="جستجوی نماد یا ارز…"
            aria-label="جستجوی بازار"
            className="h-8 border-border/70 bg-muted/40 pr-8 text-xs shadow-none placeholder:text-muted-foreground/70 focus-visible:bg-background"
          />
        </label>
      </div>
    </div>
  )
}
