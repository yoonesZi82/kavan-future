import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppHeader } from "@/components/dashboard/header/app-header"
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import { MobileFloatingNav } from "@/components/dashboard/nav/mobile-floating-nav"
import { PageTransition } from "@/components/dashboard/shell/page-transition"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider className="min-h-svh">
      <AppSidebar />
      {/* * No overflow here — sticky header breaks if an ancestor clips overflow */}
      <SidebarInset className="min-h-svh min-w-0 bg-background">
        <AppHeader />
        <div className="container max-w-none min-w-0 overflow-x-hidden px-4 py-4 pb-24 md:px-6 md:py-6 md:pb-6">
          <PageTransition>{children}</PageTransition>
        </div>
      </SidebarInset>
      <MobileFloatingNav />
    </SidebarProvider>
  )
}
