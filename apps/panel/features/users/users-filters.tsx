"use client"

import { SearchIcon } from "lucide-react"
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
import type { UserStatusFilter } from "@/features/users/types"

const STATUS_ITEMS: ReadonlyArray<{
  label: string
  value: UserStatusFilter
}> = [
  { label: "همه", value: "all" },
  { label: "فعال", value: "active" },
  { label: "غیرفعال", value: "inactive" },
]

type UsersFiltersProps = {
  query: string
  status: UserStatusFilter
  onQueryChange: (value: string) => void
  onStatusChange: (value: UserStatusFilter) => void
  onApply: () => void
}

export function UsersFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onApply,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <InputGroup className="h-10 flex-1 bg-background">
        {/* * Logical padding: shared addon uses physical pl only — sticks to border in RTL */}
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
          placeholder="جستجوی نام، ایمیل یا موبایل..."
          aria-label="جستجوی کاربران"
        />
      </InputGroup>

      <Select
        items={STATUS_ITEMS}
        value={status}
        onValueChange={(value) => {
          if (value === null) return
          onStatusChange(value)
        }}
      >
        <SelectTrigger
          className="h-10 min-w-28 bg-background data-[size=default]:h-10"
          dir="rtl"
          aria-label="فیلتر وضعیت"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectGroup>
            {STATUS_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="button" className="h-10 shrink-0 px-5" onClick={onApply}>
        اعمال فیلتر
      </Button>
    </div>
  )
}
