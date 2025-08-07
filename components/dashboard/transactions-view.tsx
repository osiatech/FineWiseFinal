"use client";
import { useState, useMemo } from "react";

import { Input } from "components/dashboard/ui/input";
import { Button } from "components/dashboard/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/dashboard/ui/select";
import { Checkbox } from "components/dashboard/ui/checkbox";
import { Badge } from "components/dashboard/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dashboard/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Trash2,
  Edit,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { AddTransactionModal } from "components/dashboard/add-transaction-modal";
import { EditTransactionModal } from "components/dashboard/edit-transaction-modal";

import {
  useTransactions,
  useTransactionSummary,
  useDeleteTransaction,
} from "@/lib/hooks/useTransactions";
import { Transaction, TransactionType } from "@/types/transactions";

export function TransactionsView() {
  /* -------- hooks API -------- */
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const { data: transactions = [], isLoading } = useTransactions(
    typeFilter === "all" ? undefined : (typeFilter as TransactionType),
  );
  const { data: summary } = useTransactionSummary();
  const { mutate: deleteTx } = useDeleteTransaction();

  /* -------- UI state -------- */
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  /* -------- filters -------- */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        (t.description ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAccount =
        accountFilter === "all" || t.account?.toLowerCase() === accountFilter;
      return matchesSearch && matchesAccount;
    });
  }, [transactions, searchQuery, accountFilter]);

  const handleSelectAll = (ck: boolean) =>
    setSelectedTransactions(ck ? filteredTransactions.map((t) => t.id) : []);

  const handleSelectTransaction = (id: number, ck: boolean) =>
    setSelectedTransactions((prev) => (ck ? [...prev, id] : prev.filter((x) => x !== id)));

  /* -------- summary -------- */
  const totals = useMemo(() => {
    if (summary)
      return {
        totalIncome: summary.totalIncome,
        totalExpenses: summary.totalExpenses,
        netAmount: summary.netBalance,
        count: transactions.length,
      };

    const totalIncome = filteredTransactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalExpenses = filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    return {
      totalIncome,
      totalExpenses,
      netAmount: totalIncome - totalExpenses,
      count: filteredTransactions.length,
    };
  }, [summary, filteredTransactions, transactions.length]);

  if (isLoading) return <div className="p-8 text-sm text-gray-500">Loading…</div>;

  /* ----------- UI ----------- */
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
       Mis Transacciones
      </h1>
      <p className="text-gray-600 mb-8">Rastrea y gestiona todas tus transacciones financieras</p>

      {/* KPI cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <SummaryCard icon={<DollarSign className="h-5 w-5 text-blue-600" />} color="blue" label="Total" value={totals.count} />
        <SummaryCard icon={<TrendingUp className="h-5 w-5 text-green-600" />} color="green" label="Ingresos" value={`$${totals.totalIncome.toLocaleString()}`} />
        <SummaryCard icon={<TrendingDown className="h-5 w-5 text-red-600" />} color="red" label="Gastos" value={`$${totals.totalExpenses.toLocaleString()}`} />
        <SummaryCard icon={<DollarSign className="h-5 w-5" />} color={totals.netAmount >= 0 ? "green" : "red"} label="Neto" value={`${totals.netAmount >= 0 ? "+" : "-"}$${Math.abs(totals.netAmount).toLocaleString()}`} />
      </div>

      {/* TABLE */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={
                      selectedTransactions.length === filteredTransactions.length &&
                      filteredTransactions.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <HeaderCell title="Fecha" />
                <HeaderCell title="Descripción" />
                <HeaderCell title="Categoría" />
                <HeaderCell title="Monto" />
                <HeaderCell title="Acciones" />
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedTransactions.includes(t.id)}
                      onCheckedChange={(ck) => handleSelectTransaction(t.id, ck as boolean)}
                    />
                  </td>

                  <td className="px-6 py-4 text-sm">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-medium">{t.description ?? t.category}</td>
                  <td className="px-6 py-4">
                    <Badge>{t.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    <span className={t.amount > 0 ? "text-green-600" : "text-red-600"}>
                      {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toLocaleString()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingTx(t);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (confirm("Delete this transaction?")) deleteTx(t.id);
                          }}
                        >
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
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <Button onClick={() => setIsAddOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Add Transaction
          </Button>
          <span className="text-sm text-gray-500">
            Mostrando {filteredTransactions.length} de {transactions.length} transacciones
          </span>
        </div>
      </div>

      {/* Modales */}
      <AddTransactionModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      <EditTransactionModal open={isEditOpen} onOpenChange={setIsEditOpen} tx={editingTx} />
    </div>
  );
}

/* -------- helpers -------- */
function HeaderCell({ title }: { title: string }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </th>
  );
}

function SummaryCard({
  icon,
  color,
  label,
  value,
}: {
  icon: React.ReactNode;
  color: "blue" | "green" | "red";
  label: string;
  value: React.ReactNode;
}) {
  const bg = { blue: "bg-blue-100", green: "bg-green-100", red: "bg-red-100" }[color];
  const txt = { blue: "text-blue-600", green: "text-green-600", red: "text-red-600" }[color];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-xl font-bold ${txt}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
