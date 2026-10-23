import { Lancamento } from "@/lib/types";

// Dados de exemplo (fictícios), usados só para demonstrar o layout. Se o projeto for ligado a um
// backend/banco de dados de verdade, é aqui que a lista real entra no lugar.
export const LANCAMENTOS: Lancamento[] = [
  { id: "l1", numero: "#000123", cliente: "João Pedro Almeida", vencimento: "25/10/2025", forma: "Pix", status: "A receber", valor: 3920.0 },
  { id: "l2", numero: "#000120", cliente: "Oficina Reis & Filhos", vencimento: "18/10/2025", forma: "Boleto", status: "A receber", valor: 15300.0 },
  { id: "l3", numero: "#000117", cliente: "Construtora Alfa Ltda", vencimento: "10/10/2025", forma: "Transferência", status: "Recebido", valor: 8900.0 },
  { id: "l4", numero: "#000115", cliente: "Metalúrgica Boa Vista", vencimento: "02/10/2025", forma: "Pix", status: "Recebido", valor: 6420.0 },
  { id: "l5", numero: "#000111", cliente: "Serralheria Central", vencimento: "28/09/2025", forma: "Boleto", status: "Atrasado", valor: 2150.0 },
  { id: "l6", numero: "#000108", cliente: "Construtora Horizonte", vencimento: "20/09/2025", forma: "Boleto", status: "Atrasado", valor: 2000.0 },
  { id: "l7", numero: "#000105", cliente: "Maria Fernandes", vencimento: "15/09/2025", forma: "Pix", status: "Recebido", valor: 1890.0 },
];
