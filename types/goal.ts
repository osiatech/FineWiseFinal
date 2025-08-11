export enum GoalStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type Goal = {
  id: number;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
  status: GoalStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateGoalDto = {
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount?: number;
  startDate: string;
  dueDate: string;
  status?: GoalStatus;
};

export type UpdateGoalDto = Partial<CreateGoalDto>;

export type GoalsFilter = {
  status?: GoalStatus;
  dueBefore?: string; // YYYY-MM-DD
  page?: number;
  limit?: number;
};

export type GoalsListResponse = {
  data: Goal[];
  meta: { total: number; page: number; limit: number; pages: number };
};

export type GoalSummary = Goal & {
  progress: number;       // 0-100
  remainingDays: number;  // puede ser negativo si vencido
};
