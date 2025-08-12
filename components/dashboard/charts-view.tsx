// components/dashboard/charts-view.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "components/dashboard/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/dashboard/ui/select";
import { Badge } from "components/dashboard/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "components/dashboard/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/dashboard/ui/tabs";
import {
  Plus,
  Settings,
  Download,
  Share,
  Maximize2,
  Trash2,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Activity,
  Eye,
  EyeOff,
} from "lucide-react";

import { Progress } from "components/dashboard/ui/progress"


import { AddChartModal } from "components/dashboard/add-chart-modal";

// === Charts (presentacionales) ===
import { ExpensesPieChart } from "components/dashboard/charts/expenses-pie-chart";
import { IncomeVsExpensesChart } from "components/dashboard/charts/income-vs-expenses-chart";
import { MonthlyTrendChart } from "components/dashboard/charts/monthly-trend-chart";
import { BudgetProgressChart } from "components/dashboard/charts/budget-progress-chart";
// 👇 Fix: este archivo exporta por defecto, así que se importa SIN llaves
import CategoryBreakdownChart from "components/dashboard/charts/category-breakdown-chart";
import { AccountBalanceChart } from "components/dashboard/charts/account-balance-chart";
import { CashFlowChart } from "components/dashboard/charts/cash-flow-chart";
import { SavingsGoalChart } from "components/dashboard/charts/savings-goal-chart";

// === DATA HOOKS reales ===
import { useTransactions } from "@/lib/hooks/useTransactions";

/* ---------------------------------------------------------------------------
   Helpers de rango de fechas y formato
--------------------------------------------------------------------------- */
function getStartDateFromRange(range: string): Date | null {
  const now = new Date();
  const d = new Date(now);
  switch (range) {
    case "1month":
      d.setMonth(d.getMonth() - 1);
      return d;
    case "3months":
      d.setMonth(d.getMonth() - 3);
      return d;
    case "6months":
      d.setMonth(d.getMonth() - 6);
      return d;
    case "1year":
      d.setFullYear(d.getFullYear() - 1);
      return d;
    default:
      return null; // "all"
  }
}

function yyyymm(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${y}-${m}`;
}

function getMonthsBackLabels(range: string): string[] {
  // Devuelve etiquetas "YYYY-MM" desde más antiguo -> actual
  let months = 6;
  if (range === "1month") months = 1;
  if (range === "3months") months = 3;
  if (range === "6months") months = 6;
  if (range === "1year") months = 12;
  if (range === "all") months = 12; // por defecto, 12 para "all"

  const labels: string[] = [];
  const d = new Date();
  d.setDate(1); // inicio de mes para consistencia

  for (let i = months - 1; i >= 0; i--) {
    const copy = new Date(d);
    copy.setMonth(d.getMonth() - i);
    labels.push(yyyymm(copy));
  }
  return labels;
}

/* ---------------------------------------------------------------------------
   Hook: gastos por categoría (para charts de pie/breakdown)
--------------------------------------------------------------------------- */
function useExpensesByCategory(timeRange: string) {
  const { data: tx = [], isLoading } = useTransactions();
  const start = getStartDateFromRange(timeRange);

  const data = useMemo(() => {
    const map = new Map<string, number>();
    (tx as any[]).forEach((t) => {
      // Ajusta estos campos a tu shape real de transacción
      const date = new Date(t.date ?? t.createdAt ?? Date.now());
      const okRange = !start || date >= start;
      if (!okRange) return;

      // consideramos "expense" como gasto; si usas otro campo/código, cámbialo
      if ((t.type ?? t.transactionType) !== "expense") return;

      const cat = t.category ?? "Otros";
      map.set(cat, (map.get(cat) ?? 0) + Number(t.amount ?? 0));
    });

    return Array.from(map, ([label, value]) => ({ label, value }));
  }, [tx, start]);

  return { data, isLoading };
}

/* ---------------------------------------------------------------------------
   Hook: ingresos vs gastos por mes (para chart comparativo)
--------------------------------------------------------------------------- */
function useIncomeVsExpenses(timeRange: string) {
  const { data: tx = [], isLoading } = useTransactions();
  const labels = getMonthsBackLabels(timeRange); // YYYY-MM
  const { income, expenses } = useMemo(() => {
    const incMap = new Map<string, number>();
    const expMap = new Map<string, number>();

    labels.forEach((l) => {
      incMap.set(l, 0);
      expMap.set(l, 0);
    });

    (tx as any[]).forEach((t) => {
      const date = new Date(t.date ?? t.createdAt ?? Date.now());
      const key = yyyymm(date);
      if (!incMap.has(key)) return; // fuera del rango que graficamos

      const amt = Number(t.amount ?? 0);
      const kind = t.type ?? t.transactionType; // "income" | "expense"

      if (kind === "income") incMap.set(key, (incMap.get(key) ?? 0) + amt);
      else if (kind === "expense") expMap.set(key, (expMap.get(key) ?? 0) + amt);
    });

    return {
      income: labels.map((l) => incMap.get(l) ?? 0),
      expenses: labels.map((l) => expMap.get(l) ?? 0),
    };
  }, [tx, labels]);

  return { labels, income, expenses, isLoading };
}

/* ---------------------------------------------------------------------------
   Config de widgets
--------------------------------------------------------------------------- */
interface ChartWidget {
  id: string;
  type: string;
  title: string;
  size: "small" | "medium" | "large";
  visible: boolean;
  position: number;
}

const defaultCharts: ChartWidget[] = [
  { id: "1", type: "expenses-pie", title: "Monthly Expenses Breakdown", size: "medium", visible: true, position: 1 },
  { id: "2", type: "income-vs-expenses", title: "Income vs Expenses", size: "medium", visible: true, position: 2 },
  { id: "3", type: "monthly-trend", title: "6-Month Spending Trend", size: "large", visible: true, position: 3 },
  { id: "4", type: "budget-progress", title: "Budget Progress", size: "medium", visible: true, position: 4 },
  { id: "5", type: "category-breakdown", title: "Category Analysis", size: "medium", visible: true, position: 5 },
  { id: "6", type: "account-balance", title: "Account Balances", size: "small", visible: true, position: 6 },
  { id: "7", type: "cash-flow", title: "Cash Flow Analysis", size: "large", visible: true, position: 7 },
  { id: "8", type: "savings-goal", title: "Savings Goal Progress", size: "small", visible: true, position: 8 },
];

/* ---------------------------------------------------------------------------
   Vista principal
--------------------------------------------------------------------------- */
export function ChartsView() {
  const [charts, setCharts] = useState<ChartWidget[]>(defaultCharts);
  const [isAddChartOpen, setIsAddChartOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Datos reales para algunos charts
  const { data: catData, isLoading: catLoading } = useExpensesByCategory(timeRange);
  const { labels, income, expenses, isLoading: iveLoading } = useIncomeVsExpenses(timeRange);

  const visibleCharts = charts.filter((chart) => chart.visible).sort((a, b) => a.position - b.position);

  const toggleChartVisibility = (id: string) => {
    setCharts((prev) => prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)));
  };

  const removeChart = (id: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== id));
  };

  const addChart = (chartData: Omit<ChartWidget, "id" | "position">) => {
    const newChart: ChartWidget = {
      ...chartData,
      id: Date.now().toString(),
      position: charts.length + 1,
    };
    setCharts((prev) => [...prev, newChart]);
  };

  const getChartComponent = (chart: ChartWidget) => {
    switch (chart.type) {
      case "expenses-pie":
        // Le pasamos data real; el `as any` evita que TS se queje si el chart aún no tipa props
        return <ExpensesPieChart {...({ data: catData, loading: catLoading } as any)} />;

      case "income-vs-expenses":
        return (
          <IncomeVsExpensesChart
            {...({
              series: [
                { name: "Income", data: income },
                { name: "Expenses", data: expenses },
              ],
              categories: labels,
              loading: iveLoading,
            } as any)}
          />
        );

      case "monthly-trend":
        return <MonthlyTrendChart />;

      case "budget-progress":
        return <BudgetProgressChart />;

      case "category-breakdown":
        return <CategoryBreakdownChart {...({ data: catData, loading: catLoading } as any)} />;

      case "cash-flow":
        return <CashFlowChart />;

      case "savings-goal":
        return <SavingsGoalChart />;

      default:
        return <div>Chart not found</div>;
    }
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1";
      case "medium":
        return "col-span-1 md:col-span-2";
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-3";
      default:
        return "col-span-1";
    }
  };

  const chartStats = {
    totalCharts: charts.length,
    visibleCharts: visibleCharts.length,
    hiddenCharts: charts.length - visibleCharts.length,
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <title>Charts | Dashboard</title>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Visualiza tus datos financieros con gráficos e insights.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Charts</p>
                <p className="text-xl font-bold text-gray-900">{chartStats.totalCharts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Visible Charts</p>
                <p className="text-xl font-bold text-green-600">{chartStats.visibleCharts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <EyeOff className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hidden Charts</p>
                <p className="text-xl font-bold text-yellow-600">{chartStats.hiddenCharts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Data Points</p>
                <p className="text-xl font-bold text-purple-600">—</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="expenses">Expenses Only</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="budget">Budget Related</SelectItem>
            </SelectContent>
          </Select>

          <Badge variant="outline" className="text-sm">
            {timeRange === "1month" && "30 days"}
            {timeRange === "3months" && "90 days"}
            {timeRange === "6months" && "180 days"}
            {timeRange === "1year" && "365 days"}
            {timeRange === "all" && "All time"}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => setIsAddChartOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>
      </div>

      {/* Chart Management */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard View</TabsTrigger>
          <TabsTrigger value="manage">Manage Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Charts Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {visibleCharts.map((chart) => (
              <Card key={chart.id} className={`${getGridClass(chart.size)} hover:shadow-lg transition-shadow`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{chart.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">{getChartComponent(chart)}</CardContent>
              </Card>
            ))}
          </div>

          {visibleCharts.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Charts Visible</h3>
              <p className="text-gray-600 mb-4">Add some charts to start visualizing your financial data</p>
              <Button onClick={() => setIsAddChartOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Chart
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="grid gap-4">
            {charts.map((chart) => (
              <Card key={chart.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      {chart.type.includes("pie") && <PieChart className="h-5 w-5 text-blue-600" />}
                      {chart.type.includes("line") && <LineChart className="h-5 w-5 text-blue-600" />}
                      {chart.type.includes("bar") && <BarChart3 className="h-5 w-5 text-blue-600" />}
                      {!chart.type.includes("pie") &&
                        !chart.type.includes("line") &&
                        !chart.type.includes("bar") && <TrendingUp className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{chart.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {chart.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {chart.type}
                        </Badge>
                        <Badge
                          variant={chart.visible ? "default" : "secondary"}
                          className={`text-xs ${chart.visible ? "bg-green-100 text-green-800" : ""}`}
                        >
                          {chart.visible ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleChartVisibility(chart.id)}
                      className={chart.visible ? "" : "text-gray-500"}
                    >
                      {chart.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => removeChart(chart.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddChartModal open={isAddChartOpen} onOpenChange={setIsAddChartOpen} onAddChart={addChart} />
    </div>
  );
}
