import { createMetadata } from "@/lib/seo/create-metadata"
import { WaitlistShell } from "./components/waitlist-shell"

// * Waitlist signup: layout matches design mock; tokens from shared theme
export const metadata = createMetadata({
  title: "عضویت در لیست انتظار",
  description:
    "با عضویت در لیست انتظار آگاه پرداز پارس از زمان عرضه و دسترسی زودهنگام مطلع شوید.",
  path: "/register-user",
  keywords: ["لیست انتظار", "عضویت", "آگاه پرداز"],
})

export default function RegisterUserPage() {
  return <WaitlistShell />
}
