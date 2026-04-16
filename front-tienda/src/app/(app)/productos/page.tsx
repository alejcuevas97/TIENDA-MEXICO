/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(app)/productos/page.tsx
"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "@/src/hooks/useSearch";
import SearchDropdown from "@/src/components/SearchDropdown";

const searchProductos = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/productos/search?q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

export default function Productos() {
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clearSearch,
  } = useSearch(searchProductos, { debounceMs: 300 });

  const handleSelectResult = (product: any) => {
    // Al seleccionar un producto, puedes hacer algo aquí
    console.log("Producto seleccionado:", product);
    // Ejemplo: navegar, guardar en estado, abrir modal, etc.
  };

  return (
    <section className="bg-gray-50 p-4 shadow-md text-black flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Productos</h2>
          <p className="text-gray-400">Gestión de productos.</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Agregar Producto
        </button>
      </div>

      <div ref={searchRef} className="mt-4 max-w-lg relative">
        <div className="bg-secondary relative flex items-center rounded-lg">
          <Search className="absolute left-0 size-8 p-2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            placeholder="Buscar productos..."
            className="w-full rounded-md bg-white  text-gray-900 border border-gray-200 py-2 pl-10 pr-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>

        <SearchDropdown
          results={results}
          isLoading={isLoading}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectResult={handleSelectResult}
        />
      </div>
    </section>
  );
}
