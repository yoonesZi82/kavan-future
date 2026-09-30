import type {
  DashboardEvent,
  DashboardSeriesPoint,
  KpiStat,
} from "@/features/dashboard/types"

export const DASHBOARD_KPIS: readonly KpiStat[] = [
  {
    id: "subscribed",
    title: "کاربران اشتراکی",
    value: "۲٬۱۳۵",
    changePercent: 12.4,
    tone: "blue",
    sparkline: [18, 22, 20, 28, 26, 34, 40, 38, 45, 52],
  },
  {
    id: "unsubscribed",
    title: "کاربران بدون اشتراک",
    value: "۱۰۳٬۴۵۰",
    changePercent: 8.7,
    tone: "purple",
    sparkline: [30, 28, 35, 32, 40, 38, 44, 42, 48, 55],
  },
  {
    id: "active-today",
    title: "کاربران فعال امروز",
    value: "۷۹٬۵۲۰",
    changePercent: 15.2,
    tone: "green",
    sparkline: [22, 26, 24, 30, 36, 34, 42, 48, 46, 54],
  },
  {
    id: "income-today",
    title: "درآمد امروز",
    value: "۴٬۴۷۵٬۰۰۰٬۰۰۰",
    changePercent: 21.3,
    tone: "orange",
    sparkline: [16, 20, 18, 26, 30, 28, 36, 40, 44, 50],
  },
  {
    id: "income-month",
    title: "درآمد ماه",
    value: "۸۹٬۷۵۰٬۰۰۰٬۰۰۰",
    changePercent: 18.6,
    tone: "teal",
    sparkline: [24, 22, 28, 32, 30, 38, 42, 40, 48, 56],
  },
]

export const SUBSCRIBED_GROWTH: readonly DashboardSeriesPoint[] = [
  { label: "۱ مرداد", value: 1680 },
  { label: "۴ مرداد", value: 1720 },
  { label: "۷ مرداد", value: 1785 },
  { label: "۱۰ مرداد", value: 1850 },
  { label: "۱۳ مرداد", value: 1960 },
  { label: "۱۶ مرداد", value: 2135 },
]

export const UNSUBSCRIBED_GROWTH: readonly DashboardSeriesPoint[] = [
  { label: "۱ مرداد", value: 91200 },
  { label: "۴ مرداد", value: 94500 },
  { label: "۷ مرداد", value: 93800 },
  { label: "۱۰ مرداد", value: 97800 },
  { label: "۱۳ مرداد", value: 100200 },
  { label: "۱۶ مرداد", value: 103450 },
]

export const WEEKLY_INCOME: readonly DashboardSeriesPoint[] = [
  { label: "هفته ۱\n۱–۷", value: 18.2 },
  { label: "هفته ۲\n۸–۱۴", value: 22.4 },
  { label: "هفته ۳\n۱۵–۲۱", value: 19.8 },
  { label: "هفته ۴\n۲۲–۲۸", value: 26.5 },
]

export const YEARLY_INCOME: readonly DashboardSeriesPoint[] = [
  { label: "فروردین", value: 0.42 },
  { label: "اردیبهشت", value: 0.55 },
  { label: "خرداد", value: 0.68 },
  { label: "تیر", value: 0.82 },
  { label: "مرداد", value: 0.95 },
  { label: "شهریور", value: 1.08 },
  { label: "مهر", value: 1.22 },
  { label: "آبان", value: 1.35 },
  { label: "آذر", value: 1.48 },
  { label: "دی", value: 1.58 },
  { label: "بهمن", value: 1.7 },
  { label: "اسفند", value: 1.82 },
]

export const LATEST_EVENTS: readonly DashboardEvent[] = [
  {
    id: "pay-fail",
    title: "پرداخت ناموفق",
    count: 34,
    timeLabel: "امروز ۱۰:۲۲",
    tone: "red",
  },
  {
    id: "user-off",
    title: "غیرفعال‌سازی کاربر",
    count: 12,
    timeLabel: "امروز ۰۹:۴۵",
    tone: "blue",
  },
  {
    id: "sub-buy",
    title: "خرید اشتراک",
    count: 26,
    timeLabel: "امروز",
    tone: "green",
  },
  {
    id: "signup",
    title: "ثبت‌نام جدید",
    count: 48,
    timeLabel: "دیروز",
    tone: "purple",
  },
]
