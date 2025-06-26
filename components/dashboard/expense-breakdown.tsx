"use client"

const expenseData = [
  { category: "rental", amount: 1500.0, color: "#ef4444", percentage: 35 },
  { category: "entertainment", amount: 304.33, color: "#14b8a6", percentage: 15 },
  { category: "shopping", amount: 1161.13, color: "#3b82f6", percentage: 25 },
  { category: "travel", amount: 1251.66, color: "#10b981", percentage: 25 },
]

export function ExpenseBreakdown() {
  const total = expenseData.reduce((sum, item) => sum + item.amount, 0)

  // Calculate angles for each segment
  let cumulativePercentage = 0
  const segments = expenseData.map((item) => {
    const percentage = (item.amount / total) * 100
    const startAngle = (cumulativePercentage / 100) * 360
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360
    cumulativePercentage += percentage

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    }
  })

  // Function to create SVG path for pie slice
  const createPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle)
    const end = polarToCartesian(centerX, centerY, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  // Function to get label position
  const getLabelPosition = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2
    const labelRadius = radius + 30
    return polarToCartesian(centerX, centerY, labelRadius, midAngle)
  }

  const centerX = 120
  const centerY = 120
  const radius = 80

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Expense Breakdown</h3>

      <div className="flex flex-col items-center">
        {/* Pie Chart */}
        <div className="relative mb-6">
          <svg width="240" height="240" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(centerX, centerY, radius, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>

          {/* Labels positioned around the chart */}
          <div className="absolute inset-0">
            {segments.map((segment, index) => {
              const labelPos = getLabelPosition(centerX, centerY, radius, segment.startAngle, segment.endAngle)
              const midAngle = (segment.startAngle + segment.endAngle) / 2

              // Adjust text alignment based on position
              let textAlign = "center"
              const transform = ""

              if (midAngle > 90 && midAngle < 270) {
                textAlign = "right"
              } else if (midAngle > 270 || midAngle < 90) {
                textAlign = "left"
              }

              return (
                <div
                  key={index}
                  className="absolute text-sm font-medium whitespace-nowrap"
                  style={{
                    left: `${labelPos.x}px`,
                    top: `${labelPos.y}px`,
                    transform: "translate(-50%, -50%)",
                    color: segment.color,
                    textAlign: textAlign as any,
                  }}
                >
                  <div className="bg-white px-2 py-1 rounded shadow-sm border">
                    {segment.category}: ${segment.amount.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600 capitalize">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
