import type { ReactNode } from "react"
import { InputGroupAddon } from "@workspace/ui/components/input-group"

type WaitlistFieldIconProps = {
  children: ReactNode
}

/** Icon on the input edge with padding + a thin divider toward the text. */
export function WaitlistFieldIcon({ children }: WaitlistFieldIconProps) {
  return (
    <InputGroupAddon align="inline-end" className="gap-2.5 pe-3 ps-1">
      <span aria-hidden className="bg-border h-4 w-px shrink-0" />
      {children}
    </InputGroupAddon>
  )
}
