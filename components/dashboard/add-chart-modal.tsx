"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/dashboard/ui/dialog"
import type React from "react"

import { Button } from "components/dashboard/ui/button"
import { Input } from "components/dashboard/ui/input"
import { Label } from "components/dashboard/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Card, CardContent } from "components/dashboard/ui/card"
import { useState } from "react"
import { BarChart3, PieChart, LineChart, TrendingUp, Target, DollarSign, Activity, Calendar } from "lucide-react"

interface AddChartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddChart: (chart: { type: string; title: string; size: "small" | "medium" | "large"; visible: boolean }) => void
}

const chartTypes = [
  {
    type: "expenses-pie",
    name: "Expenses Pie Chart",
    description: "Breakdown of expenses by category",
    icon: PieChart,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    type: "income-vs-expenses",
    name: "Income vs Expenses",
    description: "Compare income and expenses over time",
    icon: BarChart3,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    type: "monthly-trend",
    name: "Monthly Trend",
    description: "Track spending trends over months",
    icon: LineChart,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    type: "budget-progress",
    name: "Budget Progress",
    description: "Monitor budget usage and remaining amounts",
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    type: "category-breakdown",
    name: "Category Analysis",
    description: "Detailed analysis by spending categories",
    icon: Activity,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    type: "account-balance",
    name: "Account Balances",
    description: "Current balance across all accounts",
    icon: DollarSign,
    color: "text-teal-600",
    bg: "bg-teal-100",
  },
  {
    type: "cash-flow",
    name: "Cash Flow Analysis",
    description: "Track money in and out over time",
    icon: TrendingUp,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  {
    type: "savings-goal",
    name: "Savings Goal Progress",
    description: "Track progress towards savings goals",
    icon: Calendar,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
]

export function AddChartModal({ open, onOpenChange, onAddChart }: AddChartModalProps) {
  const [selectedType, setSelectedType] = useState("")
  const [title, setTitle] = useState("")
  const [size, setSize] = useState<"small" | "medium" | "large">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedType && title) {
      onAddChart({
        type: selectedType,
        title,
        size,
        visible: true,
      })
      onOpenChange(false)
      setSelectedType("")
      setTitle("")
      setSize("medium")
    }
  }

  const selectedChart = chartTypes.find((chart) => chart.type === selectedType)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Chart
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Chart Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Choose Chart Type</Label>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {chartTypes.map((chart) => (
                <Card
                  key={chart.type}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedType === chart.type ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedType(chart.type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${chart.bg} flex items-center justify-center`}>
                        <chart.icon className={`h-5 w-5 ${chart.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{chart.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{chart.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chart Configuration */}
          {selectedType && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Chart Configuration</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Chart Title</Label>
                  <Input
                    id="title"
                    placeholder={selectedChart?.name || "Enter chart title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Chart Size</Label>
                  <Select value={size} onValueChange={(value: "small" | "medium" | "large") => setSize(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1 column)</SelectItem>
                      <SelectItem value="medium">Medium (2 columns)</SelectItem>
                      <SelectItem value="large">Large (3 columns)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded ${selectedChart?.bg} flex items-center justify-center`}>
                      {selectedChart && <selectedChart.icon className={`h-4 w-4 ${selectedChart.color}`} />}
                    </div>
                    <div>
                      <h4 className="font-medium">{title || selectedChart?.name}</h4>
                      <p className="text-sm text-gray-500">Size: {size}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                setSelectedType("")
                setTitle("")
                setSize("medium")
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedType || !title} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Chart
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
