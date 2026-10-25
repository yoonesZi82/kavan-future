"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  formatJalaliDate,
  parseJalaliDate,
} from "@workspace/ui/lib/jalali-date"
import { cn } from "@workspace/ui/lib/utils"

type JalaliDatePickerProps = {
  id?: string
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  /** Matches common form control heights (`h-9`, `h-10`, …). */
  size?: "sm" | "default"
  disabled?: boolean
}

export function JalaliDatePicker({
  id,
  value,
  onValueChange,
  placeholder = "تاریخ را انتخاب کنید",
  className,
  size = "default",
  disabled = false,
}: JalaliDatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selected = React.useMemo(() => parseJalaliDate(value), [value])
  const [month, setMonth] = React.useState<Date | undefined>(selected)

  React.useEffect(() => {
    if (selected) setMonth(selected)
  }, [selected])

  return (
    <InputGroup
      className={cn(
        "bg-background font-sans",
        size === "sm" ? "h-9" : "h-10",
        className
      )}
    >
      <InputGroupInput
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="font-sans text-sm tabular-nums"
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setOpen(true)
          }
        }}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            disabled={disabled}
            render={
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="انتخاب تاریخ"
              />
            }
          >
            <CalendarIcon />
            <span className="sr-only">انتخاب تاریخ</span>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 font-sans"
            align="end"
            sideOffset={8}
          >
            <Calendar
              mode="single"
              selected={selected}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (!date) return
                onValueChange(formatJalaliDate(date))
                setOpen(false)
              }}
            />
            <div className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5">
              <Button
                type="button"
                variant="ghost"
                size="xs"
                className="font-sans"
                onClick={() => {
                  onValueChange(formatJalaliDate(new Date()))
                  setOpen(false)
                }}
              >
                امروز
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                className="font-sans text-muted-foreground"
                onClick={() => {
                  onValueChange("")
                  setOpen(false)
                }}
              >
                پاک کردن
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
