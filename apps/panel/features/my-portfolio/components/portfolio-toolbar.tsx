"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HistoryIcon,
  LineChartIcon,
  PlusIcon,
  WalletIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { CashTransactionDialog } from "./cash-transaction-dialog"

export function PortfolioToolbar() {
  const pathname = usePathname()
  const isHistory = pathname.startsWith("/my-portfolio/history")
  const [cashOpen, setCashOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          nativeButton={false}
          className={cn(
            "gap-1.5",
            isHistory && "border-primary/40 bg-primary/5"
          )}
          render={<Link href="/my-portfolio/history" />}
        >
          <HistoryIcon className="size-3.5" aria-hidden />
          تاریخچه معاملات
        </Button>
        <Button type="button" variant="outline" size="sm" className="gap-1.5">
          <WalletIcon className="size-3.5" aria-hidden />
          واریز / برداشت
        </Button>
        <Button type="button" variant="outline" size="sm" className="gap-1.5">
          <LineChartIcon className="size-3.5" aria-hidden />
          عملکرد سبد
        </Button>
        <Button
          type="button"
          size="sm"
          className="gap-1.5"
          onClick={() => setCashOpen(true)}
        >
          <PlusIcon className="size-3.5" aria-hidden />
          افزودن دارایی
        </Button>
      </div>

      <CashTransactionDialog open={cashOpen} onOpenChange={setCashOpen} />
    </>
  )
}
