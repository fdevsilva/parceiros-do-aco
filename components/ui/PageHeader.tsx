interface PageHeaderProps {
  title: string;
  subtitle?: string;
  // texto curto usado no mobile; sem ele o subtítulo longo aparece nos dois
  subtitleMobile?: string;
  action?: { label: string; mobileFab?: boolean };
  // controles extras alinhados à direita do título (ex.: seletor de período de Relatórios)
  children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, subtitleMobile, action, children }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && (
          <p className="page-header__subtitle">
            <span className={subtitleMobile !== undefined ? "only-desktop" : undefined}>{subtitle}</span>
            {subtitleMobile && <span className="only-mobile">{subtitleMobile}</span>}
          </p>
        )}
      </div>
      {action && (
        <>
          <button className="btn btn--primary only-desktop">{action.label}</button>
          {action.mobileFab && (
            <button aria-label={action.label} className="page-header__fab only-mobile">
              +
            </button>
          )}
        </>
      )}
      {children}
    </div>
  );
}
