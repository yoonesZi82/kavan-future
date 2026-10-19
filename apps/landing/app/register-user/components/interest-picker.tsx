"use client"

import { Check } from "lucide-react"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils"
import { INTEREST_OPTIONS, type Interest } from "../constants"

type InterestPickerProps = {
  value: Interest[]
  onValueChange: (value: Interest[]) => void
}

export function InterestPicker({ value, onValueChange }: InterestPickerProps) {
  return (
    <Field>
      <FieldLabel>به کدام بخش علاقه‌مندید؟ (اختیاری)</FieldLabel>
      {/* * One primary interest only — ToggleGroup without `multiple` */}
      <ToggleGroup
        value={value}
        onValueChange={(next) => onValueChange(next as Interest[])}
        className="flex w-full flex-wrap gap-2"
      >
        {INTEREST_OPTIONS.map((option) => {
          const isSelected = value.includes(option.value)
          return (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className={cn(
                "relative h-10 gap-2 rounded-xl border border-input px-4 data-pressed:border-primary data-pressed:bg-primary/5",
                isSelected && "border-primary bg-primary/5"
              )}
            >
              {isSelected ? <Check className="size-3.5!" /> : null}
              {option.label}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </Field>
  )
}
