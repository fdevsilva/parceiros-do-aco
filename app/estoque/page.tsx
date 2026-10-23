"use client";

import { useMemo, useState } from "react";
import { ITENS_ESTOQUE, situacao } from "@/lib/data/listagem-estoque";
import { StatusBadge } from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import SummaryCard from "@/components/ui/SummaryCard";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

export default function EstoquePage() {
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const normal = ITENS_ESTOQUE.filter((i) => situacao(i) === "Normal").length;
  const baixo = ITENS_ESTOQUE.filter((i) => situacao(i) === "Estoque baixo").length;
  const esgotado = ITENS_ESTOQUE.filter((i) => situacao(i) === "Esgotado").length;

  const pills = [
    { key: "todos", label: `Todos (${ITENS_ESTOQUE.length})` },
    { key: "Estoque baixo", label: `Estoque baixo (${baixo})` },
    { key: "Esgotado", label: `Esgotado (${esgotado})` },
  ];

  const lista = useMemo(() => {
    return ITENS_ESTOQUE
      .filter((i) => filtro === "todos" || situacao(i) === filtro)
      .filter((i) => (busca.trim() === "" ? true : i.nome.toLowerCase().includes(busca.toLowerCase())));
  }, [filtro, busca]);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Estoque" subtitle="Quantidade disponível de cada material, ligada ao catálogo de Produtos / Serviços." subtitleMobile={`${ITENS_ESTOQUE.length} itens cadastrados`} action={{ label: "+ Registrar Movimentação", mobileFab: false }} />

      <div className="summary-grid summary-grid--stock">
        <SummaryCard label="Itens cadastrados" value={String(ITENS_ESTOQUE.length)} />
        <SummaryCard label="Estoque normal" value={String(normal)} tone="green" />
        <SummaryCard label="Estoque baixo" value={String(baixo)} tone="amber" />
        <SummaryCard label="Esgotado" value={String(esgotado)} tone="red" />
      </div>

      <div className="filters">
        <FilterPills pills={pills} active={filtro} onChange={setFiltro} />
        <label className="search-field">
          <span className="sr-only">Buscar material</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar material..."
            className="search-field__input"
          />
        </label>
      </div>

      <div className="table">
        <div className="table__header-row cols-estoque">
          {["Item / Material", "Estoque atual", "Mínimo", "Unidade", "Situação", "Ações"].map((h, i) => (
            <div key={h} className={`table__header-cell${i === 5 ? " table__header-cell--end" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {lista.map((i) => {
          const s = situacao(i);
          return (
            <div key={i.id} className="table__row cols-estoque">
              <div>
                <p className="table__cell-name">{i.nome}</p>
                <p className="table__cell-sub">{i.categoria}</p>
              </div>
              <div
                className={`table__cell-strong${
                  s === "Estoque baixo" ? " summary-card__value--amber" : s === "Esgotado" ? " summary-card__value--red" : ""
                }`}
              >
                {i.atual}
                <span className="stock-unit only-mobile"> {i.unidade}</span>
              </div>
              <div className="table__cell-muted">{i.minimo}</div>
              <div className="table__cell-muted">{i.unidade}</div>
              <div>
                <StatusBadge status={s} />
              </div>
              <div className="table__actions">
                <button className="btn--small">+ Entrada</button>
                <button className="btn--small">− Saída</button>
              </div>
            </div>
          );
        })}
      </div>

      <DisclaimerNote>Quantidades de exemplo, sem persistência.</DisclaimerNote>
    </div>
  );
}
