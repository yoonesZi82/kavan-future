import { createMetadata } from "@/lib/seo/create-metadata"
import { TransactionHistoryGrid } from "@/features/my-portfolio/transaction-history/transaction-history-grid"

// * Portfolio ledger history — mock until transactions API
export const metadata = createMetadata({
  title: "تاریخچه معاملات",
  description:
    "لیست تراکنش‌های سبد، فیلتر نوع معامله و بررسی تاثیر هر معامله بر عملکرد پرتفوی.",
  path: "/my-portfolio/history",
  keywords: [
    "تاریخچه معاملات",
    "تراکنش",
    "خرید و فروش",
    "سبد من",
    "آینده‌کاوان",
  ],
  noIndex: true,
})

export default function PortfolioHistoryPage() {
  return <TransactionHistoryGrid />
}
