"use client"
import { Progress } from "components/dashboard/ui/progress"

export function SavingsGoalChart() {
  const goal = {
    target: 200000,
    current: 152124.4,
    monthly: 5000,
    monthsLeft: 10,
  }

  const percentage = (goal.current / goal.target) * 100

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-bold text-blue-600">{percentage.toFixed(1)}%</p>
        <p className="text-sm text-gray-500">Goal Progress</p>
      </div>

      <Progress value={percentage} className="h-3" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Current</span>
          <span className="font-medium">${goal.current.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Target</span>
          <span className="font-medium">${goal.target.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Remaining</span>
          <span className="font-medium">${(goal.target - goal.current).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Monthly: ${goal.monthly}</span>
          <span>{goal.monthsLeft} months left</span>
        </div>
      </div>
    </div>
  )
}
