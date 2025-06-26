"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Input } from "components/dashboard/ui/input"
import { Checkbox } from "components/dashboard/ui/checkbox"
import { Search, ChevronDown, MoreHorizontal } from "lucide-react"
import { TransactionChart } from "components/dashboard/transaction-chart"
import { Button } from "components/dashboard/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/dashboard/ui/dropdown-menu"

interface AccountDetailViewProps {
  accountId: string
}

// Mock data - in real app this would come from API/database
const accountData = {
  "1": {
    name: "Work",
    type: "Current Account",
    balance: 5941.0,
    transactionCount: 45,
    totalIncome: 25378.46,
    totalExpenses: 8118.94,
    net: 17259.52,
  },
  "2": {
    name: "Personal",
    type: "Savings Account",
    balance: 152124.4,
    transactionCount: 187,
    totalIncome: 57378.46,
    totalExpenses: 16118.94,
    net: 41259.52,
  },
}

const transactions = [
  {
    id: 1,
    date: "Dec 12, 2024",
    description: "Flat Rent (Recurring)",
    category: "Rental",
    categoryColor: "bg-orange-100 text-orange-800",
    amount: -1500.0,
    recurring: "One-time",
  },
  {
    id: 2,
    date: "Dec 8, 2024",
    description: "Netflix (Recurring)",
    category: "Entertainment",
    categoryColor: "bg-purple-100 text-purple-800",
    amount: -10.0,
    recurring: "One-time",
  },
  {
    id: 3,
    date: "Dec 5, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -157.21,
    recurring: "One-time",
  },
  {
    id: 4,
    date: "Dec 5, 2024",
    description: "Received salary",
    category: "Salary",
    categoryColor: "bg-green-100 text-green-800",
    amount: 5549.52,
    recurring: "One-time",
  },
  {
    id: 5,
    date: "Dec 4, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -418.58,
    recurring: "One-time",
  },
  {
    id: 6,
    date: "Dec 3, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -227.26,
    recurring: "One-time",
  },
  {
    id: 7,
    date: "Dec 3, 2024",
    description: "Received salary",
    category: "Salary",
    categoryColor: "bg-green-100 text-green-800",
    amount: 6189.1,
    recurring: "One-time",
  },
  {
    id: 8,
    date: "Dec 2, 2024",
    description: "Received freelance",
    category: "Freelance",
    categoryColor: "bg-teal-100 text-teal-800",
    amount: 2864.91,
    recurring: "One-time",
  },
  {
    id: 9,
    date: "Dec 2, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -358.08,
    recurring: "One-time",
  },
  {
    id: 10,
    date: "Dec 2, 2024",
    description: "Paid for travel",
    category: "Travel",
    categoryColor: "bg-blue-100 text-blue-800",
    amount: -1251.66,
    recurring: "One-time",
  },
]

export function AccountDetailView({ accountId }: AccountDetailViewProps) {
  const account = accountData[accountId as keyof typeof accountData]

  if (!account) {
    return <div className="p-6">Account not found</div>
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Account Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {account.name}
          </h1>
          <p className="text-gray-500 mt-1">{account.type}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{account.transactionCount} Transactions</p>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Overview</h3>
          <Select defaultValue="lastMonth">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7Days">Last 7 Days</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="last6Months">Last 6 Months</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-600">${account.totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">${account.totalExpenses.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Net</p>
            <p className="text-2xl font-bold text-green-600">${account.net.toLocaleString()}</p>
          </div>
        </div>

        {/* Chart */}
        <TransactionChart />
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-200">
        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <div className="flex space-x-3">
              <Select defaultValue="allTypes">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allTypes">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="allTransactions">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allTransactions">All Transactions</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="oneTime">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table with proper scrolling */}
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recurring
                </th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Checkbox />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${transaction.categoryColor}`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.recurring}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
