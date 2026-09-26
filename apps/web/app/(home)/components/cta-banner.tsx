import Link from "next/link"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { BRAND_NAME } from "@/lib/brand"

export function CtaBanner() {
  return (
    <section className="pb-4 sm:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cta-banner-gradient relative overflow-hidden rounded-2xl p-8 sm:p-10">
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <BarChart3 className="size-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                  تصمیم‌های بهتر با داده‌های بهتر شروع می‌شوند
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-7 text-muted-foreground">
                  با {BRAND_NAME} بازار را عمیق‌تر ببینید و هوشمندانه‌تر تصمیم
                  بگیرید.
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 shrink-0 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90"
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
