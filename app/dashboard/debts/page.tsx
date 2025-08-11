// app/(dashboard)/debts/page.tsx
// 'use client';

// import { useDebts }     from '@/lib/hooks/useDebts';
// import { DebtCard }     from '../../../components/dashboard/debt-cards';
// import { AddDebtModal } from '@/components/dashboard/add-debt-modal';
// import { Metric }       from '@/components/dashboard/metric';
// import { Button }       from '@/components/dashboard/ui/button';
// import Dashboard from '../page';
// import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
// import { DashboardHeader } from '@/components/dashboard/dashboard-header';
// import { DebtOverview } from '@/components/dashboard/debt-overview';
// import { DebtInsights } from '@/components/dashboard/debt-insights';

// export default function DebtsPage() {
//   const { debts, createDebt, deleteDebt } = useDebts();

//   const total    = debts.reduce((s, d) => s + Number(d.amount), 0);
//   const interest = debts.reduce((s, d) => s + (d.interestRate ?? 0), 0);

//   return (
//     <section className="space-y-8">
//       <header>
//         <h1 className="text-3xl font-bold">Mis deudas</h1>
//         <p className="text-muted-foreground">
//           Administra y realiza seguimiento de tus deudas.
//         </p>

//         <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Metric title="Total Adeudado"    value={`$${total}`}   />
//           <Metric title="Intereses Totales" value={`${interest}%`} />
//           <Metric title="Número de deudas"  value={debts.length}  />
//         </div>
//       </header>

//       <AddDebtModal onCreate={dto => createDebt.mutate(dto)}>
//         <Button>+ Crear nueva deuda</Button>
//       </AddDebtModal>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {debts.map(d => (
//           <DebtCard
//             key={d.id}
//             debt={d}
//             onEdit={() => {/* abrir modal de edición */}}
//             onDelete={() => deleteDebt.mutate(d.id)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function DebtsPage(){
//     return (
//         <DashboardLayout>
//             <div className='flex-1 flex flex-col'>
//                 <DashboardHeader />
//                 <div className='flex-1 p-6 space-y-6 overflow-y-auto'>
//                     <div className="mb-8">
//                         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         Mis Deudas
//                         </h1>
//                         <p className="text-gray-600 mt-2">Realice un seguimiento y gestione sus deudas en diferentes categorías</p>
//                     </div>

//                     <DebtCard />
//                     <DebtOverview />
//                     <DebtInsights />

//                 </div>
//             </div>
//         </DashboardLayout>
//     )
// }

import { DebtOverview }  from 'components/dashboard/debt-overview';
import { DebtCards }     from 'components/dashboard/debt-cards';
import { DebtInsights }  from 'components/dashboard/debt-insights';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { DashboardHeader } from 'components/dashboard/dashboard-header';

export default function DebtsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mis deudas
            </h1>
            <p className="text-gray-600 mt-2">
              Realice un seguimiento y gestione sus deudas en diferentes categorías
            </p>
          </div>

          <DebtOverview />
          <DebtCards />
          <DebtInsights />
        </div>
      </div>
    </DashboardLayout>
  );
}
