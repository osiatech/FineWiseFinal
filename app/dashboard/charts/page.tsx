import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { ChartsView } from "components/dashboard/charts-view"

export default function ChartsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <ChartsView />
      </div>
    </DashboardLayout>
  )
}
