import Link from "next/link"
import { BarChart3Icon, XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function PerformanceHeader() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BarChart3Icon className="size-5" aria-hidden />
        </span>
        <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
          عملکرد دلاری سبد
        </h1>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        nativeButton={false}
        aria-label="بازگشت به سبد من"
        render={<Link href="/my-portfolio" />}
      >
        <XIcon className="size-4" aria-hidden />
      </Button>
    </div>
  )
}
