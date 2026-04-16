"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // toast({
      //   title: "Sesión cerrada",
      //   description: "Hasta pronto!",
      // });
      router.push("/login");
    } catch {
      // toast({
      //   title: "Error",
      //   description: "No se pudo cerrar sesión",
      //   variant: "destructive",
      // });
    }
  };
  return (
    <header className="flex w-full p-4 bg-gray-50 text-gray-900 items-center justify-between shadow-md border-b border-gray-200">
      <ul className="flex justify-between w-full items-center">
        <li className="flex">
          <Link href="/" className="cursor-pointer">
            Logo
          </Link>
        </li>
        <li className="flex gap-6">
          <Link
            href="/productos"
            className=" hover:bg-blue-500 rounded-2xl p-2 hover:text-white"
          >
            Productos
          </Link>
          <div className=" hover:bg-blue-500 rounded-2xl p-2 hover:text-white">
            Ticket
          </div>
          <Link
            href="/contabilidad"
            className=" hover:bg-blue-500 rounded-2xl p-2 hover:text-white"
          >
            Contavilidad
          </Link>
          <button
            onClick={handleLogout}
            className="hover:bg-red-500 rounded-2xl p-2 cursor-pointer"
          >
            Cerrar Sesion
          </button>
        </li>
      </ul>
    </header>
  );
};
