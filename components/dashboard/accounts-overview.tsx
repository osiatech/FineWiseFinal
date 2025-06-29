"use client"
import { TrendingUp, DollarSign, CreditCard } from "lucide-react"

export function AccountsOverview() {
  const workBalance = 5941.0
  const personalBalance = 152124.4
  const totalBalance = workBalance + personalBalance
  const totalAssets = totalBalance
  const totalLiabilities = 0
  const netWorth = totalAssets - totalLiabilities
  const monthlyChange = 5.2

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <title>Accounts | Dashboard</title>
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Balance</p>
            <p className="text-2xl font-bold">${totalBalance.toLocaleString()}</p>
          </div>
          <DollarSign className="h-8 w-8 text-blue-200" />
        </div>
        <div className="flex items-center mt-4 text-blue-100">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm">+{monthlyChange}% this month</span>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Assets</p>
            <p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-sm text-gray-600 mt-2">Across 2 accounts</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Liabilities</p>
            <p className="text-2xl font-bold text-gray-600">${totalLiabilities.toLocaleString()}</p>
          </div>
          <CreditCard className="h-8 w-8 text-gray-500" />
        </div>
        <p className="text-sm text-gray-600 mt-2">No debts</p>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Net Worth</p>
            <p className="text-2xl font-bold">${netWorth.toLocaleString()}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-200" />
        </div>
        <p className="text-sm text-green-100 mt-2">Assets - Liabilities</p>
      </div>
    </div>
  )
}
