import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type HistoryPaginationProps = {
  page: number
  pageCount: number
  from: number
  to: number
  total: number
  onPageChange: (page: number) => void
}

export function HistoryPagination({
  page,
  pageCount,
  from,
  to,
  total,
  onPageChange,
}: HistoryPaginationProps) {
  const pages = Array.from({ length: Math.min(pageCount, 3) }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground tabular-nums">
        {`نمایش ${from.toLocaleString("fa-IR")} تا ${to.toLocaleString("fa-IR")} از ${total.toLocaleString("fa-IR")} معامله`}
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          قبلی
        </Button>
        {pages.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={page === item ? "default" : "outline"}
            className={cn("min-w-8 px-2 tabular-nums")}
            onClick={() => onPageChange(item)}
          >
            {item.toLocaleString("fa-IR")}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          بعدی
        </Button>
      </div>
    </div>
  )
}
