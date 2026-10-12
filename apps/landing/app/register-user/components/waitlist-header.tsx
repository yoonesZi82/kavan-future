import { AnimatedThemeToggler } from "@workspace/ui/components/animated-theme-toggler"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

export function WaitlistHeader() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10 sm:px-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold tracking-tight">{BRAND_NAME}</span>
        <span className="text-xs text-muted-foreground">{BRAND_TAGLINE}</span>
      </div>
      <div className="flex items-center gap-3">
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}
