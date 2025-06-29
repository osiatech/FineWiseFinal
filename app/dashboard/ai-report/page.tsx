import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { AIReportView } from "components/dashboard/ai-report-view"

export default function AIReportPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <AIReportView />
      </div>
    </DashboardLayout>
  )
}
