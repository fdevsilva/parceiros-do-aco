# Parceiros do Aço

Sistema de orçamentos para serralherias e estruturas metálicas. Projeto modelo, gratuito e de código aberto, construído como peça de portfólio.

## Aviso importante

Este projeto é **apenas um modelo de layout e funcionamento**. Todos os dados exibidos (clientes, orçamentos, preços, estoque, etc.) são **fictícios**. Não há banco de dados: nada do que você editar ou adicionar na tela é salvo, e tudo volta ao estado original ao recarregar a página. Se por engano algum dado real aparecer nesta demonstração, entre em contato pelo [hexatenant.com.br](https://www.hexatenant.com.br).

## Tecnologias

- [Next.js](https://nextjs.org) (App Router)
- React + TypeScript
- CSS puro (um único arquivo, `app/style.css`, com tokens em `:root`, sem framework)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Build de produção: `npm run build`. Lint: `npm run lint`. Checagem de tipos: `npx tsc --noEmit`.

### Exportação estática (uso interno da Hexatenant)

Por padrão o projeto roda normalmente, na raiz, como qualquer app Next.js. O `next.config.js` tem um modo opcional, ligado só pela variável de ambiente `BUILD_TARGET=hexatenant`, que gera uma exportação estática com prefixo `/parceiros-do-aco` para ser embutida dentro de outro site. Não é necessário para rodar ou contribuir com este projeto.

## Estrutura de pastas

```
app/                 páginas do sistema (uma pasta por área do menu)
  orcamentos/
  clientes/
  produtos/
  estoque/
  calculadora/
  financeiro/
  relatorios/
  configuracoes/
  style.css           estilo único do projeto
  layout.tsx           layout raiz (shell, menu, barra de abas mobile)
components/
  layout/              barra lateral, topo, barra de abas mobile, assinatura do rodapé
  ui/                   componentes reutilizáveis (badges, cartões, filtros, aviso de dados fictícios)
lib/
  data/                 dados de exemplo (ver seção abaixo)
  types.ts              tipos TypeScript do domínio
public/                 imagens estáticas
```

## Dados de exemplo e como ligar a um backend real

Os dados que aparecem no sistema (catálogo de produtos, clientes, orçamentos, estoque, lançamentos financeiros) são fixos no código, em `lib/data/`, um arquivo por listagem:

- `lib/data/listagem-produtos.ts`
- `lib/data/listagem-clientes.ts`
- `lib/data/listagem-orcamentos.ts`
- `lib/data/listagem-estoque.ts`
- `lib/data/listagem-financeiro.ts`

Cada página importa a lista correspondente e guarda uma cópia editável em memória (`useState`), por isso dá pra editar preço/estoque na tela, mas nada é persistido: ao recarregar a página, volta pro valor original desses arquivos.

Se for ligar o projeto a um banco de dados ou API de verdade, é exatamente **nesses arquivos de `lib/data/`** que entra a integração: trocar o array fixo por uma chamada real (fetch, Supabase, Prisma, o que for), mantendo o mesmo formato de dado (os tipos estão em `lib/types.ts`). O resto do sistema (páginas, componentes, cálculos) não precisa mudar.

## Módulos

- **Orçamentos** (`/orcamentos`): listagem com abas de status (rascunho, enviado, aprovado, recusado, expirado).
- **Clientes** (`/clientes`): cadastro pessoa física/jurídica, com número de orçamentos por cliente.
- **Produtos / Serviços** (`/produtos`): catálogo com 8 categorias (aços/perfis, consumíveis de solda, abrasivos, tintas, fixação, portões/automação, coberturas/calhas, EPIs). Preço editável só na sessão do navegador.
- **Estoque** (`/estoque`): quantidade atual x mínima por item, com situação (normal/baixo/crítico).
- **Financeiro** (`/financeiro`): contas a receber geradas a partir de orçamentos aprovados (a receber, recebido, atrasado).
- **Relatórios** (`/relatorios`): faturamento por período, orçamentos por status, top clientes e top materiais.
- **Configurações** (`/configuracoes`): perfil da empresa, usuários, aparência, notificações.
- **Calculadora** (`/calculadora`): página de apoio para o dia a dia da serralheria. Quatro modos independentes, cada um com botão "+ Adicionar à lista" e subtotal próprio (unidades diferentes não se somam num total único):
  - Peso de material (barra/perfil ou chapa, a partir do peso por metro/m² informado pelo fabricante).
  - Consumo de consumível de solda (comprimento do cordão × taxa de deposição × número de passes).
  - Rendimento de tinta (área a pintar ÷ rendimento do produto × número de demãos).
  - Área / Perímetro (retângulo ou círculo).

## Convenções do projeto

- **CSS**: um arquivo único (`app/style.css`), sem framework, sem `style` inline (exceto valores calculados em tempo real, como a altura de uma barra de gráfico). Propriedades em shorthand (`font: peso tamanho/altura família`), seletores com propriedades idênticas agrupados por vírgula.
- **Cor com significado**: reservada para status (de orçamento, financeiro, estoque) e categoria (de produto). Nunca usada só para decorar um identificador aberto, como o avatar de um cliente.
- **Comentários no código**: só em blocos realmente não triviais (ex.: cálculo de altura proporcional de gráfico, agrupamento de subtotais). Bloco simples não leva comentário.
- **Sem travessão (—)** em nenhum texto do projeto (código, comentários, UI, documentação) - usar hífen comum.
- **Padrão mobile** (abaixo de 768px): barra lateral vira gaveta (aberta pelo botão de menu ou pela aba "Mais"), navegação principal é uma barra de abas fixa no rodapé da tela, tabelas viram cartões empilhados. Duas regras não flexíveis: nenhum elemento pode gerar rolagem horizontal da página, e nenhum campo de formulário pode ter fonte menor que 16px (isso faz o iOS aplicar zoom automático ao focar o campo).

## Licença

[MIT](LICENSE). Pode usar, copiar, modificar e redistribuir livremente, inclusive em projeto comercial, mantendo o aviso de copyright.

---

Produzido por [Hexatenant](https://www.hexatenant.com.br).
