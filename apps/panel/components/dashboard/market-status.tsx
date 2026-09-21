import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

type MarketStatusProps = {
  className?: string
}

export function MarketStatus({ className }: MarketStatusProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5 border-gain/30 bg-gain/10 text-gain md:text-xs",
        "px-1.5 text-[10px] md:px-2.5",
        className
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-gain" />
      <span className="md:hidden">باز</span>
      <span className="hidden md:inline">بازار باز است</span>
    </Badge>
  )
}
