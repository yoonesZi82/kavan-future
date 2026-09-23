import Link from "next/link"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { BRAND_NAME } from "@/lib/brand"

export function CtaBanner() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-amber-50 via-primary/10 to-amber-50 p-8 sm:p-10">
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-primary size-7" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                  تصمیم‌های بهتر با داده‌های بهتر شروع می‌شوند
                </h3>
                <p className="text-muted-foreground mt-2 max-w-xl text-[14px] leading-7">
                  با {BRAND_NAME} بازار را عمیق‌تر ببینید و هوشمندانه‌تر تصمیم
                  بگیرید.
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-primary text-primary-foreground hover:bg-primary/90 h-12 shrink-0 rounded-xl px-7 text-sm font-bold shadow-lg"
              )}
            >
              شروع رایگان
              <ArrowLeft data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
