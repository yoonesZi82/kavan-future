import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppHeader } from "@/components/dashboard/app-header"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { MobileFloatingNav } from "@/components/dashboard/mobile-floating-nav"

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
          {children}
        </div>
      </SidebarInset>
      <MobileFloatingNav />
    </SidebarProvider>
  )
}
