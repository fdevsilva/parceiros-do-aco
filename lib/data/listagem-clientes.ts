import { Cliente } from "@/lib/types";

// Dados de exemplo (fictícios), usados só para demonstrar o layout. Se o projeto for ligado a um
// backend/banco de dados de verdade, é aqui que a lista real entra no lugar.
// Nomes e documentos fictícios, apenas para exemplo de layout.
export const CLIENTES: Cliente[] = [
  { id: "c1", nome: "Construtora Alfa Ltda", iniciais: "CA", tipo: "PESSOA JURÍDICA", documento: "12.345.678/0001-90", telefone: "(27) 99999-9999", endereco: "Distrito Industrial - Serra/ES", qtdOrcamentos: 5 },
  { id: "c2", nome: "Metalúrgica Boa Vista", iniciais: "MB", tipo: "PESSOA JURÍDICA", documento: "09.876.543/0001-21", telefone: "(27) 98888-1234", endereco: "Galpão 2 - Cariacica/ES", qtdOrcamentos: 3 },
  { id: "c3", nome: "João Pedro Almeida", iniciais: "JA", tipo: "PESSOA FÍSICA", documento: "123.456.789-00", telefone: "(27) 99777-5566", endereco: "Rua das Palmeiras, 220 - Vitória/ES", qtdOrcamentos: 1 },
  { id: "c4", nome: "Serralheria Central", iniciais: "SC", tipo: "PESSOA JURÍDICA", documento: "22.333.444/0001-55", telefone: "(27) 99222-3344", endereco: "Av. Brasil, 1500 - Cariacica/ES", qtdOrcamentos: 2 },
  { id: "c5", nome: "Maria Fernandes", iniciais: "MF", tipo: "PESSOA FÍSICA", documento: "987.654.321-00", telefone: "(27) 99666-7788", endereco: "Rua Sete de Setembro, 88 - Serra/ES", qtdOrcamentos: 1 },
  { id: "c6", nome: "Oficina Reis & Filhos", iniciais: "OR", tipo: "PESSOA JURÍDICA", documento: "33.444.555/0001-12", telefone: "(27) 99111-2233", endereco: "Rod. do Sol, km 5 - Serra/ES", qtdOrcamentos: 4 },
  { id: "c7", nome: "Construtora Horizonte", iniciais: "CH", tipo: "PESSOA JURÍDICA", documento: "44.555.666/0001-78", telefone: "(27) 98333-4455", endereco: "Av. Industrial, 900 - Viana/ES", qtdOrcamentos: 2 },
];
