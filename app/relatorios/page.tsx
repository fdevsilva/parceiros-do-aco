"use client";

import { useState } from "react";
import SummaryCard from "@/components/ui/SummaryCard";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

const FATURAMENTO = [
  { mes: "Mai", valor: 18.2 },
  { mes: "Jun", valor: 21.8 },
  { mes: "Jul", valor: 16.4 },
  { mes: "Ago", valor: 24.5 },
  { mes: "Set", valor: 19.7 },
  { mes: "Out", valor: 31.1 },
];
const MAX_FATURAMENTO = Math.max(...FATURAMENTO.map((f) => f.valor));

const STATUS_BARS = [
  { label: "Rascunho", qtd: 4, pct: 22, cor: "#fbbf24" },
  { label: "Enviado", qtd: 6, pct: 33, cor: "#60a5fa" },
  { label: "Aprovado", qtd: 5, pct: 28, cor: "#4ade80" },
  { label: "Recusado", qtd: 2, pct: 11, cor: "#f87171" },
  { label: "Expirado", qtd: 1, pct: 6, cor: "#5c7191" },
];

const TOP_CLIENTES = [
  { nome: "Oficina Reis & Filhos", valor: "R$ 15.300,00" },
  { nome: "Construtora Alfa Ltda", valor: "R$ 14.280,00" },
  { nome: "Metalúrgica Boa Vista", valor: "R$ 12.480,00" },
  { nome: "Construtora Horizonte", valor: "R$ 9.100,00" },
];

const TOP_MATERIAIS = [
  { nome: "Tubo Metalon Quadrado 50x50x2mm", qtd: "em 11 orçamentos" },
  { nome: "Eletrodo Revestido E6013", qtd: "em 9 orçamentos" },
  { nome: "Telha Galvalume 0,43mm", qtd: "em 6 orçamentos" },
  { nome: "Motor de Portão Deslizante", qtd: "em 5 orçamentos" },
];

const PERIODOS = [
  { key: "mes", label: "Mês" },
  { key: "trimestre", label: "Trimestre" },
  { key: "ano", label: "Ano" },
];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("mes");

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Relatórios" subtitle="Visão geral do período selecionado." subtitleMobile="Visão geral do mês">
        <div className="header-actions">
          <div className="period-toggle">
            {PERIODOS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriodo(p.key)}
                className={`period-btn${periodo === p.key ? " period-btn--active" : ""}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button className="btn btn--outline only-desktop">⬇ Exportar PDF</button>
        </div>
      </PageHeader>

      <div className="summary-grid">
        <SummaryCard label="Faturamento no mês" value="R$ 31.090,00" hint={<>↑ 12%<span className="only-desktop"> vs. mês anterior</span></>} hintTone="green" />
        <SummaryCard label="Orçamentos criados" value="18" hint="5 aprovados" />
        <SummaryCard label="Taxa de conversão" value="38%" hint={<>↓ 4%<span className="only-desktop"> vs. mês anterior</span></>} hintTone="red" />
        <SummaryCard label="Ticket médio" value="R$ 6.070,00" hint="Últimos 18 orçamentos" />
      </div>

      <div className="report-grid">
        <div className="chart-card">
          <div className="chart-card__title">Faturamento por mês</div>
          <div className="chart-bars">
            {/* --ratio é a fração do maior valor da série; o CSS multiplica pela altura máxima da barra (que muda no mobile) */}
            {FATURAMENTO.map((f) => (
              <div key={f.mes} className="chart-bar-col">
                <div className={`chart-bar-value${f.mes === "Out" ? " chart-bar-value--active" : ""}`}>
                  {f.valor.toFixed(1)}k
                </div>
                <div
                  className={`chart-bar${f.mes === "Out" ? " chart-bar--active" : ""}`}
                  style={{ "--ratio": f.valor / MAX_FATURAMENTO } as React.CSSProperties}
                />
                <div className={`chart-bar-label${f.mes === "Out" ? " chart-bar-label--active" : ""}`}>
                  {f.mes}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__title">Orçamentos por status</div>
          <div className="status-bars">
            {STATUS_BARS.map((s) => (
              <div key={s.label}>
                <div className="status-bar-row__head">
                  <span className="table__cell-muted">{s.label}</span>
                  <span className="table__cell-strong">{s.qtd}</span>
                </div>
                <div className="status-bar-track">
                  <div className="status-bar-fill" style={{ width: `${s.pct}%`, background: s.cor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="top-lists">
        <div className="top-list">
          <div className="top-list__title">Clientes que mais compraram</div>
          {TOP_CLIENTES.map((c, idx) => (
            <div key={c.nome} className="top-list__row">
              <span>
                {idx + 1}. {c.nome}
              </span>
              <span className="top-list__value">{c.valor}</span>
            </div>
          ))}
        </div>

        <div className="top-list">
          <div className="top-list__title">Materiais mais usados</div>
          {TOP_MATERIAIS.map((m, idx) => (
            <div key={m.nome} className="top-list__row">
              <span>
                {idx + 1}. {m.nome}
              </span>
              <span className="top-list__meta">{m.qtd}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn--outline only-mobile report-export">⬇ Exportar PDF</button>

      <DisclaimerNote>Números de exemplo.</DisclaimerNote>
    </div>
  );
}
