"use client";

import { useMemo, useState } from "react";
import { CLIENTES } from "@/lib/data/listagem-clientes";
import { StatusBadge } from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

export default function ClientesPage() {
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const pj = CLIENTES.filter((c) => c.tipo === "PESSOA JURÍDICA").length;
  const pf = CLIENTES.filter((c) => c.tipo === "PESSOA FÍSICA").length;

  const pills = [
    { key: "todos", label: `Todos (${CLIENTES.length})` },
    { key: "PESSOA JURÍDICA", label: `Pessoa Jurídica (${pj})` },
    { key: "PESSOA FÍSICA", label: `Pessoa Física (${pf})` },
  ];

  const lista = useMemo(() => {
    return CLIENTES
      .filter((c) => filtro === "todos" || c.tipo === filtro)
      .filter((c) =>
        busca.trim() === ""
          ? true
          : c.nome.toLowerCase().includes(busca.toLowerCase()) || c.documento.includes(busca)
      );
  }, [filtro, busca]);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Clientes" subtitle={`${CLIENTES.length} clientes cadastrados.`} subtitleMobile={`${CLIENTES.length} cadastrados`} action={{ label: "+ Cadastro Rápido", mobileFab: true }} />

      <div className="filters">
        <FilterPills pills={pills} active={filtro} onChange={setFiltro} />
        <label className="search-field">
          <span className="sr-only">Buscar cliente</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, CNPJ/CPF..."
            className="search-field__input"
          />
        </label>
      </div>

      <div className="table">
        <div className="table__header-row cols-clientes">
          {["Nome / Empresa", "CNPJ / CPF", "Telefone / WhatsApp", "Endereço da obra", "Orçamentos", "Ações"].map(
            (h, i) => (
              <div key={h} className={`table__header-cell${i === 5 ? " table__header-cell--end" : ""}`}>
                {h}
              </div>
            )
          )}
        </div>

        {lista.map((c) => (
          <div key={c.id} className="table__row cols-clientes">
            <div className="client-cell">
              <div className="avatar">{c.iniciais}</div>
              <div>
                <p className="table__cell-name">{c.nome}</p>
                <span className="only-desktop">
                  <StatusBadge status={c.tipo} />
                </span>
                {/* mobile: telefone e quantidade numa linha só, sigla do tipo no canto direito do cartão */}
                <p className="client-meta only-mobile">
                  {c.telefone} · {c.qtdOrcamentos} orçamento(s)
                </p>
              </div>
            </div>
            <span className={`badge client-type-abbrev only-mobile ${c.tipo === "PESSOA FÍSICA" ? "badge--pf" : "badge--pj"}`}>
              {c.tipo === "PESSOA FÍSICA" ? "PF" : "PJ"}
            </span>
            <div className="table__cell-muted">{c.documento}</div>
            <div className="table__cell-muted">{c.telefone}</div>
            <div className="table__cell-muted">{c.endereco}</div>
            <div className="table__cell-strong">{c.qtdOrcamentos}</div>
            <div className="table__actions">
              <button aria-label={`Abrir WhatsApp de ${c.nome}`} className="btn--icon">
                💬
              </button>
              <button aria-label={`Editar ${c.nome}`} className="btn--icon">
                ✎
              </button>
            </div>
          </div>
        ))}
      </div>

      <DisclaimerNote>Dados de exemplo, nomes fictícios. Sem persistência.</DisclaimerNote>
    </div>
  );
}
