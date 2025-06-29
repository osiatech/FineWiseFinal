import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { AccountsOverview } from "components/dashboard/accounts-overview"
import { AccountsList } from "components/dashboard/accounts-list"
import { AccountsInsights } from "components/dashboard/accounts-insights"

export default function AccountsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Accounts
            </h1>
            <p className="text-gray-600 mt-2">Manage all your financial accounts in one place</p>
          </div>

          <AccountsOverview />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AccountsList />
            </div>
            <div>
              <AccountsInsights />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
