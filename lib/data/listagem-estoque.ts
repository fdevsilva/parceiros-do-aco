import { ItemEstoque } from "@/lib/types";

// Dados de exemplo (fictícios), usados só para demonstrar o layout. Se o projeto for ligado a um
// backend/banco de dados de verdade, é aqui que a lista real entra no lugar.
export const ITENS_ESTOQUE: ItemEstoque[] = [
  { id: "e1", nome: "Tubo Metalon Quadrado 50x50x2mm", categoria: "Aços / Perfis", atual: 48, minimo: 20, unidade: "barra" },
  { id: "e2", nome: "Eletrodo Revestido E6013 2,5mm", categoria: "Consumíveis", atual: 6, minimo: 15, unidade: "kg" },
  { id: "e3", nome: "Primer Epóxi Rico em Zinco", categoria: "Tintas", atual: 0, minimo: 4, unidade: "lata" },
  { id: "e4", nome: "Parafuso Auto-brocante 4,8x19", categoria: "Fixação", atual: 1240, minimo: 300, unidade: "un" },
  { id: "e5", nome: "Motor de Portão Deslizante 1/4 HP", categoria: "Automação", atual: 3, minimo: 2, unidade: "un" },
  { id: "e6", nome: "Telha Galvalume 0,43mm", categoria: "Coberturas", atual: 85, minimo: 100, unidade: "m²" },
  { id: "e7", nome: "Luvas de Raspa", categoria: "EPIs / Serviços", atual: 22, minimo: 10, unidade: "par" },
  { id: "e8", nome: "Disco de Corte Fino 7\"", categoria: "Abrasivos", atual: 0, minimo: 20, unidade: "un" },
];

export function situacao(item: ItemEstoque): "Normal" | "Estoque baixo" | "Esgotado" {
  if (item.atual <= 0) return "Esgotado";
  if (item.atual < item.minimo) return "Estoque baixo";
  return "Normal";
}
