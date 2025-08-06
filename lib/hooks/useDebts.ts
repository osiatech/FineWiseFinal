import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDebts,
  createDebt,
  updateDebt,
  deleteDebt,
  getDebtAdvice,
  DebtPayload,
} from '../debts';

export const useDebts = () =>
  useQuery({ queryKey: ['debts'],        queryFn: getDebts });

export const useDebtAdvice = () =>
  useQuery({ queryKey: ['debt-advice'],  queryFn: getDebtAdvice });

/* helper para invalidar */
const invalidate = (qc: ReturnType<typeof useQueryClient>) =>
  qc.invalidateQueries({ queryKey: ['debts'] });

/* ---------- MUTATIONS ---------- */
export const useCreateDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: DebtPayload) => createDebt(data),
    onSuccess: () => invalidate(qc),
  });
};

export const useUpdateDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DebtPayload> }) =>
      updateDebt(id, data),
    onSuccess: () => invalidate(qc),
  });
};

export const useDeleteDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDebt(id),
    onSuccess: () => invalidate(qc),
  });
};