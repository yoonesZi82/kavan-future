"use client"

import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { PLAN_LABELS } from "@/features/subscriptions/mock-data"
import type { PlanFilter } from "@/features/subscriptions/types"

const PLAN_ITEMS: ReadonlyArray<{ label: string; value: PlanFilter }> = [
  { label: "همه پلن‌ها", value: "all" },
  { label: PLAN_LABELS.pro, value: "pro" },
  { label: PLAN_LABELS.vip, value: "vip" },
]

const DATE_ITEMS = [
  { label: "تاریخ ایجاد", value: "all" },
  { label: "امروز", value: "today" },
  { label: "این هفته", value: "week" },
  { label: "این ماه", value: "month" },
] as const

type TransactionsFiltersProps = {
  query: string
  plan: PlanFilter
  onQueryChange: (value: string) => void
  onPlanChange: (value: PlanFilter) => void
  onApply: () => void
}

export function TransactionsFilters({
  query,
  plan,
  onQueryChange,
  onPlanChange,
  onApply,
}: TransactionsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <InputGroup className="h-10 flex-1 bg-background">
        <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          className="h-full"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onApply()
          }}
          placeholder="جستجو در کد/کاربر..."
          aria-label="جستجوی تراکنش"
        />
      </InputGroup>

      <Select
        items={PLAN_ITEMS}
        value={plan}
        onValueChange={(value) => {
          if (value === null) return
          onPlanChange(value)
        }}
      >
        <SelectTrigger
          className="h-10 min-w-32 bg-background data-[size=default]:h-10"
          dir="rtl"
          aria-label="فیلتر پلن"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectGroup>
            {PLAN_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select items={[...DATE_ITEMS]} defaultValue="all">
        <SelectTrigger
          className="h-10 min-w-36 bg-background data-[size=default]:h-10"
          dir="rtl"
          aria-label="تاریخ ایجاد"
        >
          <CalendarIcon className="size-4 text-muted-foreground" aria-hidden />
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectGroup>
            {DATE_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        className="h-10 shrink-0 border-amber-500/50 px-5 text-amber-700 hover:bg-amber-500/10 hover:text-amber-800 dark:text-amber-400"
        onClick={onApply}
      >
        <FilterIcon data-icon="inline-start" />
        فیلترها
      </Button>
    </div>
  )
}
