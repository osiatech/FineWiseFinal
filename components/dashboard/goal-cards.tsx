'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Target } from 'lucide-react';
import { Button } from 'components/dashboard/ui/button';
import { Badge } from 'components/dashboard/ui/badge';

import { AddGoalModal } from './add-goal-modal';
import { EditGoalModal } from './edit-goal-modal';
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from '@/lib/hooks/useGoals';
import type { Goal } from '@/types/goal';

function GoalCard({
  goal,
  onEdit,
  onDelete,
  deleting,
}: {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  const pct = Math.min(
    100,
    Math.max(0, (Number(goal.currentAmount) / Math.max(1, Number(goal.targetAmount))) * 100),
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Target className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-xs text-gray-500">
              {new Date(goal.startDate).toLocaleDateString()} → {new Date(goal.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge>{goal.status}</Badge>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        ${Number(goal.currentAmount).toLocaleString()} / ${Number(goal.targetAmount).toLocaleString()}
      </div>
      <div className="h-2 bg-gray-100 rounded">
        <div className="h-full bg-blue-600 rounded" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex gap-2 mt-4">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={onDelete} disabled={deleting}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function GoalCards() {
  const { data, isLoading } = useGoals();
  const goals = data?.data ?? [];

  const { mutate: createGoal } = useCreateGoal();
  const { mutate: updateGoal } = useUpdateGoal();
  const { mutate: deleteGoal, isPending: deleting } = useDeleteGoal();

  const [editing, setEditing] = useState<Goal | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta “Nueva meta” como trigger */}
        <AddGoalModal onCreate={(dto) => createGoal(dto)}>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center
                          hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900">Crear meta</h3>
              <p className="text-sm text-gray-500">Agrega un nuevo objetivo financiero</p>
            </div>
          </div>
        </AddGoalModal>

        {/* Lista */}
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={`s-${i}`} className="h-40 rounded-lg border bg-gray-50 animate-pulse" />
            ))
          : goals.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                onEdit={() => setEditing(g)}
                onDelete={() => deleteGoal(g.id)}
                deleting={deleting}
              />
            ))}
      </div>

      <EditGoalModal
        goal={editing}
        onUpdate={(args) => updateGoal(args)}
        onClose={() => setEditing(null)}
      />
    </>
  );
}
