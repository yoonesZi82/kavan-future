import Image from "next/image"
import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

export type AnalysisCardProps = {
  title: string
  date: string
  source?: string
  imageSrc: string
  imageAlt: string
  category: string
  href?: string
  className?: string
}

/** Minimal horizontal news card — badge, title, meta + square image. */
export function AnalysisCard({
  title,
  date,
  source,
  imageSrc,
  imageAlt,
  category,
  href = "#",
  className,
}: AnalysisCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className={cn(
          "group flex h-full flex-row items-center gap-4 overflow-hidden border border-border/70 bg-card py-0 shadow-none ring-0 transition-colors hover:border-border",
          "p-4",
          className
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5 py-0.5">
          <Badge
            variant="outline"
            className="h-6 border-primary/40 bg-primary/10 px-2.5 text-[10px] font-medium text-primary"
          >
            {category}
          </Badge>
          <h3 className="line-clamp-2 text-[15px] leading-7 font-bold text-foreground">
            {title}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {source ? `${source} | ${date}` : date}
          </p>
        </div>
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:size-28">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Card>
    </Link>
  )
}
