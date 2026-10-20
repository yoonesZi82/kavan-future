"use client"

import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { CONTACT_OPTIONS, type ContactChannel } from "../constants"
import type { WaitlistFormValues } from "../waitlist-form-values"
import { WaitlistFieldIcon } from "./waitlist-field-icon"

const FIELD_MAX: Record<"telegram" | "mobile" | "email", number> = {
  telegram: 100,
  mobile: 20,
  email: 254,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactFieldsProps = {
  control: Control<WaitlistFormValues>
  channels: ContactChannel[]
  errors: FieldErrors<WaitlistFormValues>
}

export function ContactFields({
  control,
  channels,
  errors,
}: ContactFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CONTACT_OPTIONS.filter((option) => channels.includes(option.value)).map(
        (option) => {
          const Icon = option.icon
          const maxLength = FIELD_MAX[option.value]
          return (
            <Field
              key={option.value}
              data-invalid={!!errors[option.value] || undefined}
            >
              <FieldLabel htmlFor={`waitlist-${option.value}`}>
                {option.fieldLabel}
              </FieldLabel>
              <Controller
                name={option.value}
                control={control}
                rules={{
                  // * telegram_id is optional on the API; phone + email are required
                  required:
                    option.value === "telegram"
                      ? false
                      : `${option.fieldLabel} الزامی است`,
                  maxLength: {
                    value: maxLength,
                    message: `حداکثر ${maxLength} کاراکتر`,
                  },
                  ...(option.value === "email"
                    ? {
                        pattern: {
                          value: EMAIL_PATTERN,
                          message: "ایمیل معتبر نیست",
                        },
                      }
                    : {}),
                }}
                render={({ field }) => (
                  <InputGroup className="h-11">
                    <InputGroupInput
                      id={`waitlist-${option.value}`}
                      className="pe-2"
                      type={option.inputType}
                      dir={option.dir}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      placeholder={option.placeholder}
                      autoComplete={option.autoComplete}
                      maxLength={maxLength}
                      aria-invalid={!!errors[option.value]}
                    />
                    <WaitlistFieldIcon>
                      <Icon />
                    </WaitlistFieldIcon>
                  </InputGroup>
                )}
              />
              <FieldDescription>{option.hint}</FieldDescription>
              <FieldError>{errors[option.value]?.message}</FieldError>
            </Field>
          )
        }
      )}
    </div>
  )
}
