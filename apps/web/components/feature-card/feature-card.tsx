import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

export type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  iconClassName?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href = "#",
  iconClassName,
}: FeatureCardProps) {
  return (
    <Card className="group hover:border-primary/40 relative gap-0 border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={cn(
          "mb-5 inline-flex size-11 items-center justify-center rounded-xl",
          iconClassName ?? "bg-primary/15 text-primary"
        )}
      >
        <Icon />
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground mb-5 text-[13px] leading-6">
        {description}
      </p>
      <Link
        href={href}
        className="text-gain inline-flex items-center gap-1 text-[13px] font-semibold transition-all group-hover:gap-2"
      >
        مشاهده جزئیات
        <ArrowLeft className="size-3.5" />
      </Link>
    </Card>
  )
}
