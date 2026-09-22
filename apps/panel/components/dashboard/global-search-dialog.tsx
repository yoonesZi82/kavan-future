"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { cn } from "@workspace/ui/lib/utils"
import { useGlobalSearch } from "@/components/dashboard/global-search-context"
import { navItems } from "@/components/dashboard/nav-items"
import { useMarketsQuery } from "@/features/market-pulse/hooks"
import type { MarketPair } from "@/features/market-pulse/types"

type SectionId = "pages" | "markets"

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
}

function AccordionHeading({
  label,
  isOpen,
  onToggle,
}: {
  label: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-xs font-medium text-muted-foreground outline-none hover:bg-muted/60 hover:text-foreground"
    >
      <span>{label}</span>
      <ChevronDownIcon
        className={cn(
          "size-3.5 shrink-0 transition-transform",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

function MarketResultRow({ market }: { market: MarketPair }) {
  const isGain = market.dayChange >= 0
  return (
    <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">
          {market.nameFa}
        </span>
        <span className="text-[10px] text-muted-foreground" dir="ltr">
          {market.symbol}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5" dir="ltr">
        <span className="text-sm font-semibold tabular-nums">
          {formatPrice(market.latest)}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "h-5 min-w-12 justify-center px-1.5 text-[10px] tabular-nums",
            isGain
              ? "border-gain/35 bg-gain/10 text-gain"
              : "border-loss/35 bg-loss/10 text-loss"
          )}
        >
          {formatSigned(market.dayChange)}٪
        </Badge>
      </span>
    </span>
  )
}

/** Shared command palette — opened from header (md+) or sidebar (mobile). */
export function GlobalSearchDialog() {
  const router = useRouter()
  const { open, setOpen } = useGlobalSearch()
  const [query, setQuery] = useState("")
  const [sections, setSections] = useState<Record<SectionId, boolean>>({
    pages: true,
    markets: true,
  })
  const { data: markets } = useMarketsQuery()
  const isFiltering = query.trim().length > 0

  const marketItems = useMemo(() => (markets ?? []).slice(0, 80), [markets])

  function toggleSection(id: SectionId) {
    if (isFiltering) return
    setSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setQuery("")
      setSections({ pages: true, markets: true })
    }
  }

  const showPages = isFiltering || sections.pages
  const showMarkets = isFiltering || sections.markets

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="جستجو"
      description="جستجوی دارایی، شاخص، نماد یا صفحه"
      className="sm:max-w-lg"
    >
      <Command shouldFilter>
        <CommandInput
          placeholder="جستجوی دارایی، شاخص، نماد..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>نتیجه‌ای پیدا نشد</CommandEmpty>
          <div className="overflow-hidden p-1">
            <AccordionHeading
              label="صفحات"
              isOpen={showPages}
              onToggle={() => toggleSection("pages")}
            />
            {showPages ? (
              <CommandGroup>
                {navItems
                  .filter((item) => item.enabled)
                  .map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.title}
                      onSelect={() => {
                        setOpen(false)
                        router.push(item.href)
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ) : null}
          </div>
          {marketItems.length > 0 ? (
            <div className="m-1 overflow-hidden rounded-lg border border-border bg-muted/40 p-1">
              <AccordionHeading
                label="بازارها"
                isOpen={showMarkets}
                onToggle={() => toggleSection("markets")}
              />
              {showMarkets ? (
                <CommandGroup className="p-0!">
                  <div className="flex flex-col gap-1.5 p-1">
                    {marketItems.map((market) => (
                      <CommandItem
                        key={market.id}
                        value={`${market.nameFa} ${market.symbol} ${market.src} ${market.dst} ${market.ohlcSymbol}`}
                        onSelect={() => {
                          setOpen(false)
                          router.push("/market-pulse")
                        }}
                        className="w-full items-center rounded-lg border border-border bg-popover py-2 shadow-none [&>svg]:hidden data-selected:border-primary/40 data-selected:bg-muted"
                      >
                        <MarketResultRow market={market} />
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
              ) : null}
            </div>
          ) : null}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
