"use client"

import type { ReactNode } from "react"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { ThemeProvider } from "@/components/theme-provider"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider direction="rtl">
        <TooltipProvider>{children}</TooltipProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}
