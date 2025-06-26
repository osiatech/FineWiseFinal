"use client"

export function IncomeVsExpensesChart() {
  const data = [
    { month: "Jul", income: 6500, expenses: 3200 },
    { month: "Aug", income: 7200, expenses: 3800 },
    { month: "Sep", income: 6800, expenses: 3500 },
    { month: "Oct", income: 7500, expenses: 4200 },
    { month: "Nov", income: 6900, expenses: 3900 },
    { month: "Dec", income: 7800, expenses: 4100 },
  ]

  const maxValue = Math.max(...data.map((d) => Math.max(d.income, d.expenses)))

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Income</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Expenses</span>
        </div>
      </div>

      <div className="h-40 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-1 flex-1">
            <div className="flex items-end space-x-1 h-32">
              <div className="bg-green-500 rounded-t w-4" style={{ height: `${(item.income / maxValue) * 100}%` }} />
              <div className="bg-red-500 rounded-t w-4" style={{ height: `${(item.expenses / maxValue) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
