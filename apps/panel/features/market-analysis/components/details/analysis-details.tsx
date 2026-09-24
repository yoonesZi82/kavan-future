"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"
import { ANALYSIS_INDICATORS } from "@/features/market-analysis/data/mock-data"
import type { AnalysisTab, IndicatorStatus } from "@/features/market-analysis/types"

const TABS: { id: AnalysisTab; label: string }[] = [
  { id: "indicators", label: "شاخصه‌ها" },
  { id: "levels", label: "سطوح کلیدی" },
  { id: "history", label: "تاریخچه رویداد" },
]

const STATUS_DOT: Record<IndicatorStatus, string> = {
  warning: "bg-amber-500",
  normal: "bg-gain",
  neutral: "bg-muted-foreground/40",
}

type AnalysisDetailsPanelProps = {
  selectedId: string
  onSelect: (id: string) => void
}

export function AnalysisDetailsPanel({
  selectedId,
  onSelect,
}: AnalysisDetailsPanelProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <Tabs defaultValue="indicators" className="flex min-h-0 flex-1 flex-col gap-0">
        <CardHeader className="items-center border-b border-border px-3 py-3">
          <CardTitle className="text-sm md:text-base">جزئیات تحلیل</CardTitle>
          <CardAction className="self-center">
            <TabsList className="h-7">
              {TABS.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="px-2 text-[11px]"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardAction>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-hidden p-3">
          <TabsContent value="indicators" className="mt-0 h-full min-h-0">
            <div className="h-full min-h-0 overflow-y-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-muted/80 text-muted-foreground backdrop-blur">
                  <tr className="border-b border-border text-start">
                    <th className="px-2.5 py-2 font-medium">شاخص</th>
                    <th className="px-2.5 py-2 font-medium">مقدار</th>
                    <th className="px-2.5 py-2 font-medium">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {ANALYSIS_INDICATORS.map((row) => {
                    const isSelected = row.id === selectedId
                    return (
                      <tr
                        key={row.id}
                        className={cn(
                          "cursor-pointer border-b border-border/70 last:border-0",
                          isSelected && "bg-primary/5"
                        )}
                        onClick={() => onSelect(row.id)}
                      >
                        <td className="px-2.5 py-2 font-medium">{row.name}</td>
                        <td className="px-2.5 py-2 tabular-nums">{row.value}</td>
                        <td className="px-2.5 py-2">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                STATUS_DOT[row.status]
                              )}
                            />
                            {row.statusLabel}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="levels" className="mt-0">
            <p className="py-8 text-center text-sm text-muted-foreground">
              داده‌ای برای نمایش نیست (موک)
            </p>
          </TabsContent>
          <TabsContent value="history" className="mt-0">
            <p className="py-8 text-center text-sm text-muted-foreground">
              داده‌ای برای نمایش نیست (موک)
            </p>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
