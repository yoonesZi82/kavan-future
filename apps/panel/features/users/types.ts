export type UserPlan = "basic" | "pro" | "vip"
export type UserStatus = "active" | "inactive"
export type PaymentStatus = "success" | "failed"

export type UserPayment = {
  id: string
  amount: string
  date: string
  status: PaymentStatus
}

export type PanelUser = {
  id: string
  name: string
  email: string
  mobile: string
  registeredAt: string
  plan: UserPlan
  status: UserStatus
  payments: readonly UserPayment[]
}

export type UserStatusFilter = "all" | UserStatus
