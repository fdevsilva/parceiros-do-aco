export type Categoria =
  | "AÇOS / PERFIS"
  | "CONSUMÍVEIS"
  | "ABRASIVOS"
  | "TINTAS"
  | "FIXAÇÃO"
  | "AUTOMAÇÃO"
  | "COBERTURAS"
  | "EPIS / SERVIÇOS";

export interface Produto {
  id: string;
  nome: string;
  categoria: Categoria;
  unidade: string;
  preco: number;
}

export type TipoCliente = "PESSOA JURÍDICA" | "PESSOA FÍSICA";

export interface Cliente {
  id: string;
  nome: string;
  iniciais: string;
  tipo: TipoCliente;
  documento: string;
  telefone: string;
  endereco: string;
  qtdOrcamentos: number;
}

export type StatusOrcamento =
  | "Rascunho"
  | "Enviado"
  | "Aprovado"
  | "Recusado"
  | "Expirado";

export interface Orcamento {
  id: string;
  numero: string;
  cliente: string;
  obra: string;
  emissao: string;
  validade: string;
  status: StatusOrcamento;
  valor: number;
}

export type SituacaoEstoque = "Normal" | "Estoque baixo" | "Esgotado";

export interface ItemEstoque {
  id: string;
  nome: string;
  categoria: string;
  atual: number;
  minimo: number;
  unidade: string;
}

export type StatusFinanceiro = "A receber" | "Recebido" | "Atrasado";

export interface Lancamento {
  id: string;
  numero: string;
  cliente: string;
  vencimento: string;
  forma: string;
  status: StatusFinanceiro;
  valor: number;
}
