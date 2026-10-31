"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { cn } from "@workspace/ui/lib/utils"
import {
  HOLDINGS,
  SEARCHABLE_ASSETS,
  searchableAssetToHolding,
} from "../mock-data"
import type { Holding, SearchableAsset } from "../types"
import {
  AddTradeDialog,
  type AddTradePayload,
} from "./add-trade-dialog"
import { HoldingsTable } from "./holdings-table"
import { ManageTradesDialog } from "./manage-trades-dialog"
import {
  SellAssetDialog,
  type SellAssetPayload,
} from "./sell-asset-dialog"

export function HoldingsCard() {
  const [query, setQuery] = useState("")
  const [holdings, setHoldings] = useState<Holding[]>(() => [...HOLDINGS])
  const [editHolding, setEditHolding] = useState<Holding | null>(null)
  const [sellHolding, setSellHolding] = useState<Holding | null>(null)
  const [addAsset, setAddAsset] = useState<SearchableAsset | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const heldIds = useMemo(
    () => new Set(holdings.map((holding) => holding.id)),
    [holdings]
  )

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return []
    return SEARCHABLE_ASSETS.filter(
      (asset) =>
        asset.name.includes(query.trim()) ||
        asset.symbol.toLowerCase().includes(normalized)
    )
  }, [query])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  function handleOpenAddTrade(asset: SearchableAsset) {
    if (heldIds.has(asset.id)) return
    setAddAsset(asset)
    setSearchOpen(false)
  }

  function handleSubmitTrade(payload: AddTradePayload) {
    if (heldIds.has(payload.asset.id)) return
    const holding = searchableAssetToHolding(payload.asset)
    setHoldings((current) => [
      ...current,
      {
        ...holding,
        buyPrice: payload.unitPrice,
        quantity: `${payload.quantity} ${payload.unit}`,
        currentPrice: payload.asset.price,
      },
    ])
    setAddAsset(null)
    setQuery("")
  }

  function handleSubmitSell(payload: SellAssetPayload) {
    const unit = payload.unit
    setHoldings((current) =>
      current
        .map((row) => {
          if (row.id !== payload.holding.id) return row
          if (payload.remaining <= 0) return null
          return {
            ...row,
            quantity: `${payload.remaining.toLocaleString("fa-IR")} ${unit}`,
          }
        })
        .filter((row): row is Holding => row !== null)
    )
    setSellHolding(null)
  }

  return (
    <Card className="flex h-full min-h-0 min-w-0 flex-col gap-0 overflow-visible py-0 ring-inset">
      <CardHeader className="relative z-20 shrink-0 gap-3 overflow-visible border-b border-border px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-semibold">
            دارایی‌های سبد اصلی
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 overflow-visible">
            <div ref={searchRef} className="relative z-30 w-full sm:w-72">
              <InputGroup className="h-9 w-full">
                <InputGroupAddon align="inline-start" className="ps-3 pe-2.5">
                  <SearchIcon className="size-3.5" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  value={query}
                  onChange={(event) => {
                    const next = event.target.value
                    setQuery(next)
                    setSearchOpen(next.trim().length > 0)
                  }}
                  onFocus={() => {
                    if (query.trim().length > 0) setSearchOpen(true)
                  }}
                  placeholder="جستجوی دارایی..."
                  className="text-sm"
                  autoComplete="off"
                />
              </InputGroup>

              {searchOpen && query.trim().length > 0 ? (
                <div
                  role="listbox"
                  className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-50 max-h-72 overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-md ring-1 ring-foreground/10"
                >
                  {searchResults.length === 0 ? (
                    <p className="px-3 py-4 text-center text-xs text-muted-foreground">
                      دارایی‌ای پیدا نشد
                    </p>
                  ) : (
                    searchResults.map((asset) => {
                      const alreadyHeld = heldIds.has(asset.id)
                      const isGain = asset.changePercent >= 0
                      return (
                        <div
                          key={asset.id}
                          role="option"
                          aria-selected={alreadyHeld}
                          className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted/60"
                        >
                          <span
                            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
                            style={{ backgroundColor: asset.accent }}
                            aria-hidden
                          >
                            {asset.symbol.slice(0, 2)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {asset.name}
                            </span>
                            <span
                              className="block text-[11px] text-muted-foreground"
                              dir="ltr"
                            >
                              {asset.symbol}
                            </span>
                          </span>
                          <span className="shrink-0 text-end">
                            <span className="block text-xs font-semibold tabular-nums">
                              {asset.price}
                            </span>
                            <span
                              className={cn(
                                "block text-[11px] font-medium tabular-nums",
                                isGain ? "text-gain" : "text-loss"
                              )}
                            >
                              {`${isGain ? "+" : ""}${asset.changePercent.toLocaleString("fa-IR", {
                                maximumFractionDigits: 1,
                              })}٪`}
                            </span>
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant={alreadyHeld ? "outline" : "default"}
                            className="h-7 shrink-0 gap-1 px-2 text-xs"
                            disabled={alreadyHeld}
                            onClick={() => handleOpenAddTrade(asset)}
                          >
                            <PlusIcon className="size-3.5" aria-hidden />
                            {alreadyHeld ? "افزوده شده" : "افزودن"}
                          </Button>
                        </div>
                      )
                    })
                  )}
                </div>
              ) : null}
            </div>
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
        <HoldingsTable
          rows={holdings}
          onEdit={setEditHolding}
          onSell={setSellHolding}
        />
      </CardContent>

      <ManageTradesDialog
        holding={editHolding}
        open={editHolding !== null}
        onOpenChange={(open) => {
          if (!open) setEditHolding(null)
        }}
      />

      <SellAssetDialog
        holding={sellHolding}
        open={sellHolding !== null}
        onOpenChange={(open) => {
          if (!open) setSellHolding(null)
        }}
        onSubmit={handleSubmitSell}
      />

      <AddTradeDialog
        asset={addAsset}
        open={addAsset !== null}
        onOpenChange={(open) => {
          if (!open) setAddAsset(null)
        }}
        onSubmit={handleSubmitTrade}
      />
    </Card>
  )
}
