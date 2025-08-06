'use client'

import { DashboardLayout } from "components/dashboard/dashboard-layout"
import { DashboardHeader } from "components/dashboard/dashboard-header"
import { BudgetOverview } from "components/dashboard/budget-overview"
import { BudgetCards } from "components/dashboard/budget-cards"
import { BudgetInsights } from "components/dashboard/budget-insights"
import useSWR from 'swr'                                // ① importa useSWR
import { fetcher } from "lib/fetcher"
import { Budget } from "@/types/budget"

export default function BudgetPage() {
  const { data: budgets, error } = useSWR<Budget[]>('http://localhost:3000/FineWise/budgets/my-budgets', fetcher)

  if (error) return <p>Error cargando presupuestos.</p>
  if (!budgets) return <p>Cargando presupuestos…</p>
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mis Presupuestos
            </h1>
            <p className="text-gray-600 mt-2">Gestionar todos tus presupuestos en un solo lugar</p>
          </div>

          <BudgetOverview budgets={budgets} />
          <BudgetCards    budgets={budgets} />
          <BudgetInsights budgets={budgets} />
        </div>
      </div>
    </DashboardLayout>
  )
}