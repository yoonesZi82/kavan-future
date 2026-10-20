"use client"

import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form"
import { Controller } from "react-hook-form"
import { Loader2, User } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import type { ContactChannel } from "../constants"
import type { WaitlistFormValues } from "../waitlist-form-values"
import { ContactChannelPicker } from "./contact-channel-picker"
import { ContactFields } from "./contact-fields"
import { InterestPicker } from "./interest-picker"
import { WaitlistFieldIcon } from "./waitlist-field-icon"

type WaitlistFormFieldsProps = {
  control: Control<WaitlistFormValues>
  errors: FieldErrors<WaitlistFormValues>
  channels: ContactChannel[]
  acceptedTerms: boolean
  isSubmitting: boolean
  formError: string | null
  onSubmit: (values: WaitlistFormValues) => Promise<void>
  handleSubmit: UseFormHandleSubmit<WaitlistFormValues>
}

export function WaitlistFormFields({
  control,
  errors,
  channels,
  acceptedTerms,
  isSubmitting,
  formError,
  onSubmit,
  handleSubmit,
}: WaitlistFormFieldsProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.fullName || undefined}>
          <FieldLabel htmlFor="waitlist-name">نام و نام خانوادگی</FieldLabel>
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: "نام الزامی است",
              maxLength: { value: 150, message: "حداکثر ۱۵۰ کاراکتر" },
            }}
            render={({ field }) => (
              <InputGroup className="h-11">
                <InputGroupInput
                  id="waitlist-name"
                  className="pe-2"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  placeholder="نام خود را وارد کنید"
                  autoComplete="name"
                  maxLength={150}
                  aria-invalid={!!errors.fullName}
                />
                <WaitlistFieldIcon>
                  <User />
                </WaitlistFieldIcon>
              </InputGroup>
            )}
          />
          <FieldError>{errors.fullName?.message}</FieldError>
        </Field>

        <Controller
          name="channels"
          control={control}
          rules={{
            validate: (value) =>
              value.length > 0 || "حداقل یک راه ارتباطی را انتخاب کنید",
          }}
          render={({ field }) => (
            <ContactChannelPicker
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        <ContactFields control={control} channels={channels} errors={errors} />

        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <InterestPicker
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        <Field orientation="horizontal" className="items-center gap-2">
          <Controller
            name="acceptedTerms"
            control={control}
            rules={{
              validate: (value) => value || "پذیرش شرایط الزامی است",
            }}
            render={({ field }) => (
              <Checkbox
                id="waitlist-terms"
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
              />
            )}
          />
          <FieldLabel htmlFor="waitlist-terms" className="font-normal">
            با شرایط و قوانین موافقم
          </FieldLabel>
        </Field>
        <FieldError>{errors.acceptedTerms?.message}</FieldError>

        {formError ? (
          <p className="text-destructive text-sm" role="alert">
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full text-base"
          disabled={!acceptedTerms || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 data-icon="inline-start" className="animate-spin" />
              در حال ثبت…
            </>
          ) : (
            "درخواست عضویت رایگان"
          )}
        </Button>

        <p className="text-muted-foreground text-center text-xs">
          اطلاعات شما هرگز در اختیار اشخاص ثالث قرار نمی‌گیرد.
        </p>
      </FieldGroup>
    </form>
  )
}
