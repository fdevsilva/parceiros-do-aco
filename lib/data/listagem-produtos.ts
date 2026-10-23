import { Produto } from "@/lib/types";

// Dados de exemplo (fictícios), usados só para demonstrar o layout. Se o projeto for ligado a um
// backend/banco de dados de verdade, é aqui que a lista real entra no lugar.
// Catálogo de exemplo. Preços fictícios, editáveis apenas na tela (sem persistência).
export const PRODUTOS: Produto[] = [
  { id: "p1", nome: "Tubo Metalon Quadrado 50x50x2mm", categoria: "AÇOS / PERFIS", unidade: "barra (6m)", preco: 85.0 },
  { id: "p2", nome: "Perfil U Enrijecido 100x40x3mm", categoria: "AÇOS / PERFIS", unidade: "barra (6m)", preco: 142.0 },
  { id: "p3", nome: "Chapa de Aço Lisa Galvanizada 2mm", categoria: "AÇOS / PERFIS", unidade: "m²", preco: 68.0 },
  { id: "p4", nome: "Cantoneira de Abas Iguais 1\"", categoria: "AÇOS / PERFIS", unidade: "barra (6m)", preco: 58.0 },
  { id: "p5", nome: "Eletrodo Revestido E6013 2,5mm", categoria: "CONSUMÍVEIS", unidade: "kg", preco: 18.5 },
  { id: "p6", nome: "Arame para Solda MIG ER70S-6", categoria: "CONSUMÍVEIS", unidade: "rolo 15kg", preco: 289.0 },
  { id: "p7", nome: "Gás de Proteção Argônio/CO2", categoria: "CONSUMÍVEIS", unidade: "cilindro", preco: 210.0 },
  { id: "p8", nome: "Disco de Corte Fino 7\"", categoria: "ABRASIVOS", unidade: "un", preco: 9.8 },
  { id: "p9", nome: "Disco de Desbaste 4.1/2\"", categoria: "ABRASIVOS", unidade: "un", preco: 7.2 },
  { id: "p10", nome: "Lixa para Metal Grão 80", categoria: "ABRASIVOS", unidade: "un", preco: 3.5 },
  { id: "p11", nome: "Primer Epóxi Rico em Zinco 3,6L", categoria: "TINTAS", unidade: "lata", preco: 320.0 },
  { id: "p12", nome: "Tinta Esmalte Sintético 3,6L", categoria: "TINTAS", unidade: "lata", preco: 165.0 },
  { id: "p13", nome: "Thinner para Diluição", categoria: "TINTAS", unidade: "litro", preco: 22.0 },
  { id: "p14", nome: "Parafuso Auto-brocante 4,8x19", categoria: "FIXAÇÃO", unidade: "un", preco: 0.45 },
  { id: "p15", nome: "Chumbador Expansivo 3/8", categoria: "FIXAÇÃO", unidade: "un", preco: 2.1 },
  { id: "p16", nome: "Rebite Pop Alumínio", categoria: "FIXAÇÃO", unidade: "un", preco: 0.3 },
  { id: "p17", nome: "Motor de Portão Deslizante 1/4 HP", categoria: "AUTOMAÇÃO", unidade: "un", preco: 1250.0 },
  { id: "p18", nome: "Kit Controle Remoto Duplo", categoria: "AUTOMAÇÃO", unidade: "un", preco: 95.0 },
  { id: "p19", nome: "Telha Galvalume 0,43mm", categoria: "COBERTURAS", unidade: "m²", preco: 48.0 },
  { id: "p20", nome: "Calha Galvanizada", categoria: "COBERTURAS", unidade: "m", preco: 32.0 },
  { id: "p21", nome: "Luvas de Raspa", categoria: "EPIS / SERVIÇOS", unidade: "par", preco: 12.0 },
  { id: "p22", nome: "Óculos de Proteção", categoria: "EPIS / SERVIÇOS", unidade: "un", preco: 8.5 },
  { id: "p23", nome: "Máscara de Solda Automática", categoria: "EPIS / SERVIÇOS", unidade: "un", preco: 180.0 },
];
