import Image from "next/image"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import {
  CandlestickChart,
  Crosshair,
  LineChart,
  MapPin,
  Pencil,
  Settings2,
  Type,
  ZoomIn,
} from "lucide-react"

const timeframes = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "All"]

const tools = [
  ZoomIn,
  Settings2,
  LineChart,
  CandlestickChart,
  Pencil,
  Type,
  MapPin,
  Crosshair,
]

export function HeroChart() {
  return (
    <Card className="relative gap-0 overflow-hidden border-border/80 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
        <div className="relative min-w-0 flex-1">
          <input
            defaultValue="دلار آتی / بورس آتی"
            readOnly
            className="border-border bg-background w-full rounded-md border py-2 pr-3 pl-3 text-xs outline-none"
          />
        </div>
        <div className="hidden items-center gap-0.5 text-[11px] sm:flex">
          {timeframes.map((tf, index) => (
            <span
              key={tf}
              className={
                index === 0
                  ? "bg-muted rounded px-2 py-1 font-medium"
                  : "text-muted-foreground rounded px-2 py-1"
              }
            >
              {tf}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-muted-foreground text-[13px]">
            <span className="text-foreground font-semibold">
              دلار آتی · ۱۰ · بورس آتی
            </span>
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground">O ۸۷,۲۰۰</span>
            <span className="text-muted-foreground">H ۸۸,۱۰۰</span>
            <span className="text-muted-foreground">L ۸۶,۹۰۰</span>
            <span className="font-semibold">C ۸۷,۴۵۰</span>
            <Badge variant="success" className="h-5 px-1.5 text-[10px]">
              +۲۵۰ (+۰.۲۹٪)
            </Badge>
          </div>
        </div>
        <span className="bg-gain rounded-sm px-2 py-0.5 text-[12px] font-bold text-white">
          ۸۷,۴۵۰
        </span>
      </div>

      <div className="relative border-t border-border/60">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {tools.map((Icon) => (
            <Button
              key={Icon.displayName ?? Icon.name}
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-foreground rounded-md"
            >
              <Icon />
            </Button>
          ))}
        </div>
        <div className="relative h-[220px] px-12 py-8 sm:h-[280px]">
          <Image
            src="/chart.webp"
            alt="چارت تحلیل تکنیکال بازار"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-contain p-2"
          />
        </div>
      </div>
    </Card>
  )
}
