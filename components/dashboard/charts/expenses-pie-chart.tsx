"use client"

export function ExpensesPieChart() {
  const expenseData = [
    { category: "Rental", amount: 1500, color: "#ef4444", percentage: 45 },
    { category: "Shopping", amount: 850, color: "#ec4899", percentage: 25 },
    { category: "Entertainment", amount: 500, color: "#8b5cf6", percentage: 15 },
    { category: "Food", amount: 350, color: "#06b6d4", percentage: 10 },
    { category: "Transportation", amount: 150, color: "#10b981", percentage: 5 },
  ]

  const total = expenseData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-4">
      {/* Simple pie chart representation */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {expenseData.map((item, index) => {
              const startAngle = expenseData.slice(0, index).reduce((sum, prev) => sum + (prev.amount / total) * 360, 0)
              const endAngle = startAngle + (item.amount / total) * 360
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity"
                />
              )
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {expenseData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700">{item.category}</span>
            </div>
            <span className="font-medium">${item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
