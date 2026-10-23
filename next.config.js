/** @type {import('next').NextConfig} */

// Por padrão (clone do GitHub, `npm run dev` ou `npm run build` comuns) o projeto roda solto,
// na raiz, como qualquer app Next.js. O modo abaixo só liga quando o build é feito de propósito
// para entrar dentro de B:\hexatenant\public\parceiros-do-aco, no mesmo projeto Vercel do site
// principal (mesmo padrão já usado para /espiral, só que com várias páginas em vez de uma só):
//
//   BUILD_TARGET=hexatenant npm run build
//
const paraHexatenant = process.env.BUILD_TARGET === "hexatenant";

const nextConfig = {
  reactStrictMode: true,
  ...(paraHexatenant && {
    // exportado como arquivos estáticos (HTML/CSS/JS prontos, sem servidor Next)
    output: "export",
    trailingSlash: true,
    // publicado dentro de hexatenant.com.br/parceiros-do-aco, então todas as rotas e os assets
    // estáticos (_next/*) precisam nascer com esse prefixo
    basePath: "/parceiros-do-aco",
  }),
  // a exportação estática não tem o servidor de otimização de imagem do Next, que o <Image> usa por padrão
  images: { unoptimized: true },
};

module.exports = nextConfig;
