import Link from "next/link"
import { buttonVariants } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, Construction } from "lucide-react"
import { BRAND_NAME } from "@/lib/brand"

type PlaceholderLayoutProps = {
  title: string
  description: string
  children?: React.ReactNode
}

export function PlaceholderLayout({
  title,
  description,
  children,
}: PlaceholderLayoutProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Card className="mx-auto mb-8 flex max-w-xl items-center gap-4 border-border/60 bg-gradient-to-br from-primary/10 to-gain/10 p-8 text-right">
          <div className="bg-background flex size-16 shrink-0 items-center justify-center rounded-2xl shadow-sm">
            <Construction className="text-primary size-8" />
          </div>
          <div>
            <Badge className="bg-primary/90 mb-2 h-6 text-[11px]">به‌زودی</Badge>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-md text-[14px] leading-7">
              {description}
            </p>
          </div>
        </Card>
        {children ? <div className="flex flex-col gap-3">{children}</div> : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gain h-11 rounded-xl px-6 text-white hover:bg-gain/90"
            )}
          >
            بازگشت به خانه
            <ArrowLeft data-icon="inline-end" />
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl px-6"
            )}
          >
            تماس با {BRAND_NAME}
          </Link>
        </div>
      </div>
    </main>
  )
}
