"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { TodayAnalysisCard } from "@/features/market-analysis/components/details/today-analysis-card"
import { CandleStructure } from "@/features/market-analysis/components/signal/candle-structure"
import { SignalGauge } from "@/features/market-analysis/components/signal/signal-gauge"
import { MAIN_SIGNAL } from "@/features/market-analysis/data/mock-data"

type AnalysisSidebarProps = {
  onViewTodayAnalysis?: () => void
}

export function AnalysisSidebar({ onViewTodayAnalysis }: AnalysisSidebarProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="gap-0 overflow-hidden py-0 ring-inset">
        <CardHeader className="border-b border-border px-3 py-2.5">
          <CardTitle className="text-sm">سیگنال اصلی</CardTitle>
        </CardHeader>
        <CardContent className="px-2 py-1">
          <SignalGauge
            score={MAIN_SIGNAL.score}
            trend={MAIN_SIGNAL.trend}
            instant={MAIN_SIGNAL.instant}
          />
        </CardContent>
      </Card>

      <Card className="gap-0 overflow-hidden py-0 ring-inset">
        <CardHeader className="border-b border-border px-3 py-2.5">
          <CardTitle className="text-sm">ساختار سه کندل</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CandleStructure />
        </CardContent>
      </Card>

      <TodayAnalysisCard onView={onViewTodayAnalysis} />
    </div>
  )
}
