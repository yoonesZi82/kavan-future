import { AlertTriangleIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { CRISIS_MESSAGE } from "../mock-data"

export function CrisisPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="border-b border-border px-4 py-3">
        <CardTitle className="text-sm font-semibold">بحران و شکست</CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-3">
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <AlertTriangleIcon className="size-3.5" aria-hidden />
          </span>
          <p className="text-sm font-medium leading-relaxed text-amber-800 dark:text-amber-200">
            {CRISIS_MESSAGE}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
