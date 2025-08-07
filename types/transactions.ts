// types/transactions.ts
export enum TransactionType {
  INCOME  = 'income',
  EXPENSE = 'expense',
  SAVING  = 'saving',
  DEBT    = 'debt',
  PAYMENT = 'payment',
  INVESTMENT = 'investment',
}

export interface Transaction {
  id: number;
  amount: number;
  category: string;
  description?: string;
  type: TransactionType;
  createdAt: string;        // ISO string
  account?: string;
}

export interface CreateTransactionDto {
  amount: number;
  category: string;
  description?: string;
  type: TransactionType;
  date?: string;            // opcional en tu DTO
}

export interface SummaryDTO {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  totalDebt: number;
  totalDebtPayments: number;
  netBalance: number;
}
