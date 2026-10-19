import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { TX_TYPE_LABELS } from "../mock-data"
import type { TxType } from "../types"

const toneClass: Record<TxType, string> = {
  buy: "border-gain/30 bg-gain/15 text-gain",
  sell: "border-loss/30 bg-loss/15 text-loss",
  deposit: "border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400",
  withdraw:
    "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400",
}

export function TypeBadge({ type }: { type: TxType }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 font-medium", toneClass[type])}
    >
      {TX_TYPE_LABELS[type]}
    </Badge>
  )
}
