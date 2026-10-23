import type { Metadata, Viewport } from "next";
import "./style.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Parceiros do Aço - Serralheria e Estruturas Metálicas",
  description:
    "Projeto modelo de sistema de orçamentos para serralherias, de código aberto e gratuito. Dados fictícios, apenas para demonstração de layout. Produzido por Hexatenant.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
