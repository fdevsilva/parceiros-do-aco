"use client";

import { useMemo, useState } from "react";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import PageHeader from "@/components/ui/PageHeader";

type Tipo = "PESO" | "SOLDA" | "TINTA" | "AREA";

interface ItemCalculado {
  id: string;
  tipo: Tipo;
  nome: string;
  resultado: number;
  unidade: string;
  // só no tipo AREA: o item guarda a área em `resultado` (m²) e o perímetro aqui (m)
  perimetro?: number;
}

// classe de etiqueta para cada tipo de item na lista (cor vem do CSS, não de style inline)
const TIPO_TAG_CLASS: Record<Tipo, string> = {
  PESO: "item-row__tag--peso",
  SOLDA: "item-row__tag--solda",
  TINTA: "item-row__tag--tinta",
  AREA: "item-row__tag--area",
};

const TIPO_LABEL: Record<Tipo, string> = {
  PESO: "PESO",
  SOLDA: "SOLDA",
  TINTA: "TINTA",
  AREA: "ÁREA",
};

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Field({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} inputMode="decimal" className="field__input" />
      {unit && <div className="field__unit">{unit}</div>}
    </label>
  );
}

function parseNum(v: string) {
  const n = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return isNaN(n) ? 0 : n;
}

export default function CalculadoraPage() {
  const [aba, setAba] = useState<Tipo>("PESO");
  const [itens, setItens] = useState<ItemCalculado[]>([]);

  // --- Peso de material ---
  const [modoPeso, setModoPeso] = useState<"barra" | "chapa">("barra");
  const [nomePeso, setNomePeso] = useState("Tubo Metalon Quadrado 50x50x2mm");
  const [pesoPorMetro, setPesoPorMetro] = useState("2,95");
  const [comprimento, setComprimento] = useState("6,00");
  const [qtdBarras, setQtdBarras] = useState("4");
  const [pesoPorM2, setPesoPorM2] = useState("15,70");
  const [area, setArea] = useState("3,20");
  const [qtdChapas, setQtdChapas] = useState("1");

  const resultadoPeso =
    modoPeso === "barra"
      ? parseNum(pesoPorMetro) * parseNum(comprimento) * parseNum(qtdBarras)
      : parseNum(pesoPorM2) * parseNum(area) * parseNum(qtdChapas);

  // --- Consumo de solda ---
  const [nomeSolda, setNomeSolda] = useState("Eletrodo E6013 - cordão de filete");
  const [comprimentoCordao, setComprimentoCordao] = useState("8,00");
  const [taxaDeposicao, setTaxaDeposicao] = useState("0,30");
  const [passes, setPasses] = useState("1");

  const resultadoSolda = parseNum(comprimentoCordao) * parseNum(taxaDeposicao) * parseNum(passes);

  // --- Rendimento de tinta ---
  const [nomeTinta, setNomeTinta] = useState("Primer Epóxi Rico em Zinco");
  const [areaPintar, setAreaPintar] = useState("18,00");
  const [rendimento, setRendimento] = useState("9,00");
  const [demaos, setDemaos] = useState("2");

  const resultadoTinta =
    parseNum(rendimento) > 0 ? (parseNum(areaPintar) / parseNum(rendimento)) * parseNum(demaos) : 0;

  // --- Área / Perímetro ---
  const [forma, setForma] = useState<"retangulo" | "circulo">("retangulo");
  const [nomeArea, setNomeArea] = useState("Chapa de fechamento");
  const [largura, setLargura] = useState("2,00");
  const [altura, setAltura] = useState("1,50");
  const [raio, setRaio] = useState("0,50");

  const areaCalculada =
    forma === "retangulo" ? parseNum(largura) * parseNum(altura) : Math.PI * parseNum(raio) ** 2;
  const perimetroCalculado =
    forma === "retangulo" ? 2 * (parseNum(largura) + parseNum(altura)) : 2 * Math.PI * parseNum(raio);

  function adicionar() {
    if (aba === "PESO" && resultadoPeso > 0) {
      setItens((prev) => [
        ...prev,
        { id: crypto.randomUUID(), tipo: "PESO", nome: nomePeso || "Material", resultado: resultadoPeso, unidade: "kg" },
      ]);
    }
    if (aba === "SOLDA" && resultadoSolda > 0) {
      setItens((prev) => [
        ...prev,
        { id: crypto.randomUUID(), tipo: "SOLDA", nome: nomeSolda || "Cordão de solda", resultado: resultadoSolda, unidade: "kg" },
      ]);
    }
    if (aba === "TINTA" && resultadoTinta > 0) {
      setItens((prev) => [
        ...prev,
        { id: crypto.randomUUID(), tipo: "TINTA", nome: nomeTinta || "Pintura", resultado: resultadoTinta, unidade: "L" },
      ]);
    }
  }

  function adicionarArea() {
    if (areaCalculada > 0) {
      setItens((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          tipo: "AREA",
          nome: nomeArea || (forma === "retangulo" ? "Retângulo" : "Círculo"),
          resultado: areaCalculada,
          unidade: "m²",
          perimetro: perimetroCalculado,
        },
      ]);
    }
  }

  function remover(id: string) {
    setItens((prev) => prev.filter((i) => i.id !== id));
  }

  // soma os itens já adicionados, agrupados por tipo, para os cartões de resumo da coluna da direita
  const subtotais = useMemo(() => {
    const peso = itens.filter((i) => i.tipo === "PESO").reduce((s, i) => s + i.resultado, 0);
    const solda = itens.filter((i) => i.tipo === "SOLDA").reduce((s, i) => s + i.resultado, 0);
    const tinta = itens.filter((i) => i.tipo === "TINTA").reduce((s, i) => s + i.resultado, 0);
    const itensArea = itens.filter((i) => i.tipo === "AREA");
    const area = itensArea.reduce((s, i) => s + i.resultado, 0);
    const perimetro = itensArea.reduce((s, i) => s + (i.perimetro ?? 0), 0);
    return { peso, solda, tinta, area, perimetro };
  }, [itens]);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader
        title="Calculadora"
        subtitle="Peso de material, consumo de solda, rendimento de tinta e área / perímetro. Cada cálculo pode ser adicionado à lista e somado por tipo."
        subtitleMobile="Peso, solda, tinta e área. Some tudo em uma lista."
      />

      <div className="calc-layout">
        <div>
          <div className="calc-tabs">
            {(
              [
                ["PESO", "Peso de Material"],
                ["SOLDA", "Consumo de Solda"],
                ["TINTA", "Rendimento de Tinta"],
                ["AREA", "Área / Perímetro"],
              ] as [Tipo, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setAba(key)}
                className={`calc-tab${aba === key ? " calc-tab--active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="calc-panel">
            {aba === "PESO" && (
              <>
                <div className="calc-mode-toggle">
                  <button
                    onClick={() => setModoPeso("barra")}
                    className={`calc-mode-btn${modoPeso === "barra" ? " calc-mode-btn--active" : ""}`}
                  >
                    Barra / Perfil
                  </button>
                  <button
                    onClick={() => setModoPeso("chapa")}
                    className={`calc-mode-btn${modoPeso === "chapa" ? " calc-mode-btn--active" : ""}`}
                  >
                    Chapa
                  </button>
                </div>

                <Field label="Perfil / material" value={nomePeso} onChange={setNomePeso} />

                {modoPeso === "barra" ? (
                  <>
                    <div className="field-grid">
                      <Field label="Peso por metro (tabela do fabricante)" value={pesoPorMetro} onChange={setPesoPorMetro} unit="kg/m" />
                      <Field label="Comprimento por peça" value={comprimento} onChange={setComprimento} unit="m" />
                    </div>
                    <Field label="Quantidade de peças" value={qtdBarras} onChange={setQtdBarras} unit="un" />
                  </>
                ) : (
                  <>
                    <div className="field-grid">
                      <Field label="Peso por m² (tabela do fabricante)" value={pesoPorM2} onChange={setPesoPorM2} unit="kg/m²" />
                      <Field label="Área da chapa" value={area} onChange={setArea} unit="m²" />
                    </div>
                    <Field label="Quantidade de chapas" value={qtdChapas} onChange={setQtdChapas} unit="un" />
                  </>
                )}

                <ResultBox valor={resultadoPeso} unidade="kg" />
              </>
            )}

            {aba === "SOLDA" && (
              <>
                <Field label="Descrição do cordão" value={nomeSolda} onChange={setNomeSolda} />
                <div className="field-grid">
                  <Field label="Comprimento do cordão" value={comprimentoCordao} onChange={setComprimentoCordao} unit="m" />
                  <Field label="Taxa de deposição" value={taxaDeposicao} onChange={setTaxaDeposicao} unit="kg de consumível por metro" />
                </div>
                <Field label="Número de passes" value={passes} onChange={setPasses} unit="passes de solda" />
                <ResultBox valor={resultadoSolda} unidade="kg" />
              </>
            )}

            {aba === "TINTA" && (
              <>
                <Field label="Tinta / fundo" value={nomeTinta} onChange={setNomeTinta} />
                <div className="field-grid">
                  <Field label="Área a pintar" value={areaPintar} onChange={setAreaPintar} unit="m²" />
                  <Field label="Rendimento do produto" value={rendimento} onChange={setRendimento} unit="m² por litro, uma demão" />
                </div>
                <Field label="Número de demãos" value={demaos} onChange={setDemaos} unit="camadas" />
                <ResultBox valor={resultadoTinta} unidade="L" />
              </>
            )}

            {aba === "AREA" && (
              <>
                <div className="calc-mode-toggle">
                  <button
                    onClick={() => setForma("retangulo")}
                    className={`calc-mode-btn${forma === "retangulo" ? " calc-mode-btn--active" : ""}`}
                  >
                    Retângulo
                  </button>
                  <button
                    onClick={() => setForma("circulo")}
                    className={`calc-mode-btn${forma === "circulo" ? " calc-mode-btn--active" : ""}`}
                  >
                    Círculo
                  </button>
                </div>

                <Field label="Descrição da peça" value={nomeArea} onChange={setNomeArea} />

                {forma === "retangulo" ? (
                  <div className="field-grid">
                    <Field label="Largura" value={largura} onChange={setLargura} unit="m" />
                    <Field label="Altura" value={altura} onChange={setAltura} unit="m" />
                  </div>
                ) : (
                  <Field label="Raio" value={raio} onChange={setRaio} unit="m" />
                )}

                <div className="result-grid">
                  <ResultBox label="Área" valor={areaCalculada} unidade="m²" />
                  <ResultBox label="Perímetro" valor={perimetroCalculado} unidade="m" />
                </div>
              </>
            )}

            <button onClick={aba === "AREA" ? adicionarArea : adicionar} className="btn btn--primary btn--block">
              + Adicionar à lista
            </button>
          </div>
        </div>

        <div className="calc-sidebar">
          <div className="calc-summary-grid">
            <SubCard label="Peso total" valor={`${fmt(subtotais.peso)} kg`} />
            <SubCard label="Solda" valor={`${fmt(subtotais.solda)} kg`} />
            <SubCard label="Tinta" valor={`${fmt(subtotais.tinta)} L`} />
            <SubCard label="Área total" valor={`${fmt(subtotais.area)} m²`} />
            <SubCard label="Perímetro total" valor={`${fmt(subtotais.perimetro)} m`} />
            <SubCard label="Itens" valor={String(itens.length)} />
          </div>

          <div className="items-list">
            <div className="items-list__header">Itens calculados</div>

            {itens.length === 0 && (
              <div className="items-list__empty">
                Nenhum item adicionado ainda. Calcule acima e clique em &quot;+ Adicionar à lista&quot;.
              </div>
            )}

            {itens.map((it) => (
              <div key={it.id} className="item-row">
                <div className="item-row__info">
                  <span className={`item-row__tag ${TIPO_TAG_CLASS[it.tipo]}`}>{TIPO_LABEL[it.tipo]}</span>
                  <div className="item-row__name">{it.nome}</div>
                </div>
                <div className="item-row__right">
                  <span className="item-row__value">
                    {fmt(it.resultado)} {it.unidade}
                    {it.perimetro !== undefined && ` · ${fmt(it.perimetro)} m`}
                  </span>
                  <button aria-label={`Remover ${it.nome}`} onClick={() => remover(it.id)} className="item-row__remove">
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="items-list__footer">
              <button disabled={itens.length === 0} className="btn btn--primary btn--block">
                Enviar para Orçamento
              </button>
            </div>
          </div>

          <div className="calc-note">
            <span className="calc-note__badge">i</span>
            Lista fica só nesta sessão do navegador. Peso por metro, taxa de deposição e rendimento vêm da tabela
            de cada fabricante.
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultBox({ valor, unidade, label = "Resultado" }: { valor: number; unidade: string; label?: string }) {
  return (
    <div className="result-box">
      <p className="result-box__label">{label}</p>
      <p className="result-box__value">
        {fmt(valor)} {unidade}
      </p>
    </div>
  );
}

function SubCard({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="sub-card">
      <p className="sub-card__label">{label}</p>
      <p className="sub-card__value">{valor}</p>
    </div>
  );
}
