// src/lib/api/debts.ts
import { api } from '@/lib/api';
import { Debt, CreateDebtDto, UpdateDebtDto } from '@/types/debt';

export const debtsApi = {
  getAll:   ()            => api.get<Debt[]>('/debts').then(r => r.data),
  getOne:   (id: number)  => api.get<Debt>(`/debts/one-debt/${id}`).then(r => r.data),
  create:   (p: CreateDebtDto)                 => api.post<Debt>('/debts', p).then(r => r.data),
  update:   (id: number, p: UpdateDebtDto)     => api.patch<Debt>(`/debts/update-debt/${id}`, p).then(r => r.data),
  remove:   (id: number)                       => api.delete(`/debts/delete-debt/${id}`),
  advice:   ()            => api.get<{ debts: Debt[]; totalDebt: number; advice: string }>('/debts/debt-advice').then(r => r.data),
};
