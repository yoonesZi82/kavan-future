"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/ui/components/card"
import { MOCK_TRANSACTIONS } from "@/features/subscriptions/mock-data"
import { PlansPanel } from "@/features/subscriptions/plans-panel"
import { SummaryCards } from "@/features/subscriptions/summary-cards"
import { TransactionsFilters } from "@/features/subscriptions/transactions-filters"
import { TransactionsTable } from "@/features/subscriptions/transactions-table"
import type { PlanFilter } from "@/features/subscriptions/types"

/** Subscriptions & payments admin — mock until billing API. */
export function SubscriptionsGrid() {
  const [draftQuery, setDraftQuery] = useState("")
  const [draftPlan, setDraftPlan] = useState<PlanFilter>("all")
  const [query, setQuery] = useState("")
  const [plan, setPlan] = useState<PlanFilter>("all")

  const transactions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return MOCK_TRANSACTIONS.filter((row) => {
      if (plan !== "all" && row.plan !== plan) return false
      if (!normalized) return true
      return (
        row.userName.includes(query.trim()) ||
        row.discountCode.toLowerCase().includes(normalized) ||
        row.trackingCode.includes(query.trim())
      )
    })
  }, [plan, query])

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <SummaryCards />

      <Card className="min-w-0 gap-0 overflow-hidden py-0 ring-inset">
        <CardHeader className="border-b border-border px-4 py-3">
          <TransactionsFilters
            query={draftQuery}
            plan={draftPlan}
            onQueryChange={setDraftQuery}
            onPlanChange={setDraftPlan}
            onApply={() => {
              setQuery(draftQuery)
              setPlan(draftPlan)
            }}
          />
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <TransactionsTable rows={transactions} />
        </CardContent>
      </Card>

      <PlansPanel />
    </div>
  )
}
