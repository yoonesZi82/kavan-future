import { createMetadata } from "@/lib/seo/create-metadata"
import { UsersGrid } from "@/features/users/users-grid"

// * Admin user management — mock list/detail until billing/auth API
export const metadata = createMetadata({
  title: "کاربران",
  description:
    "مدیریت کاربران پنل آینده‌کاوان — جستجو، فیلتر وضعیت، مشاهده پلن و تاریخچه پرداخت.",
  path: "/users",
  keywords: ["کاربران", "مدیریت کاربر", "پلن", "اشتراک", "آینده‌کاوان"],
  noIndex: true,
})

export default function UsersPage() {
  return <UsersGrid />
}
