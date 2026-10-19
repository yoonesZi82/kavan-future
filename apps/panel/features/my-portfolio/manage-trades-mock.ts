export type HoldingLotType = "buy" | "sell"

export type HoldingLot = {
  id: string
  type: HoldingLotType
  date: string
  quantity: string
  unitPrice: string
  totalLabel: string
  note: string
}

export type HoldingLotsPreview = {
  avgPriceLabel: string
  totalVolumeLabel: string
}

const GOLD_LOTS: readonly HoldingLot[] = [
  {
    id: "lot-g1",
    type: "buy",
    date: "۱۴۰۳/۰۵/۰۱",
    quantity: "۱۰",
    unitPrice: "۴٬۰۰۰٬۰۰۰",
    totalLabel: "۴۰٬۰۰۰٬۰۰۰ تومان",
    note: "",
  },
  {
    id: "lot-g2",
    type: "buy",
    date: "۱۴۰۳/۰۶/۱۲",
    quantity: "۵",
    unitPrice: "۴٬۲۰۰٬۰۰۰",
    totalLabel: "۲۱٬۰۰۰٬۰۰۰ تومان",
    note: "",
  },
  {
    id: "lot-g3",
    type: "buy",
    date: "۱۴۰۳/۰۷/۰۲",
    quantity: "۲",
    unitPrice: "۵٬۵۰۰٬۰۰۰",
    totalLabel: "۱۱٬۰۰۰٬۰۰۰ تومان",
    note: "",
  },
]

const DEFAULT_LOTS: readonly HoldingLot[] = [
  {
    id: "lot-d1",
    type: "buy",
    date: "۱۴۰۳/۰۴/۱۰",
    quantity: "۱",
    unitPrice: "۱۰٬۰۰۰٬۰۰۰",
    totalLabel: "۱۰٬۰۰۰٬۰۰۰ تومان",
    note: "",
  },
  {
    id: "lot-d2",
    type: "buy",
    date: "۱۴۰۳/۰۵/۲۰",
    quantity: "۲",
    unitPrice: "۱۱٬۰۰۰٬۰۰۰",
    totalLabel: "۲۲٬۰۰۰٬۰۰۰ تومان",
    note: "",
  },
]

export function getHoldingLots(holdingId: string): readonly HoldingLot[] {
  if (holdingId === "gold18") return GOLD_LOTS
  return DEFAULT_LOTS
}

export function getHoldingLotsPreview(
  holdingId: string
): HoldingLotsPreview {
  if (holdingId === "gold18") {
    return {
      avgPriceLabel: "۴٬۸۵۰٬۰۰۰ تومان",
      totalVolumeLabel: "۱۷ گرم",
    }
  }
  return {
    avgPriceLabel: "۱۰٬۶۶۶٬۰۰۰ تومان",
    totalVolumeLabel: "۳ واحد",
  }
}

export function getQuantityUnit(quantityLabel: string): string {
  const parts = quantityLabel.trim().split(/\s+/)
  if (parts.length > 1) return parts[parts.length - 1] ?? ""
  return "واحد"
}
