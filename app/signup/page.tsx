"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";


const SignupPage = () => {
  // State for input values and errors
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accepted: false,
  });
  const [errors, setErrors] = useState({} as Record<string, string>);

  // Simple email regex for demo
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear the error when user starts typing again
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nombre completo es requerido";
    if (!form.email.trim()) newErrors.email = "Correo electrónico es requerido";
    else if (!isValidEmail(form.email))
      newErrors.email = "Correo electrónico no válido";
    if (!form.password.trim()) newErrors.password = "Contraseña es requerida";
    if (!form.accepted)
      newErrors.accepted = "Debes aceptar los términos y condiciones";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // If no errors, handle signup logic here (call API, etc.)
    alert("¡Registro exitoso!");
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Registrarse
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Registrate totalmente gratis
                </p>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Registrarse con correo electronico
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Inserta tu nombre completo"
                      value={form.name}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.name && (
                      <p className="mt-2 text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Correo Electronico
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Inserta tu correo electronico"
                      value={form.email}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.email && (
                      <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Inserta la contraseña"
                      value={form.password}
                      onChange={handleChange}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.password && (
                      <p className="mt-2 text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          name="accepted"
                          checked={form.accepted}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          {form.accepted && (
                            <span>
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                      <span>
                        Al crear una cuenta, aceptas
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          los Términos y Condiciones{" "}
                        </a>
                        , y nuestra
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Política de Privacidad.{" "}
                        </a>
                      </span>
                    </label>
                  </div>
                  {errors.accepted && (
                    <p className="mb-4 text-red-500 text-sm">{errors.accepted}</p>
                  )}
                  <div className="mb-6">
                    <button
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                      type="submit"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Ya tienes una cuenta?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Iniciar Sesion
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          {/* ...your SVG code here... */}
        </div>
      </section>
    </>
  );
};

export default SignupPage;
