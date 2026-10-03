import { createMetadata } from "@/lib/seo/create-metadata"
import { SubscriptionsGrid } from "@/features/subscriptions/subscriptions-grid"

// * Billing admin — mock KPIs/transactions/plans until payment API
export const metadata = createMetadata({
  title: "اشتراک و پرداخت‌ها",
  description:
    "مدیریت اشتراک‌ها، تراکنش‌های پرداخت و کدهای تخفیف پنل آینده‌کاوان.",
  path: "/subscriptions",
  keywords: [
    "اشتراک",
    "پرداخت",
    "کد تخفیف",
    "پلن",
    "تراکنش",
    "آینده‌کاوان",
  ],
  noIndex: true,
})

export default function SubscriptionsPage() {
  return <SubscriptionsGrid />
}
