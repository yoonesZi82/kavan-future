"use server"

const LEADS_URL = "https://landingpageapi.vercel.app/api/leads/"

export type LeadPayload = {
  full_name: string
  phone_number: string
  email: string
  telegram_id: string | null
}

export type LeadFieldKey =
  | "full_name"
  | "phone_number"
  | "email"
  | "telegram_id"

export type SubmitLeadSuccess = { ok: true }

export type SubmitLeadFailure = {
  ok: false
  status: number | "network"
  message: string
  fieldErrors?: Partial<Record<LeadFieldKey, string>>
}

export type SubmitLeadResult = SubmitLeadSuccess | SubmitLeadFailure

function firstErrorMessage(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value
  if (Array.isArray(value)) {
    const first = value.find(
      (item): item is string => typeof item === "string" && item.trim().length > 0
    )
    return first
  }
  if (value && typeof value === "object") {
    for (const nested of Object.values(value as Record<string, unknown>)) {
      const message = firstErrorMessage(nested)
      if (message) return message
    }
  }
  return undefined
}

function parseFieldErrors(
  body: unknown
): Partial<Record<LeadFieldKey, string>> | undefined {
  if (!body || typeof body !== "object") return undefined
  const keys: LeadFieldKey[] = [
    "full_name",
    "phone_number",
    "email",
    "telegram_id",
  ]
  const fieldErrors: Partial<Record<LeadFieldKey, string>> = {}
  for (const key of keys) {
    if (!(key in body)) continue
    const message = firstErrorMessage((body as Record<string, unknown>)[key])
    if (message) fieldErrors[key] = message
  }
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined
}

function generalMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback
  const record = body as Record<string, unknown>
  return (
    firstErrorMessage(record.detail) ??
    firstErrorMessage(record.message) ??
    firstErrorMessage(record.non_field_errors) ??
    fallback
  )
}

export async function submitLead(
  payload: LeadPayload
): Promise<SubmitLeadResult> {
  let response: Response
  try {
    response = await fetch(LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch {
    return {
      ok: false,
      status: "network",
      message: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
    }
  }

  if (response.status === 201) {
    return { ok: true }
  }

  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (response.status === 400) {
    return {
      ok: false,
      status: 400,
      message: generalMessage(body, "اطلاعات واردشده معتبر نیست."),
      fieldErrors: parseFieldErrors(body),
    }
  }

  if (response.status === 429) {
    return {
      ok: false,
      status: 429,
      message: "تعداد درخواست‌ها زیاد است. کمی صبر کنید و دوباره تلاش کنید.",
    }
  }

  return {
    ok: false,
    status: response.status,
    message: generalMessage(body, "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید."),
  }
}
