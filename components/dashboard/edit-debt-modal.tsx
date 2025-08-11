// components/dashboard/edit-debt-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Debt, UpdateDebtDto } from "@/types/debt";
import { CreditorType } from "@/types/debt";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import { Input } from "components/dashboard/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "components/dashboard/ui/select";

type Props = {
  debt: Debt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (dto: UpdateDebtDto) => void;
};

export default function EditDebtModal({ debt, open, onOpenChange, onSave }: Props) {
  const { register, handleSubmit, control, reset } = useForm<UpdateDebtDto>({
    values: debt
      ? {
          description: debt.description,
          amount: Number(debt.amount),
          type: debt.type,
          // si viene ISO: '2025-08-09T00:00:00Z' => '2025-08-09'
          dueDate: (debt.dueDate ? new Date(debt.dueDate) : null)
            ?.toISOString()
            .slice(0, 10) as any,
          interestRate: debt.interestRate ?? undefined,
        }
      : undefined,
  });

  // Si cambia la deuda a editar, refresca el form
  useEffect(() => {
    if (!debt) return;
    reset({
      description: debt.description,
      amount: Number(debt.amount),
      type: debt.type,
      dueDate: (debt.dueDate ? new Date(debt.dueDate) : null)
        ?.toISOString()
        .slice(0, 10) as any,
      interestRate: debt.interestRate ?? undefined,
    });
  }, [debt, reset]);

  const submit = handleSubmit((raw) => {
    const dto: UpdateDebtDto = {
      description: raw.description,
      amount: Number(raw.amount),
      type: raw.type,
      dueDate: raw.dueDate, // envía como yyyy-MM-dd si tu back lo acepta
      interestRate: raw.interestRate ? Number(raw.interestRate) : undefined,
    };
    onSave(dto);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar deuda</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <Input placeholder="Descripción" {...register("description", { required: true })} />

          <Input
            type="number"
            step="0.01"
            placeholder="Monto"
            {...register("amount", { required: true, min: 0.01 })}
          />

          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo / Acreedor" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CreditorType).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Input type="date" placeholder="Fecha de vencimiento" {...register("dueDate")} />

          <Input
            type="number"
            step="0.01"
            placeholder="Tasa de interés (%)"
            {...register("interestRate")}
          />

          <Button type="submit" className="w-full">
            Guardar cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
