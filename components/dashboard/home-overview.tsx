// components/dashboard/home-overview.tsx
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/dashboard/ui/card";
import { Badge } from "components/dashboard/ui/badge";
import { Progress } from "components/dashboard/ui/progress";
import { TrendingUp, PiggyBank, Wallet, CreditCard } from "lucide-react";

// HOOKS reales (ajusta rutas si difieren)
import { useTransactions } from "@/lib/hooks/useTransactions";
import { useDebts } from "@/lib/hooks/useDebts";
import { useBudgetSummary } from "@/lib/hooks/useBudgets";

// Pie simple: usa tu chart ya existente si prefieres
import { ExpensesPieChart } from "components/dashboard/charts/expenses-pie-chart";

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export default function HomeOverview() {
  const now = new Date();

  // Transacciones del mes (ajusta campos si tus nombres varían)
  const { data: tx = [], isLoading: txLoading } = useTransactions();
  const monthTx = useMemo(
    () =>
      (tx as any[]).filter((t) =>
        isSameMonth(new Date(t.date ?? t.createdAt ?? Date.now()), now)
      ),
    [tx, now]
  );

  const totalIncome = useMemo(
    () =>
      monthTx
        .filter((t) => String(t.type ?? t.transactionType).toLowerCase() === "income")
        .reduce((s, t) => s + Number(t.amount ?? 0), 0),
    [monthTx]
  );

  const totalExpense = useMemo(
    () =>
      monthTx
        .filter((t) => String(t.type ?? t.transactionType).toLowerCase() === "expense")
        .reduce((s, t) => s + Number(t.amount ?? 0), 0),
    [monthTx]
  );

  const cashflow = totalIncome - totalExpense;

  // Deudas (total adeudado actual)
  const { data: debts = [], isLoading: debtsLoading } = useDebts();
  const totalDebtOutstanding = useMemo(
    () => (debts as any[]).reduce((s, d) => s + Number(d.amount ?? 0), 0),
    [debts]
  );

  // Presupuesto (resumen mensual): se espera { totalBudget, totalSpent }
  const { data: budgetSummary } = useBudgetSummary();
  const totalBudget = Number(budgetSummary?.totalBudget ?? 0);
  const totalSpent = Number(budgetSummary?.totalSpent ?? 0);
  const budgetPct = totalBudget > 0 ? Math.min(100, (totalSpent / totalBudget) * 100) : 0;

  // Pie de gastos por categoría (mes actual)
  const expensesByCategory = useMemo(() => {
    const map = new Map<string, number>();
    monthTx
      .filter((t) => String(t.type ?? t.transactionType).toLowerCase() === "expense")
      .forEach((t) => {
        const cat = (t.category ?? "Otros") as string;
        map.set(cat, (map.get(cat) ?? 0) + Number(t.amount ?? 0));
      });
    return Array.from(map, ([label, value]) => ({ label, value }));
  }, [monthTx]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Panel de Control
        </h1>
        <p className="text-gray-600 mt-2">
          Resumen del <strong>mes actual</strong> basado en tus datos reales.
        </p>
      </div>

      {/* Presupuesto mensual */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Presupuesto mensual
            <span className="ml-2 text-sm text-gray-500">
              ({budgetPct.toFixed(1)}% usado)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-2">
            <p className="text-2xl font-bold">
              ${totalSpent.toLocaleString()}
              <span className="ml-2 text-sm text-gray-500">
                de ${totalBudget.toLocaleString()} gastado
              </span>
            </p>
          </div>
          <Progress value={budgetPct} />
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ingresos (mes)</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Gastos (mes)</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalExpense.toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cash Flow (mes)</p>
                <p
                  className={`text-2xl font-bold ${
                    cashflow >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  ${cashflow.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total deudas (saldo)</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalDebtOutstanding.toLocaleString()}
                </p>
              </div>
              <PiggyBank className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie de gastos por categoría */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ExpensesPieChart
              {...({ data: expensesByCategory, loading: txLoading } as any)}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {expensesByCategory.map((x) => (
                <Badge key={x.label} variant="outline">
                  {x.label}: ${Number(x.value).toLocaleString()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* espacio para otra tarjeta (por si quieres insights, ahorro, etc.) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resumen rápido</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Ingresos</strong> este mes: ${totalIncome.toLocaleString()}
            </p>
            <p>
              <strong>Gastos</strong> este mes: ${totalExpense.toLocaleString()}
            </p>
            <p>
              <strong>Cash Flow</strong>:{" "}
              <span className={cashflow >= 0 ? "text-emerald-600" : "text-red-600"}>
                ${cashflow.toLocaleString()}
              </span>
            </p>
            <p>
              <strong>Presupuesto</strong>: ${totalSpent.toLocaleString()} de $
              {totalBudget.toLocaleString()} ({budgetPct.toFixed(1)}% usado)
            </p>
            <p>
              <strong>Deuda total</strong>: ${totalDebtOutstanding.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
