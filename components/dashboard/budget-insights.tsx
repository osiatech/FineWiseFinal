"use client"
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export function BudgetInsights() {
  const insights = [
    {
      type: "success",
      icon: CheckCircle,
      iconColor: "text-green-600",
      title: "Great Progress!",
      description: "You're staying within budget for 4 out of 5 categories this month.",
    },
    {
      type: "warning",
      icon: AlertCircle,
      iconColor: "text-yellow-600",
      title: "Home Decor Alert",
      description: "You've spent 87% of your Home Decor budget. Consider reducing spending.",
    },
    {
      type: "info",
      icon: TrendingUp,
      iconColor: "text-blue-600",
      title: "Spending Trend",
      description: "Your overall spending is 15% lower than last month. Keep it up!",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Budget Insights</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-50`}>
                <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Budget Summary</h3>
            <p className="text-gray-600">You have used 32.4% of your total budget this month</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">$4,950</p>
            <p className="text-sm text-gray-500">of $15,300 spent</p>
          </div>
        </div>
      </div>
    </div>
  )
}
