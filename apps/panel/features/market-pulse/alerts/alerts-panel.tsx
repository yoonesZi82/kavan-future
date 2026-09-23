"use client"

import { BellIcon, Info } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useAlertsQuery } from "@/features/market-pulse/data/hooks"

export function AlertsPanel() {
  const { data, isLoading } = useAlertsQuery()

  return (
    <Card className="h-fit overflow-hidden">
      <CardHeader className="border-b border-border pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">هشدارهای فعال بازار</CardTitle>
          <Badge variant="outline">{data?.length} مورد</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <ul className="space-y-2">
            {data?.map((alert) => (
              <li
                key={alert.id}
                className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <BellIcon
                    className={
                      alert.isActive
                        ? "size-4 text-gain"
                        : "size-4 text-muted-foreground"
                    }
                  />
                  <span className="text-sm">{alert.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={alert.isActive ? "success" : "destructive"}>
                    {alert.isActive ? "فعال" : "غیرفعال"}
                  </Badge>
                  <Button variant="secondary" size="icon">
                    <Info />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
