// app/dashboard/debts/page.tsx
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Button } from '../dashboard/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../dashboard/ui/card';
import { useDebtAdvice } from '@/lib/hooks/useDebts';

const DebtsList = dynamic(() => import('../Debts/DebtsList'), {
  ssr: false,
});
const DebtForm = dynamic(() => import('../Debts/DebtForm'), {
  ssr: false,
});

export default function DebtsPage() {
  const [open, setOpen] = useState(false);
  const { data: advice } = useDebtAdvice();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Deudas</h1>
        <Button onClick={() => setOpen(true)}>Nueva deuda</Button>
      </div>

      {/* Advice card */}
      {advice && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>Total adeudado: <b>${Number(advice.totalDebt).toFixed(2)}</b></p>
            <p>{advice.advice}</p>
          </CardContent>
        </Card>
      )}

      <Suspense fallback={<p>Loading...</p>}>
        <DebtsList />
      </Suspense>

      {/* Create form modal */}
      <DebtForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
