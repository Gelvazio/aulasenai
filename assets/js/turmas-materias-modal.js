// Modal "📚 Matérias" da página turmas.html (botão do cabeçalho, #211): escolher a matéria, ver
// as turmas vinculadas a ela (🗑️ = desvincular) e vincular uma turma que ainda não está nela.
// Grava na tabela turma_materia (RLS: só o Professor Administrador). O combo "Turma:" do
// ATIVIDADES/index.html da matéria lista só essas turmas (assets/js/indice-turma-favorita.js).
// Depende de estadoTp e das funções de assets/js/turmas-professor-pagina.js e
// assets/js/turmas-professor-modais.js (abrirModalTp, fecharModaisTp) e de popup.js.

const CODIGO_TURMA_MATERIA_REPETIDA = "23505";
const TEXTO_ESCOLHA_MATERIA_TP = "Escolha a matéria";
const TEXTO_ESCOLHA_TURMA_MATERIA_TP = "Escolha a turma";
const TEXTO_TODAS_TURMAS_NA_MATERIA_TP = "Todas as turmas já estão nesta matéria";
const TEXTO_SEM_TURMA_NA_MATERIA_TP = "Nenhuma turma vinculada: o combo da matéria mostra todas.";

/**
 * Descreve uma matéria: "INTRODUCAO TIC — Assistente de Operações Logísticas".
 * @param {Object} materia - Linha da tabela materia (com o curso).
 * @returns {string} Texto da matéria.
 */
function descreverMateriaTp(materia) {
  const curso = materia.curso?.nome_completo;
  return curso ? materia.descricao + " — " + curso : materia.descricao;
}

/**
 * Id da matéria escolhida no modal.
 * @returns {number|null} Id da matéria ou null se nenhuma.
 */
function materiaEscolhidaTp() {
  const valor = elementoTp("tpMateriaEscolhida").value;
  return valor ? Number(valor) : null;
}

/**
 * Vínculos turma × matéria de uma matéria.
 * @param {number} materiaId - Id da matéria.
 * @returns {Object[]} Vínculos da matéria.
 */
function turmasDaMateriaTp(materiaId) {
  return estadoTp.turmasMaterias.filter((vinculo) => vinculo.materia_id === materiaId);
}

/**
 * Descreve a turma de um vínculo pelo código.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {string} Texto da turma.
 */
function descreverTurmaPeloCodigoTp(turmaCodigo) {
  const turma = estadoTp.turmas.find((item) => item.codigo === turmaCodigo);
  return turma ? descreverTurmaTp(turma) : turmaCodigo;
}

/**
 * Cria a linha de uma turma vinculada à matéria, com 🗑️.
 * @param {Object} vinculo - Linha da turma_materia.
 * @returns {HTMLLIElement} Linha.
 */
function criarItemTurmaMateriaTp(vinculo) {
  const item = criarElementoTp("li", "tp-professor");
  item.append(criarElementoTp("span", "", descreverTurmaPeloCodigoTp(vinculo.turma_codigo)),
    criarBotaoTp({ texto: "🗑️", classe: "tp-botao-icone", titulo: "Desvincular turma",
      aoClicar: () => desvincularTurmaMateriaTp(vinculo) }));
  return item;
}

/**
 * Preenche a lista "Vincular turma" só com as turmas que ainda não estão na matéria.
 * @param {number|null} materiaId - Id da matéria escolhida.
 */
function preencherTurmasDisponiveisTp(materiaId) {
  const vinculadas = new Set(turmasDaMateriaTp(materiaId).map((v) => v.turma_codigo));
  const disponiveis = estadoTp.turmas.filter((turma) => !vinculadas.has(turma.codigo));
  const opcoes = disponiveis.map((t) => ({ valor: t.codigo, texto: descreverTurmaTp(t) }));
  const podeVincular = Boolean(materiaId) && disponiveis.length > 0;
  const textoVazio = disponiveis.length
    ? TEXTO_ESCOLHA_TURMA_MATERIA_TP : TEXTO_TODAS_TURMAS_NA_MATERIA_TP;
  preencherSelectTp(elementoTp("tpNovaTurmaMateria"), materiaId ? opcoes : [], textoVazio);
  elementoTp("tpNovaTurmaMateria").disabled = !podeVincular;
  elementoTp("tpVincularMateria").disabled = !podeVincular;
}

/** Redesenha as turmas vinculadas e as disponíveis da matéria escolhida. */
function atualizarModalMateriasTp() {
  const materiaId = materiaEscolhidaTp();
  const vinculos = materiaId ? turmasDaMateriaTp(materiaId) : [];
  const lista = elementoTp("tpTurmasMateria");
  lista.replaceChildren(...vinculos.map(criarItemTurmaMateriaTp));
  const mostrarAviso = Boolean(materiaId) && !vinculos.length;
  const aviso = criarElementoTp("li", "tp-detalhe", TEXTO_SEM_TURMA_NA_MATERIA_TP);
  if (mostrarAviso) lista.append(aviso);
  preencherTurmasDisponiveisTp(materiaId);
}

/** Abre o modal "Matérias" com a lista de matérias. */
function abrirModalMateriasTp() {
  const opcoes = estadoTp.materias.map((materia) => (
    { valor: String(materia.id), texto: descreverMateriaTp(materia) }));
  const lista = elementoTp("tpMateriaEscolhida");
  const escolhida = lista.value;
  preencherSelectTp(lista, opcoes, TEXTO_ESCOLHA_MATERIA_TP);
  lista.value = escolhida;
  atualizarModalMateriasTp();
  abrirModalTp(elementoTp("tpModalMaterias"));
}

/** Recarrega os vínculos turma × matéria e redesenha o modal. */
async function recarregarTurmasMateriasTp() {
  estadoTp.turmasMaterias = await estadoTp.repositorio.listarTurmasMaterias();
  atualizarModalMateriasTp();
}

/**
 * Traduz o erro do banco ao gravar o vínculo turma × matéria.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem.
 */
function mensagemErroTurmaMateriaTp(erro) {
  if (erro?.code === CODIGO_TURMA_MATERIA_REPETIDA) return "Esta turma já está nesta matéria.";
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Grava a turma escolhida na matéria escolhida (o modal continua aberto).
 * @param {SubmitEvent} evento - Envio do formulário.
 * @returns {Promise<void>}
 */
async function vincularTurmaMateriaTp(evento) {
  evento.preventDefault();
  const materiaId = materiaEscolhidaTp();
  const turmaCodigo = elementoTp("tpNovaTurmaMateria").value;
  const temEscolha = Boolean(materiaId) && Boolean(turmaCodigo);
  if (!temEscolha) {
    await mostrarPopup("Escolha a matéria e a turma.", { tipo: "aviso" });
    return;
  }

  try {
    await estadoTp.repositorio.criarTurmaMateria(
      { turma_codigo: turmaCodigo, materia_id: materiaId });
  } catch (erro) {
    await mostrarPopup(mensagemErroTurmaMateriaTp(erro),
      { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  await recarregarTurmasMateriasTp();
  await mostrarPopup("Turma vinculada à matéria.", { tipo: "sucesso" });
}

/**
 * Desvincula uma turma da matéria depois da confirmação.
 * @param {Object} vinculo - Linha da turma_materia.
 * @returns {Promise<void>}
 */
async function desvincularTurmaMateriaTp(vinculo) {
  const confirmou = await confirmarPopup(
    "Tirar a turma " + vinculo.turma_codigo + " desta matéria?",
    { tipo: "pergunta", titulo: "Desvincular turma" });
  if (!confirmou) return;
  try {
    await estadoTp.repositorio.excluirTurmaMateria(vinculo.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroTurmaMateriaTp(erro),
      { tipo: "erro", titulo: "Vínculo não removido" });
    return;
  }
  await recarregarTurmasMateriasTp();
  await mostrarPopup("Turma desvinculada da matéria.", { tipo: "sucesso" });
}

/** Liga o botão 📚 Matérias, a troca de matéria e o formulário do modal. */
function ligarEventosMateriasTp() {
  elementoTp("tpMaterias").addEventListener("click", abrirModalMateriasTp);
  elementoTp("tpMateriaEscolhida").addEventListener("change", atualizarModalMateriasTp);
  elementoTp("tpFormularioMaterias").addEventListener("submit", vincularTurmaMateriaTp);
}
