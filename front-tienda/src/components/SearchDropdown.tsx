/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface SearchDropdownProps {
  results: any[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (result: any) => void;
  renderItem?: (item: any) => React.ReactNode;
}

export default function SearchDropdown({
  results,
  isLoading,
  isOpen,
  onClose,
  onSelectResult,
  renderItem,
}: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      {/* Estado de carga */}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          <span className="ml-2 text-sm text-gray-500">Buscando...</span>
        </div>
      )}

      {/* Sin resultados */}
      {!isLoading && results.length === 0 && (
        <div className="p-4 text-center text-sm text-gray-500">
          No se encontraron resultados
        </div>
      )}

      {/* Resultados */}
      {!isLoading && results.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {results.map((result, index) => (
            <li key={result.id || index}>
              <button
                onClick={() => {
                  onSelectResult?.(result);
                  onClose();
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
              >
                {renderItem ? (
                  renderItem(result)
                ) : (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {result.nombre || result.name || result.title}
                    </p>
                    {result.descripcion && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {result.descripcion}
                      </p>
                    )}
                    {result.precio && (
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        ${result.precio}
                      </p>
                    )}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
