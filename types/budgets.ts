export enum CategoryBudgetType {
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
  id: number;
  category: CategoryBudgetType;
  amountPlanned: number;
  periodStart: string;   // YYYY-MM-DD
  periodEnd: string;
  spent: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateBudgetDto = Pick<
  Budget,
  'category' | 'amountPlanned' | 'periodStart' | 'periodEnd'
>;

export type UpdateBudgetDto = Partial<CreateBudgetDto>;