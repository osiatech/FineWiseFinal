"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import { Input } from "components/dashboard/ui/input";
import { Label } from "components/dashboard/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/dashboard/ui/select";
import { Textarea } from "components/dashboard/ui/textarea";

import { Transaction, TransactionType } from "@/types/transactions";
import { useUpdateTransaction } from "@/lib/hooks/useTransactions";

/* --- campos que realmente va a editar el usuario --- */
type EditForm = {
  amount: number;
  type: TransactionType;
  category?: string;
  description?: string; // nombre amigable, luego lo mapeamos a description2
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tx: Transaction | null;
}

export function EditTransactionModal({ open, onOpenChange, tx }: Props) {
  const [form, setForm] = useState<EditForm>({
    amount: 0,
    type: TransactionType.EXPENSE,
    category: "",
    description: "",
  });

  const { mutate: updateTx, isPending } = useUpdateTransaction();

  /* precarga */
  useEffect(() => {
    if (tx) {
      setForm({
        amount: tx.amount,
        type: tx.type,
        category: tx.category,
        description: (tx as any).description ?? "",
      });
    }
  }, [tx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tx) return;

    /* mapea los nombres al DTO del backend */
    const dto = {
      amount: form.amount,
      type: form.type,
      category: form.category,
      description: form.description, // 👈 nombre correcto para Nest
    };

    updateTx(
      { id: tx.id, dto },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Transaction</DialogTitle>
        </DialogHeader>

        {tx && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  setForm({ ...form, type: v as TransactionType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                  <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                  <SelectItem value={TransactionType.DEBT}>Debt</SelectItem>
                  <SelectItem value={TransactionType.SAVING}>Saving</SelectItem>
                  <SelectItem value={TransactionType.PAYMENT}>Payment</SelectItem>
                  <SelectItem value={TransactionType.INVESTMENT}>Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category (opcional) */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={form.category ?? ""}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="min-h-[80px]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
