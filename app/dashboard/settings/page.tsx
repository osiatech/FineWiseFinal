import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { SettingsView } from "components/dashboard/settings-view"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <SettingsView />
      </div>
    </DashboardLayout>
  )
}
