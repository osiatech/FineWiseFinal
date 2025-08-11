'use client';

import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from 'components/dashboard/ui/dialog';
import { Input } from 'components/dashboard/ui/input';
import { Textarea } from 'components/dashboard/ui/textarea';
import { Button } from 'components/dashboard/ui/button';
import { Label } from 'components/dashboard/ui/label';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from 'components/dashboard/ui/select';
import { CreateGoalDto, GoalStatus } from '@/types/goal';
import { useState } from 'react';

type Props = {
  onCreate: (dto: CreateGoalDto) => void;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};

export function AddGoalModal({ onCreate, children, open, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = typeof open === 'boolean';
  const isOpen = controlled ? open : internalOpen;
  const setOpen = controlled ? onOpenChange! : setInternalOpen;

  const { register, handleSubmit, reset, setValue, watch } = useForm<CreateGoalDto>({
    defaultValues: {
      title: '',
      description: '',
      targetAmount: 0,
      currentAmount: 0,
      startDate: '',
      dueDate: '',
      status: GoalStatus.ACTIVE,
    },
  });

  const submit = (raw: CreateGoalDto) => {
    const dto: CreateGoalDto = {
      ...raw,
      targetAmount: Number(raw.targetAmount),
      currentAmount: Number(raw.currentAmount || 0),
    };
    onCreate(dto);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva meta</DialogTitle>
          <DialogDescription>Define un objetivo y un monto meta.</DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit(submit)}>
          <div>
            <Label>Título</Label>
            <Input {...register('title', { required: true })} placeholder="Ej. Fondo de emergencia" />
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
              <Label>Fecha de inicio</Label>
              <Input type="date" {...register('startDate', { required: true })} />
            </div>
            <div>
              <Label>Fecha límite</Label>
              <Input type="date" {...register('dueDate', { required: true })} />
            </div>
          </div>

          <div>
            <Label>Estado</Label>
            <Select
              value={watch('status') ?? GoalStatus.ACTIVE}
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

          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
