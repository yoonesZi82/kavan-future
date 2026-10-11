"use client"

import { WaitlistBenefits } from "./waitlist-benefits"
import { WaitlistForm } from "./waitlist-form"
import { WaitlistHeader } from "./waitlist-header"

export function WaitlistShell() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <WaitlistHeader />
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-8">
          <WaitlistForm />
          <WaitlistBenefits />
        </div>
      </div>
    </div>
  )
}
