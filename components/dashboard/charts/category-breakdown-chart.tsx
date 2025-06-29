"use client"

export function CategoryBreakdownChart() {
  const categories = [
    { name: "Rental", amount: 1500, transactions: 1, trend: "stable" },
    { name: "Shopping", amount: 850, transactions: 3, trend: "up" },
    { name: "Entertainment", amount: 500, transactions: 2, trend: "down" },
    { name: "Food", amount: 350, transactions: 5, trend: "up" },
    { name: "Transportation", amount: 150, transactions: 2, trend: "stable" },
  ]

  const maxAmount = Math.max(...categories.map((c) => c.amount))

  return (
    <div className="space-y-3">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-600">${category.amount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(category.amount / maxAmount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{category.transactions} transactions</span>
              <span
                className={
                  category.trend === "up"
                    ? "text-red-500"
                    : category.trend === "down"
                      ? "text-green-500"
                      : "text-gray-500"
                }
              >
                {category.trend === "up" ? "↑" : category.trend === "down" ? "↓" : "→"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
