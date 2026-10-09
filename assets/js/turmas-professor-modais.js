// Modais da página turmas.html (assets/js/turmas-professor-pagina.js):
// - modal da turma ("Vincular Professor"): professores já vinculados (com 🗑️) e a lista só com
//   os professores que ainda NÃO estão na turma;
// - modal do vínculo (✏️): troca a turma e/ou o professor de um vínculo.
// Fecham pelo botão Fechar/Cancelar, clique fora ou Esc. Depende de estadoTp e das funções da
// página (elementoTp, criarElementoTp, preencherSelectTp, mensagemErroTp...) e de popup.js.

const SELETOR_FECHAR_MODAL_TP = "[data-fechar-modal]";
const TEXTO_TODOS_VINCULADOS_TP = "Todos os professores já estão nesta turma";
const estadoModaisTp = { turmaAberta: "", vinculoEditando: null };

/**
 * Professores que ainda não estão vinculados à turma (o "exceto" continua na lista).
 * @param {string} turmaCodigo - Código da turma.
 * @param {string} [exceto] - Id do professor que deve continuar (vínculo em edição).
 * @returns {Object[]} Professores disponíveis.
 */
function professoresDisponiveisTp(turmaCodigo, exceto) {
  const vinculados = new Set(vinculosDaTurmaTp(turmaCodigo).map((v) => v.professor_id));
  return estadoTp.professores.filter((professor) => (
    professor.id === exceto || !vinculados.has(professor.id)));
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
  estadoModaisTp.vinculoEditando = null;
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
    criarBotaoTp({ texto: "🗑️", classe: "tp-botao-icone", titulo: "Excluir vínculo",
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
 * Abre o modal "Vincular Professor" da turma.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {void}
 */
function abrirModalTurmaTp(turmaCodigo) {
  const turma = estadoTp.turmas.find((item) => item.codigo === turmaCodigo) || { codigo: turmaCodigo };
  estadoModaisTp.turmaAberta = turmaCodigo;
  elementoTp("tpTituloTurma").textContent = "Vincular professor — " + descreverTurmaTp(turma);
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
 * Preenche a lista de professores do modal de vínculo conforme a turma escolhida.
 * @returns {void}
 */
function preencherProfessoresVinculoTp() {
  const vinculo = estadoModaisTp.vinculoEditando;
  const turmaCodigo = elementoTp("tpTurmaVinculo").value;
  const disponiveis = professoresDisponiveisTp(turmaCodigo, vinculo?.professor_id);
  preencherSelectTp(elementoTp("tpProfessorVinculo"),
    disponiveis.map((p) => ({ valor: p.id, texto: descreverProfessorTp(p) })), "Escolha o professor");
  const continua = disponiveis.some((p) => p.id === vinculo?.professor_id);
  if (continua) elementoTp("tpProfessorVinculo").value = vinculo.professor_id;
}

/**
 * Abre o modal de edição de um vínculo.
 * @param {Object} vinculo - Linha da turmaprofessor.
 * @returns {void}
 */
function abrirModalVinculoTp(vinculo) {
  estadoModaisTp.vinculoEditando = vinculo;
  preencherSelectTp(elementoTp("tpTurmaVinculo"),
    estadoTp.turmas.map((t) => ({ valor: t.codigo, texto: descreverTurmaTp(t) })), "Escolha a turma");
  elementoTp("tpTurmaVinculo").value = vinculo.turma_codigo;
  preencherProfessoresVinculoTp();
  abrirModalTp(elementoTp("tpModalVinculo"));
}

/**
 * Grava a alteração do vínculo e fecha o modal.
 * @param {SubmitEvent} evento - Envio do formulário.
 * @returns {Promise<void>}
 */
async function salvarVinculoTp(evento) {
  evento.preventDefault();
  const vinculo = { turma_codigo: elementoTp("tpTurmaVinculo").value,
    professor_id: elementoTp("tpProfessorVinculo").value };
  const camposPreenchidos = vinculo.turma_codigo && vinculo.professor_id;
  if (!camposPreenchidos) {
    return void await mostrarPopup("Escolha a turma e o professor.", { tipo: "aviso" });
  }
  try {
    await estadoTp.repositorio.alterarVinculo(estadoModaisTp.vinculoEditando.id, vinculo);
  } catch (erro) {
    await mostrarPopup(mensagemErroTp(erro), { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  fecharModaisTp();
  await recarregarVinculosTp();
  await mostrarPopup("Vínculo alterado.", { tipo: "sucesso" });
}

/**
 * Liga os eventos dos modais (formulários, botões de fechar, clique fora e Esc).
 * @returns {void}
 */
function ligarEventosModaisTp() {
  elementoTp("tpFormularioTurma").addEventListener("submit", vincularProfessorTp);
  elementoTp("tpFormularioVinculo").addEventListener("submit", salvarVinculoTp);
  elementoTp("tpTurmaVinculo").addEventListener("change", preencherProfessoresVinculoTp);
  document.querySelectorAll(SELETOR_FECHAR_MODAL_TP).forEach((botao) => (
    botao.addEventListener("click", fecharModaisTp)));
  document.querySelectorAll(".tp-modal").forEach((modal) => modal.addEventListener("click",
    (evento) => { if (evento.target === modal) fecharModaisTp(); }));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModaisTp();
  });
}
