"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterSignature from "./FooterSignature";

const ITEMS = [
  { href: "/orcamentos", label: "Orçamentos" },
  { href: "/clientes", label: "Clientes" },
  { href: "/produtos", label: "Produtos / Serviços" },
  { href: "/estoque", label: "Estoque" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/financeiro", label: "Financeiro" },
  { href: "/relatorios", label: "Relatórios" },
  { href: "/configuracoes", label: "Configurações" },
];

export default function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className={`sidebar${open ? " sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <div className="sidebar__brand-logo" />
        <div>
          <p className="sidebar__brand-title">PARCEIROS DO AÇO</p>
          <p className="sidebar__brand-subtitle">SERRALHERIA E ESTRUTURAS METÁLICAS</p>
        </div>
      </div>

      {ITEMS.map((item) => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`sidebar__nav-link${active ? " sidebar__nav-link--active" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}

      <FooterSignature />
    </nav>
  );
}
