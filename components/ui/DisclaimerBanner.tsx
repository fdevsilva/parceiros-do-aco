export default function DisclaimerBanner() {
  return (
    <div role="note" className="disclaimer">
      <span className="disclaimer__icon">i</span>
      <span>
        <strong>Projeto modelo, apenas para demonstração de layout.</strong> Todos os nomes, empresas, valores
        e demais dados exibidos aqui são fictícios e servem só de exemplo. Nada digitado ou editado nesta tela
        é salvo: ao recarregar a página, tudo volta ao estado original (sem banco de dados). Se algum dado real
        aparecer por engano nesta demonstração, entre em contato pelo{" "}
        <a href="https://www.hexatenant.com.br" target="_blank" rel="noopener noreferrer">
          hexatenant.com.br
        </a>
        .
      </span>
    </div>
  );
}
