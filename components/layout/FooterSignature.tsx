import Image from "next/image";

interface FooterSignatureProps {
  // "sidebar" aparece no rodapé da barra lateral (telas largas).
  // "mobile" aparece no fim da página, já que a sidebar vira uma barra horizontal sem espaço para ela.
  variant?: "sidebar" | "mobile";
}

export default function FooterSignature({ variant = "sidebar" }: FooterSignatureProps) {
  const wrapperClass = variant === "mobile" ? "page-footer-signature" : "sidebar__footer";

  return (
    <div className={wrapperClass}>
      <a
        href="https://www.hexatenant.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar__footer-link"
      >
        <span className="sidebar__footer-label">Produzido por</span>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hexatenant-logo.png`}
          alt="Hexatenant"
          width={140}
          height={59}
          className="sidebar__footer-logo"
        />
      </a>
    </div>
  );
}
