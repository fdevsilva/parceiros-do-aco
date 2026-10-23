const STATUS_CLASS: Record<string, string> = {
  Rascunho: "badge--rascunho",
  Enviado: "badge--enviado",
  Aprovado: "badge--aprovado",
  Recusado: "badge--recusado",
  Expirado: "badge--expirado",
  Normal: "badge--normal",
  "Estoque baixo": "badge--baixo",
  Esgotado: "badge--esgotado",
  "A receber": "badge--a-receber",
  Recebido: "badge--recebido",
  Atrasado: "badge--atrasado",
  "PESSOA JURÍDICA": "badge--pj",
  "PESSOA FÍSICA": "badge--pf",
};

const CATEGORY_CLASS: Record<string, string> = {
  "AÇOS / PERFIS": "category-badge--acos-perfis",
  CONSUMÍVEIS: "category-badge--consumiveis",
  ABRASIVOS: "category-badge--abrasivos",
  TINTAS: "category-badge--tintas",
  FIXAÇÃO: "category-badge--fixacao",
  AUTOMAÇÃO: "category-badge--automacao",
  COBERTURAS: "category-badge--coberturas",
  "EPIS / SERVIÇOS": "category-badge--epis-servicos",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_CLASS[status] ?? "badge--normal";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function CategoryBadge({ categoria }: { categoria: string }) {
  const cls = CATEGORY_CLASS[categoria] ?? "category-badge--abrasivos";
  return <span className={`category-badge ${cls}`}>{categoria}</span>;
}
