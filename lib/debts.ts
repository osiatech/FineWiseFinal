import {api} from './api';

export interface DebtPayload {
  type: string;             // CreditorType
  amount: number;
  dueDate?: string;
  interestRate?: number;
  description?: string;
}

export interface Debt extends DebtPayload { id: number; createdAt: string; }

export const getDebts       = () => api.get('/debts').then(r => r.data);
export const getDebtById    = (id: number) => api.get(`/debts/one-debt/${id}`).then(r => r.data);
export const createDebt     = (d: DebtPayload) => api.post('/debts', d).then(r => r.data);
export const updateDebt     = (id: number, d: Partial<DebtPayload>) =>
  api.patch(`/debts/update-debt/${id}`, d).then(r => r.data);
export const deleteDebt     = (id: number) => api.delete(`/debts/delete-debt/${id}`).then(r => r.data);
export const getDebtAdvice  = () => api.get('/debts/debt-advice').then(r => r.data);