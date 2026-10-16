// Modais da página turmas.html (assets/js/turmas-professor-pagina.js):
// - modal "Professores" da turma (botão 👥 da linha): professores vinculados (com 🗑️ =
//   desvincular) e a lista só com os professores que ainda NÃO estão na turma (vincular).
// - o modal dos dados da turma fica em assets/js/turmas-dados-modal.js.
// Trocar o professor = desvincular e vincular (#201). Fecham por Fechar/Cancelar, clique fora
// ou Esc. Depende de estadoTp e das funções da
// página (elementoTp, criarElementoTp, preencherSelectTp, mensagemErroTp...) e de popup.js.

const SELETOR_FECHAR_MODAL_TP = "[data-fechar-modal]";
const TEXTO_TODOS_VINCULADOS_TP = "Todos os professores já estão nesta turma";
const estadoModaisTp = { turmaAberta: "", turmaEditando: null };

/**
 * Professores que ainda não estão vinculados à turma.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Object[]} Professores disponíveis.
 */
function professoresDisponiveisTp(turmaCodigo) {
  const vinculados = new Set(vinculosDaTurmaTp(turmaCodigo).map((v) => v.professor_id));
  return estadoTp.professores.filter((professor) => !vinculados.has(professor.id));
}

/**
 * Abre um modal (div .tp-modal) e põe o foco no primeiro campo.
 * @param {HTMLElement} modal - Modal.
 * @returns {void}
 */
function abrirModalTp(modal) {
  modal.hidden = false;
  modal.querySelector("select, input")?.focus();
}

/**
 * Fecha todos os modais da página.
 * @returns {boolean} Verdadeiro se algum estava aberto.
 */
function fecharModaisTp() {
  const modais = Array.from(document.querySelectorAll(".tp-modal"));
  const haviaAberto = modais.some((modal) => !modal.hidden);
  modais.forEach((modal) => { modal.hidden = true; });
  estadoModaisTp.turmaAberta = "";
  estadoModaisTp.turmaEditando = null;
  return haviaAberto;
}

/**
 * Cria a linha de um professor da turma dentro do modal, com 🗑️.
 * @param {Object} vinculo - Linha da turmaprofessor.
 * @returns {HTMLLIElement} Linha.
 */
function criarItemProfessorModalTp(vinculo) {
  const item = criarElementoTp("li", "tp-professor");
  item.append(criarElementoTp("span", "", nomeDoProfessorTp(vinculo.professor_id)),
    criarBotaoTp({ texto: "🗑️", classe: "tp-botao-icone", titulo: "Desvincular professor",
      aoClicar: () => excluirVinculoTp(vinculo) }));
  return item;
}

/**
 * Redesenha o modal da turma aberto (professores e lista dos disponíveis).
 * @returns {void}
 */
function atualizarModalTurmaTp() {
  const turmaCodigo = estadoModaisTp.turmaAberta;
  if (!turmaCodigo) return;

  const vinculos = vinculosDaTurmaTp(turmaCodigo);
  const lista = elementoTp("tpProfessoresTurma");
  lista.replaceChildren(...vinculos.map(criarItemProfessorModalTp));
  if (!vinculos.length) lista.append(criarElementoTp("li", "tp-detalhe", TEXTO_SEM_PROFESSOR_TP));
  const disponiveis = professoresDisponiveisTp(turmaCodigo);
  const opcoes = disponiveis.map((p) => ({ valor: p.id, texto: descreverProfessorTp(p) }));
  const textoVazio = disponiveis.length ? "Escolha o professor" : TEXTO_TODOS_VINCULADOS_TP;
  preencherSelectTp(elementoTp("tpNovoProfessor"), opcoes, textoVazio);
  elementoTp("tpNovoProfessor").disabled = !disponiveis.length;
  elementoTp("tpVincular").disabled = !disponiveis.length;
}

/**
 * Abre o modal "Professores" da turma.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {void}
 */
function abrirModalTurmaTp(turmaCodigo) {
  const turma = estadoTp.turmas.find((item) => item.codigo === turmaCodigo) || { codigo: turmaCodigo };
  estadoModaisTp.turmaAberta = turmaCodigo;
  elementoTp("tpTituloTurma").textContent = "Professores — " + descreverTurmaTp(turma);
  atualizarModalTurmaTp();
  abrirModalTp(elementoTp("tpModalTurma"));
}

/**
 * Grava o professor escolhido no modal da turma (o modal continua aberto).
 * @param {SubmitEvent} evento - Envio do formulário.
 * @returns {Promise<void>}
 */
async function vincularProfessorTp(evento) {
  evento.preventDefault();
  const professorId = elementoTp("tpNovoProfessor").value;
  if (!professorId) return void await mostrarPopup("Escolha o professor.", { tipo: "aviso" });

  try {
    await estadoTp.repositorio.criarVinculo({
      turma_codigo: estadoModaisTp.turmaAberta, professor_id: professorId });
  } catch (erro) {
    await mostrarPopup(mensagemErroTp(erro), { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  await recarregarVinculosTp();
  await mostrarPopup("Professor vinculado à turma.", { tipo: "sucesso" });
}

/**
 * Liga os eventos dos modais (formulários, botões de fechar, clique fora e Esc).
 * @returns {void}
 */
function ligarEventosModaisTp() {
  elementoTp("tpFormularioTurma").addEventListener("submit", vincularProfessorTp);
  document.querySelectorAll(SELETOR_FECHAR_MODAL_TP).forEach((botao) => (
    botao.addEventListener("click", fecharModaisTp)));
  document.querySelectorAll(".tp-modal").forEach((modal) => modal.addEventListener("click",
    (evento) => { if (evento.target === modal) fecharModaisTp(); }));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModaisTp();
  });
}
