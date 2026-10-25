import { AlertTriangleIcon, ShieldIcon, SparklesIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { ANALYSIS_BLOCKS } from "../mock-data"
import type { AnalysisBlock } from "../types"

const toneIcon = {
  info: SparklesIcon,
  warning: AlertTriangleIcon,
  danger: AlertTriangleIcon,
  success: ShieldIcon,
} as const

const toneClass = {
  info: "bg-chart-4/15 text-chart-4",
  warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  danger: "bg-loss/15 text-loss",
  success: "bg-gain/15 text-gain",
} as const

function AnalysisItem({ block }: { block: AnalysisBlock }) {
  const Icon = toneIcon[block.tone]

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center rounded-xl border border-border/70 bg-muted/20 px-3 py-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full",
              toneClass[block.tone]
            )}
          >
            <Icon className="size-3.5" aria-hidden />
          </span>
          <p className="text-xs font-semibold">{block.title}</p>
        </div>
        {block.meta ? (
          <span
            className={cn(
              "shrink-0 text-xs font-bold tabular-nums",
              block.tone === "danger" && "text-loss",
              block.tone === "success" && "text-gain",
              block.tone === "warning" && "text-amber-600 dark:text-amber-400"
            )}
          >
            {block.meta}
          </span>
        ) : null}
      </div>
      <p className="text-sm font-medium leading-relaxed text-foreground/80">
        {block.body}
      </p>
    </div>
  )
}

export function PerformanceAnalysis() {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          تحلیل عملکرد سبد
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2.5 px-3 py-3">
        {ANALYSIS_BLOCKS.map((block) => (
          <AnalysisItem key={block.id} block={block} />
        ))}
      </CardContent>
    </Card>
  )
}
