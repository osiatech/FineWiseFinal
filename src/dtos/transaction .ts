interface Transaction {
  amount: number;
  category: string;
  description?: string;
  type: 'income' | 'expense' | 'saving' | 'debt' | 'payment' | 'investment';
  date?: string; // ISO format: "2024-01-15T10:30:00Z"
}