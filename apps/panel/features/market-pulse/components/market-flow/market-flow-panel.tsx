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

const HEAD =
  "px-2 text-center text-[11px] font-medium whitespace-nowrap text-muted-foreground"
const CELL = "px-2 text-center text-sm tabular-nums whitespace-nowrap"
const TOTAL_SECONDS = Math.ceil(MARKET_FLOW_REFETCH_MS / 1000)

function formatBuyPower(value: number): string {
  return value.toLocaleString("en-US", {
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
    <Card className="flex max-h-[400px] flex-col ring-inset md:max-h-[460px]">
      <CardHeader className="shrink-0 border-b pb-3">
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
      <CardContent className="scrollbar-brand min-h-0 flex-1 overflow-auto pt-3">
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <Table className="table-fixed">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
            </colgroup>
            <TableHeader className="sticky top-0 z-10 bg-card [&_tr]:border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className={HEAD}>نماد</TableHead>
                <TableHead className={HEAD}>حجم</TableHead>
                <TableHead className={HEAD}>ارزش معاملات</TableHead>
                <TableHead className={HEAD}>ورود پول</TableHead>
                <TableHead className={HEAD}>سرانه خرید</TableHead>
                <TableHead className={HEAD}>سرانه فروش</TableHead>
                <TableHead className={HEAD}>قدرت خرید</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row) => {
                const isIn = row.moneyInflow > 0
                return (
                  <TableRow key={row.id}>
                    <TableCell className="px-2 text-start text-xs font-medium whitespace-normal sm:text-sm">
                      {row.symbol}
                    </TableCell>
                    <TableCell className={CELL}>{row.volume}</TableCell>
                    <TableCell className={CELL}>{row.tradeValue}</TableCell>
                    <TableCell className={CELL}>
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
                    <TableCell className={CELL}>{row.buyPerCapita}</TableCell>
                    <TableCell className={CELL}>{row.sellPerCapita}</TableCell>
                    <TableCell
                      className={cn(
                        CELL,
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
