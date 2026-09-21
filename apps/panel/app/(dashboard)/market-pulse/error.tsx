"use client"

import { Button } from "@workspace/ui/components/button"

type MarketPulseErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function MarketPulseError({
  error,
  reset,
}: MarketPulseErrorProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-6 text-center">
      <h2 className="text-lg font-semibold">خطا در بارگذاری نبض بازار</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "مشکلی پیش آمد. دوباره تلاش کنید."}
      </p>
      <Button onClick={reset}>تلاش مجدد</Button>
    </div>
  )
}
