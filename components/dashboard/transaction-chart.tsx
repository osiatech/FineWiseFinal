"use client"

export function TransactionChart() {
  // Sample data for the chart
  const chartData = [
    { date: "Nov 15", income: 3000, expense: 0 },
    { date: "Nov 16", income: 1500, expense: 1200 },
    { date: "Nov 17", income: 2000, expense: 0 },
    { date: "Nov 18", income: 0, expense: 1500 },
    { date: "Nov 19", income: 3200, expense: 0 },
    { date: "Nov 20", income: 0, expense: 1800 },
    { date: "Nov 21", income: 1800, expense: 0 },
    { date: "Nov 22", income: 0, expense: 0 },
    { date: "Nov 23", income: 1200, expense: 800 },
    { date: "Nov 24", income: 0, expense: 0 },
    { date: "Nov 25", income: 3500, expense: 0 },
    { date: "Nov 26", income: 1800, expense: 1500 },
    { date: "Nov 27", income: 7200, expense: 0 },
    { date: "Nov 28", income: 7500, expense: 1800 },
    { date: "Nov 29", income: 10000, expense: 0 },
    { date: "Nov 30", income: 1200, expense: 0 },
    { date: "Dec 01", income: 0, expense: 0 },
    { date: "Dec 02", income: 2800, expense: 1500 },
    { date: "Dec 03", income: 6200, expense: 0 },
    { date: "Dec 04", income: 0, expense: 0 },
    { date: "Dec 05", income: 5800, expense: 0 },
    { date: "Dec 06", income: 0, expense: 1200 },
  ]

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.income, d.expense)))

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="h-64 flex items-end justify-between space-x-1 px-4">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-1 flex-1">
            <div className="flex flex-col items-center justify-end h-48 space-y-1">
              {/* Income Bar */}
              {data.income > 0 && (
                <div
                  className="w-full bg-green-500 rounded-t"
                  style={{
                    height: `${(data.income / maxValue) * 180}px`,
                    minHeight: data.income > 0 ? "4px" : "0px",
                  }}
                />
              )}
              {/* Expense Bar */}
              {data.expense > 0 && (
                <div
                  className="w-full bg-red-500 rounded-t"
                  style={{
                    height: `${(data.expense / maxValue) * 180}px`,
                    minHeight: data.expense > 0 ? "4px" : "0px",
                  }}
                />
              )}
            </div>
            <span className="text-xs text-gray-500 transform rotate-45 origin-left whitespace-nowrap">{data.date}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span className="text-sm text-gray-600">Expense</span>
        </div>
      </div>
    </div>
  )
}