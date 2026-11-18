import { AlertTriangleIcon, ShieldAlertIcon } from "lucide-react"
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card"
import { CRISIS_MESSAGE } from "../mock-data"

export function CrisisPanel() {
  return (
    <Card className="relative gap-0 overflow-hidden py-0 ring-1 ring-amber-500/30 ring-inset">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_100%_50%,color-mix(in_oklab,var(--color-amber-500)_22%,transparent),transparent_55%),linear-gradient(90deg,color-mix(in_oklab,var(--color-amber-500)_8%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-orange-600"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent"
      />

      <CardContent className="relative flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-4">
        <div className="relative flex shrink-0 items-center gap-3 sm:gap-4">
          <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 shadow-[0_0_28px_color-mix(in_oklab,var(--color-amber-500)_35%,transparent)] dark:text-amber-400">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-2xl bg-amber-400/20"
            />
            <ShieldAlertIcon className="relative size-6" aria-hidden />
          </span>
          <div className="min-w-0 sm:hidden">
            <p className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-300">
              بحران و شکست
            </p>
            <p className="mt-0.5 text-sm font-bold text-amber-950 dark:text-amber-50">
              {CRISIS_MESSAGE}
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-300">
              بحران و شکست
            </p>
            <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-200">
              <AlertTriangleIcon className="size-3" aria-hidden />
              هشدار فعال
            </span>
          </div>
          <p className="mt-1.5 text-base font-bold leading-snug text-amber-950 [filter:drop-shadow(0_0_12px_color-mix(in_oklab,var(--color-amber-500)_30%,transparent))] dark:text-amber-50 sm:text-lg">
            {CRISIS_MESSAGE}
          </p>
        </div>

        <div className="flex shrink-0 sm:ms-auto">
          <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200">
            سطح حمایت استاتیک
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
