"use client";

import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useDebtAdvice } from "@/lib/hooks/useDebts";

export function DebtInsights() {
  const { data, isLoading } = useDebtAdvice();
  if (isLoading || !data) {
    return <p className="text-sm text-gray-500">Loading insights…</p>;
  }

  const { totalDebt = 0, advice } = data;

  const hasDebt = totalDebt > 0;

  /* tarjetas dinámicas */
  const insights = [
    {
      type: "success",
      show: !hasDebt,
      icon: CheckCircle,
      iconColor: "text-green-600",
      title: "Sin deudas activas",
      description: "¡Excelente! No tienes deudas pendientes en este momento.",
    },
    {
      type: "warning",
      show: hasDebt,
      icon: AlertCircle,
      iconColor: "text-yellow-600",
      title: "Consejo de priorización",
      description: advice,                        // viene del back-end
    },
    {
      type: "info",
      show: true,
      icon: TrendingUp,
      iconColor: "text-blue-600",
      title: "Resumen general",
      description: hasDebt
        ? `Tu deuda total asciende a $${totalDebt.toLocaleString()}.`
        : "Continúa manteniendo tus finanzas al día.",
    },
  ].filter(i => i.show);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Insights</h2>

      {/* insight cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-white p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-gray-50">
                <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* resumen mensual de deuda */}
      <div className="rounded-lg bg-blue-50 p-6 border border-blue-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Resumen Mensual de Deuda
          </h3>
          <p className="text-sm text-gray-600">
            {hasDebt
              ? "Este es el total de tus obligaciones pendientes."
              : "No registras deudas este mes."}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            ${totalDebt.toLocaleString()}
          </p>
          {hasDebt && (
            <p className="text-sm text-gray-500">deuda total actual</p>
          )}
        </div>
      </div>
    </div>
  );
}
