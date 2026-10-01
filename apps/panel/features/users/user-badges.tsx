import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { PLAN_LABELS, STATUS_LABELS } from "@/features/users/mock-data"
import type { UserPlan, UserStatus } from "@/features/users/types"

const planClass: Record<UserPlan, string> = {
  basic:
    "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200",
  pro: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  vip: "border-transparent bg-emerald-600 text-white dark:bg-emerald-500",
}

export function PlanBadge({ plan }: { plan: UserPlan }) {
  return (
    <Badge className={cn("rounded-md px-2.5", planClass[plan])}>
      {PLAN_LABELS[plan]}
    </Badge>
  )
}

export function StatusDot({ status }: { status: UserStatus }) {
  const isActive = status === "active"
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          isActive ? "bg-gain" : "bg-loss"
        )}
        aria-hidden
      />
      {STATUS_LABELS[status]}
    </span>
  )
}
