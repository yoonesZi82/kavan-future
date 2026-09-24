"use client"

type SignalGaugeProps = {
  score: number
  trend: string
  instant: string
}

/** Semicircle gauge — needle angle from score 0..100 (left→right). */
export function SignalGauge({ score, trend, instant }: SignalGaugeProps) {
  const clamped = Math.min(100, Math.max(0, score))
  const angle = -90 + (clamped / 100) * 180

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-3">
      <div className="relative h-20 w-40">
        <svg viewBox="0 0 160 90" className="size-full" aria-hidden>
          <path
            d="M 12 80 A 68 68 0 0 1 148 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-muted/40"
          />
          <path
            d="M 12 80 A 68 68 0 0 1 148 80"
            fill="none"
            stroke="url(#signal-gauge)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="214"
            strokeDashoffset={214 - (214 * clamped) / 100}
          />
          <defs>
            <linearGradient id="signal-gauge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c45a59" />
              <stop offset="45%" stopColor="#deaf3c" />
              <stop offset="100%" stopColor="#299d7f" />
            </linearGradient>
          </defs>
          <g transform={`rotate(${angle} 80 80)`}>
            <line
              x1="80"
              y1="80"
              x2="80"
              y2="28"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-foreground"
            />
            <circle cx="80" cy="80" r="4" className="fill-foreground" />
          </g>
        </svg>
      </div>
      <p className="text-sm font-medium text-gain">روند غالب: {trend}</p>
      <p className="text-xs text-muted-foreground">موقعیت لحظه‌ای: {instant}</p>
    </div>
  )
}
