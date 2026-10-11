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
          const isRequired = option.value !== "email"
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
                  required: isRequired
                    ? `${option.fieldLabel} الزامی است`
                    : false,
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
