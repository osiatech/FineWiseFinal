"use client"
import { useState } from "react"
import { Button } from "components/dashboard/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Badge } from "components/dashboard/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "components/dashboard/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/dashboard/ui/tabs"
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
} from "lucide-react"
import { AddChartModal } from "components/dashboard/add-chart-modal"
import { ExpensesPieChart } from "components/dashboard/charts/expenses-pie-chart"
import { IncomeVsExpensesChart } from "components/dashboard/charts/income-vs-expenses-chart"
import { MonthlyTrendChart } from "components/dashboard/charts/monthly-trend-chart"
import { BudgetProgressChart } from "components/dashboard/charts/budget-progress-chart"
import { CategoryBreakdownChart } from "components/dashboard/charts/category-breakdown-chart"
import { AccountBalanceChart } from "components/dashboard/charts/account-balance-chart"
import { CashFlowChart } from "components/dashboard/charts/cash-flow-chart"
import { SavingsGoalChart } from "components/dashboard/charts/savings-goal-chart"

interface ChartWidget {
  id: string
  type: string
  title: string
  size: "small" | "medium" | "large"
  visible: boolean
  position: number
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
]

export function ChartsView() {
  const [charts, setCharts] = useState<ChartWidget[]>(defaultCharts)
  const [isAddChartOpen, setIsAddChartOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("6months")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const visibleCharts = charts.filter((chart) => chart.visible).sort((a, b) => a.position - b.position)

  const toggleChartVisibility = (id: string) => {
    setCharts(charts.map((chart) => (chart.id === id ? { ...chart, visible: !chart.visible } : chart)))
  }

  const removeChart = (id: string) => {
    setCharts(charts.filter((chart) => chart.id !== id))
  }

  const addChart = (chartData: Omit<ChartWidget, "id" | "position">) => {
    const newChart: ChartWidget = {
      ...chartData,
      id: Date.now().toString(),
      position: charts.length + 1,
    }
    setCharts([...charts, newChart])
  }

  const getChartComponent = (chart: ChartWidget) => {
    switch (chart.type) {
      case "expenses-pie":
        return <ExpensesPieChart />
      case "income-vs-expenses":
        return <IncomeVsExpensesChart />
      case "monthly-trend":
        return <MonthlyTrendChart />
      case "budget-progress":
        return <BudgetProgressChart />
      case "category-breakdown":
        return <CategoryBreakdownChart />
      case "account-balance":
        return <AccountBalanceChart />
      case "cash-flow":
        return <CashFlowChart />
      case "savings-goal":
        return <SavingsGoalChart />
      default:
        return <div>Chart not found</div>
    }
  }

  const getGridClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1"
      case "medium":
        return "col-span-1 md:col-span-2"
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-3"
      default:
        return "col-span-1"
    }
  }

  const chartStats = {
    totalCharts: charts.length,
    visibleCharts: visibleCharts.length,
    hiddenCharts: charts.length - visibleCharts.length,
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <title>Charts | Dashboard</title>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Visualize your financial data with interactive charts and insights</p>
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
                <p className="text-xl font-bold text-purple-600">1,247</p>
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
                      {!chart.type.includes("pie") && !chart.type.includes("line") && !chart.type.includes("bar") && (
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      )}
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
  )
}
