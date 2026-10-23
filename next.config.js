/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // exportado como arquivos estáticos (HTML/CSS/JS prontos, sem servidor Next) para entrar dentro
  // de B:\hexatenant\public\parceiros-do-aco, no mesmo projeto Vercel do site principal - mesmo
  // padrão já usado para /espiral, só que com várias páginas em vez de uma só
  output: "export",
  trailingSlash: true,
  // publicado dentro de hexatenant.com.br/parceiros-do-aco, então todas as rotas e os assets
  // estáticos (_next/*) precisam nascer com esse prefixo
  basePath: "/parceiros-do-aco",
  // a exportação estática não tem o servidor de otimização de imagem do Next, que o <Image> usa por padrão
  images: { unoptimized: true },
};

module.exports = nextConfig;
