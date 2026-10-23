"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileTabBar from "./MobileTabBar";
import FooterSignature from "./FooterSignature";

// Casca da aplicação. Guarda o estado do menu lateral, que no mobile vira uma gaveta aberta
// pelo hambúrguer do topo ou pela aba "Mais" da barra inferior.
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <div
        className={`menu-backdrop${menuOpen ? " menu-backdrop--open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div className="main">
        <Topbar menuOpen={menuOpen} onMenu={() => setMenuOpen((o) => !o)} />
        <main className="page-content">
          {children}
          <FooterSignature variant="mobile" />
        </main>
        <MobileTabBar onMore={() => setMenuOpen(true)} />
      </div>
    </div>
  );
}
