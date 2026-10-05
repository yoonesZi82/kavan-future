"use client"

import { useRef, type ReactNode } from "react"
import { ChevronDown, ImageIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import { ANALYSIS_CATEGORIES } from "@/features/analyses/mock-data"
import type { AnalysisStatus } from "@/features/analyses/types"

type AnalysisFormState = {
  categoryId: string | null
  title: string
  content: string
  status: AnalysisStatus
}

type AnalysisFormProps = {
  value: AnalysisFormState
  onChange: (next: AnalysisFormState) => void
  onSave: () => void
}

export function AnalysisForm({ value, onChange, onSave }: AnalysisFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedCategory = ANALYSIS_CATEGORIES.find(
    (item) => item.id === value.categoryId
  )

  return (
    <section className="flex h-full min-h-0 flex-col">
      <h2 className="mb-5 text-base font-bold">افزودن/ویرایش تحلیل</h2>

      <div className="flex flex-1 flex-col gap-4">
        <Field label="انتخاب تحلیلی">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full justify-between px-3 text-sm font-normal"
                />
              }
            >
              <span
                className={cn(
                  !selectedCategory && "text-muted-foreground"
                )}
              >
                {selectedCategory?.label ?? "لطفا انتخاب کنید"}
              </span>
              <ChevronDown className="size-4 opacity-60" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-56">
              {ANALYSIS_CATEGORIES.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() =>
                    onChange({ ...value, categoryId: item.id })
                  }
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>

        <Field label="عنوان">
          <Input
            value={value.title}
            onValueChange={(title) => onChange({ ...value, title })}
            placeholder="عنوان تحلیل را وارد کنید"
            className="h-10"
          />
        </Field>

        <Field label="محتوای تحلیل">
          <Textarea
            value={value.content}
            onChange={(event) =>
              onChange({ ...value, content: event.target.value })
            }
            placeholder="محتوای تحلیل را در این قسمت بنویسید..."
            className="min-h-36 resize-y"
          />
        </Field>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-center transition-colors hover:bg-muted/40"
        >
          <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <ImageIcon className="size-6" aria-hidden />
          </span>
          <span className="text-sm font-medium">محل بارگذاری تصویر</span>
          <span className="text-xs text-muted-foreground">
            فایل تصویری (JPG, PNG) را اینجا بکشید و رها کنید
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            tabIndex={-1}
          />
        </button>

        <fieldset className="space-y-2.5">
          <legend className="text-sm font-medium">وضعیت</legend>
          <div className="flex flex-wrap items-center gap-5">
            <StatusRadio
              checked={value.status === "draft"}
              label="تغییر وضعیت"
              onSelect={() => onChange({ ...value, status: "draft" })}
            />
            <StatusRadio
              checked={value.status === "published"}
              label="منتشر"
              onSelect={() => onChange({ ...value, status: "published" })}
            />
          </div>
        </fieldset>

        <Button
          type="button"
          className="mt-auto h-11 w-full text-sm font-semibold"
          onClick={onSave}
        >
          ذخیره
        </Button>
      </div>
    </section>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}

function StatusRadio({
  checked,
  label,
  onSelect,
}: {
  checked: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className="inline-flex items-center gap-2 text-sm"
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full border",
          checked ? "border-primary" : "border-muted-foreground/40"
        )}
      >
        {checked ? (
          <span className="size-2 rounded-full bg-primary" />
        ) : null}
      </span>
      {label}
    </button>
  )
}
