"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { CrisisBreakout } from "@/features/market-analysis/signal/crisis-breakout"

export function CrisisBreakoutPanel() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-3 py-2.5">
        <CardTitle className="text-sm md:text-base">بحران / شکست</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
        <CrisisBreakout />
      </CardContent>
    </Card>
  )
}
