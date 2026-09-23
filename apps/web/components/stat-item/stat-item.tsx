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
        "flex flex-col items-start rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.06]",
        className
      )}
    >
      <Icon className={cn("mb-4 size-6", iconClassName ?? "text-gain")} />
      <span className="text-2xl font-black tracking-tight sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-[12px] text-white/70">{label}</span>
    </div>
  )
}
