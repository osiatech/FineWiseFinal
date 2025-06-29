"use client"

import { Button } from "components/dashboard/ui/button"
import { useLanguage } from "lib/contexts/language-context"

const spendingData = [
  { category: "categories.rental", amount: -1900, color: "bg-red-200", icon: "🏠" },
  { category: "categories.investment", amount: -400, color: "bg-blue-200", icon: "📈" },
  { category: "categories.food", amount: -277, color: "bg-green-200", icon: "🛒" },
  { category: "categories.entertainment", amount: -92, color: "bg-orange-200", icon: "🍕" },
  { category: "categories.phone", amount: -34, color: "bg-purple-200", icon: "📱" },
]

export function SpendingChart() {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t("dashboard.spendThisMonth")}</h3>
        <Button variant="link" className="text-blue-600 p-0">
          {t("dashboard.seeBudget")}
        </Button>
      </div>

      {/* Pie chart placeholder - in a real app, you'd use a charting library */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-48 w-48">
          <div className="absolute inset-0 rounded-full border-8 border-red-200"></div>
          <div className="absolute inset-2 rounded-full border-8 border-blue-200"></div>
          <div className="absolute inset-4 rounded-full border-8 border-green-200"></div>
          <div className="absolute inset-6 rounded-full border-8 border-orange-200"></div>
          <div className="absolute inset-8 rounded-full border-4 border-purple-200"></div>
        </div>
      </div>

      <div className="space-y-3">
        {spendingData.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{t(item.category)}</span>
            </div>
            <span className="text-sm font-semibold">${Math.abs(item.amount).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
