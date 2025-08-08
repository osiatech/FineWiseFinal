
"use client"

import { useBudgetSummary } from "@/lib/hooks/useBudgets";

export function BudgetOverview() {
  const { data, isLoading } = useBudgetSummary();
  if (isLoading || !data) return <p>Loading...</p>;

  // usa los nombres reales que trae la API,
  // o ponles alias con ":" si prefieres otros nombres.
  const {
    totalBudget  = 0,
    totalSpent   = 0,
    totalRemaining: remaining = 0,   // alias opcional
    percentageUsed: usedPercent = 0, // alias opcional
  } = data;

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {/* Total */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Presupuestado</h3>
        <p className="text-2xl font-bold text-gray-900">
          ${totalBudget.toLocaleString()}
        </p>
      </div>

      {/* Spent */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Gastado</h3>
        <p className="text-2xl font-bold text-red-600">
          ${totalSpent.toLocaleString()}
        </p>
      </div>

      {/* Remaining */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Restante</h3>
        <p className="text-2xl font-bold text-green-600">
          ${remaining.toLocaleString()}
        </p>
      </div>

      {/* % Used */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Presupuesto Usado</h3>
        <p className="text-2xl font-bold text-blue-600">
          {usedPercent.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
