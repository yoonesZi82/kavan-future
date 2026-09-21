"use client"

import { usePathname } from "next/navigation"
import { LayoutGroup } from "framer-motion"
import { CircleHelpIcon, LogOutIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { DASHBOARD_HEADER_HEIGHT_CLASS } from "@/components/dashboard/chrome"
import { navItems } from "@/components/dashboard/nav-items"
import { SidebarLiveClock } from "@/components/dashboard/sidebar-live-clock"
import { SidebarNavItem } from "@/components/dashboard/sidebar-nav-item"
import { SidebarSearch } from "@/components/dashboard/sidebar-search"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="overflow-hidden border-sidebar-border"
    >
      <SidebarHeader
        className={`justify-center border-b border-sidebar-border p-0 px-2 ${DASHBOARD_HEADER_HEIGHT_CLASS}`}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-primary">
            م‌ر
          </div>
          <div className="min-w-0 flex-1 leading-tight group-data-[collapsible=icon]:hidden">
            <p className="truncate text-xs font-medium text-sidebar-foreground">
              محمد رضایی
            </p>
            <SidebarLiveClock className="md:hidden" />
            <p className="hidden truncate text-[10px] text-muted-foreground md:block">
              تحلیلگر حرفه‌ای
            </p>
          </div>
          <SidebarSearch />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <LayoutGroup id="sidebar-nav">
              <SidebarMenu className="gap-1">
                {navItems.map((item) => {
                  const isActive = item.enabled && pathname === item.href
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarNavItem item={item} isActive={isActive} />
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </LayoutGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="راهنما">
              <CircleHelpIcon />
              <span>راهنما</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="خروج">
              <LogOutIcon />
              <span>خروج</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
