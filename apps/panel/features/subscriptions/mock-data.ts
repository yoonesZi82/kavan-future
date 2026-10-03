import type {
  PlanDiscount,
  SummaryStat,
  Transaction,
} from "@/features/subscriptions/types"

export const PLAN_LABELS = {
  free: "رایگان",
  pro: "حرفه‌ای",
  vip: "VIP",
} as const

export const PAYMENT_STATUS_LABELS = {
  success: "موفق",
  pending: "در انتظار",
} as const

export const DISCOUNT_TYPE_LABELS = {
  percent: "درصدی",
  fixed: "مبلغ ثابت",
} as const

/** Mock KPIs until billing API is wired. */
export const SUMMARY_STATS: readonly SummaryStat[] = [
  {
    id: "income",
    title: "درآمد کل",
    value: "۴٬۴۷۵٬۰۰۰٬۰۰۰",
    unit: "تومان",
    changePercent: 26.3,
    changeTone: "up",
  },
  {
    id: "success-users",
    title: "کاربران موفق",
    value: "۱٬۲۵۴",
    changePercent: 18.7,
    changeTone: "up",
  },
  {
    id: "failed-users",
    title: "کاربران ناموفق",
    value: "۲٬۱۳۵",
    changePercent: 12.5,
    changeTone: "down",
  },
]

/** Mock transactions matching the subscriptions design. */
export const MOCK_TRANSACTIONS: readonly Transaction[] = [
  {
    id: "t1",
    userName: "علی محمدی",
    amount: "۱٬۲۰۰٬۰۰۰ تومان",
    date: "۱۴۰۲/۰۲/۳۰",
    status: "success",
    plan: "vip",
    discountCode: "DIS20",
    trackingCode: "۱۲۳۴۵",
  },
  {
    id: "t2",
    userName: "مریم رضایی",
    amount: "۸۵۰٬۰۰۰ تومان",
    date: "۱۴۰۲/۰۳/۱۵",
    status: "pending",
    plan: "pro",
    discountCode: "SUMMER10",
    trackingCode: "۶۷۸۹۰",
  },
  {
    id: "t3",
    userName: "حسین کریمی",
    amount: "۲٬۵۰۰٬۰۰۰ تومان",
    date: "۱۴۰۲/۰۴/۰۱",
    status: "success",
    plan: "vip",
    discountCode: "WELCOME",
    trackingCode: "۵۴۳۲۱",
  },
  {
    id: "t4",
    userName: "زهرا احمدی",
    amount: "۹۵۰٬۰۰۰ تومان",
    date: "۱۴۰۲/۰۵/۲۰",
    status: "pending",
    plan: "pro",
    discountCode: "SPRING25",
    trackingCode: "۹۸۷۶۵",
  },
  {
    id: "t5",
    userName: "رضا نوری",
    amount: "۱٬۷۵۰٬۰۰۰ تومان",
    date: "۱۴۰۲/۰۶/۱۰",
    status: "success",
    plan: "vip",
    discountCode: "FALL15",
    trackingCode: "۱۱۲۲۳",
  },
]

/** Mock plan discount rows for the plans management table. */
export const MOCK_PLAN_DISCOUNTS: readonly PlanDiscount[] = [
  {
    id: "d1",
    plan: "free",
    discountType: "percent",
    discountValue: "۲۰٪",
    validFrom: "۱۴۰۲/۰۲/۳۰",
    validTo: "۱۴۰۳/۰۳/۲۵",
    status: "active",
  },
  {
    id: "d2",
    plan: "pro",
    discountType: "fixed",
    discountValue: "۱۰۰٬۰۰۰ تومان",
    validFrom: "۱۴۰۲/۰۲/۳۰",
    validTo: "۱۴۰۳/۰۳/۲۵",
    status: "active",
  },
  {
    id: "d3",
    plan: "vip",
    discountType: "percent",
    discountValue: "۱۵٪",
    validFrom: "۱۴۰۲/۰۲/۳۰",
    validTo: "۱۴۰۳/۰۳/۲۵",
    status: "active",
  },
]
