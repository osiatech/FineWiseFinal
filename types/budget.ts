export enum CategoryBudget {
    HOUSING = 'housing',
    UTILITIES = 'utilities',
    FOOD = 'food',
    TRANSPORTATION = 'transportation',
    HEALTHCARE = 'healthcare',
    INSURANCE = 'insurance',
    ENTERTAINMENT = 'entertainment',
    CLOTHING = 'clothing',
    PERSONAL_CARE = 'personal_care',
    EDUCATION = 'education',
    SAVINGS = 'savings',
    DEBT_REPAYMENT = 'debt_repayment',
}

export interface Budget {
  category: CategoryBudget

  amountPlanned: number

  periodStart: string;

  periodEnd: string;
  spent: number;
}