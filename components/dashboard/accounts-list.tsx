"use client"
import { useState } from "react"
import { Button } from "components/dashboard/ui/button"
import { Switch } from "components/dashboard/ui/switch"
import { Badge } from "components/dashboard/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/dashboard/ui/dropdown-menu"
import { MoreHorizontal, Wallet, PiggyBank, Eye, EyeOff, Star, TrendingUp, TrendingDown } from "lucide-react"
import { CreateAccountModal } from "components/dashboard/create-account-modal"
import { useRouter } from "next/navigation"

const accountsData = [
  {
    id: 1,
    name: "Work",
    type: "Current Account",
    balance: 5941.0,
    isActive: false,
    isVisible: true,
    isFavorite: false,
    icon: Wallet,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    hasIncome: true,
    hasExpense: true,
  },
  {
    id: 2,
    name: "Personal",
    type: "Savings Account",
    balance: 152124.4,
    isActive: true,
    isVisible: true,
    isFavorite: true,
    icon: PiggyBank,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    hasIncome: true,
    hasExpense: false,
  },
]

export function AccountsList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [accounts, setAccounts] = useState(accountsData)
  const router = useRouter()

  const toggleVisibility = (id: number) => {
    setAccounts(
      accounts.map((account) => (account.id === id ? { ...account, isVisible: !account.isVisible } : account)),
    )
  }

  const toggleFavorite = (id: number) => {
    setAccounts(
      accounts.map((account) => (account.id === id ? { ...account, isFavorite: !account.isFavorite } : account)),
    )
  }

  const handleAccountClick = (accountId: number) => {
    router.push(`/account/${accountId}`)
  }

  return (
    <>
      <div className="rounded-lg bg-white shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">All Accounts</h2>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Account
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleAccountClick(account.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${account.iconBg} flex items-center justify-center`}>
                    <account.icon className={`h-6 w-6 ${account.iconColor}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{account.name}</h3>
                      {account.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500">{account.type}</p>
                      <Badge className={account.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {account.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex space-x-4 mt-2">
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
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {account.isVisible ? `$${account.balance.toLocaleString()}` : "••••••"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" onClick={() => toggleVisibility(account.id)}>
                      {account.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>

                    <Switch checked={account.isActive} className="data-[state=checked]:bg-gray-900" />

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleFavorite(account.id)}>
                          {account.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAccountClick(account.id)}>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit account</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateAccountModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  )
}
