"use client"
import { TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react"
import { Progress } from "components/dashboard/ui/progress"

export function AccountsInsights() {
  const insights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Healthy Balance Distribution",
      description: "96% of your funds are in savings - great for security!",
      color: "text-green-600",
    },
    {
      type: "info",
      icon: TrendingUp,
      title: "Account Growth",
      description: "Your total balance has grown 5.2% this month.",
      color: "text-blue-600",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Work Account Inactive",
      description: "Consider activating your work account for transactions.",
      color: "text-yellow-600",
    },
  ]

  const savingsGoal = {
    target: 200000,
    current: 152124.4,
    percentage: 76,
  }

  return (
    <div className="space-y-6">
      {/* Insights */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <insight.icon className={`h-5 w-5 ${insight.color} mt-0.5`} />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Goal */}
      <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 border border-green-200">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Savings Goal</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">
              ${savingsGoal.current.toLocaleString()} / ${savingsGoal.target.toLocaleString()}
            </span>
          </div>
          <Progress value={savingsGoal.percentage} className="h-2" />
          <p className="text-sm text-gray-600">
            {savingsGoal.percentage}% complete • ${(savingsGoal.target - savingsGoal.current).toLocaleString()} to go
          </p>
        </div>
      </div>

      {/* Account Distribution */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Distribution</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Personal (Savings)</span>
            <span className="font-medium">96.2%</span>
          </div>
          <Progress value={96.2} className="h-2" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Work (Current)</span>
            <span className="font-medium">3.8%</span>
          </div>
          <Progress value={3.8} className="h-2" />
        </div>
      </div>
    </div>
  )
}
