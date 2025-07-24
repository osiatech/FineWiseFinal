interface Budget {
  category: 'HOUSING' | 'UTILITIES' | 'FOOD' | 'TRANSPORTATION';  /* otros */
  amountPlanned: number;
  periodStart: string; // ISO format
  periodEnd: string; // ISO format
}