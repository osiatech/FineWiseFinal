'use client';

import { useDebts, useDeleteDebt } from '@/lib/hooks/useDebts';
import { Button } from '../dashboard/ui/button';
import {Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell, } from '../dashboard/ui/table';
import { useState } from 'react';
import DebtForm from './DebtForm';
import { toast } from 'sonner';

export default function DebtsList() {
  const { data, isLoading } = useDebts();
  const delMut = useDeleteDebt();
  const [editing, setEditing] = useState<any | null>(null); // store debt to edit

  const handleDelete = async (id: number) => {
    try {
      await delMut.mutateAsync(id);
      toast.success('Deuda eliminada');
    } catch (e: any) {
      toast.error('Error al eliminar');
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (!data?.length) return <p>No hay deudas registradas.</p>;

  return (
    <>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Tipo</TableHead>
      <TableHead>Monto</TableHead>
      <TableHead>Vence</TableHead>
      <TableHead>Interés</TableHead>
      <TableHead>Acciones</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {data.map(d => (
      <TableRow key={d.id}>
        <TableCell>{d.type}</TableCell>
        <TableCell>${Number(d.amount).toFixed(2)}</TableCell>
        <TableCell>{d.dueDate ? new Date(d.dueDate).toLocaleDateString() : '-'}</TableCell>
        <TableCell>{d.interestRate ?? '-'}</TableCell>
        <TableCell>
          {/* botones */}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      {/* Form modal for edit */}
      {editing && (
        <DebtForm
          open={!!editing}
          initial={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
