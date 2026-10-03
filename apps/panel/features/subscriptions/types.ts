export type PaymentStatus = "success" | "pending"
export type SubPlan = "free" | "pro" | "vip"
export type DiscountType = "percent" | "fixed"
export type PlanFilter = "all" | SubPlan

export type SummaryStat = {
  id: string
  title: string
  value: string
  unit?: string
  changePercent: number
  changeTone: "up" | "down"
}

export type Transaction = {
  id: string
  userName: string
  amount: string
  date: string
  status: PaymentStatus
  plan: Exclude<SubPlan, "free">
  discountCode: string
  trackingCode: string
}

export type PlanDiscount = {
  id: string
  plan: SubPlan
  discountType: DiscountType
  discountValue: string
  validFrom: string
  validTo: string
  status: "active" | "inactive"
}
