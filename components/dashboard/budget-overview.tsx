"use client"

export function BudgetOverview() {
  const totalBudget = 15300
  const totalSpent = 4950
  const totalRemaining = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <title>Budget | Dashboard</title>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
        <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Spent</h3>
        <p className="text-2xl font-bold text-red-600">${totalSpent.toLocaleString()}</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining</h3>
        <p className="text-2xl font-bold text-green-600">${totalRemaining.toLocaleString()}</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Budget Used</h3>
        <p className="text-2xl font-bold text-blue-600">{spentPercentage.toFixed(1)}%</p>
      </div>
    </div>
  )
}
