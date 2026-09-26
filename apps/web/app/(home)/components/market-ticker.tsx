import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import {
  MarketTickerCard,
  type MarketTickerCardProps,
} from "@/components/market-ticker-card"
import { SectionHeading } from "@/components/section-heading"

const tickers: MarketTickerCardProps[] = [
  {
    symbol: "$",
    label: "دلار آزاد",
    price: "۸۷,۴۵۰",
    change: "+۰.۷۲٪",
    positive: true,
    tone: "green",
  },
  {
    symbol: "€",
    label: "یورو",
    price: "۹۴,۸۰۰",
    change: "+۰.۴۱٪",
    positive: true,
    tone: "teal",
  },
  {
    symbol: "T",
    label: "تتر",
    price: "۸۷,۲۰۰",
    change: "+۰.۱۸٪",
    positive: true,
    tone: "green",
    badge: "۱",
  },
  {
    symbol: "طلا",
    label: "طلای ۱۸ عیار",
    price: "۴,۴۷۵,۰۰۰",
    change: "+۰.۸۱٪",
    positive: true,
    tone: "yellow",
    badge: "۲",
  },
  {
    symbol: "سکه",
    label: "سکه امامی",
    price: "۷۹,۵۰۰,۰۰۰",
    change: "−۰.۲۵٪",
    positive: false,
    tone: "red",
    badge: "۳",
  },
  {
    symbol: "₿",
    label: "بیت‌کوین",
    price: "۱۰۴,۴۵۰",
    change: "+۲.۳۳٪",
    positive: true,
    tone: "blue",
    badge: "۴",
  },
]

export function MarketTicker() {
  return (
    <section className="w-full border-b border-border/60 bg-muted/30 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="success" className="h-5 gap-1 px-1.5 text-[10px]">
              <span className="size-1.5 animate-pulse rounded-full bg-gain" />
              بازار باز است
            </Badge>
            <span className="hidden sm:inline">
              سه‌شنبه ۱۸ شهریور ۱۴۰۴ · ۱۴:۱۲
            </span>
          </div>
          <SectionHeading href="/prices" className="mb-0" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {tickers.map((ticker) => (
            <MarketTickerCard key={ticker.label} {...ticker} />
          ))}
        </div>
      </div>
    </section>
  )
}
