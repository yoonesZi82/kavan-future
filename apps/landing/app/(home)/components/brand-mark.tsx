import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M12 2.5 21 8.2v7.6L12 21.5 3 15.8V8.2L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 7.2 16.5 10v4L12 16.8 7.5 14v-4L12 7.2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold tracking-tight">{BRAND_NAME}</span>
        <span className="text-muted-foreground text-xs">{BRAND_TAGLINE}</span>
      </div>
    </div>
  )
}
