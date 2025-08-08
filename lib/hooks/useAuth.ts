"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface RawUser {
  id: number;
  FirstName: string;
  LastName: string;
  email: string;
  role: string;
}

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function mapUser(u: any): UserInfo {
  return {
    id: u.id,
    firstName: u.firstName ?? u.FirstName ?? "",   // 👈 fallback
    lastName : u.lastName  ?? u.LastName  ?? "",
    email    : u.email,
    role     : u.role,
  };
}



export function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/signin");

    api
      .get<RawUser>("FineWise/auth/check-status")     // ← endpoint protegido
      .then(({ data }) => setUser(mapUser(data)))
      .catch((err) => {
            console.error("check-status error →", err.response?.status, err.response?.data);
            localStorage.removeItem("token");
            router.replace("/signin");
        });
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    router.replace("/signin");
  }, [router]);

  return { user, isLoading: !user, logout, setUser };
}
