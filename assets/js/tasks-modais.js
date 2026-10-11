// Modais da página tasks.html (assets/js/tasks-pagina.js):
// - modal da task: incluir (➕ Nova task) ou editar (✏️). Task vinda do tasks/TASKS.md
//   (origem "repositorio") não tem título nem instrução editáveis: o texto vem do GitHub;
// - modal 🔍 Ver: todos os campos da task, com a instrução e o resultado completos.
// Fecham pelo botão Fechar/Cancelar, clique fora ou Esc. Depende de estadoTk e das funções da
// página (elementoTk, criarElementoTk, formatarDataTk, recarregarTasksTk...) e de popup.js.

const SELETOR_FECHAR_MODAL_TK = "[data-fechar-modal]";
const PRIORIDADE_PADRAO_TK = 3;
const MAX_TENTATIVAS_PADRAO_TK = 3;
const MINUTOS_EM_MS_TK = 60000;
const estadoModaisTk = { taskEditando: null };

/**
 * Fecha todos os modais da página.
 * @returns {boolean} Verdadeiro se algum estava aberto.
 */
function fecharModaisTk() {
  const modais = Array.from(document.querySelectorAll(".tp-modal"));
  const haviaAberto = modais.some((modal) => !modal.hidden);
  modais.forEach((modal) => { modal.hidden = true; });
  estadoModaisTk.taskEditando = null;
  return haviaAberto;
}

/**
 * Converte a data ISO do banco para o valor de um input datetime-local (hora local).
 * @param {string|null} valor - Data ISO.
 * @returns {string} Valor "AAAA-MM-DDTHH:MM" ou vazio.
 */
function dataParaCampoTk(valor) {
  if (!valor) return "";
  const data = new Date(valor);
  const local = new Date(data.getTime() - data.getTimezoneOffset() * MINUTOS_EM_MS_TK);
  return local.toISOString().slice(0, 16);
}

/**
 * Abre o modal da task: vazio para incluir ou preenchido para editar.
 * @param {Object|null} task - Task em edição ou null para uma nova.
 */
function abrirModalTaskTk(task) {
  estadoModaisTk.taskEditando = task;
  const doRepositorio = task?.origem === "repositorio";
  elementoTk("tkTituloModal").textContent = task ? "Editar " + task.codigo : "Nova task";
  elementoTk("tkAvisoRepositorio").hidden = !doRepositorio;
  elementoTk("tkTitulo").value = task?.titulo || "";
  elementoTk("tkInstrucao").value = task?.instrucao || "";
  elementoTk("tkTitulo").readOnly = doRepositorio;
  elementoTk("tkInstrucao").readOnly = doRepositorio;
  elementoTk("tkPrioridade").value = String(task?.prioridade ?? PRIORIDADE_PADRAO_TK);
  elementoTk("tkExecutarApos").value = dataParaCampoTk(task?.executar_apos);
  elementoTk("tkMaxTentativas").value = String(task?.max_tentativas ?? MAX_TENTATIVAS_PADRAO_TK);
  elementoTk("tkExecutar").checked = task ? task.executar : true;
  elementoTk("tkModalTask").hidden = false;
  elementoTk(doRepositorio ? "tkPrioridade" : "tkTitulo").focus();
}

/**
 * Lê os campos do formulário da task.
 * @param {boolean} comTexto - Se inclui título e instrução (não vale para task do repositório).
 * @returns {Object} Colunas a gravar.
 */
function lerFormularioTaskTk(comTexto) {
  const executarApos = elementoTk("tkExecutarApos").value;
  const campos = {
    prioridade: Number(elementoTk("tkPrioridade").value),
    executar_apos: executarApos ? new Date(executarApos).toISOString() : null,
    max_tentativas: Number(elementoTk("tkMaxTentativas").value) || MAX_TENTATIVAS_PADRAO_TK,
    executar: elementoTk("tkExecutar").checked,
  };
  if (!comTexto) return campos;
  return { ...campos, titulo: elementoTk("tkTitulo").value.trim(),
    instrucao: elementoTk("tkInstrucao").value.trim() };
}

/**
 * Salva o formulário: inclui uma task nova ou altera a task em edição.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarTaskTk(evento) {
  evento.preventDefault();
  const task = estadoModaisTk.taskEditando;
  const campos = lerFormularioTaskTk(task?.origem !== "repositorio");
  if (campos.titulo === "" || campos.instrucao === "") {
    await mostrarPopup("Preencha o título e a instrução.", { tipo: "aviso", titulo: "Task" });
    return;
  }
  try {
    if (task) await estadoTk.repositorio.alterarTask(task.id, campos);
    else await estadoTk.repositorio.incluirTask(campos);
  } catch (erro) {
    await mostrarPopup(mensagemErroTk(erro), { tipo: "erro", titulo: "Task não gravada" });
    return;
  }
  fecharModaisTk();
  await recarregarTasksTk();
}

/**
 * Acrescenta um par rótulo/valor na lista do detalhe.
 * @param {HTMLElement} lista - Elemento dl.
 * @param {string} rotulo - Nome do campo.
 * @param {string} valor - Valor do campo.
 */
function adicionarDetalheTk(lista, rotulo, valor) {
  lista.append(criarElementoTk("dt", "", rotulo),
    criarElementoTk("dd", "tk-detalhe__valor", valor || "—"));
}

/**
 * Abre o modal 🔍 Ver com todos os campos da task.
 * @param {Object} task - Linha da tabela tasks.
 */
function abrirDetalheTk(task) {
  elementoTk("tkTituloDetalhe").textContent = task.codigo + " — " + task.titulo;
  const lista = elementoTk("tkDetalhe");
  lista.replaceChildren();
  adicionarDetalheTk(lista, "Status", ROTULOS_STATUS_TK[task.status] || task.status);
  adicionarDetalheTk(lista, "Ligada", task.executar ? "Sim (ON)" : "Não (OFF)");
  adicionarDetalheTk(lista, "Prioridade", String(task.prioridade));
  adicionarDetalheTk(lista, "Executar após", formatarDataTk(task.executar_apos));
  adicionarDetalheTk(lista, "Tentativas", task.tentativas + "/" + task.max_tentativas);
  adicionarDetalheTk(lista, "Origem", task.origem === "repositorio" ? "tasks/TASKS.md" : "Página");
  adicionarDetalheTk(lista, "Arquivo no GitHub", task.arquivo_md);
  adicionarDetalheTk(lista, "Sincronizado em", formatarDataTk(task.sincronizado_em));
  adicionarDetalheTk(lista, "Instrução", task.instrucao);
  adicionarDetalheTk(lista, "Resultado", task.resultado);
  adicionarDetalheTk(lista, "PR", task.pr_url);
  adicionarDetalheTk(lista, "Commit", task.commit_sha);
  adicionarDetalheTk(lista, "Atualizada em", formatarDataTk(task.atualizado_em));
  elementoTk("tkModalDetalhe").hidden = false;
}

/** Liga os eventos dos modais: salvar, fechar pelos botões, clique fora e Esc. */
function ligarEventosModaisTk() {
  elementoTk("tkFormularioTask").addEventListener("submit", salvarTaskTk);
  document.querySelectorAll(SELETOR_FECHAR_MODAL_TK).forEach((botao) => {
    botao.addEventListener("click", fecharModaisTk);
  });
  document.querySelectorAll(".tp-modal").forEach((modal) => {
    modal.addEventListener("click", (evento) => {
      if (evento.target === modal) fecharModaisTk();
    });
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModaisTk();
  });
}
