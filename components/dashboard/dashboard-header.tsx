"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, LayoutDashboard, Settings, LogOut } from "lucide-react";

import { Button } from "components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "components/dashboard/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "components/dashboard/ui/avatar";
import { ManageAccountModal } from "components/dashboard/manage-account-modal";
import { AddTransactionModal } from "components/dashboard/add-transaction-modal";

import { useAuth } from "lib/hooks/useAuth";

export function DashboardHeader() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();   // 👈 datos del back-end

  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);

  if (isLoading) return null;                      // o muestra un skeleton

  const initials = `${user!.firstName[0]}${user!.lastName[0]}`.toUpperCase();

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* ─────────── izquierda (vacía por ahora) ─────────── */}
        <div />

        {/* ─────────── derecha ─────────── */}
        <div className="flex items-center gap-4">
          {/* Link Dashboard */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600"
            onClick={() => router.push("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          {/* Agregar transacción */}
          <Button
            size="sm"
            className="bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => setIsAddTxOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar transacción
          </Button>

          {/* Avatar + menú */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{`${user!.firstName} ${user!.lastName}`}</p>
                <p className="text-xs text-gray-500">{user!.email}</p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={() => setIsManageOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Manage account
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modales */}
      <ManageAccountModal
        open={isManageOpen}
        onOpenChange={setIsManageOpen}
      />
      <AddTransactionModal
        open={isAddTxOpen}
        onOpenChange={setIsAddTxOpen}
        onSave={() => {}}
      />
    </header>
  );
}





// "use client"

// import { Button } from "components/dashboard/ui/button"
// import { Plus, LayoutDashboard, Settings, LogOut } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "components/dashboard/ui/dropdown-menu"
// import { ManageAccountModal } from "components/dashboard/manage-account-modal"
// import { AddTransactionModal } from "components/dashboard/add-transaction-modal"
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export function DashboardHeader() {
//   const [isManageAccountOpen, setIsManageAccountOpen] = useState(false)
//   const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/signin");
//   };

//   return (
//     <header className="border-b border-gray-200 bg-white px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div></div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="sm" className="text-gray-600" onClick={() => router.push("/dashboard")}>
//             <LayoutDashboard className="mr-2 h-4 w-4" />
//             Dashboard
//           </Button>

//           <Button
//             size="sm"
//             className="bg-gray-900 hover:bg-gray-800 text-white"
//             onClick={() => setIsAddTransactionOpen(true)}
//           >
//             <Plus className="mr-2 h-4 w-4" />
//             Agregar transacción
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm" className="text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm font-medium">PA</span>
//                   </div>
//                 </div>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-64">
//               <div className="px-3 py-2">
//                 <p className="text-sm font-medium">Osia Miguel CR</p>
//                 <p className="text-xs text-gray-500">osiamiguel@gmail.com</p>
//               </div>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onSelect={() => setIsManageAccountOpen(true)}>
//                 <Settings className="mr-2 h-4 w-4" />
//                 Manage account
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <LogOut onClick={handleLogout} className="mr-2 h-4 w-4" />
//                 Sign out
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <ManageAccountModal open={isManageAccountOpen} onOpenChange={setIsManageAccountOpen} />
//       <AddTransactionModal open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen} onSave={function (): void {
//         throw new Error("Function not implemented.")
//       } } />
//     </header>
//   )
// }
