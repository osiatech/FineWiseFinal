import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { BudgetOverview } from "components/dashboard/budget-overview"
import { BudgetCards } from "components/dashboard/budget-cards"
import { BudgetInsights } from "components/dashboard/budget-insights"

export default function BudgetPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Budgets
            </h1>
            <p className="text-gray-600 mt-2">Track and manage your spending across different categories</p>
          </div>

          <BudgetOverview />
          <BudgetCards />
          <BudgetInsights />
        </div>
      </div>
    </DashboardLayout>
  )
}
