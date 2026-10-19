import Link from "next/link"
import { ChevronLeftIcon, HistoryIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function HistoryHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HistoryIcon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            تاریخچه معاملات
          </h1>
          <p className="text-sm text-muted-foreground">
            لیست کامل تراکنش‌های ثبت‌شده در سبد شما
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        nativeButton={false}
        className="gap-1.5 self-start sm:self-center"
        render={<Link href="/my-portfolio" />}
      >
        بازگشت به سبد من
        <ChevronLeftIcon className="size-3.5 opacity-70" aria-hidden />
      </Button>
    </div>
  )
}
