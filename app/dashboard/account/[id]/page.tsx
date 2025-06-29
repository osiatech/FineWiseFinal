import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { AccountDetailView } from "components/dashboard/account-detail-view"

interface AccountPageProps {
  params: {
    id: string
  }
}

export default function AccountPage({ params }: AccountPageProps) {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <AccountDetailView accountId={params.id} />
      </div>
    </DashboardLayout>
  )
}
