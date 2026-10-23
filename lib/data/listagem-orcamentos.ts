import { Orcamento } from "@/lib/types";

// Dados de exemplo (fictícios), usados só para demonstrar o layout. Se o projeto for ligado a um
// backend/banco de dados de verdade, é aqui que a lista real entra no lugar.
export const ORCAMENTOS: Orcamento[] = [
  { id: "o1", numero: "#000125", cliente: "Construtora Alfa Ltda", obra: "Distrito Industrial - Serra/ES", emissao: "14/10/2025", validade: "28/10/2025", status: "Rascunho", valor: 6162.5 },
  { id: "o2", numero: "#000124", cliente: "Metalúrgica Boa Vista", obra: "Galpão 2 - Cariacica/ES", emissao: "10/10/2025", validade: "24/10/2025", status: "Enviado", valor: 12480.0 },
  { id: "o3", numero: "#000123", cliente: "João Pedro Almeida", obra: "Residência - Vitória/ES", emissao: "08/10/2025", validade: "22/10/2025", status: "Aprovado", valor: 3920.0 },
  { id: "o4", numero: "#000122", cliente: "Serralheria Central", obra: "Portão automático", emissao: "05/10/2025", validade: "19/10/2025", status: "Recusado", valor: 2150.0 },
  { id: "o5", numero: "#000121", cliente: "Construtora Alfa Ltda", obra: "Cobertura - Serra/ES", emissao: "28/09/2025", validade: "12/10/2025", status: "Expirado", valor: 8740.0 },
  { id: "o6", numero: "#000120", cliente: "Oficina Reis & Filhos", obra: "Estrutura metálica galpão", emissao: "22/09/2025", validade: "06/10/2025", status: "Aprovado", valor: 15300.0 },
  { id: "o7", numero: "#000119", cliente: "Maria Fernandes", obra: "Portão de garagem", emissao: "18/09/2025", validade: "02/10/2025", status: "Enviado", valor: 1890.0 },
  { id: "o8", numero: "#000118", cliente: "Construtora Horizonte", obra: "Telhado industrial", emissao: "15/09/2025", validade: "29/09/2025", status: "Rascunho", valor: 22040.0 },
];
