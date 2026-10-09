// Modais da página cursos.html (assets/js/cursos-pagina.js):
// - modal do curso: incluir (➕ Novo curso) ou editar (✏️) nome, unidade e descrição;
// - modal 🏫 Turmas: turmas já vinculadas ao curso (Desvincular) e as demais (Vincular; turma de
//   outro curso pede confirmação antes de mudar). Grava pela função definir_curso_turma.
// Fecham pelo botão Fechar/Cancelar, clique fora ou Esc. Depende de estadoCu e das funções da
// página (elementoCu, criarElementoCu, criarBotaoCu, descreverTurmaCu...) e de popup.js.

const SELETOR_FECHAR_MODAL_CU = "[data-fechar-modal]";
const TEXTO_SEM_DISPONIVEL_CU = "Todas as turmas já estão neste curso.";
const estadoModaisCu = { cursoEditando: null, cursoTurmas: null };

/**
 * Fecha todos os modais da página.
 * @returns {boolean} Verdadeiro se algum estava aberto.
 */
function fecharModaisCu() {
  const modais = Array.from(document.querySelectorAll(".tp-modal"));
  const haviaAberto = modais.some((modal) => !modal.hidden);
  modais.forEach((modal) => { modal.hidden = true; });
  estadoModaisCu.cursoEditando = null;
  estadoModaisCu.cursoTurmas = null;
  return haviaAberto;
}

/**
 * Abre o modal do curso: vazio para incluir ou preenchido para editar.
 * @param {Object|null} curso - Curso em edição ou null para um novo.
 */
function abrirModalCursoCu(curso) {
  estadoModaisCu.cursoEditando = curso;
  elementoCu("cuTituloCurso").textContent = curso ? "Editar curso" : "Novo curso";
  elementoCu("cuNome").value = curso?.nome_completo || "";
  elementoCu("cuUnidade").value = curso?.unidade || "";
  elementoCu("cuDescricao").value = curso?.descricao || "";
  elementoCu("cuModalCurso").hidden = false;
  elementoCu("cuNome").focus();
}

/**
 * Lê os campos do formulário do curso.
 * @returns {{nome_completo: string, unidade: string|null, descricao: string|null}} Dados.
 */
function lerFormularioCursoCu() {
  return {
    nome_completo: elementoCu("cuNome").value.trim(),
    unidade: elementoCu("cuUnidade").value.trim() || null,
    descricao: elementoCu("cuDescricao").value.trim() || null,
  };
}

/**
 * Grava o curso do formulário (inclui ou altera).
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarCursoCu(evento) {
  evento.preventDefault();
  const dados = lerFormularioCursoCu();
  if (!dados.nome_completo) {
    await mostrarPopup("Informe o nome do curso.", { tipo: "aviso" });
    return;
  }
  const editando = estadoModaisCu.cursoEditando;
  try {
    if (editando) await estadoCu.repositorio.alterarCurso(editando.id, dados);
    if (!editando) await estadoCu.repositorio.incluirCurso(dados);
  } catch (erro) {
    await mostrarPopup(mensagemErroCu(erro), { tipo: "erro", titulo: "Curso não gravado" });
    return;
  }
  fecharModaisCu();
  await recarregarDadosCu();
  await mostrarPopup(editando ? "Curso alterado." : "Curso incluído.", { tipo: "sucesso" });
}

/**
 * Abre o modal de turmas do curso.
 * @param {number} cursoId - Id do curso.
 */
function abrirModalTurmasCu(cursoId) {
  estadoModaisCu.cursoTurmas = cursoId;
  elementoCu("cuTituloTurmas").textContent = "Turmas — " + nomeDoCursoCu(cursoId);
  atualizarModalTurmasCu();
  elementoCu("cuModalTurmas").hidden = false;
}

/**
 * Cria a linha de uma turma no modal, com o botão de ação.
 * @param {Object} turma - Linha da tabela turma.
 * @param {{texto: string, aoClicar: Function}} acao - Botão da linha.
 * @returns {HTMLLIElement} Linha.
 */
function criarItemTurmaCu(turma, acao) {
  const item = criarElementoCu("li", "cu-turma");
  const descricao = criarElementoCu("span", "", descreverTurmaCu(turma));
  if (turma.curso_id !== null && turma.curso_id !== estadoModaisCu.cursoTurmas) {
    descricao.append(criarElementoCu("span", "tp-detalhe",
      "Hoje no curso: " + nomeDoCursoCu(turma.curso_id)));
  }
  item.append(descricao, criarBotaoCu({ texto: acao.texto,
    classe: "guia-botao tp-botao-pequeno", aoClicar: acao.aoClicar }));
  return item;
}

/**
 * Preenche uma lista do modal ou mostra o aviso de lista vazia.
 * @param {HTMLUListElement} lista - Lista a preencher.
 * @param {HTMLLIElement[]} itens - Itens.
 * @param {string} textoVazio - Aviso quando não há itens.
 */
function preencherListaTurmasCu(lista, itens, textoVazio) {
  lista.replaceChildren(...itens);
  if (!itens.length) lista.append(criarElementoCu("li", "tp-detalhe", textoVazio));
}

/** Redesenha o modal de turmas aberto (vinculadas e disponíveis; sem curso primeiro). */
function atualizarModalTurmasCu() {
  const cursoId = estadoModaisCu.cursoTurmas;
  if (cursoId === null) return;

  const vinculadas = turmasDoCursoCu(cursoId).map((turma) => criarItemTurmaCu(turma,
    { texto: "Desvincular", aoClicar: () => desvincularTurmaCu(turma) }));
  const disponiveis = estadoCu.turmas.filter((turma) => turma.curso_id !== cursoId)
    .sort((a, b) => Number(a.curso_id !== null) - Number(b.curso_id !== null))
    .map((turma) => criarItemTurmaCu(turma,
      { texto: "Vincular", aoClicar: () => vincularTurmaCu(turma) }));
  preencherListaTurmasCu(elementoCu("cuTurmasVinculadas"), vinculadas, TEXTO_SEM_TURMA_CU);
  preencherListaTurmasCu(elementoCu("cuTurmasDisponiveis"), disponiveis, TEXTO_SEM_DISPONIVEL_CU);
}

/**
 * Grava o curso da turma e recarrega a tela.
 * @param {string} turmaCodigo - Código da turma.
 * @param {number|null} cursoId - Id do curso ou null para desvincular.
 * @returns {Promise<boolean>} Verdadeiro se gravou.
 */
async function gravarCursoTurmaCu(turmaCodigo, cursoId) {
  try {
    await estadoCu.repositorio.definirCursoTurma(turmaCodigo, cursoId);
  } catch (erro) {
    await mostrarPopup(mensagemErroCu(erro), { tipo: "erro", titulo: "Turma não alterada" });
    return false;
  }
  await recarregarDadosCu();
  return true;
}

/**
 * Vincula a turma ao curso aberto; se ela já é de outro curso, confirma antes de mudar.
 * @param {Object} turma - Linha da tabela turma.
 */
async function vincularTurmaCu(turma) {
  const cursoId = estadoModaisCu.cursoTurmas;
  const temOutroCurso = turma.curso_id !== null;
  if (temOutroCurso) {
    const confirmou = await confirmarPopup("A turma " + turma.codigo + " está no curso \"" +
      nomeDoCursoCu(turma.curso_id) + "\". Mudar para \"" + nomeDoCursoCu(cursoId) + "\"?",
      { tipo: "pergunta", titulo: "Mudar turma de curso" });
    if (!confirmou) return;
  }
  await gravarCursoTurmaCu(turma.codigo, cursoId);
}

/**
 * Desvincula a turma do curso depois da confirmação.
 * @param {Object} turma - Linha da tabela turma.
 */
async function desvincularTurmaCu(turma) {
  const confirmou = await confirmarPopup("Desvincular a turma " + turma.codigo +
    " do curso? Os alunos dela deixam de ver o curso.",
    { tipo: "pergunta", titulo: "Desvincular turma" });
  if (!confirmou) return;
  await gravarCursoTurmaCu(turma.codigo, null);
}

/**
 * Fecha o modal ao clicar fora da caixa.
 * @param {MouseEvent} evento - Clique.
 */
function fecharAoClicarForaCu(evento) {
  if (evento.target.classList.contains("tp-modal")) fecharModaisCu();
}

/** Liga os eventos dos modais (novo curso, salvar, fechar, Esc e clique fora). */
function ligarEventosModaisCu() {
  elementoCu("cuNovoCurso").addEventListener("click", () => abrirModalCursoCu(null));
  elementoCu("cuFormularioCurso").addEventListener("submit", salvarCursoCu);
  document.querySelectorAll(SELETOR_FECHAR_MODAL_CU).forEach((botao) => {
    botao.addEventListener("click", fecharModaisCu);
  });
  document.querySelectorAll(".tp-modal").forEach((modal) => {
    modal.addEventListener("click", fecharAoClicarForaCu);
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModaisCu();
  });
}
