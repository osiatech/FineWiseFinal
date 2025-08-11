// src/types/debt.ts
export enum CreditorType {
  PERSONAL        = 'personal',
  BUSINESS        = 'business',
  BANCO_POPULAR   = 'BANCO POPULAR',
  BANCO_BHD       = 'BANCO BHD',
  BANCO_RESERVAS  = 'BANCO RESERVAS',
  BANCO_SCO       = 'BANCO SCOTIABANK',
  BANCO_ADEMI     = 'BANCO ADEMI',
  BANCO_QIK       = 'BANCO QIK',
}

export interface Debt {
  id:          number;
  amount:      number;      // viene como string-decimal → Number(d.amount)
  type:        CreditorType;
  description: string;
  createdAt:   string;
  dueDate?:    string;
  interestRate?: number;
}

export type CreateDebtDto  = Omit<Debt, 'id' | 'createdAt'>;
export type UpdateDebtDto  = Partial<CreateDebtDto>;
