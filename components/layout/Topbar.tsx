export default function Topbar({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  return (
    <header className="topbar">
      <button
        type="button"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        onClick={onMenu}
        className="topbar__menu-btn"
      >
        ☰
      </button>
      <span className="topbar__wordmark">PARCEIROS DO AÇO</span>
      <label className="topbar__search">
        <span className="sr-only">Buscar</span>
        <input
          type="text"
          placeholder="Buscar clientes, itens, orçamentos..."
          className="topbar__search-input"
        />
      </label>
      <div className="topbar__user">
        <div className="topbar__user-text">
          <p className="topbar__user-name">Usuário Demo</p>
          <p className="topbar__user-role">Administrador</p>
        </div>
        <div className="topbar__avatar" />
        <span className="topbar__user-mobile only-mobile">Usuário Demo</span>
      </div>
    </header>
  );
}
