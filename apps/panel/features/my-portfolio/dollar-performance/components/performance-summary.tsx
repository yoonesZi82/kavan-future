import { CheckCircle2Icon } from "lucide-react"
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card"
import { SUMMARY_CHECKS, SUMMARY_TEXT } from "../mock-data"

function GrowthIllustration() {
  return (
    <svg
      viewBox="0 0 160 120"
      className="mx-auto h-28 w-40 shrink-0 sm:mx-0"
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
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="102" rx="58" ry="10" fill="#0f172a" opacity="0.55" />
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
      />
      <path
        d="M122 28l12-8-2 14z"
        fill="#0ea5e9"
      />
    </svg>
  )
}

export function PerformanceSummary() {
  return (
    <Card className="gap-0 overflow-hidden py-0 ring-inset">
      <CardContent className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center">
        <GrowthIllustration />
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-sm leading-relaxed text-foreground/85">
            {SUMMARY_TEXT}
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {SUMMARY_CHECKS.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 text-xs font-medium"
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
