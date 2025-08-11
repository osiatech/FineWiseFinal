import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { CreateDebtDto, Debt, UpdateDebtDto } from "@/types/debt";

/* LIST */
export const useDebts = () =>
  useQuery({
    queryKey: ["debts"],
    queryFn: async () => {
      const { data } = await api.get<Debt[]>("/FineWise/debts/My-debts");
      return data;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

/* CREATE */
export const useCreateDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDebtDto) =>
      api.post("/FineWise/debts/create-debt", dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["debts"] });
      qc.invalidateQueries({ queryKey: ["debts", "advice"] });
      qc.invalidateQueries({ queryKey: ["debts", "summary"] });
    },
  });
};

/* UPDATE */
export const useUpdateDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateDebtDto }) =>
      api.patch(`/FineWise/debts/update-debt/${id}`, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["debts"] });
      qc.invalidateQueries({ queryKey: ["debts", "advice"] });
      qc.invalidateQueries({ queryKey: ["debts", "summary"] });
    },
  });
};

/* DELETE */
export const useDeleteDebt = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/FineWise/debts/delete-debt/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["debts"] });
      qc.invalidateQueries({ queryKey: ["debts", "advice"] });
      qc.invalidateQueries({ queryKey: ["debts", "summary"] });
    },
  });
};

/* SUMMARY (si existe en tu back) */
export function useDebtSummary() {
  return useQuery({
    queryKey: ['debts', 'summary'],
    queryFn: async () => {
      const { data } = await api.get<{
        totalDebt: number;
        averageInterestRate: number;
        numbersOfDebts: number;
      }>('/FineWise/debts/summary');
      return data;
    },
  });
}

/* ADVICE */
export const useDebtAdvice = () =>
  useQuery({
    queryKey: ["debts", "advice"],
    queryFn: async () => {
      const { data } = await api.get("/FineWise/debts/debt-advice");
      return data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

