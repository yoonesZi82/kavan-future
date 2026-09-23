import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

type AnalysisCardBase = {
  title: string
  date: string
  imageSrc: string
  imageAlt: string
  category: string
  href?: string
}

export type FeaturedAnalysisCardProps = AnalysisCardBase & {
  excerpt: string
  className?: string
}

export type CompactAnalysisCardProps = AnalysisCardBase & {
  className?: string
}

export function FeaturedAnalysisCard({
  title,
  date,
  excerpt,
  imageSrc,
  imageAlt,
  category,
  href = "#",
  className,
}: FeaturedAnalysisCardProps) {
  return (
    <Card
      className={cn(
        "group hover:border-primary/30 overflow-hidden border-border/60 bg-card transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
        <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-48 sm:w-64">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="bg-primary/90 absolute top-3 right-3 h-6 text-[10px] text-primary-foreground">
            {category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <h3 className="text-lg leading-7 font-bold">{title}</h3>
            <p className="text-muted-foreground mt-3 text-[13px]">{date}</p>
            <p className="text-muted-foreground mt-4 text-[13px] leading-7">
              {excerpt}
            </p>
          </div>
          <Link
            href={href}
            className="text-gain inline-flex items-center gap-1 text-[13px] font-semibold transition-all hover:gap-2"
          >
            مشاهده تحلیل
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

export function CompactAnalysisCard({
  title,
  date,
  imageSrc,
  imageAlt,
  category,
  href = "#",
  className,
}: CompactAnalysisCardProps) {
  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          "group hover:border-primary/30 cursor-pointer border-border/60 bg-card p-4 transition-all hover:shadow-md",
          className
        )}
      >
        <div className="flex gap-3">
          <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="112px"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Badge
              variant="success"
              className="absolute top-2 right-2 h-5 text-[9px]"
            >
              {category}
            </Badge>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <h4 className="text-[14px] leading-6 font-bold">{title}</h4>
            <p className="text-muted-foreground text-[11px]">{date}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
