"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useGlobalSearch } from "@/components/dashboard/global-search-context"

/** * Mobile-only trigger — desktop uses the header search field. */
export function SidebarSearch() {
  const { openSearch } = useGlobalSearch()

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="ms-auto shrink-0 md:hidden group-data-[collapsible=icon]:ms-0"
      aria-label="جستجو"
      onClick={openSearch}
    >
      <SearchIcon />
    </Button>
  )
}
