import type { AlertItem, MarketFlowItem } from "@/features/market-pulse/types"

export const mockMarketFlow: MarketFlowItem[] = [
  { id: "1", group: "سهام و حق تقدم", volume: "۱۲٫۴B", tradeValue: "۸٫۲H", moneyInflow: 1 },
  { id: "2", group: "صندوق سهامی", volume: "۴٫۱B", tradeValue: "۲٫۹H", moneyInflow: -1 },
  { id: "3", group: "صندوق اهرمی", volume: "۶٫۸B", tradeValue: "۵٫۱H", moneyInflow: 1 },
  { id: "4", group: "۵۰ شرکت برتر", volume: "۳٫۲B", tradeValue: "۲٫۴H", moneyInflow: 1 },
  { id: "5", group: "صندوق طلا", volume: "۱٫۹B", tradeValue: "۱٫۵H", moneyInflow: -1 },
  { id: "6", group: "صندوق نقره", volume: "۰٫۸B", tradeValue: "۰٫۶H", moneyInflow: -1 },
  { id: "7", group: "درآمد ثابت", volume: "۹٫۵B", tradeValue: "۷٫۳H", moneyInflow: 1 },
]

export const mockAlerts: AlertItem[] = [
  { id: "1", title: "دلار آزاد", isActive: true },
  { id: "2", title: "طلا ۱۸ عیار", isActive: true },
  { id: "3", title: "شاخص کل", isActive: false },
  { id: "4", title: "بیت‌کوین", isActive: true },
]
