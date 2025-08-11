// // components/dashboard/add-debt-modal.tsx
// 'use client';

// import { Dialog, DialogContent, DialogTrigger } from 'components/dashboard/ui/dialog';
// import { Button } from 'components/dashboard/ui/button';
// import { Input } from 'components/dashboard/ui/input';
// import { Select, SelectTrigger, SelectItem, SelectContent } from 'components/dashboard/ui/select';
// import { useForm } from 'react-hook-form';
// import { CreateDebtDto, CreditorType } from '@/types/debt';
// import { useDebts } from '@/lib/hooks/useDebts';


// type AddDebtModalProps = {
//   onCreate: (dto: CreateDebtDto) => void;   // <- clave
//   children: React.ReactNode;
// };
// export function AddDebtModal({ onCreate, children }: AddDebtModalProps) {
//   const { register, handleSubmit, reset } = useForm<CreateDebtDto>();

//   const submit = handleSubmit((data) => {
//     const dto: CreateDebtDto = {
//       description: data.description,
//       amount: Number(data.amount),
//       type: data.type,
//       dueDate: data.dueDate,                  // o normaliza a ISO si tu back lo exige
//       interestRate: data.interestRate ? Number(data.interestRate) : undefined,
//     };
//     onCreate(dto);                            // <- llama al mutate que le pases
//     reset();
//   });

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Nueva deuda</h2>

//         <form onSubmit={submit} className="space-y-4">
//           <Input {...register('description', { required: true })} placeholder="Descripción" />

//           <Input
//             type="number"
//             step="0.01"
//             {...register('amount', { required: true, min: 0 })}
//             placeholder="Monto"
//           />

//           <Select {...register('type', { required: true })}>
//             <SelectTrigger>
//               <span>Tipo / Acreedor</span>
//             </SelectTrigger>
//             <SelectContent>
//               {Object.entries(CreditorType).map(([key, val]) => (
//                 <SelectItem key={key} value={val}>
//                   {val}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Input type="date" {...register('dueDate')} placeholder="Fecha de vencimiento" />
//           <Input type="number" step="0.01" {...register('interestRate')} placeholder="Tasa de interés (%)" />

//           <Button type="submit" className="w-full">
//             Guardar
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";
import { useForm, Controller } from "react-hook-form";
import type { CreateDebtDto } from "@/types/debt";
import { CreditorType } from "@/types/debt"; // o desde donde tengas el enum
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "components/dashboard/ui/select";
import { Input } from "components/dashboard/ui/input"; // el que uses

type Props = {
  onCreate: (dto: CreateDebtDto) => void;
  children: React.ReactNode;
};

export function AddDebtModal({ onCreate, children }: Props) {
  const { register, handleSubmit, control, reset } = useForm<CreateDebtDto>();

  const submit = handleSubmit((raw) => {
    const dto: CreateDebtDto = {
      description: raw.description,
      amount: Number(raw.amount),
      type: raw.type,                      // viene del Controller
      dueDate: raw.dueDate,                // ISO si tu back lo exige
      interestRate: raw.interestRate ? Number(raw.interestRate) : undefined,
    };
    onCreate(dto);
    reset();
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva deuda</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <Input placeholder="Descripción" {...register("description", { required: true })} />
          <Input type="number" step="0.01" placeholder="Monto" {...register("amount", { required: true, min: 0.01 })} />

          {/* Select de tipo / acreedor controlado */}
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo / Acreedor" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CreditorType).map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Input type="date" placeholder="Fecha de vencimiento" {...register("dueDate")} />
          <Input type="number" step="0.01" placeholder="Tasa de interés (%)" {...register("interestRate")} />

          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
