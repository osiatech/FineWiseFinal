"use client"
import { Progress } from "components/dashboard/ui/progress"

export function BudgetProgressChart() {
  const budgets = [
    { category: "Shopping", spent: 270, budget: 2500, color: "bg-blue-500" },
    { category: "Home Decor", spent: 3300, budget: 3800, color: "bg-orange-500" },
    { category: "Garden", spent: 160, budget: 1500, color: "bg-green-500" },
    { category: "Car", spent: 120, budget: 2500, color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-4">
      {budgets.map((budget, index) => {
        const percentage = (budget.spent / budget.budget) * 100
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{budget.category}</span>
              <span className="text-gray-600">
                ${budget.spent} / ${budget.budget}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{percentage.toFixed(1)}% used</span>
              <span>${budget.budget - budget.spent} remaining</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}