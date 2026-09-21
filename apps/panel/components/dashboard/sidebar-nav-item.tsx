"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"
import type { NavItem } from "@/components/dashboard/nav-items"

type SidebarNavItemProps = {
  item: NavItem
  isActive: boolean
}

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  const content = (
    <>
      {isActive ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-1 end-0 w-0.5 rounded-full bg-sidebar-primary group-data-[collapsible=icon]:hidden"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : null}
      <item.icon className="size-4 shrink-0" />
      <span className="truncate group-data-[collapsible=icon]:hidden">
        {item.title}
      </span>
    </>
  )

  const className = cn(
    "relative flex h-9 w-full items-center gap-2 overflow-hidden rounded-md px-2 text-sm transition-colors",
    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-0!",
    isActive
      ? "bg-sidebar-accent font-medium text-sidebar-primary"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
    !item.enabled && "pointer-events-none opacity-50"
  )

  if (!item.enabled) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link href={item.href} className={className} aria-current={isActive ? "page" : undefined}>
      {content}
    </Link>
  )
}
