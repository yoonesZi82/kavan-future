"use client"

import {
  DownloadIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react"
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
import { TX_TYPE_LABELS } from "../mock-data"
import type { TxTypeFilter } from "../types"

const TYPE_ITEMS: ReadonlyArray<{ label: string; value: TxTypeFilter }> = [
  { label: TX_TYPE_LABELS.all, value: "all" },
  { label: TX_TYPE_LABELS.buy, value: "buy" },
  { label: TX_TYPE_LABELS.sell, value: "sell" },
  { label: TX_TYPE_LABELS.deposit, value: "deposit" },
  { label: TX_TYPE_LABELS.withdraw, value: "withdraw" },
]

type HistoryFiltersProps = {
  query: string
  type: TxTypeFilter
  onQueryChange: (value: string) => void
  onTypeChange: (value: TxTypeFilter) => void
}

export function HistoryFilters({
  query,
  type,
  onQueryChange,
  onTypeChange,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <InputGroup className="h-9 w-full bg-background sm:max-w-64">
          <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
            <SearchIcon className="size-3.5" aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جستجوی دارایی..."
            className="text-xs"
            aria-label="جستجوی دارایی"
          />
        </InputGroup>
        <Select
          items={TYPE_ITEMS}
          value={type}
          onValueChange={(value) => {
            if (value === null) return
            onTypeChange(value)
          }}
        >
          <SelectTrigger
            className="h-9 min-w-36 bg-background data-[size=default]:h-9"
            dir="rtl"
            aria-label="نوع تراکنش"
          >
            <SelectValue placeholder="نوع تراکنش" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectGroup>
              {TYPE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" className="gap-1.5">
          <DownloadIcon className="size-3.5" aria-hidden />
          خروجی اکسل
        </Button>
        <Button type="button" variant="outline" size="icon-sm">
          <RefreshCwIcon className="size-3.5" aria-hidden />
          <span className="sr-only">بروزرسانی</span>
        </Button>
      </div>
    </div>
  )
}
