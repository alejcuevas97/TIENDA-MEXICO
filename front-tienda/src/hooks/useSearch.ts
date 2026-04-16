import { useState, useCallback, useEffect } from "react";

interface UseSearchOptions {
  debounceMs?: number;
}

export function useSearch(
  searchFn: (query: string) => Promise<never[]>,
  options: UseSearchOptions = {},
) {
  const { debounceMs = 300 } = options;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      setError(null);
      return;
    }

    // Debounce: esperar antes de hacer la búsqueda
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchFn(query);
        setResults(data || []);
        setIsOpen(true);
      } catch (err) {
        console.error("Search error:", err);
        setError(err instanceof Error ? err.message : "Error en la búsqueda");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, searchFn, debounceMs]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clearSearch,
    error,
  };
}
