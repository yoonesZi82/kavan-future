"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type GlobalSearchContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openSearch: () => void
}

const GlobalSearchContext = createContext<GlobalSearchContextValue | null>(
  null
)

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  const value = useMemo(
    () => ({ open, setOpen, openSearch }),
    [open, openSearch]
  )
  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
    </GlobalSearchContext.Provider>
  )
}

export function useGlobalSearch(): GlobalSearchContextValue {
  const value = useContext(GlobalSearchContext)
  if (!value) {
    throw new Error("useGlobalSearch requires GlobalSearchProvider")
  }
  return value
}
