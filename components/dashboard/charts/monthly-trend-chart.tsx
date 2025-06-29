"use client"

export function MonthlyTrendChart() {
  const data = [
    { month: "Jul", amount: 3200 },
    { month: "Aug", amount: 3800 },
    { month: "Sep", amount: 3500 },
    { month: "Oct", amount: 4200 },
    { month: "Nov", amount: 3900 },
    { month: "Dec", amount: 4100 },
  ]

  const maxValue = Math.max(...data.map((d) => d.amount))
  const minValue = Math.min(...data.map((d) => d.amount))

  return (
    <div className="space-y-4">
      <div className="h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Line chart */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 400
                const y = 160 - ((item.amount - minValue) / (maxValue - minValue)) * 120
                return `${x},${y}`
              })
              .join(" ")}
          />

          {/* Area fill */}
          <polygon
            fill="url(#trendGradient)"
            points={`${data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 400
                const y = 160 - ((item.amount - minValue) / (maxValue - minValue)) * 120
                return `${x},${y}`
              })
              .join(" ")} 400,160 0,160`}
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = 160 - ((item.amount - minValue) / (maxValue - minValue)) * 120
            return <circle key={index} cx={x} cy={y} r="4" fill="#3b82f6" />
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
          {data.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
