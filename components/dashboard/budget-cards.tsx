"use client";
import {
  Plus,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Plane,
  Heart,
  Gamepad2,
  Book,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "components/dashboard/ui/progress";
import { Button } from "components/dashboard/ui/button";

import { useState } from "react";
import { useBudgets, useDeleteBudget } from "@/lib/hooks/useBudgets";
import { Budget, CategoryBudgetType } from "@/types/budgets";
import { CreateBudgetModal } from "components/dashboard/create-budget-modal";
import { EditBudgetModal } from "components/dashboard/edit-budget-modal";

/* --------------------- helpers --------------------- */
// icon & color según la categoría que viene del backend
const categoryIcon: Record<
  CategoryBudgetType,
  { Icon: any; iconBg: string; iconColor: string }
> = {
  housing:         { Icon: Home,        iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  utilities:       { Icon: Home,        iconBg: "bg-gray-100",   iconColor: "text-gray-600"   },
  food:            { Icon: Utensils,    iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  transportation:  { Icon: Car,         iconBg: "bg-blue-100",   iconColor: "text-blue-600"   },
  healthcare:      { Icon: Heart,       iconBg: "bg-red-100",    iconColor: "text-red-600"    },
  insurance:       { Icon: Heart,       iconBg: "bg-red-100",    iconColor: "text-red-600"    },
  entertainment:   { Icon: Gamepad2,    iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
  clothing:        { Icon: ShoppingBag, iconBg: "bg-pink-100",   iconColor: "text-pink-600"   },
  personal_care:   { Icon: Heart,       iconBg: "bg-pink-100",   iconColor: "text-pink-600"   },
  education:       { Icon: Book,        iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
  savings:         { Icon: TrendingUp,  iconBg: "bg-green-100",  iconColor: "text-green-600"  },
  debt_repayment:  { Icon: TrendingUp,  iconBg: "bg-green-100",  iconColor: "text-green-600"  },
};

/* --------------------------------------------------- */
export function BudgetCards() {
  const { data: budgets = [], isLoading } = useBudgets();
  const { mutate: deleteBudget, isPending: deleting } = useDeleteBudget();

  /* diálogos */
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);

  if (isLoading) return <p className="p-6">Loading budgets…</p>;

  const getStatus = (spent: number, planned: number) => {
    const pct = (spent / planned) * 100;
    if (pct >= 90) return { color: "text-red-600", danger: true };
    if (pct >= 70) return { color: "text-yellow-600", danger: false };
    return { color: "text-green-600", danger: false };
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ---- tarjeta “nuevo presupuesto” ---- */}
        <div
          onClick={() => setCreateOpen(true)}
          className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center
                     hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900">Create New Budget</h3>
            <p className="text-sm text-gray-500">Set up a new spending category</p>
          </div>
        </div>

        {/* ---- tarjetas de presupuesto ---- */}
        {budgets.map((b) => {
          const spent = Number(b.spent ?? 0);               // <—  garantizamos número
          const remaining = Math.max(0, b.amountPlanned - spent);
          const pct = (spent / b.amountPlanned) * 100;
          const { color, danger } = getStatus(spent, b.amountPlanned);
          const { Icon, iconBg, iconColor } = categoryIcon[b.category];

          return (
            <div
              key={b.id}
              className="rounded-lg bg-white p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              {/* header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold capitalize text-gray-900">{b.category.replace('_', ' ')}</h3>
                    <p className="text-sm text-gray-500">{b.periodStart} → {b.periodEnd}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">
                    ${b.amountPlanned.toLocaleString()}
                  </p>
                  {danger && <AlertTriangle className="h-4 w-4 text-red-500 ml-auto mt-1" />}
                </div>
              </div>

              {/* progreso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>${spent.toLocaleString()} Spent</span>
                  <span className={color}>${remaining.toLocaleString()} Remaining</span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>

              {/* acciones */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditing(b)}
                >
                  <Target className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:text-red-700"
                  disabled={deleting}
                  onClick={() => deleteBudget(b.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* diálogos */}
      <CreateBudgetModal open={createOpen} onOpenChange={setCreateOpen} />
      <EditBudgetModal budget={editing} onClose={() => setEditing(null)} />
    </>
  );
}
