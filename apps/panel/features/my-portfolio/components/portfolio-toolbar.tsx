"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HistoryIcon,
  LineChartIcon,
  TrendingDownIcon,
  WalletIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { CashTransactionDialog } from "./cash-transaction-dialog"

export function PortfolioToolbar() {
  const pathname = usePathname()
  const [cashOpen, setCashOpen] = useState(false)

  if (pathname.startsWith("/my-portfolio/history")) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          nativeButton={false}
          className="gap-1.5"
          render={<Link href="/my-portfolio/history" />}
        >
          <HistoryIcon className="size-3.5" aria-hidden />
          تاریخچه معاملات
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setCashOpen(true)}
        >
          <WalletIcon className="size-3.5" aria-hidden />
          واریز / برداشت
        </Button>
        <Button type="button" variant="outline" size="sm" className="gap-1.5">
          <LineChartIcon className="size-3.5" aria-hidden />
          عملکرد سبد
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 border-loss/40 text-loss hover:bg-loss/10 hover:text-loss"
        >
          <TrendingDownIcon className="size-3.5" aria-hidden />
          فروش
        </Button>
      </div>

      <CashTransactionDialog open={cashOpen} onOpenChange={setCashOpen} />
    </>
  )
}
