"use client"

import type { ReactNode } from "react"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { GlobalSearchProvider } from "@/components/dashboard/global-search-context"
import { GlobalSearchDialog } from "@/components/dashboard/global-search-dialog"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider direction="rtl">
        <QueryProvider>
          <GlobalSearchProvider>
            <TooltipProvider>
              {children}
              <GlobalSearchDialog />
            </TooltipProvider>
          </GlobalSearchProvider>
        </QueryProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}
