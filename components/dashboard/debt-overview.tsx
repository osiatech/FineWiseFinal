// components/dashboard/debt-overview.tsx
"use client";
import { useDebtSummary } from "@/lib/hooks/useDebts";

export function DebtOverview() {
  const { data, isLoading } = useDebtSummary();
  if (isLoading || !data) return <p>Loading...</p>;

  // ← da defaults y fuerza número
  const totalDebt         = Number(data.totalDebt ?? 0);
  const averageInterest   = Number(data.averageInterestRate ?? 0);
  const numbersOfDebts    = Number(data.numbersOfDebts ?? 0);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Adeudado</h3>
        <p className="text-2xl font-bold text-gray-900">${totalDebt.toLocaleString()}</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Interés promedio</h3>
        <p className="text-2xl font-bold text-red-600">{averageInterest.toFixed(1)}%</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Número de deudas</h3>
        <p className="text-2xl font-bold text-blue-600">{numbersOfDebts}</p>
      </div>
    </div>
  );
}
