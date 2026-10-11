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
  channels: ["telegram"],
  telegram: "",
  mobile: "",
  email: "",
  interests: ["market-analysis"],
  acceptedTerms: false,
}
