import type { LucideIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export type StatItemProps = {
  icon: LucideIcon
  value: string
  label: string
  className?: string
  iconClassName?: string
}

export function StatItem({
  icon: Icon,
  value,
  label,
  className,
  iconClassName,
}: StatItemProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 whitespace-nowrap shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors hover:bg-white/[0.07]",
        className
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10",
          iconClassName
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-bold tracking-tight">{value}</span>
        <span className="text-[11px] text-white/55">{label}</span>
      </div>
    </div>
  )
}
