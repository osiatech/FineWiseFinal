// lib/hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { Transaction, CreateTransactionDto, SummaryDTO, TransactionType } from '@/types/transactions';

// GET /transactions/My-transactions
export const useTransactions = (type?: TransactionType) =>
  useQuery({
    queryKey: ['transactions', type],
    queryFn: async () => {
      const { data } = await api.get<Transaction[]>('FineWise/transactions/My-transactions', {
        params: type ? { type } : undefined,
      });
      return data;
    },
  });

// POST /transactions/create-transaction
export const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTransactionDto) =>
      api.post('FineWise/transactions/create-transaction', dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions'] });
      qc.invalidateQueries({ queryKey: ['transactions', 'summary'] });
    },
  });
};

// GET /transactions/summary
export const useTransactionSummary = () =>
  useQuery({
    queryKey: ['transactions', 'summary'],
    queryFn: async () => {
      const { data } = await api.get<SummaryDTO>('FineWise/transactions/summary');
      return data;
    },
  });
