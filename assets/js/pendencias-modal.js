// ── Modal do formulário da página pendencias.html (MATERIAIS/AGENDA_COLABORADOR) ──
// Abre o formulário de cadastro ("➕ Nova Pendência") e de edição (✏️ Editar) num modal.
// Fecha por Cancelar, ✖, Esc ou clique fora, sem gravar. Depende de pendencias-pagina.js
// (elementoPd, limparFormularioPd).

const ID_MODAL_PD = "pdModal";

/** Mostra o modal e põe o foco no primeiro campo. */
function abrirModalPendenciaPd() {
  elementoPd(ID_MODAL_PD).hidden = false;
  elementoPd("pdNome").focus();
}

/** Esconde o modal e volta o formulário ao modo "nova pendência". */
function fecharModalPendenciaPd() {
  elementoPd(ID_MODAL_PD).hidden = true;
  limparFormularioPd();
}

/** Abre o modal com o formulário limpo, para cadastrar. */
function abrirNovaPendenciaPd() {
  limparFormularioPd();
  abrirModalPendenciaPd();
}

/**
 * Fecha o modal com a tecla Esc, se estiver aberto.
 * @param {KeyboardEvent} evento - Tecla pressionada.
 */
function fecharModalComEscPd(evento) {
  const estaAberto = !elementoPd(ID_MODAL_PD).hidden;
  if (evento.key === "Escape" && estaAberto) fecharModalPendenciaPd();
}

/** Liga o botão "Nova Pendência" e os jeitos de fechar o modal. */
function ligarModalPendenciaPd() {
  const modal = elementoPd(ID_MODAL_PD);
  elementoPd("pdNovaPendencia").addEventListener("click", abrirNovaPendenciaPd);
  modal.querySelectorAll("[data-fechar-modal]").forEach((botao) => {
    botao.addEventListener("click", fecharModalPendenciaPd);
  });
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) fecharModalPendenciaPd();
  });
  document.addEventListener("keydown", fecharModalComEscPd);
}
