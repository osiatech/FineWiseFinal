"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/dashboard/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useLanguage } from "lib/contexts/language-context";
import { useTransactions } from "@/lib/hooks/useTransactions";

export function RecentTransactions() {
  const { t } = useLanguage();
  const { data: all = [], isLoading } = useTransactions();

  // 👉 Ordena y limita
  const transactions = [...all]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {t("dashboard.recentTransactions")}
        </h3>

        {/* selector de cuenta – aún dummy */}
        <Select defaultValue="all">
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

      {isLoading ? (
        <p className="text-sm text-gray-500">{t("common.loading")}…</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${t.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                  {t.type === "income" ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {t.description ?? t.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}$
                {Math.abs(t.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
