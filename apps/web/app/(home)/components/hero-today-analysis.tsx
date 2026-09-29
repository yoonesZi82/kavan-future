import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

const ROWS = [
  { label: "روند غالب", value: "صعودی", className: "text-gain" },
  { label: "ساختار بازار", value: "تایید شده", className: "text-gain" },
  { label: "سطح کلیدی", value: "۸۷٬۲۰۰", className: "tabular-nums" },
  { label: "ریسک فعلی", value: "متوسط", className: "text-amber-600 dark:text-amber-400" },
] as const

/** Hero sidebar — fake daily snapshot until real analysis API. */
export function HeroTodayAnalysis() {
  return (
    <Card className="flex h-[320px] flex-col gap-0 border-border/70 bg-card py-0 shadow-sm ring-1 ring-border/40 sm:h-[340px] lg:h-[360px]">
      <div className="shrink-0 border-b border-border/60 px-4 py-2.5">
        <h3 className="text-sm font-bold">تحلیل امروز</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">دلار آزاد</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-3">
        <p className="text-xs leading-6 text-muted-foreground">
          قیمت نزدیک مقاومت کوتاه‌مدت است؛ ساختار صعودی حفظ شده و تا زمانی که
          حمایت کلیدی از دست نرود، سناریوی ادامه روند محتمل‌تر است.
        </p>
        <ul className="space-y-1.5">
          {ROWS.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-1.5 text-xs"
            >
              <span className="text-muted-foreground">{row.label}</span>
              <span className={cn("font-semibold", row.className)}>
                {row.value}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/analyses"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-auto w-full border-primary/40 text-primary"
          )}
        >
          مشاهده تحلیل
          <ArrowLeft data-icon="inline-end" />
        </Link>
      </div>
    </Card>
  )
}
