// Versão reduzida do aviso de dados fictícios, só no mobile: ícone "i" + texto curto no fim do conteúdo.
// No desktop o aviso completo é o DisclaimerBanner, no topo da página.
export default function DisclaimerNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="disclaimer-note only-mobile">
      <span className="disclaimer-note__icon">i</span>
      {children}
    </p>
  );
}
