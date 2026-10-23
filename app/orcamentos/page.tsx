"use client";

import { useMemo, useState } from "react";
import { ORCAMENTOS } from "@/lib/data/listagem-orcamentos";
import { StatusBadge } from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

export default function OrcamentosPage() {
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const pills = [
    { key: "todos", label: `Todos (${ORCAMENTOS.length})` },
    { key: "Rascunho", label: `Rascunho (${ORCAMENTOS.filter((o) => o.status === "Rascunho").length})` },
    { key: "Enviado", label: `Enviado (${ORCAMENTOS.filter((o) => o.status === "Enviado").length})` },
    { key: "Aprovado", label: `Aprovado (${ORCAMENTOS.filter((o) => o.status === "Aprovado").length})` },
    { key: "Recusado", label: `Recusado (${ORCAMENTOS.filter((o) => o.status === "Recusado").length})` },
    { key: "Expirado", label: `Expirado (${ORCAMENTOS.filter((o) => o.status === "Expirado").length})` },
  ];

  const lista = useMemo(() => {
    return ORCAMENTOS
      .filter((o) => filtro === "todos" || o.status === filtro)
      .filter((o) =>
        busca.trim() === ""
          ? true
          : o.cliente.toLowerCase().includes(busca.toLowerCase()) ||
            o.numero.toLowerCase().includes(busca.toLowerCase())
      );
  }, [filtro, busca]);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Orçamentos" subtitle={`${ORCAMENTOS.length} orçamentos de exemplo. Crie, acompanhe e envie para o cliente.`} subtitleMobile={`${ORCAMENTOS.length} criados`} action={{ label: "+ Novo Orçamento", mobileFab: true }} />

      <div className="filters">
        <FilterPills pills={pills} active={filtro} onChange={setFiltro} />
        <label className="search-field">
          <span className="sr-only">Buscar orçamento</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por cliente ou nº..."
            className="search-field__input"
          />
        </label>
      </div>

      <div className="table">
        <div className="table__header-row cols-orcamentos">
          {["Nº", "Cliente", "Emissão", "Validade", "Status", "Valor total", "Ações"].map((h, i) => (
            <div key={h} className={`table__header-cell${i === 6 ? " table__header-cell--end" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {lista.map((o) => (
          <div key={o.id} className="table__row cols-orcamentos">
            <p className="table__cell-strong">{o.numero}</p>
            <div>
              <p className="table__cell-name">{o.cliente}</p>
              <p className="table__cell-sub">{o.obra}</p>
            </div>
            <div className="table__cell-muted">{o.emissao}</div>
            <div className="table__cell-muted">{o.validade}</div>
            <div>
              <StatusBadge status={o.status} />
            </div>
            <div className="table__cell-strong">R$ {fmt(o.valor)}</div>
            <div className="table__actions">
              <button aria-label={`Ver orçamento ${o.numero}`} className="btn--icon">
                👁
              </button>
              <button aria-label={`Editar orçamento ${o.numero}`} className="btn--icon">
                ✎
              </button>
            </div>
          </div>
        ))}

        {lista.length === 0 && (
          <div className="table__empty">Nenhum orçamento encontrado para esse filtro.</div>
        )}
      </div>

      <DisclaimerNote>Dados de exemplo, sem persistência.</DisclaimerNote>
    </div>
  );
}
