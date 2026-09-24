"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useSidebar } from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils"
import type { NavItem } from "@/components/dashboard/nav/nav-items"

type SidebarNavItemProps = {
  item: NavItem
  isActive: boolean
}

const ACTIVE_SPRING = { type: "spring" as const, stiffness: 380, damping: 30 }

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  const content = (
    <>
      {isActive ? (
        <>
          <motion.span
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-md bg-sidebar-accent"
            transition={ACTIVE_SPRING}
          />
          <motion.span
            layoutId="sidebar-active-indicator"
            className="absolute inset-y-1 end-0 w-0.5 rounded-full bg-sidebar-primary group-data-[collapsible=icon]:hidden"
            transition={ACTIVE_SPRING}
          />
        </>
      ) : null}
      <item.icon className="relative z-10 size-4 shrink-0" />
      <span className="relative z-10 truncate group-data-[collapsible=icon]:hidden">
        {item.title}
      </span>
    </>
  )

  const className = cn(
    "relative flex h-9 w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-sm transition-colors",
    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0!",
    isActive
      ? "font-medium text-sidebar-primary"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
    !item.enabled && "pointer-events-none opacity-50"
  )

  if (!item.enabled) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link
      href={item.href}
      className={className}
      aria-current={isActive ? "page" : undefined}
      onClick={() => {
        if (isMobile) setOpenMobile(false)
      }}
    >
      {content}
    </Link>
  )
}
