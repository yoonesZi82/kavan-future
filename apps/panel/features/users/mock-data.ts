import type { PanelUser } from "@/features/users/types"

export const PLAN_LABELS = {
  basic: "پایه",
  pro: "حرفه‌ای",
  vip: "VIP",
} as const

export const STATUS_LABELS = {
  active: "فعال",
  inactive: "غیرفعال",
} as const

export const PAYMENT_STATUS_LABELS = {
  success: "موفق",
  failed: "ناموفق",
} as const

/** Mock admin users until auth/billing API is wired. */
export const MOCK_USERS: readonly PanelUser[] = [
  {
    id: "u1",
    name: "رضا احمدی",
    email: "reza.ahmadi@email.com",
    mobile: "۰۹۱۲۳۴۵۶۷۸۹",
    registeredAt: "۱۴۰۳/۰۵/۱۵",
    plan: "pro",
    status: "active",
    payments: [
      { id: "p1", amount: "۲٬۵۰۰٬۰۰۰", date: "۱۴۰۳/۰۶/۰۱", status: "success" },
      { id: "p2", amount: "۲٬۵۰۰٬۰۰۰", date: "۱۴۰۳/۰۵/۰۱", status: "success" },
      { id: "p3", amount: "۲٬۵۰۰٬۰۰۰", date: "۱۴۰۳/۰۴/۰۱", status: "failed" },
    ],
  },
  {
    id: "u2",
    name: "سارا محمدی",
    email: "sara.m@email.com",
    mobile: "۰۹۱۲۹۸۷۶۵۴۳",
    registeredAt: "۱۴۰۳/۰۴/۲۲",
    plan: "basic",
    status: "active",
    payments: [
      { id: "p4", amount: "۹۹۰٬۰۰۰", date: "۱۴۰۳/۰۶/۱۰", status: "success" },
    ],
  },
  {
    id: "u3",
    name: "علی رضایی",
    email: "ali.r@email.com",
    mobile: "۰۹۳۵۱۱۱۲۲۳۳",
    registeredAt: "۱۴۰۳/۰۳/۱۰",
    plan: "vip",
    status: "active",
    payments: [
      { id: "p5", amount: "۸٬۰۰۰٬۰۰۰", date: "۱۴۰۳/۰۵/۲۰", status: "success" },
      { id: "p6", amount: "۸٬۰۰۰٬۰۰۰", date: "۱۴۰۳/۰۴/۲۰", status: "success" },
    ],
  },
  {
    id: "u4",
    name: "مریم حسینی",
    email: "maryam.h@email.com",
    mobile: "۰۹۱۰۵۵۶۶۷۷۸",
    registeredAt: "۱۴۰۳/۰۲/۰۵",
    plan: "basic",
    status: "inactive",
    payments: [
      { id: "p7", amount: "۹۹۰٬۰۰۰", date: "۱۴۰۳/۰۳/۰۱", status: "failed" },
    ],
  },
  {
    id: "u5",
    name: "حسین کریمی",
    email: "hossein.k@email.com",
    mobile: "۰۹۱۸۷۷۶۶۵۵۴",
    registeredAt: "۱۴۰۳/۰۱/۱۸",
    plan: "pro",
    status: "active",
    payments: [
      { id: "p8", amount: "۲٬۵۰۰٬۰۰۰", date: "۱۴۰۳/۰۶/۰۵", status: "success" },
      { id: "p9", amount: "۲٬۵۰۰٬۰۰۰", date: "۱۴۰۳/۰۵/۰۵", status: "success" },
    ],
  },
]
