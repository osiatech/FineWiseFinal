"use client"
import { Switch } from "components/dashboard/ui/switch"
import { Plus, TrendingUp, TrendingDown } from "lucide-react"
import { CreateAccountModal } from "components/dashboard/create-account-modal"
import { useState } from "react"
import { useRouter } from "next/navigation"

const accounts = [
  {
    id: 1,
    name: "Work",
    balance: 5941.0,
    type: "Current Account",
    isActive: false,
    hasIncome: true,
    hasExpense: true,
  },
  {
    id: 2,
    name: "Personal",
    balance: 152124.4,
    type: "Savings Account",
    isActive: true,
    hasIncome: true,
    hasExpense: false,
  },
]

export function AccountCards() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const router = useRouter()

  const handleAccountClick = (accountId: number) => {
    router.push(`/account/${accountId}`)
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add New Account Card */}
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-600">Add New Account</span>
          </div>
        </div>

        {/* Account Cards */}
        {accounts.map((account) => (
          <div
            key={account.id}
            className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleAccountClick(account.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
              <Switch
                checked={account.isActive}
                className="data-[state=checked]:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{account.type}</p>
            </div>

            <div className="flex space-x-4">
              {account.hasIncome && (
                <div className="flex items-center space-x-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Income</span>
                </div>
              )}
              {account.hasExpense && (
                <div className="flex items-center space-x-2 text-red-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">Expense</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateAccountModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  )
}
