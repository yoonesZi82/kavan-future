"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/ui/components/card"
import { DeleteDialog } from "./components/delete-dialog"
import { HistoryFilters } from "./components/history-filters"
import { HistoryHeader } from "./components/history-header"
import { HistoryPagination } from "./components/history-pagination"
import { HistoryTable } from "./components/history-table"
import { ImpactDialog } from "./components/impact-dialog"
import {
  HISTORY_PAGE_SIZE,
  HISTORY_TOTAL_COUNT,
  PORTFOLIO_TRANSACTIONS,
} from "./mock-data"
import type { PortfolioTransaction, TxTypeFilter } from "./types"

// * Transaction history — mock until portfolio ledger API
export function TransactionHistoryGrid() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState<TxTypeFilter>("all")
  const [page, setPage] = useState(1)
  const [impactTx, setImpactTx] = useState<PortfolioTransaction | null>(null)
  const [deleteTx, setDeleteTx] = useState<PortfolioTransaction | null>(null)
  const [rows, setRows] = useState(() => [...PORTFOLIO_TRANSACTIONS])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (type !== "all" && row.type !== type) return false
      if (!normalized) return true
      return (
        row.assetName.includes(query.trim()) ||
        row.assetSymbol.toLowerCase().includes(normalized) ||
        row.note.includes(query.trim())
      )
    })
  }, [query, rows, type])

  const pageCount = Math.max(1, Math.ceil(HISTORY_TOTAL_COUNT / HISTORY_PAGE_SIZE))
  const from = (page - 1) * HISTORY_PAGE_SIZE + 1
  const to = Math.min(page * HISTORY_PAGE_SIZE, HISTORY_TOTAL_COUNT)

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <HistoryHeader />

      <Card className="min-w-0 gap-0 overflow-hidden py-0 ring-inset">
        <CardHeader className="border-b border-border px-4 py-3">
          <HistoryFilters
            query={query}
            type={type}
            onQueryChange={(value) => {
              setQuery(value)
              setPage(1)
            }}
            onTypeChange={(value) => {
              setType(value)
              setPage(1)
            }}
          />
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 [&_[data-slot=table-container]]:[-ms-overflow-style:none] [&_[data-slot=table-container]]:[scrollbar-width:none] [&_[data-slot=table-container]::-webkit-scrollbar]:hidden">
          <HistoryTable
            rows={filtered}
            onImpact={setImpactTx}
            onDelete={setDeleteTx}
          />
        </CardContent>
        <HistoryPagination
          page={page}
          pageCount={pageCount}
          from={from}
          to={to}
          total={HISTORY_TOTAL_COUNT}
          onPageChange={setPage}
        />
      </Card>

      <ImpactDialog
        transaction={impactTx}
        open={impactTx !== null}
        onOpenChange={(open) => {
          if (!open) setImpactTx(null)
        }}
      />
      <DeleteDialog
        transaction={deleteTx}
        open={deleteTx !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTx(null)
        }}
        onConfirm={() => {
          if (!deleteTx) return
          setRows((current) => current.filter((row) => row.id !== deleteTx.id))
        }}
      />
    </div>
  )
}
