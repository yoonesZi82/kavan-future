"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
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
import { useMarketFlowQuery } from "@/features/market-pulse/hooks"

export function MarketFlowPanel() {
  const { data, isLoading } = useMarketFlowQuery()

  return (
    <Card className="h-fit overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">جریان بازار صندوق‌ها و گروه‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">گروه / صندوق</TableHead>
                <TableHead className="text-right">حجم</TableHead>
                <TableHead className="text-right">ارزش معاملات</TableHead>
                <TableHead className="text-right">ورود پول</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row) => {
                const isIn = row.moneyInflow > 0
                return (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.group}</TableCell>
                    <TableCell>{row.volume}</TableCell>
                    <TableCell>{row.tradeValue}</TableCell>
                    <TableCell>
                      <span
                        className={
                          isIn
                            ? "inline-flex items-center gap-1 text-gain"
                            : "inline-flex items-center gap-1 text-loss"
                        }
                      >
                        {isIn ? (
                          <ArrowUpIcon className="size-3.5" />
                        ) : (
                          <ArrowDownIcon className="size-3.5" />
                        )}
                        {isIn ? "ورود" : "خروج"}
                      </span>
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
