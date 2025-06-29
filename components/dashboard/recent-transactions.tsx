"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useLanguage } from "lib/contexts/language-context"

const transactions = [
  {
    id: 1,
    title: "Alquiler Mensual (Recurrente)",
    date: "12 Dic, 2024",
    amount: -1500.0,
    type: "expense",
  },
  {
    id: 2,
    title: "Netflix (Recurrente)",
    date: "8 Dic, 2024",
    amount: -10.0,
    type: "expense",
  },
  {
    id: 3,
    title: "Salario Recibido",
    date: "5 Dic, 2024",
    amount: 5549.52,
    type: "income",
  },
  {
    id: 4,
    title: "Compras",
    date: "5 Dic, 2024",
    amount: -157.21,
    type: "expense",
  },
  {
    id: 5,
    title: "Compras",
    date: "4 Dic, 2024",
    amount: -418.58,
    type: "expense",
  },
]

export function RecentTransactions() {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{t("dashboard.recentTransactions")}</h3>
        <Select defaultValue="personal">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">personal</SelectItem>
            <SelectItem value="business">negocio</SelectItem>
            <SelectItem value="all">todas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                {transaction.type === "income" ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.title}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
