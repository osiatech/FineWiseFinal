
"use client";
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useBudgetSummary } from "@/lib/hooks/useBudgets";

export function BudgetInsights() {
  const { data, isLoading } = useBudgetSummary();
  if (isLoading || !data) return <p className="text-sm text-gray-500">Loading insights…</p>;

  
  const {
    totalBudget,
    totalSpent,
    usedPercent: percentageUsed,   
  } = data;

  /* tarjetas dinámicas ― ya con un número seguro */
  const insights = [
    {
      type: "success",
      show: percentageUsed < 50,
      icon: CheckCircle,
      iconColor: "text-green-600",
      title: "Great progress!",
      description: `Usted ha gastado el ${percentageUsed.toFixed(1)} % de su presupuesto este mes.`,
    },
    {
      type: "warning",
      show: percentageUsed > 90,
      icon: AlertCircle,
      iconColor: "text-yellow-600",
      title: "Budget alert",
      description: `Usted está muy cerca de exceder su presupuesto mensual. ${percentageUsed.toFixed(1)} % gastado.`,
    },
    {
      type: "info",
      show: true,
      icon: TrendingUp,
      iconColor: "text-blue-600",
      title: "Spending trend",
      description: `Usted ha gastado el ${percentageUsed.toFixed(1)} % de su presupuesto este mes.`,
    },
  ].filter(i => i.show);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Insights</h2>

      {/* insight cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-gray-50">
                <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* monthly summary */}
      <div className="rounded-lg bg-blue-50 p-6 border border-blue-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resumen Mensual del Presupuesto</h3>
          <p className="text-sm text-gray-600">
            Usted ha gastado el {percentageUsed.toFixed(1)} % de su presupuesto total este mes
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            ${totalSpent.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            of ${totalBudget.toLocaleString()} spent
          </p>
        </div>
      </div>
    </div>
  );
}


// "use client"
// import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

// export function BudgetInsights() {
//   const insights = [
//     {
//       type: "success",
//       icon: CheckCircle,
//       iconColor: "text-green-600",
//       title: "Great Progress!",
//       description: "You're staying within budget for 4 out of 5 categories this month.",
//     },
//     {
//       type: "warning",
//       icon: AlertCircle,
//       iconColor: "text-yellow-600",
//       title: "Home Decor Alert",
//       description: "You've spent 87% of your Home Decor budget. Consider reducing spending.",
//     },
//     {
//       type: "info",
//       icon: TrendingUp,
//       iconColor: "text-blue-600",
//       title: "Spending Trend",
//       description: "Your overall spending is 15% lower than last month. Keep it up!",
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-900">Budget Insights</h2>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {insights.map((insight, index) => (
//           <div key={index} className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
//             <div className="flex items-start space-x-3">
//               <div className={`p-2 rounded-full bg-gray-50`}>
//                 <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
//                 <p className="text-sm text-gray-600">{insight.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Monthly Summary */}
//       <div className="rounded-lg bg-blue-50 p-6 border border-blue-200 flex items-center justify-between">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900">Monthly Budget Summary</h3>
//         <p className="text-sm text-gray-600">
//           You have used {percentageUsed.toFixed(1)} % of your total budget this month
//         </p>
//       </div>

//       <div className="text-right">
//         <p className="text-2xl font-bold text-blue-600">
//           ${totalSpent.toLocaleString()}
//         </p>
//         <p className="text-sm text-gray-500">
//           of ${totalBudget.toLocaleString()} spent
//         </p>
//       </div>
//     </div>
//     </div>
//   )
// }

// BudgetInsights.tsx