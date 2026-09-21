"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
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
import { navItems } from "@/components/dashboard/nav-items"
import { useMarketsQuery } from "@/features/market-pulse/hooks"

type SectionId = "pages" | "markets"

type AccordionHeadingProps = {
  label: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionHeading({ label, isOpen, onToggle }: AccordionHeadingProps) {
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

export function SidebarSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [sections, setSections] = useState<Record<SectionId, boolean>>({
    pages: true,
    markets: false,
  })
  const { data: markets } = useMarketsQuery()
  const isFiltering = query.trim().length > 0
  const marketItems = useMemo(
    () =>
      (markets ?? []).slice(0, 80).map((market) => ({
        id: market.id,
        label: market.symbol,
        keywords: `${market.symbol} ${market.src} ${market.dst}`,
      })),
    [markets]
  )

  function toggleSection(id: SectionId) {
    if (isFiltering) return
    setSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setQuery("")
      setSections({ pages: true, markets: false })
    }
  }

  const showPages = isFiltering || sections.pages
  const showMarkets = isFiltering || sections.markets

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="ms-auto shrink-0 group-data-[collapsible=icon]:ms-0"
        aria-label="جستجو"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="جستجو"
        description="جستجوی دارایی، شاخص، نماد یا صفحه"
        className="sm:max-w-lg"
      >
        <Command>
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
              <div className="overflow-hidden p-1">
                <AccordionHeading
                  label="بازارها"
                  isOpen={showMarkets}
                  onToggle={() => toggleSection("markets")}
                />
                {showMarkets ? (
                  <CommandGroup>
                    {marketItems.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.keywords}
                        onSelect={() => {
                          setOpen(false)
                          router.push("/market-pulse")
                        }}
                      >
                        <span dir="ltr">{item.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
              </div>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
