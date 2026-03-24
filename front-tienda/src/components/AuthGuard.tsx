"use client";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  if (!user) return null;

  return <>{children}</>;
}
