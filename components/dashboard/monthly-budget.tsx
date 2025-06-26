"use client"

import { Progress } from "components/dashboard/ui/progress"
import { Button } from "components/dashboard/ui/button"
import { Edit } from "lucide-react"
import { useLanguage } from "lib/contexts/language-context"

export function MonthlyBudget() {
  const { t } = useLanguage()
  const spent = 4217.12
  const total = 7000.0
  const percentage = (spent / total) * 100

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t("dashboard.monthlyBudget")}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold">${spent.toLocaleString()}</span>
            <span className="text-gray-500">
              of ${total.toLocaleString()} {t("dashboard.spent")}
            </span>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <Edit className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{percentage.toFixed(1)}% used</p>
        </div>
      </div>

      <Progress value={percentage} className="h-2" />
    </div>
  )
}
