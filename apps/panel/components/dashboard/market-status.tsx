import { Badge } from "@workspace/ui/components/badge"

export function MarketStatus() {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 border-gain/30 bg-gain/10 text-gain"
    >
      <span className="size-1.5 rounded-full bg-gain" />
      بازار باز است
    </Badge>
  )
}
