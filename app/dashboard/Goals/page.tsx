import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { GoalCards } from "@/components/dashboard/goal-cards";
import { GoalOverview } from "@/components/dashboard/goal-overview";

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mis Metas
            </h1>
            <p className="text-gray-600 mt-2">
              Realice un seguimiento y gestione sus Metas en diferentes categorías
            </p>
          </div>

          <GoalOverview />
          <GoalCards />
        </div>
      </div>
    </DashboardLayout>
  );
}