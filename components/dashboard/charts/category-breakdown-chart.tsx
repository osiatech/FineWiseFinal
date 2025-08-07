/* components/dashboard/category-breakdown-chart.tsx */
"use client";
import { categoryColor } from "./../../../lib/categoryColor";

export default function CategoryBreakdownChart() {
  const categorias = [
    { name: "Rental", amount: 1500, transactions: 1, trend: "stable" },
    { name: "Shopping", amount: 850, transactions: 3, trend: "up" },
    { name: "Entertainment", amount: 500, transactions: 2, trend: "down" },
    { name: "Food", amount: 350, transactions: 5, trend: "up" },
    { name: "Transportation", amount: 150, transactions: 2, trend: "stable" },
  ];

  const maxAmount = Math.max(...categorias.map((c) => c.amount));

  return (
    <div className="space-y-3">
      {categorias.map((category) => (
        <div key={category.name} className="flex items-center space-x-3">
          {/* Etiqueta y cantidad */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-600">${category.amount}</span>
            </div>
            {/* Barra proporcional */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${categoryColor(category.name.toLowerCase())}`}
                style={{ width: `${(category.amount / maxAmount) * 100}%` }}
              />
            </div>
          </div>
          {/* Nº transacciones + tendencia */}
          <div className="flex justify-between text-xs text-gray-500 ml-4 w-24">
            <span>{category.transactions} tx</span>
            <span
              className={
                category.trend === "up"
                  ? "text-green-500"
                  : category.trend === "down"
                  ? "text-red-500"
                  : "text-gray-500"
              }
            >
              {category.trend === "up" ? "↑" : category.trend === "down" ? "↓" : "–"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
