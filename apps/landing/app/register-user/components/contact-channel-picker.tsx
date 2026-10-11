"use client"

import { Check } from "lucide-react"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils"
import { CONTACT_OPTIONS, type ContactChannel } from "../constants"

type ContactChannelPickerProps = {
  value: ContactChannel[]
  onValueChange: (value: ContactChannel[]) => void
}

export function ContactChannelPicker({
  value,
  onValueChange,
}: ContactChannelPickerProps) {
  return (
    <Field>
      <FieldLabel>راه ارتباطی خود را انتخاب کنید</FieldLabel>
      <ToggleGroup
        multiple
        value={value}
        onValueChange={(next) => {
          if (next.length > 0) onValueChange(next as ContactChannel[])
        }}
        className="grid w-full grid-cols-3 gap-2"
      >
        {CONTACT_OPTIONS.map((option) => {
          const Icon = option.icon
          const isSelected = value.includes(option.value)
          return (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className={cn(
                "relative h-auto min-h-20 flex-col gap-2 rounded-xl border border-input px-2 py-3 not-disabled:cursor-pointer hover:bg-primary/5 data-pressed:border-primary data-pressed:bg-primary/5 data-pressed:text-foreground",
                isSelected && "border-primary bg-primary/5"
              )}
            >
              {isSelected ? (
                <span className="absolute start-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-2.5!" />
                </span>
              ) : null}
              <Icon />
              <span className="text-xs font-medium">{option.label}</span>
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </Field>
  )
}
