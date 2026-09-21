"use client"

import { MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { useMemo, useState } from "react"
import { useMarketsQuery } from "@/features/market-pulse/hooks"

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("fa-IR", { maximumFractionDigits: 2 })}`
}

function formatPrice(value: number): string {
  return value.toLocaleString("fa-IR", { maximumFractionDigits: 4 })
}

export function WatchlistPanel() {
  const { data, isLoading } = useMarketsQuery()
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    const filtered = q
      ? data.filter(
          (item) =>
            item.symbol.toLowerCase().includes(q) ||
            item.src.toLowerCase().includes(q) ||
            item.dst.toLowerCase().includes(q)
        )
      : data
    return filtered.slice(0, 40)
  }, [data, query])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-base">بازارها</CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="افزودن">
            <PlusIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="بیشتر">
            <MoreHorizontalIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          value={query}
          onValueChange={setQuery}
          placeholder="جستجوی ارز…"
          className="h-8"
        />
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <ScrollArea className="h-56">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">نماد</TableHead>
                  <TableHead className="text-right">قیمت</TableHead>
                  <TableHead className="text-right">بازار</TableHead>
                  <TableHead className="text-right">تغییر ٪</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const isGain = row.dayChange >= 0
                  const tone = isGain ? "text-gain" : "text-loss"
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.symbol}</TableCell>
                      <TableCell dir="ltr">{formatPrice(row.latest)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.dst === "rls" ? "ریالی" : "تتری"}
                      </TableCell>
                      <TableCell className={tone} dir="ltr">
                        {formatSigned(row.dayChange)}٪
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          {data ? `${data.length.toLocaleString("fa-IR")} بازار` : "—"}
        </Button>
      </CardFooter>
    </Card>
  )
}
