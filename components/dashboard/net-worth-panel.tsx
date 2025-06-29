"use client"

import { Button } from "components/dashboard/ui/button"
import { useLanguage } from "lib/contexts/language-context"

const timeFilters = ["1W", "1M", "6M", "1Y", "Max"]

export function NetWorthPanel() {
  const { t } = useLanguage()

  const totalBudget = 15300
  const totalSpent = 4950
  const totalRemaining = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm h-full">
      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">{t("dashboard.netWorth")}</p>
          <p className="text-xs text-green-600">+$55,511</p>
          <p className="text-xl font-bold">$136,293</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("dashboard.assets")}</p>
          <p className="text-xs text-green-600">+$55,511</p>
          <p className="text-xl font-bold">$136,293</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("dashboard.liabilities")}</p>
          <p className="text-xs text-gray-500">$0</p>
          <p className="text-xl font-bold">$0</p>
        </div>
      </div>

      <div className="mb-4 flex justify-center space-x-2">
        {timeFilters.map((filter) => (
          <Button key={filter} variant={filter === "6M" ? "default" : "ghost"} size="sm" className="text-xs">
            {filter}
          </Button>
        ))}
      </div>

      {/* Chart placeholder - in a real app, you'd use a charting library like Recharts */}
      <div className="relative h-64 rounded-lg bg-gradient-to-t from-green-50 to-green-100 p-4">
        <svg className="h-full w-full" viewBox="0 0 400 200">
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points="0,180 50,160 100,140 150,120 200,100 250,80 300,60 350,40 400,20"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#gradient)"
            points="0,180 50,160 100,140 150,120 200,100 250,80 300,60 350,40 400,20 400,200 0,200"
          />
        </svg>

        {/* Chart labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-500">
          <span>Oct 23</span>
          <span>Nov 23</span>
          <span>Dec 23</span>
          <span>Feb 24</span>
          <span>Mar 24</span>
        </div>

        <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>$100K</span>
          <span>$50K</span>
          <span>$0</span>
        </div>
      </div>
    </div>
  )
}
