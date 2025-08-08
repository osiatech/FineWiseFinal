"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import { Input } from "components/dashboard/ui/input";
import { Label } from "components/dashboard/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from
  "components/dashboard/ui/select";
import { useEffect, useState } from "react";
import { useUpdateBudget, useDeleteBudget } from "@/lib/hooks/useBudgets";
import { Budget, CategoryBudgetType } from "@/types/budgets";

const categoryOptions: { value: CategoryBudgetType; label: string }[] = [
  { value: CategoryBudgetType.HOUSING,        label: "Housing" },
  { value: CategoryBudgetType.UTILITIES,      label: "Utilities" },
  { value: CategoryBudgetType.FOOD,           label: "Food & Dining" },
  { value: CategoryBudgetType.TRANSPORTATION, label: "Transportation" },
  { value: CategoryBudgetType.HEALTHCARE,     label: "Healthcare" },
  { value: CategoryBudgetType.ENTERTAINMENT,  label: "Entertainment" },
  { value: CategoryBudgetType.EDUCATION,      label: "Education" },
  { value: CategoryBudgetType.SAVINGS,        label: "Savings" },
  { value: CategoryBudgetType.DEBT_REPAYMENT, label: "Debt Repayment" },
];

export function EditBudgetModal({
  budget,
  onClose,
}: {
  budget: Budget | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Budget>>({});
  const { mutate: updateBudget, isPending } = useUpdateBudget();
  const { mutate: deleteBudget } = useDeleteBudget();

  useEffect(() => {
    if (budget) setForm(budget);
  }, [budget]);

  if (!budget) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBudget(
      {
        id: budget.id,
        dto: {
          category: form.category as CategoryBudgetType,
          amountPlanned: Number(form.amountPlanned),
          periodStart: form.periodStart,
          periodEnd: form.periodEnd,
        },
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm({ ...form, category: v as CategoryBudgetType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={form.amountPlanned ?? ""}
              onChange={(e) =>
                    setForm({ ...form, amountPlanned: Number(e.target.value) })
                }
                required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start</Label>
              <Input
                type="date"
                value={form.periodStart}
                onChange={(e) => setForm({ ...form, periodStart: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End</Label>
              <Input
                type="date"
                value={form.periodEnd}
                onChange={(e) => setForm({ ...form, periodEnd: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="destructive"
              onClick={() =>
                deleteBudget(budget.id, { onSuccess: onClose })
              }
            >
              Delete
            </Button>
            <div>
              <Button variant="outline" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
