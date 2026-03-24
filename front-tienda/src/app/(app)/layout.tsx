import AuthGuard from "@/src/components/AuthGuard";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dulces Lola",
  description:
    "Tienda de dulces en México, con los mejores sabores y precios competitivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className={`${lato.className} min-h-full flex flex-col`}>
        {children}
      </div>
    </AuthGuard>
  );
}
