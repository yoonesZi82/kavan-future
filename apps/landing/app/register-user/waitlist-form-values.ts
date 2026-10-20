import type { ContactChannel, Interest } from "./constants"

export type WaitlistFormValues = {
  fullName: string
  channels: ContactChannel[]
  telegram: string
  mobile: string
  email: string
  interests: Interest[]
  acceptedTerms: boolean
}

export const WAITLIST_FORM_DEFAULTS: WaitlistFormValues = {
  fullName: "",
  // * API requires phone + email; keep all contact channels visible by default
  channels: ["telegram", "mobile", "email"],
  telegram: "",
  mobile: "",
  email: "",
  interests: ["market-analysis"],
  acceptedTerms: false,
}
