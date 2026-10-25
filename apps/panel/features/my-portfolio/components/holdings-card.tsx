"use client"

import { useMemo, useState } from "react"
import {
  ChevronDownIcon,
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { HOLDINGS } from "../mock-data"
import type { Holding } from "../types"
import { HoldingsTable } from "./holdings-table"
import { ManageTradesDialog } from "./manage-trades-dialog"

export function HoldingsCard() {
  const [query, setQuery] = useState("")
  const [editHolding, setEditHolding] = useState<Holding | null>(null)

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return HOLDINGS
    return HOLDINGS.filter(
      (row) =>
        row.name.includes(query.trim()) ||
        row.symbol.toLowerCase().includes(normalized)
    )
  }, [query])

  return (
    <Card className="flex h-full min-h-0 min-w-0 flex-col gap-0 overflow-hidden py-0 ring-inset">
      <CardHeader className="shrink-0 gap-3 border-b border-border px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-semibold">
            دارایی‌های سبد اصلی
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <InputGroup className="h-9 w-full sm:w-72">
              <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                <SearchIcon className="size-3.5" aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجوی دارایی..."
                className="text-sm"
              />
            </InputGroup>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5"
                  />
                }
              >
                <PlusIcon className="size-3.5" aria-hidden />
                افزودن معامله
                <ChevronDownIcon className="size-3.5 opacity-60" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-44">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>خرید</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-44">
                    {HOLDINGS.map((holding) => (
                      <DropdownMenuItem
                        key={`buy-${holding.id}`}
                        onClick={() => setEditHolding(holding)}
                      >
                        {holding.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>فروش</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-44">
                    {HOLDINGS.map((holding) => (
                      <DropdownMenuItem
                        key={`sell-${holding.id}`}
                        onClick={() => setEditHolding(holding)}
                      >
                        {holding.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="button" variant="outline" size="icon-sm">
              <Settings2Icon className="size-3.5" aria-hidden />
              <span className="sr-only">تنظیمات جدول</span>
            </Button>
            <Button type="button" variant="outline" size="icon-sm">
              <FilterIcon className="size-3.5" aria-hidden />
              <span className="sr-only">فیلتر</span>
            </Button>
            <Button type="button" variant="outline" size="icon-sm">
              <DownloadIcon className="size-3.5" aria-hidden />
              <span className="sr-only">دانلود</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      {/* * Table wraps overflow-x-auto — hide that horizontal scrollbar here only */}
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0 [&_[data-slot=table-container]]:[-ms-overflow-style:none] [&_[data-slot=table-container]]:[scrollbar-width:none] [&_[data-slot=table-container]::-webkit-scrollbar]:hidden">
        <HoldingsTable rows={rows} onEdit={setEditHolding} />
      </CardContent>

      <ManageTradesDialog
        holding={editHolding}
        open={editHolding !== null}
        onOpenChange={(open) => {
          if (!open) setEditHolding(null)
        }}
      />
    </Card>
  )
}
