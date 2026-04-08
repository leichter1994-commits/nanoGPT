import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ahorro Libre',
  description: 'MVP de ahorro personal con presupuesto ideal, gastos y seguimiento mensual.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
