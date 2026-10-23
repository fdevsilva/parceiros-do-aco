"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ícones de traço (24x24, stroke herda a cor do texto): um desenho diferente por aba
const ICONS = {
  orcamentos: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  clientes: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.2 3.2 0 010 5.6M18 14.3c1.8.8 3 2.6 3 4.7" />
    </>
  ),
  produtos: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </>
  ),
  estoque: (
    <>
      <path d="M3 8l9-5 9 5-9 5z" />
      <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  mais: (
    <>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </>
  ),
};

function TabIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className="tab-bar__icon">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[name]}
      </svg>
    </span>
  );
}

const TABS = [
  { href: "/orcamentos", label: "Orçamentos", icon: "orcamentos" },
  { href: "/clientes", label: "Clientes", icon: "clientes" },
  { href: "/produtos", label: "Produtos", icon: "produtos" },
  { href: "/estoque", label: "Estoque", icon: "estoque" },
] as const;

export default function MobileTabBar({ onMore }: { onMore: () => void }) {
  const pathname = usePathname() ?? "";
  const activeTab = TABS.find((t) => pathname.startsWith(t.href));

  return (
    <nav aria-label="Navegação inferior" className="tab-bar">
      {TABS.map((t) => {
        const active = activeTab?.href === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`tab-bar__item${active ? " tab-bar__item--active" : ""}`}
          >
            <TabIcon name={t.icon} />
            {t.label}
          </Link>
        );
      })}
      {/* "Mais" concentra Calculadora, Financeiro, Relatórios e Configurações e fica ativa nelas */}
      <button
        type="button"
        onClick={onMore}
        className={`tab-bar__item${activeTab ? "" : " tab-bar__item--active"}`}
        aria-current={activeTab ? undefined : "page"}
        aria-haspopup="dialog"
      >
        <TabIcon name="mais" />
        Mais
      </button>
    </nav>
  );
}
