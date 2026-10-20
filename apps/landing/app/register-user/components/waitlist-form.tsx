"use client"

import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  FORM_FIELD_BY_API,
  mapWaitlistToLeadPayload,
} from "../map-lead-payload"
import { submitLead } from "../submit-lead"
import {
  WAITLIST_FORM_DEFAULTS,
  type WaitlistFormValues,
} from "../waitlist-form-values"
import { WaitlistFormFields } from "./waitlist-form-fields"
import { WaitlistSuccessDialog } from "./waitlist-success-dialog"

export function WaitlistForm() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    defaultValues: WAITLIST_FORM_DEFAULTS,
    mode: "onSubmit",
  })

  const channels = useWatch({ control, name: "channels" })
  const acceptedTerms = useWatch({ control, name: "acceptedTerms" })

  async function onSubmit(values: WaitlistFormValues) {
    setFormError(null)
    if (!values.mobile.trim() || !values.email.trim()) {
      const nextChannels = Array.from(
        new Set([...values.channels, "mobile" as const, "email" as const])
      )
      setValue("channels", nextChannels)
      if (!values.mobile.trim()) {
        setError("mobile", {
          type: "validate",
          message: "شماره موبایل الزامی است",
        })
      }
      if (!values.email.trim()) {
        setError("email", { type: "validate", message: "ایمیل الزامی است" })
      }
      setFormError("شماره موبایل و ایمیل برای ثبت‌نام الزامی است.")
      return
    }
    const result = await submitLead(mapWaitlistToLeadPayload(values))
    if (result.ok) {
      reset(WAITLIST_FORM_DEFAULTS)
      setIsSuccessOpen(true)
      return
    }
    if (result.fieldErrors) {
      for (const [apiKey, message] of Object.entries(result.fieldErrors)) {
        const formKey =
          FORM_FIELD_BY_API[apiKey as keyof typeof FORM_FIELD_BY_API]
        if (formKey && message) {
          setError(formKey, { type: "server", message })
        }
      }
    }
    setFormError(result.message)
  }

  return (
    <>
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            عضویت در لیست انتظار
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            با عضویت در لیست، از زمان عرضه و دسترسی زودهنگام مطلع می‌شوید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WaitlistFormFields
            control={control}
            errors={errors}
            channels={channels}
            acceptedTerms={acceptedTerms}
            isSubmitting={isSubmitting}
            formError={formError}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </CardContent>
      </Card>

      <WaitlistSuccessDialog
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
      />
    </>
  )
}
