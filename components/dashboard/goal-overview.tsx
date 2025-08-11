'use client';

import { useGoals } from '@/lib/hooks/useGoals';

export function GoalOverview() {
  const { data, isLoading } = useGoals(); // pásale filtros si usas paginación
  const goals = data?.data ?? [];
  const totalCount = data?.meta?.total ?? goals.length;

  if (isLoading) return <p>Loading…</p>;

  const totalTarget  = goals.reduce((s, g) => s + Number(g.targetAmount || 0), 0);
  const totalCurrent = goals.reduce((s, g) => s + Number(g.currentAmount || 0), 0);
  const progressPct  = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {/* Total objetivo */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Objetivo</h3>
        <p className="text-2xl font-bold text-gray-900">
          ${totalTarget.toLocaleString()}
        </p>
      </div>

      {/* Monto acumulado */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Monto acumulado</h3>
        <p className="text-2xl font-bold text-green-600">
          ${totalCurrent.toLocaleString()}
        </p>
      </div>

      {/* % Avance global */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">% de avance</h3>
        <p className="text-2xl font-bold text-blue-600">
          {progressPct.toFixed(1)}%
        </p>
      </div>

      {/* Número de metas */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Número de metas</h3>
        <p className="text-2xl font-bold text-indigo-600">
          {totalCount}
        </p>
      </div>
    </div>
  );
}
