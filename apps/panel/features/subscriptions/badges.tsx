import { CrownIcon, TagIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import {
  PAYMENT_STATUS_LABELS,
  PLAN_LABELS,
} from "@/features/subscriptions/mock-data"
import type { PaymentStatus, SubPlan } from "@/features/subscriptions/types"

const planClass: Record<SubPlan, string> = {
  free: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  pro: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  vip: "border-transparent bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
}

export function SubPlanBadge({
  plan,
  showCrown = false,
}: {
  plan: SubPlan
  showCrown?: boolean
}) {
  return (
    <Badge className={cn("gap-1 rounded-md px-2.5", planClass[plan])}>
      {showCrown && plan !== "free" ? (
        <CrownIcon className="size-3" aria-hidden />
      ) : null}
      {PLAN_LABELS[plan]}
    </Badge>
  )
}

export function PaymentStatusDot({ status }: { status: PaymentStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          status === "success" ? "bg-gain" : "bg-loss"
        )}
        aria-hidden
      />
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  )
}

export function DiscountCodeBadge({ code }: { code: string }) {
  return (
    <Badge className="gap-1 rounded-md border-transparent bg-emerald-100 px-2.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
      <TagIcon className="size-3" aria-hidden />
      <span dir="ltr">{code}</span>
    </Badge>
  )
}

export function ActiveStatusDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className="size-2 shrink-0 rounded-full bg-gain" aria-hidden />
      فعال
    </span>
  )
}
