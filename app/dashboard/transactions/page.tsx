import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { TransactionsView } from "components/dashboard/transactions-view"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <TransactionsView />
      </div>
    </DashboardLayout>
  )
}
