"use client"
import { Plus, ShoppingBag, Home, Palmtree, Car, Video, Target, TrendingUp, AlertTriangle } from "lucide-react"
import { Progress } from "components/dashboard/ui/progress"
import { CreateBudgetModal } from "components/dashboard/create-budget-modal"
import { useState } from "react"
import { Button } from "components/dashboard/ui/button"
import { Budget } from "@/types/budget"

interface BudgetCardsProps {
  budgets: Budget[]
}
const budgetData = [
  {
    id: 1,
    name: "Shopping",
    icon: ShoppingBag,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    budget: 2500,
    spent: 270,
    items: 2,
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Home Decor",
    icon: Home,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    budget: 3800,
    spent: 3300,
    items: 3,
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Garden",
    icon: Palmtree,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    budget: 1500,
    spent: 160,
    items: 2,
    color: "#3b82f6",
  },
  {
    id: 4,
    name: "Car",
    icon: Car,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    budget: 2500,
    spent: 120,
    items: 1,
    color: "#3b82f6",
  },
  {
    id: 5,
    name: "YouTube",
    icon: Video,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    budget: 5000,
    spent: 1100,
    items: 2,
    color: "#3b82f6",
  },
]

export function BudgetCards({ budgets }: BudgetCardsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 90) return { status: "danger", color: "text-red-600" }
    if (percentage >= 70) return { status: "warning", color: "text-yellow-600" }
    return { status: "good", color: "text-green-600" }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Budget Card */}
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create New Budget</h3>
              <p className="text-sm text-gray-500 mt-1">Set up a new spending category</p>
            </div>
          </div>
        </div>

        {/* Budget Cards */}
        {budgetData.map((budget) => {
          const remaining = budget.budget - budget.spent
          const percentage = (budget.spent / budget.budget) * 100
          const status = getBudgetStatus(budget.spent, budget.budget)

          return (
            <div
              key={budget.id}
              className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full ${budget.iconBg} flex items-center justify-center`}>
                    <budget.icon className={`h-6 w-6 ${budget.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{budget.name}</h3>
                    <p className="text-sm text-gray-500">
                      {budget.items} Item{budget.items !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">${budget.budget.toLocaleString()}</p>
                  {status.status === "danger" && <AlertTriangle className="h-4 w-4 text-red-500 ml-auto mt-1" />}
                </div>
              </div>

              {/* Spending Info */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>${budget.spent.toLocaleString()} Spent</span>
                  <span className={status.color}>${remaining.toLocaleString()} Remaining</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Target className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <CreateBudgetModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  )
}
