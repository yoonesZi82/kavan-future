"use client"

import {
  Banknote,
  CalendarDays,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react"
import { DashboardLineChartCard } from "@/features/dashboard/components/dashboard-line-chart-card"
import { KpiStatCard } from "@/features/dashboard/components/kpi-stat-card"
import { LatestEventsCard } from "@/features/dashboard/components/latest-events-card"
import { WeeklyIncomeChart } from "@/features/dashboard/components/weekly-income-chart"
import { YearlyIncomeChart } from "@/features/dashboard/components/yearly-income-chart"
import {
  DASHBOARD_KPIS,
  SUBSCRIBED_GROWTH,
  UNSUBSCRIBED_GROWTH,
} from "@/features/dashboard/mock-data"

const KPI_ICONS = {
  subscribed: <UserCheck className="size-4" aria-hidden />,
  unsubscribed: <Users className="size-4" aria-hidden />,
  "active-today": <UserRound className="size-4" aria-hidden />,
  "income-today": <Banknote className="size-4" aria-hidden />,
  "income-month": <CalendarDays className="size-4" aria-hidden />,
} as const

/** Admin overview — KPI strip, growth charts, events (mock until API). */
export function DashboardGrid() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 md:gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {DASHBOARD_KPIS.map((stat) => (
          <KpiStatCard
            key={stat.id}
            stat={stat}
            icon={KPI_ICONS[stat.id as keyof typeof KPI_ICONS]}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1.15fr_minmax(240px,0.9fr)]">
        <DashboardLineChartCard
          title="رشد کاربران اشتراکی در ۳۰ روز اخیر"
          icon={<UserCheck className="size-4" aria-hidden />}
          periodLabel="۳۰ روز"
          color="#3b82f6"
          points={SUBSCRIBED_GROWTH}
        />
        <DashboardLineChartCard
          title="رشد کاربران بدون اشتراک در ۳۰ روز اخیر"
          icon={<Users className="size-4" aria-hidden />}
          periodLabel="۳۰ روز"
          color="#8b5cf6"
          points={UNSUBSCRIBED_GROWTH}
        />
        <LatestEventsCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyIncomeChart />
        <YearlyIncomeChart />
      </div>
    </div>
  )
}
