import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contador de Sushis 🍣",
  description: "App divertida para contar cuántos sushis comiste"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
