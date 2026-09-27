import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import {
  MarketTickerCard,
  type MarketTickerCardProps,
} from "@/components/market-ticker-card"
import { siteContainerClass } from "@/lib/site-container"

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
    symbol: "T",
    label: "تتر",
    price: "۸۷,۲۰۰",
    change: "+۰.۱۸٪",
    positive: true,
    tone: "green",
  },
  {
    symbol: "طلا",
    label: "طلای ۱۸ عیار",
    price: "۴,۴۷۵,۰۰۰",
    change: "+۰.۸۱٪",
    positive: true,
    tone: "yellow",
  },
  {
    symbol: "₿",
    label: "بیت‌کوین",
    price: "۱۰۴,۴۵۰",
    change: "+۲.۳۳٪",
    positive: true,
    tone: "blue",
  },
  {
    symbol: "سکه",
    label: "سکه امامی",
    price: "۷۹,۵۰۰,۰۰۰",
    change: "−۰.۲۵٪",
    positive: false,
    tone: "red",
  },
  {
    symbol: "ش",
    label: "شاخص کل",
    price: "۲,۱۴۵,۰۰۰",
    change: "+۰.۴۲٪",
    positive: true,
    tone: "teal",
  },
]

export function MarketTicker() {
  return (
    // * overflow-x-clip keeps page sticky header stable while the row scrolls
    <section className="w-full overflow-x-clip border-b border-border/50 py-4 sm:py-5">
      <div className={siteContainerClass}>
        {/* * Keep title/badge out of the scrollport so they never clip on mobile */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0 shrink">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              نبض بازار
            </h2>
            <div className="mt-1.5 h-1 w-10 rounded-full bg-primary" />
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground sm:gap-3">
            <Badge
              variant="success"
              className="h-5 gap-1 px-1.5 text-[10px]"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-gain" />
              بازار باز است
            </Badge>
            <span className="hidden sm:inline">امروز · به‌روز لحظه‌ای</span>
          </div>
        </div>

        {/* * Mobile/tablet: snap carousel; lg+: 6-col grid */}
        <div
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 touch-pan-x [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 lg:touch-auto [&::-webkit-scrollbar]:hidden"
        >
          {tickers.map((ticker) => (
            <div
              key={ticker.label}
              className="w-[min(78vw,17rem)] shrink-0 snap-center lg:w-auto lg:snap-none"
            >
              <Link href="/prices" className="block">
                <MarketTickerCard {...ticker} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
