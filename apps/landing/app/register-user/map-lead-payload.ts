import type { WaitlistFormValues } from "./waitlist-form-values"
import type { LeadPayload } from "./submit-lead"

function normalizeTelegramId(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`
}

export function mapWaitlistToLeadPayload(
  values: WaitlistFormValues
): LeadPayload {
  return {
    full_name: values.fullName.trim(),
    phone_number: values.mobile.trim(),
    email: values.email.trim(),
    telegram_id: normalizeTelegramId(values.telegram),
  }
}

export const FORM_FIELD_BY_API: Record<
  "full_name" | "phone_number" | "email" | "telegram_id",
  keyof WaitlistFormValues
> = {
  full_name: "fullName",
  phone_number: "mobile",
  email: "email",
  telegram_id: "telegram",
}
