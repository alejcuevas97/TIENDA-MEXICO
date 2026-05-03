/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(app)/productos/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
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

const getAllProductos = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Productos/v1/tienda/`,
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function Productos() {
  const searchRef = useRef<HTMLDivElement>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clearSearch,
  } = useSearch(searchProductos, { debounceMs: 300 });

  useEffect(() => {
    getAllProductos()
      .then(setAllProducts)
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setIsLoadingProducts(false));
  }, []);

  const handleSelectResult = (product: any) => {
    // Al seleccionar un producto, puedes hacer algo aquí
    console.log("Producto seleccionado:", product);
    // Ejemplo: navegar, guardar en estado, abrir modal, etc.
  };

  const productsToDisplay = query ? results : allProducts;

  return (
    <article className="bg-gray-50 p-4 shadow-md text-black flex-col h-full">
      <div className="border-b border-gray-400 pb-6 flex-col gap-4  flex">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Productos</h2>
            <p className="text-gray-400">Gestión de productos.</p>
          </div>
          <button
            //Recuerda agregar la funcionalidad de agregar producto
            onClick={() => console.log("Agregar producto")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Agregar Producto
          </button>
        </div>

        <div ref={searchRef} className="mt-4 relative w-full">
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
      </div>

      <div className="mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Codigo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoadingProducts ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Cargando productos...
                </td>
              </tr>
            ) : productsToDisplay.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No hay productos
                </td>
              </tr>
            ) : (
              productsToDisplay.map((product: any) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
