import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type {
  CreateGoalDto, UpdateGoalDto, GoalsFilter, GoalsListResponse, Goal, GoalSummary
} from '@/types/goal';

const base = '/FineWise/goals';

export function useGoals(filter: GoalsFilter = {}) {
  return useQuery({
    queryKey: ['goals', filter],
    queryFn: async () => {
      const { data } = await api.get<GoalsListResponse>(base, { params: filter });
      return data;
    },
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateGoalDto) => api.post(base, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useUpdateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateGoalDto }) =>
      api.patch(`${base}/${id}`, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useDeleteGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`${base}/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useGoalSummary(id?: number) {
  return useQuery({
    enabled: !!id,
    queryKey: ['goals', 'summary', id],
    queryFn: async () => {
      const { data } = await api.get<GoalSummary>(`${base}/${id}/summary`);
      return data;
    },
  });
}
