// components/dashboard/AddTransactionModal.tsx
"use client";
import type React from "react";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import { Input } from "components/dashboard/ui/input";
import { Label } from "components/dashboard/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select";
import { Textarea } from "components/dashboard/ui/textarea";
import { Switch } from "components/dashboard/ui/switch";
import { Calendar, Camera } from "lucide-react";

import { TransactionType } from "@/types/transactions";
import { useCreateTransaction } from "@/lib/hooks/useTransactions";

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** formData tipado correctamente */
interface FormData {
  type: TransactionType;
  amount: string;
  account: "personal" | "work";
  category: string;
  date: string;
  description: string;
  isRecurring: boolean;
}

export function AddTransactionModal({ open, onOpenChange }: AddTransactionModalProps) {
  const initialState: FormData = {
    type: TransactionType.EXPENSE,
    amount: "0.00",
    account: "personal",
    category: "",
    date: "December 15th, 2024",
    description: "",
    isRecurring: false,
  };

  const [formData, setFormData] = useState<FormData>(initialState);

  /** v5 → isPending  (ya no existe isLoading) */
  const { mutate: createTx, isPending } = useCreateTransaction();

  const resetForm = () => setFormData(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTx(
      {
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description,
        type: formData.type,
        date: new Date(formData.date).toISOString(),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
        },
      },
    );
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scan Receipt Button */}
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            <Camera className="mr-2 h-4 w-4" />
            Scan Receipt with AI
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                Type
              </Label>
              <Select
                value={formData.type}
                /* value llega como string → casteamos al enum */
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as TransactionType })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                  <SelectItem value={TransactionType.SAVING}>Saving</SelectItem>
                  {/* agrega más según tu enum */}
                </SelectContent>
              </Select>
            </div>

            {/* Amount + Account */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account" className="text-sm font-medium text-gray-700">
                  Account
                </Label>
                <Select
                  value={formData.account}
                  onValueChange={(value) =>
                    setFormData({ ...formData, account: value as FormData["account"] })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">personal ($152 124.40)</SelectItem>
                    <SelectItem value="work">work ($5 941.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rental">Rental</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  {/* … */}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full min-h-[80px]"
              />
            </div>

            {/* Recurring */}
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Recurring Transaction</h4>
                  <p className="text-sm text-gray-500">
                    Set up a recurring schedule for this transaction
                  </p>
                </div>
                <Switch
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
                  className="data-[state=checked]:bg-gray-900"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isPending ? "Saving…" : "Create Transaction"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
