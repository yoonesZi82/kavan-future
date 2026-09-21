"use client"

import { BellIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useAlertsQuery } from "@/features/market-pulse/hooks"

export function AlertsPanel() {
  const { data, isLoading } = useAlertsQuery()

  return (
    <Card className="h-fit overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">هشدارهای فعال من</CardTitle>
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
                  <Badge variant={alert.isActive ? "secondary" : "outline"}>
                    {alert.isActive ? "فعال" : "غیرفعال"}
                  </Badge>
                </div>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  مشاهده جزئیات
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
