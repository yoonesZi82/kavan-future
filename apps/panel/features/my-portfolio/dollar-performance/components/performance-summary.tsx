import { CheckCircle2Icon, SparklesIcon } from "lucide-react"
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card"
import { SUMMARY_CHECKS, SUMMARY_TEXT } from "../mock-data"

function GrowthIllustration() {
  return (
    <svg
      viewBox="0 0 160 120"
      className="h-24 w-36 shrink-0 sm:h-28 sm:w-40"
      aria-hidden
    >
      <defs>
        <linearGradient id="perf-platform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="perf-coin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="perf-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <filter id="perf-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="80" cy="102" rx="58" ry="10" fill="#0f172a" opacity="0.45" />
      <path
        d="M28 92h104c4 0 7 2 7 5v4c0 3-3 5-7 5H28c-4 0-7-2-7-5v-4c0-3 3-5 7-5z"
        fill="url(#perf-platform)"
      />
      <ellipse cx="52" cy="78" rx="14" ry="5" fill="url(#perf-coin)" />
      <rect x="38" y="62" width="28" height="16" fill="#d97706" />
      <ellipse cx="52" cy="62" rx="14" ry="5" fill="url(#perf-coin)" />
      <ellipse cx="52" cy="54" rx="14" ry="5" fill="url(#perf-coin)" />
      <ellipse cx="78" cy="84" rx="11" ry="4" fill="url(#perf-coin)" />
      <rect x="67" y="74" width="22" height="10" fill="#d97706" />
      <ellipse cx="78" cy="74" rx="11" ry="4" fill="url(#perf-coin)" />
      <path
        d="M96 78c18-10 28-28 34-46"
        fill="none"
        stroke="url(#perf-arrow)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#perf-glow)"
      />
      <path d="M122 28l12-8-2 14z" fill="#0d9488" filter="url(#perf-glow)" />
    </svg>
  )
}

export function PerformanceSummary() {
  return (
    <Card className="relative gap-0 overflow-hidden py-0 ring-inset">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,color-mix(in_oklab,var(--gain)_18%,transparent),transparent_55%),radial-gradient(90%_70%_at_0%_100%,color-mix(in_oklab,var(--chart-4)_12%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gain/50 to-transparent"
      />
      <CardContent className="relative flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-5">
        <div className="relative shrink-0 self-center sm:self-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-full bg-gain/20 blur-2xl"
          />
          <GrowthIllustration />
        </div>

        <div className="min-w-0 flex-1 space-y-3.5">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-gain">
              <SparklesIcon className="size-3.5 shrink-0" aria-hidden />
              <span className="text-xs font-semibold tracking-wide">
                جمع‌بندی عملکرد
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90 sm:text-[15px]">
              {SUMMARY_TEXT}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {SUMMARY_CHECKS.map((item) => (
              <li
                key={item.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gain/25 bg-gain/10 px-2.5 py-1.5 text-xs font-medium shadow-[0_0_20px_color-mix(in_oklab,var(--gain)_12%,transparent)]"
              >
                <CheckCircle2Icon
                  className="size-3.5 shrink-0 text-gain"
                  aria-hidden
                />
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="text-foreground">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
