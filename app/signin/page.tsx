"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { api } from "@/lib/api";


interface AuthResponse {
  accessToken: string;
}

// Valida formato básico de email
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SigninPage() {
  const router = useRouter();

  // Estados del formulario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});

    // Validación cliente
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'El correo electrónico es requerido.';
    else if (!isValidEmail(email)) newErrors.email = 'Correo electrónico no válido.';
    if (!password.trim()) newErrors.password = 'La contraseña es requerida.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Agrega el tipo genérico para que TS conozca la forma de response.data
      const response = await api.post<AuthResponse>('/FineWise/auth/login-user', { email, password });

      // Accede de forma tipada al token
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      // Mensaje genérico o del backend
      const msg = err.response?.data?.message || 'Credenciales incorrectas.';
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-lg dark:bg-dark sm:p-[60px]">
          <h2 className="mb-4 text-center text-3xl font-bold">Inicia Sesión</h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {errors.general && (
              <p className="text-center text-sm text-red-500">{errors.general}</p>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded border px-3 py-2 text-base outline-none transition focus:border-primary dark:bg-[#2C303B] ${
                  submitted && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {submitted && errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded border px-3 py-2 text-base outline-none transition focus:border-primary dark:bg-[#2C303B] ${
                  submitted && errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {submitted && errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-white disabled:opacity-50"
              >
                {isLoading && <span className="spinner-border animate-spin mr-2" />}
                {isLoading ? 'Cargando…' : 'Iniciar sesión'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-base text-gray-600 dark:text-body-color">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
