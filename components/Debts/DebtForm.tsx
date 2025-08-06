'use client';

import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../dashboard/ui/dialog';

import { Button } from '../dashboard/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../dashboard/ui/select';
import { DebtPayload } from '@/lib/debts';
import { useCreateDebt, useUpdateDebt } from '@/lib/hooks/useDebts';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Label } from '../dashboard/ui/label';
import { Input } from '../dashboard/ui/input';

const creditorTypes = [
  'personal',
  'business',
  'BANCO POPULAR',
  'BANCO BHD',
  'BANCO RESERVAS',
  'BANCO SCOTIABANK',
  'BANCO ADEMI',
  'BANCO QIK',
] as const;

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: DebtPayload & { id?: number };
}

export default function DebtForm({ open, onClose, initial }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DebtPayload>({
    defaultValues: initial ?? { type: 'personal', amount: 0 },
  });

  const createMut = useCreateDebt();
  const updMut = useUpdateDebt();

  // reset form when dialog opens/closes or initial changes
  useEffect(() => {
    reset(initial ?? { type: 'personal', amount: 0 });
  }, [initial, reset, open]);

  const onSubmit = async (data: DebtPayload) => {
    try {
      if (initial?.id) {
        await updMut.mutateAsync({ id: initial.id, data });
        toast.success('Deuda actualizada');
      } else {
        await createMut.mutateAsync(data);
        toast.success('Deuda creada');
      }
      onClose();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? 'Error');
    }
  };

  return (
  <Dialog open={open} onOpenChange={val => !val && onClose()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{initial ? 'Editar deuda' : 'Nueva deuda'}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Tipo de acreedor */}
        <div className="grid gap-2">
          <Label htmlFor="type" className="text-sm font-medium">
            Tipo de acreedor
          </Label>
          <Select
            defaultValue={initial?.type ?? 'personal'}
            onValueChange={val =>
              register('type').onChange({ target: { value: val } })
            }
          >
            <SelectTrigger>
              <span>{initial?.type ?? 'personal'}</span>
            </SelectTrigger>
            <SelectContent>
              {creditorTypes.map(t => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monto */}
        <div className="grid gap-2">
          <Label htmlFor="amount">Monto</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min={0}
            {...register('amount', {
              valueAsNumber: true,
              required: true,
              min: 0,
            })}
          />
        </div>

        {/* Fecha de vencimiento */}
        <div className="grid gap-2">
          <Label htmlFor="dueDate">Fecha de vencimiento</Label>
          <Input id="dueDate" type="date" {...register('dueDate')} />
        </div>

        {/* Tasa de interés */}
        <div className="grid gap-2">
          <Label htmlFor="interestRate">Tasa de interés (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            {...register('interestRate', { valueAsNumber: true })}
          />
        </div>

        {/* Descripción */}
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Input id="description" {...register('description')} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {initial ? 'Guardar cambios' : 'Crear'}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);
}
