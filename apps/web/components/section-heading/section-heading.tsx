import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type SectionHeadingProps = {
  title: string
  href?: string
  linkLabel?: string
  className?: string
}

export function SectionHeading({
  title,
  href,
  linkLabel = "مشاهده همه",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex items-end justify-between gap-6",
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-black tracking-tight sm:text-[28px]">
          {title}
        </h2>
        <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
      </div>
      {href ? (
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground hidden items-center gap-1 text-sm sm:inline-flex"
        >
          {linkLabel}
          <ArrowLeft className="size-3.5" />
        </Link>
      ) : null}
    </div>
  )
}
