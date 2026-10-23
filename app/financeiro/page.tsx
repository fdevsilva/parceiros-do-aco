"use client";

import { useState } from "react";
import { LANCAMENTOS } from "@/lib/data/listagem-financeiro";
import { StatusBadge } from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import SummaryCard from "@/components/ui/SummaryCard";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

export default function FinanceiroPage() {
  const [filtro, setFiltro] = useState("todos");

  const aReceber = LANCAMENTOS.filter((l) => l.status === "A receber").reduce((s, l) => s + l.valor, 0);
  const recebido = LANCAMENTOS.filter((l) => l.status === "Recebido").reduce((s, l) => s + l.valor, 0);
  const atrasado = LANCAMENTOS.filter((l) => l.status === "Atrasado").reduce((s, l) => s + l.valor, 0);
  const ticketMedio = LANCAMENTOS.reduce((s, l) => s + l.valor, 0) / LANCAMENTOS.length;

  const pills = [
    { key: "todos", label: "Todos" },
    { key: "A receber", label: "A receber" },
    { key: "Recebido", label: "Recebido" },
    { key: "Atrasado", label: "Atrasado" },
  ];

  const lista = LANCAMENTOS.filter((l) => filtro === "todos" || l.status === filtro);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Financeiro" subtitle="Contas a receber geradas a partir dos orçamentos aprovados." subtitleMobile="Contas a receber" action={{ label: "+ Lançamento Avulso", mobileFab: false }} />

      <div className="summary-grid">
        <SummaryCard label="A receber" value={`R$ ${fmt(aReceber)}`} />
        <SummaryCard label="Recebido no mês" value={`R$ ${fmt(recebido)}`} tone="green" />
        <SummaryCard label="Em atraso" value={`R$ ${fmt(atrasado)}`} tone="red" />
        <SummaryCard label="Ticket médio" value={`R$ ${fmt(ticketMedio)}`} />
      </div>

      <div className="filters">
        <FilterPills pills={pills} active={filtro} onChange={setFiltro} />
      </div>

      <div className="table">
        <div className="table__header-row cols-financeiro">
          {["Orçamento", "Cliente", "Vencimento", "Forma", "Status", "Valor"].map((h, i) => (
            <div key={h} className={`table__header-cell${i === 5 ? " table__header-cell--end" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {lista.map((l) => (
          <div key={l.id} className="table__row cols-financeiro">
            <p className="table__cell-strong">{l.numero}</p>
            <p className="table__cell-name">{l.cliente}</p>
            <div className="table__cell-muted">{l.vencimento}</div>
            <div className="table__cell-muted">{l.forma}</div>
            <div>
              <StatusBadge status={l.status} />
            </div>
            <div className="table__cell-strong table__cell-strong--end">R$ {fmt(l.valor)}</div>
            <p className="table__cell-sub only-mobile">
              Vence {l.vencimento} · {l.forma}
            </p>
          </div>
        ))}
      </div>

      <DisclaimerNote>Valores de exemplo, sem persistência.</DisclaimerNote>
    </div>
  );
}
