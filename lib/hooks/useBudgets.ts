// lib/hooks/useBudgets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  {api } from '../api';                  // ← tu instancia
import type {
  Budget,
  CreateBudgetDto,
  UpdateBudgetDto,
} from '@/types/budgets';                               // crea este type a partir del DTO

/* ---------- GET /My-budgets ---------- */
export const useBudgets = () =>
  useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const { data } = await api.get<Budget[]>('/FineWise/budgets/My-budgets');
      return data;
    },
  });

/* ---------- GET /summary ---------- */
// export const useBudgetSummary = () =>
//   useQuery({
//     queryKey: ['budgets', 'summary'],
//     queryFn: async () => {
//       const { data } = await api.get<{
//         totalBudget: number;
//         totalSpent: number;
//         totalRemaining: number;
//         percentageUsed: number;
//       }>('/FineWise/budgets/summary');                  // crea este endpoint o calcula en front
//       return data;
//     },
//   });

export function useBudgetSummary() {
  return useQuery({
    queryKey: ['budgetSummary'],
    queryFn: async () => {
      const { data } = await api.get<
        { totalBudget: number; totalSpent: number; totalRemaining: number; percentageUsed: number }
      >('/FineWise/budgets/summary');
      return data;
    },
  });
}

/* ---------- POST /create-budget ---------- */
export const useCreateBudget = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBudgetDto) =>
      api.post('/FineWise/budgets/create-budget', dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['budgets'] });
      qc.invalidateQueries({ queryKey: ['budgets', 'summary'] });
    },
  });
};

/* ---------- PATCH /update-budget/:id ---------- */
export const useUpdateBudget = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateBudgetDto }) =>
      api.patch(`/FineWise/budgets/update-budget/${id}`, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['budgets'] });
      qc.invalidateQueries({ queryKey: ['budgets', 'summary'] });
    },
  });
};

/* ---------- DELETE /delete-budget/:id ---------- */
export const useDeleteBudget = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/FineWise/budgets/delete-budget/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['budgets'] });
      qc.invalidateQueries({ queryKey: ['budgets', 'summary'] });
    },
  });
};
