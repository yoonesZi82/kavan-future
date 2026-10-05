"use client"

import { useState } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { AnalysisForm } from "@/features/analyses/components/analysis-form"
import { AnalysesTabs } from "@/features/analyses/components/analyses-tabs"
import { PreviousAnalysesList } from "@/features/analyses/components/previous-analyses-list"
import { PREVIOUS_ANALYSES } from "@/features/analyses/mock-data"
import type {
  AnalysesTabId,
  AnalysisStatus,
} from "@/features/analyses/types"

type FormState = {
  categoryId: string | null
  title: string
  content: string
  status: AnalysisStatus
}

const EMPTY_FORM: FormState = {
  categoryId: null,
  title: "",
  content: "",
  status: "draft",
}

/** CMS-style analyses manager — mock form/list until content API. */
export function AnalysesGrid() {
  const [tab, setTab] = useState<AnalysesTabId>("compose")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  function handleAddNew(): void {
    setSelectedId(null)
    setForm(EMPTY_FORM)
    setTab("compose")
  }

  function handleSelect(id: string): void {
    const item = PREVIOUS_ANALYSES.find((row) => row.id === id)
    if (!item) return
    setSelectedId(id)
    setForm({
      categoryId: null,
      title: item.title,
      content: "",
      status: "draft",
    })
    setTab("compose")
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <AnalysesTabs value={tab} onChange={setTab} />

      <Card className="overflow-hidden py-0 ring-inset">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.85fr)] lg:gap-8">
            <AnalysisForm
              value={form}
              onChange={setForm}
              onSave={() => {
                // * Mock save — wire content API later
              }}
            />
            <PreviousAnalysesList
              selectedId={selectedId}
              onSelect={handleSelect}
              onAddNew={handleAddNew}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
