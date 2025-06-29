"use client"
import { useState } from "react"
import { Input } from "components/dashboard/ui/input"
import { Button } from "components/dashboard/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Checkbox } from "components/dashboard/ui/checkbox"
import { Badge } from "components/dashboard/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/dashboard/ui/dropdown-menu"
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  Copy,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { AddTransactionModal } from "components/dashboard/add-transaction-modal"

const transactionsData = [
  {
    id: 1,
    date: "Dec 12, 2024",
    description: "Flat Rent (Recurring)",
    category: "Rental",
    categoryColor: "bg-orange-100 text-orange-800",
    amount: -1500.0,
    recurring: "One-time",
    account: "Personal",
    type: "expense",
  },
  {
    id: 2,
    date: "Dec 8, 2024",
    description: "Netflix (Recurring)",
    category: "Entertainment",
    categoryColor: "bg-purple-100 text-purple-800",
    amount: -10.0,
    recurring: "One-time",
    account: "Personal",
    type: "expense",
  },
  {
    id: 3,
    date: "Dec 5, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -157.21,
    recurring: "One-time",
    account: "Work",
    type: "expense",
  },
  {
    id: 4,
    date: "Dec 5, 2024",
    description: "Received salary",
    category: "Salary",
    categoryColor: "bg-green-100 text-green-800",
    amount: 5549.52,
    recurring: "One-time",
    account: "Work",
    type: "income",
  },
  {
    id: 5,
    date: "Dec 4, 2024",
    description: "Paid for shopping",
    category: "Shopping",
    categoryColor: "bg-pink-100 text-pink-800",
    amount: -418.58,
    recurring: "One-time",
    account: "Personal",
    type: "expense",
  },
  {
    id: 6,
    date: "Dec 3, 2024",
    description: "Grocery shopping",
    category: "Food",
    categoryColor: "bg-blue-100 text-blue-800",
    amount: -89.45,
    recurring: "One-time",
    account: "Personal",
    type: "expense",
  },
  {
    id: 7,
    date: "Dec 2, 2024",
    description: "Freelance payment",
    category: "Freelance",
    categoryColor: "bg-teal-100 text-teal-800",
    amount: 1200.0,
    recurring: "One-time",
    account: "Work",
    type: "income",
  },
  {
    id: 8,
    date: "Dec 1, 2024",
    description: "Gas station",
    category: "Transportation",
    categoryColor: "bg-yellow-100 text-yellow-800",
    amount: -45.67,
    recurring: "One-time",
    account: "Personal",
    type: "expense",
  },
]

export function TransactionsView() {
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)

  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesAccount = accountFilter === "all" || transaction.account.toLowerCase() === accountFilter

    return matchesSearch && matchesType && matchesAccount
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map((t) => t.id))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id])
    } else {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id))
    }
  }

  const totalIncome = filteredTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const netAmount = totalIncome - totalExpenses

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <title>Transactions | Dashboard</title>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Transactions
        </h1>
        <p className="text-gray-600 mt-2">Track and manage all your financial transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-xl font-bold text-gray-900">{filteredTransactions.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full ${netAmount >= 0 ? "bg-green-100" : "bg-red-100"} flex items-center justify-center`}
            >
              <DollarSign className={`h-5 w-5 ${netAmount >= 0 ? "text-green-600" : "text-red-600"}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Net Amount</p>
              <p className={`text-xl font-bold ${netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {netAmount >= 0 ? "+" : ""}${netAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-200">
        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedTransactions.length > 0 && (
            <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedTransactions.length} transaction{selectedTransactions.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={
                      selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
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
                  Account
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={(checked) => handleSelectTransaction(transaction.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <Badge className={transaction.categoryColor}>{transaction.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.account}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{transaction.recurring}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsAddTransactionOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Transaction
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactionsData.length} transactions
            </div>
          </div>
        </div>
      </div>

      <AddTransactionModal open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen} />
    </div>
  )
}
