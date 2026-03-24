"use client";
import { IceCreamBowl } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6 justify-center items-center flex flex-col">
          <div className="flex rounded-full bg-blue-950 w-15 h-15 mb-4 items-center justify-center">
            <IceCreamBowl className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-2xl text-blue-950">
            Bienvenido a Dulceria LoLa
          </h1>
          <p className="m-2 text-gray-500">
            Ingrese sus credenciales para acceder al sistema
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px gap-6 flex flex-col">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:z-10 sm:text-sm"
                placeholder="Usuario"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-900 focus:border-blue-900 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
