"use client"

export function AccountBalanceChart() {
  const accounts = [
    { name: "Personal", balance: 152124.4, type: "Savings", color: "bg-green-500" },
    { name: "Work", balance: 5941.0, type: "Current", color: "bg-blue-500" },
  ]

  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
        <p className="text-sm text-gray-500">Total Balance</p>
      </div>

      <div className="space-y-3">
        {accounts.map((account, index) => {
          const percentage = (account.balance / total) * 100
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${account.color}`} />
                  <span className="text-sm font-medium">{account.name}</span>
                </div>
                <span className="text-sm text-gray-600">${account.balance.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 text-right">{percentage.toFixed(1)}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
