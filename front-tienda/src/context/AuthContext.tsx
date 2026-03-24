"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface User {
  name: string;
}
interface AuthContextType {
  user: User | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setUser(null);
    router.push("/login");
  }, [router]);

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await res.json();
        setUser(userData);
        setLoading(false);
      } catch {
        logout();
      }
    },
    [logout],
  );

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

  const login = async (name: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("auth_token", data.token);
        setUser(data.user); // data.user
        router.push("/dashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(
        "Error en el login: " +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
