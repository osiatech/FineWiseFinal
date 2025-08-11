'use client';

import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'components/dashboard/ui/dialog';
import { Input } from 'components/dashboard/ui/input';
import { Textarea } from 'components/dashboard/ui/textarea';
import { Button } from 'components/dashboard/ui/button';
import { Label } from 'components/dashboard/ui/label';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from 'components/dashboard/ui/select';
import { Goal, UpdateGoalDto, GoalStatus } from '@/types/goal';
import { useEffect } from 'react';

type Props = {
  goal: Goal | null;
  onUpdate: (args: { id: number; dto: UpdateGoalDto }) => void;
  onClose: () => void;
};

export function EditGoalModal({ goal, onUpdate, onClose }: Props) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<UpdateGoalDto>({});

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title,
        description: goal.description,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        startDate: goal.startDate,
        dueDate: goal.dueDate,
        status: goal.status,
      });
    }
  }, [goal, reset]);

  if (!goal) return null;

  const submit = (raw: UpdateGoalDto) => {
    const dto: UpdateGoalDto = {
      ...raw,
      targetAmount: raw.targetAmount != null ? Number(raw.targetAmount) : undefined,
      currentAmount: raw.currentAmount != null ? Number(raw.currentAmount) : undefined,
    };
    onUpdate({ id: goal.id, dto });
    onClose();
  };

  return (
    <Dialog open={!!goal} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar meta</DialogTitle>
          <DialogDescription>Actualiza los datos de tu objetivo.</DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit(submit)}>
          <div>
            <Label>Título</Label>
            <Input {...register('title')} />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea rows={3} {...register('description')} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Monto objetivo</Label>
              <Input type="number" step="0.01" {...register('targetAmount', { valueAsNumber: true })} />
            </div>
            <div>
              <Label>Monto actual</Label>
              <Input type="number" step="0.01" {...register('currentAmount', { valueAsNumber: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Inicio</Label>
              <Input type="date" {...register('startDate')} />
            </div>
            <div>
              <Label>Vence</Label>
              <Input type="date" {...register('dueDate')} />
            </div>
          </div>

          <div>
            <Label>Estado</Label>
            <Select
              value={watch('status') ?? goal.status}
              onValueChange={(v) => setValue('status', v as GoalStatus)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={GoalStatus.ACTIVE}>Activa</SelectItem>
                <SelectItem value={GoalStatus.INACTIVE}>Inactiva</SelectItem>
                <SelectItem value={GoalStatus.COMPLETED}>Completada</SelectItem>
                <SelectItem value={GoalStatus.FAILED}>Fallida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Guardar cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
