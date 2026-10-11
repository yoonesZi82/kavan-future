"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Controller, useForm, useWatch } from "react-hook-form"
import { User } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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
import {
  WAITLIST_FORM_DEFAULTS,
  type WaitlistFormValues,
} from "../waitlist-form-values"
import { ContactChannelPicker } from "./contact-channel-picker"
import { ContactFields } from "./contact-fields"
import { InterestPicker } from "./interest-picker"
import { WaitlistFieldIcon } from "./waitlist-field-icon"
import { WaitlistSuccess } from "./waitlist-success"

export function WaitlistForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<WaitlistFormValues>({
    defaultValues: WAITLIST_FORM_DEFAULTS,
    mode: "onSubmit",
  })

  const channels = useWatch({ control, name: "channels" })
  const acceptedTerms = useWatch({ control, name: "acceptedTerms" })

  const reduceMotion = useReducedMotion()

  // * UI-only for now — wire to API / server action later
  function onSubmit() {}

  return (
    <AnimatePresence mode="wait">
      {isSubmitSuccessful ? (
        <WaitlistSuccess key="success" />
      ) : (
        <motion.div
          key="form"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: -18, filter: "blur(4px)" }
          }
          transition={{ duration: 0.28, ease: "easeIn" }}
        >
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field data-invalid={!!errors.fullName || undefined}>
                    <FieldLabel htmlFor="waitlist-name">
                      نام و نام خانوادگی
                    </FieldLabel>
                    <Controller
                      name="fullName"
                      control={control}
                      rules={{ required: "نام الزامی است" }}
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
                        value.length > 0 ||
                        "حداقل یک راه ارتباطی را انتخاب کنید",
                    }}
                    render={({ field }) => (
                      <ContactChannelPicker
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />

                  <ContactFields
                    control={control}
                    channels={channels}
                    errors={errors}
                  />

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

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full text-base"
                    disabled={!acceptedTerms}
                  >
                    درخواست عضویت رایگان
                  </Button>

                  <p className="text-muted-foreground text-center text-xs">
                    اطلاعات شما هرگز در اختیار اشخاص ثالث قرار نمی‌گیرد.
                  </p>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
