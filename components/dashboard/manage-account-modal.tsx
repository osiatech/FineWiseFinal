"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "components/dashboard/ui/dialog";
import { Button } from "components/dashboard/ui/button";
import { Input } from "components/dashboard/ui/input";
import { Label } from "components/dashboard/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "components/dashboard/ui/tabs";
import { Badge } from "components/dashboard/ui/badge";
import {
  X,
  MoreHorizontal,
  Plus,
  User,
  Shield,
  Upload,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dashboard/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "components/dashboard/ui/avatar";

import { useAuth } from "lib/hooks/useAuth";
import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageAccountModal({ open, onOpenChange }: Props) {
  const { user, isLoading, setUser } = useAuth();

  // formulario local (se rellena con el user real)
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open || isLoading) return null; // mientras carga, no mostrar nada

  const initials = `${user!.firstName[0]}${user!.lastName[0]}`.toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch(`/auth/modify-user/${user!.id}`, {
        FirstName: form.firstName,
        LastName: form.lastName,
      });
      // Actualizamos el contexto global
      setUser((prev) =>
        prev ? { ...prev, firstName: form.firstName, lastName: form.lastName } : prev
      );
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[700px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* ────────── Sidebar ────────── */}
          <div className="w-72 bg-gray-50 border-r border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account info.
            </p>

            <Tabs
              defaultValue="profile"
              orientation="vertical"
              className="mt-8 w-full"
            >
              <TabsList className="grid w-full grid-rows-2 gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-white rounded-lg"
                >
                  <User className="mr-3 h-5 w-5 text-gray-600" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-white rounded-lg"
                >
                  <Shield className="mr-3 h-5 w-5 text-gray-600" />
                  Security
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* ────────── Main panel ────────── */}
          <div className="flex-1 relative">
            {/* botón cerrar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10"
            >
              <X className="h-4 w-4" />
            </Button>

            <Tabs defaultValue="profile" className="h-full">
              {/* --- PROFILE --- */}
              <TabsContent
                value="profile"
                className="h-full p-8 space-y-8 overflow-y-auto"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                  Profile details
                </h3>

                {/* Profile row */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Profile
                    </h4>
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-lg">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-medium text-gray-900">
                          {user!.firstName} {user!.lastName}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setForm({
                            firstName: user!.firstName,
                            lastName: user!.lastName,
                          });
                          setIsEditing(true);
                        }}
                        className="px-6"
                      >
                        Update profile
                      </Button>
                    </div>
                  </div>

                  {/* Email row */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Email addresses
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">
                            {user!.email}
                          </span>
                          <Badge variant="secondary">Primary</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* --- SECURITY (placeholder) --- */}
              <TabsContent
                value="security"
                className="h-full p-8 space-y-8 overflow-y-auto"
              >
                {/* …mantén tu contenido de seguridad aquí… */}
                <p className="text-gray-500">
                  Security settings coming soon…
                </p>
              </TabsContent>
            </Tabs>

            {/* --------- Modal interno editar nombre --------- */}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                  <h3 className="text-xl font-semibold mb-6">
                    Update profile
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) =>
                            setForm({ ...form, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) =>
                            setForm({ ...form, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={saving}
                      onClick={handleSave}
                      className="bg-gray-900 text-white"
                    >
                      {saving ? "Saving…" : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
