"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"
import {
  MARKET_FLOW_REFETCH_MS,
  useMarketFlowQuery,
} from "@/features/market-pulse/data/hooks"
import {
  formatCountdown,
  countdownUrgencyStyle,
  useRefetchCountdown,
} from "@/features/market-pulse/components/market-flow/use-refetch-countdown"

const TOTAL_SECONDS = Math.ceil(MARKET_FLOW_REFETCH_MS / 1000)

function formatBuyPower(value: number): string {
  return value.toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  })
}

export function MarketFlowPanel() {
  const { data, isLoading, dataUpdatedAt, isFetching } = useMarketFlowQuery()
  const secondsLeft = useRefetchCountdown(
    dataUpdatedAt,
    MARKET_FLOW_REFETCH_MS,
    isFetching
  )
  const urgency = countdownUrgencyStyle(secondsLeft, TOTAL_SECONDS)

  return (
    <Card className="flex max-h-[400px] flex-col gap-0 overflow-hidden py-0 ring-inset md:max-h-[460px]">
      <CardHeader className="shrink-0 gap-0 border-b px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">
            جریان بازار صندوق‌ها و گروه‌ها
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "min-w-14 justify-center border font-mono text-[11px] tabular-nums transition-[color,background-color,border-color] duration-500",
              isFetching && "animate-pulse"
            )}
            style={isFetching ? undefined : urgency}
            title="زمان تا بروزرسانی بعدی"
          >
            {isFetching ? "…" : formatCountdown(secondsLeft)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="scrollbar-brand min-h-0 flex-1 overflow-auto p-0">
        {isLoading ? (
          <div className="p-4">
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow>
                <TableHead className="min-w-36 text-start">نماد</TableHead>
                <TableHead className="text-center">حجم</TableHead>
                <TableHead className="text-center">ارزش معاملات</TableHead>
                <TableHead className="text-center">ورود پول</TableHead>
                <TableHead className="text-center">سرانه خرید</TableHead>
                <TableHead className="text-center">سرانه فروش</TableHead>
                <TableHead className="text-center">قدرت خرید</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row) => {
                const isIn = row.moneyInflow > 0
                return (
                  <TableRow key={row.id}>
                    <TableCell className="max-w-44 truncate text-start font-medium">
                      {row.symbol}
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      {row.volume}
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      {row.tradeValue}
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center gap-1",
                          isIn ? "text-gain" : "text-loss"
                        )}
                      >
                        {isIn ? (
                          <ArrowUpIcon className="size-3.5 shrink-0" />
                        ) : (
                          <ArrowDownIcon className="size-3.5 shrink-0" />
                        )}
                        {row.moneyInflowLabel}
                      </span>
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      {row.buyPerCapita}
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      {row.sellPerCapita}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-center tabular-nums",
                        row.buyPower >= 0 ? "text-gain" : "text-loss"
                      )}
                    >
                      {formatBuyPower(row.buyPower)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
