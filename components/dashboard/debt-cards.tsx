// // src/components/dashboard/debt-card.tsx
// import { useDebts, useDeleteDebt } from '@/lib/hooks/useDebts';
// import { Debt } from '@/types/debt';
// import { Badge } from 'components/dashboard/ui/badge';
// import { Button } from 'components/dashboard/ui/button';
// import { Ban, CreditCard, User, Trash2, Edit, Plus } from 'lucide-react';
// import { useState } from 'react';

// const iconByType: Record<string, JSX.Element> = {
//   personal:     <User  className="text-blue-500" />,
//   business:     <CreditCard className="text-emerald-500" />,
//   'BANCO POPULAR': <Ban className="text-orange-500" />,
//   // ...etc
// };

// export function DebtCard(){
//   const {data: debts = [], isLoading} = useDebts();
//   const { mutate: deleteDebt, isPending: deleting } = useDeleteDebt();

//   const [createOpen, setCreateOpen] = useState(false);
//   const [editing, setEditing] = useState<Debt | null>(null);
//   if (isLoading) return <p className="p-6">Cargando deudas...</p>;
//   if (!debts.length) return <p className="p-6">No hay deudas registradas.</p>;
  
//   const getStatus = (amount: number, interestRate: number) => {
//     const pct = (interestRate / amount) * 100;
//     if (pct >= 20) return { color: 'text-red-600', danger: true };
//     if (pct >= 10) return { color: 'text-yellow-600', danger: false };
//     return { color: 'text-green-600', danger: false };
//   };

//   return(
//     <>
//       <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
//           {/* ---- tarjeta “nuevo presupuesto” ---- */}
//           <div onClick={() => setCreateOpen(true)}
//             className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center
//                      hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
//             >
//               <div className="flex flex-col items-center space-y-4">
//             <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
//               <Plus className="h-8 w-8 text-gray-400" />
//             </div>
//             <h3 className="font-semibold text-gray-900">Registro de Deuda</h3>
//             <p className="text-sm text-gray-500">Crea un nuevo registro de deuda</p>
//           </div>
//         </div>
//         {/* ---- tarjetas de deudas existentes ---- */}
//         {debts.map((d) => {
//           const status = Number(d.interestRate ?? 0);
//           const amount = Number(d.amount ?? 0);
//           const { color, danger } = getStatus(amount, status);
//           const Icon = iconByType[d.type] || <CreditCard className="text-gray-500" />;
//           return (
//             <div
//               key={d.id}
//               className="rounded-lg bg-white p-6 shadow-sm border hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className='flex items-center space-x-3'>
//                   {/* <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
//                     <Icon className={`h-6 w-6 ${iconColor}`} />
//                   </div> */}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-1">{d.description}</h3>
//                   <p className="text-sm text-gray-500">{d.type}</p>
//                 </div>
//                 <Badge className={`text-sm ${color}`}>{d.interestRate}%</Badge>
//                 <div>
//                   <p className="text-sm text-gray-500">{d.amount}</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button variant="outline" onClick={() => setEditing(d)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => deleteDebt(d.id)}
//                     disabled={deleting}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//               </div>
//               </div>

//             </div>
            
//           )
//         })}

//         {/* {debts.map((debt) => (
//           <div key={debt.id} className="rounded-lg border border-gray-300 p-6">
//             <h4 className="font-semibold text-gray-900">{debt.description}</h4>
//             <p className="text-sm text-gray-500">{debt.description}</p>
//             <div className="mt-4 flex items-center justify-between">
//               <Badge>{debt.type}</Badge>
//               <div className="flex space-x-2">
//                 <Button variant="outline" onClick={() => setEditing(debt)}>
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" onClick={() => deleteDebt(debt.id)} disabled={deleting}>
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))} */}
//       </div>
//     </>

//   );

// }

// components/dashboard/debt-card.tsx
"use client";

import {
  useDebts,
  useDeleteDebt,
  useCreateDebt,
  useUpdateDebt,
} from "@/lib/hooks/useDebts";
import type { Debt } from "@/types/debt";
import { AddDebtModal } from "./add-debt-modal";
import EditDebtModal from "./edit-debt-modal"; // ⬅️ nuevo
import { Badge } from "components/dashboard/ui/badge";
import { Button } from "components/dashboard/ui/button";
import { CreditCard, Trash2, Edit, Plus } from "lucide-react";
import { useState } from "react";

/* ----- tarjeta individual ----- */
const iconByType: Record<string, JSX.Element> = {
  personal: <CreditCard className="text-blue-500" />,
  business: <CreditCard className="text-emerald-500" />,
};

function DebtCard({
  debt,
  onEdit,
  onDelete,
  deleting,
}: {
  debt: Debt;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  const Icon = iconByType[debt.type] ?? <CreditCard className="text-gray-500" />;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon}
          <div>
            <h3 className="font-semibold">{debt.description}</h3>
            <p className="text-sm text-gray-500">{debt.type}</p>
          </div>
        </div>
        <Badge>${Number(debt.amount).toLocaleString()}</Badge>
      </div>

      <div className="flex space-x-2">
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

/* ----- wrapper con la grilla + modal ----- */
export function DebtCards() {
  const { data: debts = [], isLoading } = useDebts();
  const { mutate: createDebt } = useCreateDebt();
  const { mutate: updateDebt } = useUpdateDebt();              // ⬅️ nuevo
  const { mutate: deleteDebt, isPending: deleting } = useDeleteDebt();

  const [editing, setEditing] = useState<Debt | null>(null);   // ⬅️ nuevo

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta “Nueva deuda” usada como trigger del modal */}
        <AddDebtModal onCreate={(dto) => createDebt(dto)}>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center
                          hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900">Registro de Deuda</h3>
              <p className="text-sm text-gray-500">Crea un nuevo registro de deuda</p>
            </div>
          </div>
        </AddDebtModal>

        {/* Si está cargando, muestra placeholders; si no, las deudas */}
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={`s-${i}`} className="h-40 rounded-lg border bg-gray-50 animate-pulse" />
            ))
          : debts.map((d) => (
              <DebtCard
                key={d.id}
                debt={d}
                deleting={deleting}
                onEdit={() => setEditing(d)}                     // ⬅️ abre modal edición
                onDelete={() => deleteDebt(Number(d.id))}
              />
            ))}
      </div>

      {/* Modal de edición */}
      <EditDebtModal
        debt={editing}
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        onSave={(dto) => {
          if (!editing) return;
          updateDebt({ id: Number(editing.id), dto });          // ⬅️ PATCH
          setEditing(null);
        }}
      />
    </>
  );
}


