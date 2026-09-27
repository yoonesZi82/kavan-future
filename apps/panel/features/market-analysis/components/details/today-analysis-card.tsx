"use client"

import { Lightbulb } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { TODAY_ANALYSIS } from "@/features/market-analysis/data/mock-data"

type TodayAnalysisCardProps = {
  onView?: () => void
}

/** Fake daily analysis digest + CTA to full details. */
export function TodayAnalysisCard({ onView }: TodayAnalysisCardProps) {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4 text-primary" aria-hidden />
            <CardTitle className="text-sm">تحلیل امروز</CardTitle>
          </div>
          <span className="rounded-md bg-gain/15 px-2 py-0.5 text-[11px] font-medium text-gain">
            {TODAY_ANALYSIS.bias}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-3 py-3">
        <div className="min-w-0 space-y-1.5">
          <p className="text-sm font-medium leading-snug">
            {TODAY_ANALYSIS.title}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {TODAY_ANALYSIS.summary}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-primary/40 text-primary"
          onClick={onView}
        >
          مشاهده کامل
        </Button>
      </CardContent>
    </Card>
  )
}
