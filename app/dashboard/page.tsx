"use client"

import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { MonthlyBudget } from "components/dashboard/monthly-budget"
import { RecentTransactions } from "components/dashboard/recent-transactions"
import { ExpenseBreakdown } from "components/dashboard/expense-breakdown"
import { AccountCards } from "components/dashboard/account-cards"
import { useLanguage } from "lib/contexts/language-context"

export default function Dashboard() {
  const { t } = useLanguage()

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 space-y-6 overflow-y-auto min-h-0">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("dashboard.title")}
            </h1>
          </div>

          <MonthlyBudget />

          <AccountCards />

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentTransactions />
            <ExpenseBreakdown />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
