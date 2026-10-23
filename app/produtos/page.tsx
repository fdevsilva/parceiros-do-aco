"use client";

import { useMemo, useState } from "react";
import { PRODUTOS } from "@/lib/data/listagem-produtos";
import { Produto } from "@/lib/types";
import { CategoryBadge } from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import DisclaimerNote from "@/components/ui/DisclaimerNote";
import PageHeader from "@/components/ui/PageHeader";

const CATEGORIAS = [
  "AÇOS / PERFIS",
  "CONSUMÍVEIS",
  "ABRASIVOS",
  "TINTAS",
  "FIXAÇÃO",
  "AUTOMAÇÃO",
  "COBERTURAS",
  "EPIS / SERVIÇOS",
] as const;

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const pills = [
    { key: "todos", label: "Todos" },
    ...CATEGORIAS.map((c) => ({ key: c, label: c.charAt(0) + c.slice(1).toLowerCase() })),
  ];

  const lista = useMemo(() => {
    let base = produtos.filter((p) => filtro === "todos" || p.categoria === filtro);
    base = base.filter((p) =>
      busca.trim() === "" ? true : p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    if (filtro === "todos") {
      base = [...base].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    }
    return base;
  }, [produtos, filtro, busca]);

  function atualizarPreco(id: string, novoValor: string) {
    const numerico = parseFloat(novoValor.replace(/\./g, "").replace(",", "."));
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, preco: isNaN(numerico) ? p.preco : numerico } : p))
    );
  }

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader title="Produtos / Serviços" subtitle={`${produtos.length} materiais cadastrados no catálogo, usados para montar os orçamentos.`} subtitleMobile={`${produtos.length} materiais no catálogo.`} action={{ label: "+ Adicionar Novo Material" }} />

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
        <div className="table__header-row cols-produtos">
          {["Item / Material", "Categoria", "Unidade", "Preço unit. (R$)", "Ações"].map((h, i) => (
            <div key={h} className={`table__header-cell${i === 4 ? " table__header-cell--end" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {lista.map((p) => (
          <div key={p.id} className="table__row cols-produtos">
            <p className="table__cell-name">{p.nome}</p>
            <div>
              <CategoryBadge categoria={p.categoria} />
            </div>
            <div className="table__cell-muted">{p.unidade}</div>
            <div className="price-box">
              <span className="price-box__currency">R$</span>
              <label>
                <span className="sr-only">Preço unitário de {p.nome}</span>
                <input
                  defaultValue={fmt(p.preco)}
                  onBlur={(e) => atualizarPreco(p.id, e.target.value)}
                  className="price-box__input"
                />
              </label>
            </div>
            <div className="table__actions">
              <button aria-label={`Mais opções para ${p.nome}`} className="btn--icon btn--more only-mobile">
                ⋮
              </button>
              <button aria-label={`Editar ${p.nome}`} className="btn--icon">
                ✎
              </button>
              <button aria-label={`Remover ${p.nome}`} className="btn--icon">
                🗑
              </button>
            </div>
          </div>
        ))}

        <button className="table__add-row">
          <span className="table__add-icon">+</span>
          Adicionar material ao catálogo
        </button>
      </div>

      <DisclaimerNote>Preços de exemplo. Edições ficam salvas só nesta sessão do navegador.</DisclaimerNote>
    </div>
  );
}
