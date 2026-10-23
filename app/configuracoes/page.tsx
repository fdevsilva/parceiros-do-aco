"use client";

import { useState } from "react";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import PageHeader from "@/components/ui/PageHeader";

const ABAS = ["Perfil da Empresa", "Usuários", "Aparência", "Notificações", "Dados do Sistema", "Sobre"];

const CAMPOS_EMPRESA = [
  { label: "Nome da empresa", value: "Parceiros do Aço Serralheria e Estruturas Metálicas" },
  { label: "CNPJ", value: "00.000.000/0001-00" },
  { label: "Telefone / WhatsApp", value: "(27) 90000-0000" },
  { label: "Endereço", value: "Distrito Industrial - Serra/ES" },
  { label: "E-mail de contato", value: "contato@exemplo.com.br" },
];

export default function ConfiguracoesPage() {
  const [aba, setAba] = useState(ABAS[0]);

  return (
    <div>
      <DisclaimerBanner />

      <PageHeader
        title="Configurações"
        subtitle="Dados da empresa, usuários e preferências do sistema."
        subtitleMobile=""
      />

      <div className="settings-layout">
        <div className="settings-tabs">
          {ABAS.map((a) => (
            <button
              key={a}
              onClick={() => setAba(a)}
              className={`settings-tab${aba === a ? " settings-tab--active" : ""}`}
            >
              {a}
            </button>
          ))}
        </div>

        {aba === "Perfil da Empresa" ? (
          <div className="settings-panel">
            <div className="settings-panel__title only-mobile">{aba}</div>
            <div className="settings-panel__header">
              <div className="settings-panel__logo" />
              <div>
                <button className="btn btn--outline btn--small">Trocar logo</button>
                <div className="settings-panel__hint">PNG ou SVG, fundo transparente recomendado</div>
              </div>
            </div>

            {CAMPOS_EMPRESA.map((f) => (
              <label key={f.label} className="field">
                <span className="field__label">{f.label}</span>
                <input defaultValue={f.value} className="field__input" />
              </label>
            ))}

            <div className="settings-panel__footer">
              <button className="btn btn--primary">Salvar alterações</button>
            </div>
          </div>
        ) : (
          <div className="settings-panel">
            Seção de exemplo. Nesta demonstração, apenas &quot;Perfil da Empresa&quot; tem conteúdo detalhado.
          </div>
        )}
      </div>

      <div className="page-footer-note">
        <span className="page-footer-note__badge">i</span>
        Dados de exemplo. Sem persistência: as alterações ficam só nesta sessão do navegador.
      </div>
    </div>
  );
}
