interface Debt {
  type: 'PERSONAL' | 'BUSINESS' | 'BANCO_POPULAR' ; /* otros */
  amount: number;
  dueDate?: string; // ISO format
  interestRate?: number;
  description?: string;
}