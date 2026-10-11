import { AnimatedThemeToggler } from "@workspace/ui/components/animated-theme-toggler"
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"
import { WAITLIST_TAGLINE } from "../constants"

export function WaitlistHeader() {
  return (
    <header className="bg-card flex items-center justify-between gap-4 rounded-xl px-4 py-3 ring-1 ring-foreground/10 sm:px-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold tracking-tight">{BRAND_NAME}</span>
        <span className="text-muted-foreground text-xs">{BRAND_TAGLINE}</span>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground hidden max-w-xs text-sm leading-relaxed sm:block">
          {WAITLIST_TAGLINE}
        </p>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}
