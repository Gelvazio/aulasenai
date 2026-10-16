// Modal dos dados da turma na página turmas.html (#201): ➕ Nova turma e ✏️ Editar gravam a
// tabela turma; 🗑️ Excluir apaga a turma (o RLS só deixa excluir turma vazia, sem alunos e sem
// equipes). Só o Professor Administrador grava (RLS + eh_professor_administrador()).
// Depende de estadoTp, elementoTp, preencherSelectTp, recarregarTurmasTp
// (turmas-professor-pagina.js), abrirModalTp/fecharModaisTp/estadoModaisTp
// (turmas-professor-modais.js) e de popup.js.

const CODIGO_TURMA_REPETIDA_TP = "23505";
const CODIGO_TURMA_EM_USO_TP = "23503";
const TAMANHO_HORA_TP = 5;
const TEXTO_SEM_UNIDADE_TP = "(sem unidade)";
const TEXTO_SEM_CURSO_TP = "(sem curso)";
const TEXTO_TURMA_NAO_VAZIA_TP = "A turma não foi excluída: ela ainda tem alunos ou equipes. " +
  "Tire os alunos (menu ALUNOS) e as equipes antes de excluir.";
const CAMPOS_TEXTO_TURMA_TP = {
  nome: "tpNome", turno: "tpTurno", horario: "tpHorario", uc: "tpUc",
};
const CAMPOS_HORA_TURMA_TP = { hora_inicio: "tpHoraInicio", hora_fim: "tpHoraFim" };

/**
 * Converte o valor de uma lista de ids (texto) em número ou null.
 * @param {string} valor - Valor do <select>.
 * @returns {number|null} Id ou null se vazio.
 */
function idOuNuloTp(valor) {
  return valor ? Number(valor) : null;
}

/**
 * Preenche as listas de unidade e de curso do modal.
 * @returns {void}
 */
function preencherListasDadosTurmaTp() {
  preencherSelectTp(elementoTp("tpUnidade"),
    estadoTp.unidades.map((u) => ({ valor: String(u.id), texto: u.nome })), TEXTO_SEM_UNIDADE_TP);
  preencherSelectTp(elementoTp("tpCurso"),
    estadoTp.cursos.map((c) => ({ valor: String(c.id), texto: c.nome_completo })),
    TEXTO_SEM_CURSO_TP);
}

/**
 * Põe os dados da turma (ou campos vazios, se nova) no formulário.
 * @param {Object|null} turma - Turma em edição, ou null para nova.
 * @returns {void}
 */
function preencherFormularioTurmaTp(turma) {
  const dados = turma || {};
  elementoTp("tpCodigo").value = dados.codigo || "";
  elementoTp("tpCodigo").disabled = Boolean(turma);
  Object.entries(CAMPOS_TEXTO_TURMA_TP).forEach(([coluna, id]) => {
    elementoTp(id).value = dados[coluna] || "";
  });
  Object.entries(CAMPOS_HORA_TURMA_TP).forEach(([coluna, id]) => {
    elementoTp(id).value = String(dados[coluna] || "").slice(0, TAMANHO_HORA_TP);
  });
  elementoTp("tpUnidade").value = dados.unidade_id ? String(dados.unidade_id) : "";
  elementoTp("tpCurso").value = dados.curso_id ? String(dados.curso_id) : "";
  elementoTp("tpBloquearHorario").checked = dados.bloquear_horario !== false;
}

/**
 * Abre o modal dos dados da turma.
 * @param {Object|null} turma - Turma a editar, ou null para cadastrar uma nova.
 * @returns {void}
 */
function abrirModalDadosTurmaTp(turma) {
  estadoModaisTp.turmaEditando = turma;
  elementoTp("tpTituloDados").textContent = turma
    ? "Editar turma — " + descreverTurmaTp(turma) : "Nova turma";
  preencherListasDadosTurmaTp();
  preencherFormularioTurmaTp(turma);
  abrirModalTp(elementoTp("tpModalDados"));
}

/**
 * Lê o formulário e monta as colunas da turma (vazio vira null).
 * @returns {Object} Colunas da tabela turma (sem o código).
 */
function lerFormularioTurmaTp() {
  const dados = {};
  Object.entries(CAMPOS_TEXTO_TURMA_TP).forEach(([coluna, id]) => {
    dados[coluna] = elementoTp(id).value.trim() || null;
  });
  Object.entries(CAMPOS_HORA_TURMA_TP).forEach(([coluna, id]) => {
    dados[coluna] = elementoTp(id).value || null;
  });
  dados.unidade_id = idOuNuloTp(elementoTp("tpUnidade").value);
  dados.curso_id = idOuNuloTp(elementoTp("tpCurso").value);
  dados.bloquear_horario = elementoTp("tpBloquearHorario").checked;
  return dados;
}

/**
 * Traduz o erro do banco ao gravar ou excluir a turma.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem para o professor.
 */
function mensagemErroTurmaTp(erro) {
  if (erro?.code === CODIGO_TURMA_REPETIDA_TP) return "Já existe uma turma com este código.";
  if (erro?.code === CODIGO_TURMA_EM_USO_TP) return TEXTO_TURMA_NAO_VAZIA_TP;
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Grava a turma (nova ou editada) e fecha o modal.
 * @param {SubmitEvent} evento - Envio do formulário.
 * @returns {Promise<void>}
 */
async function salvarDadosTurmaTp(evento) {
  evento.preventDefault();
  const turmaEditando = estadoModaisTp.turmaEditando;
  const codigo = turmaEditando?.codigo || elementoTp("tpCodigo").value.trim();
  const dados = lerFormularioTurmaTp();
  const camposObrigatorios = codigo && dados.nome;
  if (!camposObrigatorios) {
    return void await mostrarPopup("Preencha o código e o nome da turma.", { tipo: "aviso" });
  }
  try {
    if (turmaEditando) await estadoTp.repositorio.alterarTurma(codigo, dados);
    else await estadoTp.repositorio.criarTurma({ codigo, ...dados });
  } catch (erro) {
    await mostrarPopup(mensagemErroTurmaTp(erro), { tipo: "erro", titulo: "Turma não gravada" });
    return;
  }
  fecharModaisTp();
  await recarregarTurmasTp();
  await mostrarPopup(turmaEditando ? "Turma alterada." : "Turma cadastrada.", { tipo: "sucesso" });
}

/**
 * Exclui a turma depois da confirmação (só turma vazia; os vínculos de professor saem junto).
 * @param {Object} turma - Linha da tabela turma.
 * @returns {Promise<void>}
 */
async function excluirTurmaTp(turma) {
  const confirmou = await confirmarPopup("Excluir a turma " + descreverTurmaTp(turma) +
    "? Os vínculos de professor desta turma também saem.",
  { tipo: "pergunta", titulo: "Excluir turma" });
  if (!confirmou) return;

  let excluiu = false;
  try {
    excluiu = await estadoTp.repositorio.excluirTurma(turma.codigo);
  } catch (erro) {
    await mostrarPopup(mensagemErroTurmaTp(erro), { tipo: "erro", titulo: "Turma não excluída" });
    return;
  }
  if (!excluiu) {
    await mostrarPopup(TEXTO_TURMA_NAO_VAZIA_TP, { tipo: "erro", titulo: "Turma não excluída" });
    return;
  }
  await recarregarTurmasTp();
  await mostrarPopup("Turma excluída.", { tipo: "sucesso" });
}

/**
 * Liga o botão ➕ Nova turma e o envio do formulário dos dados da turma.
 * @returns {void}
 */
function ligarEventosDadosTurmaTp() {
  elementoTp("tpNovaTurma").addEventListener("click", () => abrirModalDadosTurmaTp(null));
  elementoTp("tpFormularioDados").addEventListener("submit", salvarDadosTurmaTp);
}
