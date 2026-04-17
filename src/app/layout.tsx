import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Monetra - Control de Gastos Inteligente",
  description: "Controla tus gastos con inteligencia artificial. Ajuste por inflación, resúmenes y consejos financieros.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#06060b] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
