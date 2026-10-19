import { PortfolioToolbar } from "@/features/my-portfolio/components/portfolio-toolbar"

// * Shared actions strip stays while portfolio sub-views swap below
export default function MyPortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <PortfolioToolbar />
      {children}
    </div>
  )
}
