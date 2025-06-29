"use client"

export function CashFlowChart() {
  const data = [
    { month: "Jul", inflow: 6500, outflow: 3200, net: 3300 },
    { month: "Aug", inflow: 7200, outflow: 3800, net: 3400 },
    { month: "Sep", inflow: 6800, outflow: 3500, net: 3300 },
    { month: "Oct", inflow: 7500, outflow: 4200, net: 3300 },
    { month: "Nov", inflow: 6900, outflow: 3900, net: 3000 },
    { month: "Dec", inflow: 7800, outflow: 4100, net: 3700 },
  ]

  const maxValue = Math.max(...data.map((d) => Math.max(d.inflow, d.outflow)))

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Inflow</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Outflow</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span>Net</span>
        </div>
      </div>

      <div className="h-40 relative">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          {/* Grid */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#f3f4f6" strokeWidth="1" />
          ))}

          {/* Bars */}
          {data.map((item, index) => {
            const x = (index / data.length) * 400 + 20
            const inflowHeight = (item.inflow / maxValue) * 120
            const outflowHeight = (item.outflow / maxValue) * 120

            return (
              <g key={index}>
                <rect x={x} y={140 - inflowHeight} width="15" height={inflowHeight} fill="#10b981" />
                <rect x={x + 20} y={140 - outflowHeight} width="15" height={outflowHeight} fill="#ef4444" />
              </g>
            )
          })}

          {/* Net line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={data
              .map((item, index) => {
                const x = (index / data.length) * 400 + 35
                const y = 140 - (item.net / maxValue) * 120
                return `${x},${y}`
              })
              .join(" ")}
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-4">
          {data.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
