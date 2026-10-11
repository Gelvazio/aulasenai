// ── Página tasks.html: fila lida pelo agendador único (menu TASKS) ──
// Tela do Professor Administrador (tarefa #24, plano docs/fila-tasks-agendador-unico.md). Cada
// task tem 🔍 Ver, ✏️ Editar, ON/OFF, 🚫 Cancelar, 🔁 Reabrir e 🗑️ Excluir (lógico). A rotina
// agendada pega 1 task ligada por hora (pegar_proxima_task), decide se executa e grava o resultado.
// Regra: toda task existe na tabela e no GitHub (tasks/TASKS.md ou tasks/fila/TASK-NNNN.md).
// Dados: assets/js/tasks-repositorio.js; modais: assets/js/tasks-modais.js; avisos: popup.js.

const TEXTO_SEM_LOGIN_TK = "Entre com a conta do Professor Administrador para gerenciar as tasks.";
const TEXTO_SEM_ADMIN_TK = "Acesso restrito ao Professor Administrador.";
const ROTA_LOGIN_TK = "login.html";
const COLUNAS_TABELA_TK = 8;
const TAMANHO_RESUMO_TK = 140;
const STATUS_EM_EXECUCAO_TK = "em_execucao";
const STATUS_REABRIR_TK = ["recusada", "erro", "cancelada", "concluida"];
const ROTULOS_STATUS_TK = {
  pendente: "⏳ Pendente", em_execucao: "🔄 Em execução", concluida: "✅ Concluída",
  recusada: "🚫 Recusada", erro: "❌ Erro", cancelada: "⛔ Cancelada",
};

const estadoTk = { repositorio: null, tasks: [] };

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoTk(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoTk(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Cria um botão (type="button") com a ação de clique.
 * @param {{texto: string, classe: string, titulo?: string, aoClicar: Function}} opcoes - Dados.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoTk(opcoes) {
  const botao = criarElementoTk("button", opcoes.classe, opcoes.texto);
  botao.type = "button";
  if (opcoes.titulo) botao.title = opcoes.titulo;
  botao.addEventListener("click", opcoes.aoClicar);
  return botao;
}

/**
 * Mostra a mensagem de bloqueio e esconde o conteúdo.
 * @param {string} texto - Mensagem.
 * @param {boolean} [comLogin] - Se mostra o link ENTRAR.
 */
function bloquearPaginaTk(texto, comLogin) {
  const bloqueio = elementoTk("tkBloqueio");
  bloqueio.replaceChildren(criarElementoTk("p", "", texto));
  if (comLogin) {
    const link = criarElementoTk("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_TK + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoTk("tkConteudo").hidden = true;
}

/**
 * Formata data e hora no padrão brasileiro.
 * @param {string|null} valor - Data ISO do banco.
 * @returns {string} Data formatada ou "—".
 */
function formatarDataTk(valor) {
  if (!valor) return "—";
  return new Date(valor).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

/**
 * Resume um texto longo para a tabela.
 * @param {string|null} texto - Texto completo.
 * @returns {string} Texto resumido.
 */
function resumirTextoTk(texto) {
  if (!texto) return "—";
  if (texto.length <= TAMANHO_RESUMO_TK) return texto;
  return texto.slice(0, TAMANHO_RESUMO_TK) + "…";
}

/**
 * Diz se a task criada na página ainda não foi exportada para tasks/fila/ no GitHub.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {boolean} Verdadeiro se falta sincronizar.
 */
function faltaSincronizarTk(task) {
  if (task.origem !== "pagina") return false;
  if (!task.sincronizado_em) return true;
  return new Date(task.sincronizado_em) < new Date(task.atualizado_em);
}

/**
 * Lista as dependências da task que ainda não estão concluídas.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {number[]} Ids das tasks que ainda bloqueiam esta.
 */
function dependenciasAbertasTk(task) {
  return (task.task_dependente || []).map(Number).filter((id) => {
    const dependente = estadoTk.tasks.find((outra) => outra.id === id);
    return dependente?.status !== "concluida";
  });
}

/**
 * Cria a célula "Depende de": ids das dependências, com ⛓️ nas que ainda não terminaram.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaDependenciasTk(task) {
  const celula = criarElementoTk("td");
  const ids = (task.task_dependente || []).map(Number);
  if (!ids.length) {
    celula.append(criarElementoTk("span", "tp-detalhe", "—"));
    return celula;
  }
  const abertas = dependenciasAbertasTk(task);
  celula.append(criarElementoTk("span", "tk-dependencias", ids.map((id) =>
    (abertas.includes(id) ? "⛓️ " : "✅ ") + id).join(", ")));
  if (abertas.length) {
    celula.append(criarElementoTk("span", "tp-detalhe", "Aguardando " + abertas.length + " task(s)"));
  }
  return celula;
}

/**
 * Traduz o erro do banco em mensagem para o professor.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem.
 */
function mensagemErroTk(erro) {
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Grava campos de uma task e recarrega a lista (erro vira popup).
 * @param {Object} task - Linha da tabela tasks.
 * @param {Object} campos - Colunas a gravar.
 * @returns {Promise<boolean>} Verdadeiro se gravou.
 */
async function gravarCamposTk(task, campos) {
  try {
    await estadoTk.repositorio.alterarTask(task.id, campos);
  } catch (erro) {
    await mostrarPopup(mensagemErroTk(erro), { tipo: "erro", titulo: "Task não alterada" });
    return false;
  }
  await recarregarTasksTk();
  return true;
}

/**
 * Pede confirmação e grava (cancelar, reabrir, excluir).
 * @param {Object} task - Linha da tabela tasks.
 * @param {{pergunta: string, titulo: string, campos: Object}} acao - Texto e colunas.
 */
async function confirmarEGravarTk(task, acao) {
  const confirmou = await confirmarPopup(acao.pergunta + "\n\n" + task.codigo + " — " + task.titulo,
    { tipo: "pergunta", titulo: acao.titulo });
  if (confirmou) await gravarCamposTk(task, acao.campos);
}

/**
 * Cria o botão ON/OFF da task (executar).
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoOnOffTk(task) {
  const botao = criarBotaoTk({
    texto: task.executar ? "ON" : "OFF",
    classe: "tk-onoff " + (task.executar ? "tk-onoff--on" : "tk-onoff--off"),
    titulo: task.executar ? "Ligada: a IA pode pegar. Clique para desligar."
      : "Desligada: a IA não pega. Clique para ligar.",
    aoClicar: () => gravarCamposTk(task, { executar: !task.executar }),
  });
  botao.disabled = task.status === STATUS_EM_EXECUCAO_TK;
  return botao;
}

/**
 * Cria os botões de ação permitidos para a situação da task.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLButtonElement[]} Botões.
 */
function criarBotoesAcaoTk(task) {
  const classe = "guia-botao tp-botao-pequeno";
  const botoes = [criarBotaoTk({ texto: "🔍 Ver", classe, aoClicar: () => abrirDetalheTk(task) })];
  if (task.status === STATUS_EM_EXECUCAO_TK) return botoes;
  botoes.push(criarBotaoTk({ texto: "✏️ Editar", classe, aoClicar: () => abrirModalTaskTk(task) }));
  if (task.status === "pendente") {
    botoes.push(criarBotaoTk({ texto: "✅ Concluir", classe,
      titulo: "Marca como concluída (ex.: aprovação ou aceite feito pelo professor)",
      aoClicar: () => confirmarEGravarTk(task, { pergunta: "Marcar esta task como concluída?",
        titulo: "Concluir task", campos: { status: "concluida" } }) }));
    botoes.push(criarBotaoTk({ texto: "🚫 Cancelar", classe: classe + " tp-botao-secundario",
      aoClicar: () => confirmarEGravarTk(task, { pergunta: "Cancelar esta task?",
        titulo: "Cancelar task", campos: { status: "cancelada" } }) }));
  }
  if (STATUS_REABRIR_TK.includes(task.status)) {
    botoes.push(criarBotaoTk({ texto: "🔁 Reabrir", classe,
      aoClicar: () => confirmarEGravarTk(task, { pergunta: "Voltar esta task para a fila?",
        titulo: "Reabrir task", campos: { status: "pendente", tentativas: 0 } }) }));
  }
  botoes.push(criarBotaoTk({ texto: "🗑️ Excluir", classe: classe + " tp-botao-secundario",
    aoClicar: () => confirmarEGravarTk(task, { pergunta: "Excluir esta task (exclusão lógica)?",
      titulo: "Excluir task", campos: { excluido: true, executar: false } }) }));
  return botoes;
}

/**
 * Cria a célula da task: código, título e data de criação.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaTaskTk(task) {
  const celula = criarElementoTk("td");
  celula.append(criarElementoTk("strong", "tk-codigo", task.codigo),
    criarElementoTk("span", "tk-titulo", task.titulo),
    criarElementoTk("span", "tp-detalhe", "Criada em " + formatarDataTk(task.criado_em)));
  return celula;
}

/**
 * Cria a célula do status: rótulo, tentativas, data de execução e trava.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaStatusTk(task) {
  const celula = criarElementoTk("td");
  const status = criarElementoTk("span", "tk-status tk-status--" + task.status,
    ROTULOS_STATUS_TK[task.status] || task.status);
  celula.append(status, criarElementoTk("span", "tp-detalhe",
    "Tentativas: " + task.tentativas + "/" + task.max_tentativas));
  if (task.executar_apos) {
    celula.append(criarElementoTk("span", "tp-detalhe", "Após " + formatarDataTk(task.executar_apos)));
  }
  if (task.trava_frente) {
    celula.append(criarElementoTk("span", "tp-detalhe", "Com " + task.trava_frente +
      " até " + formatarDataTk(task.expira_em)));
  }
  return celula;
}

/**
 * Cria a célula do GitHub: arquivo da task, situação da sincronização e PR.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaGithubTk(task) {
  const celula = criarElementoTk("td");
  celula.append(criarElementoTk("code", "tk-arquivo", task.arquivo_md || "—"));
  const situacao = faltaSincronizarTk(task) ? "⚠️ não sincronizado" : "✅ sincronizado";
  celula.append(criarElementoTk("span", "tp-detalhe", situacao));
  if (task.pr_url) {
    const link = criarElementoTk("a", "tk-link-pr", "🔗 PR");
    link.href = task.pr_url;
    link.target = "_blank";
    link.rel = "noopener";
    celula.append(link);
  }
  return celula;
}

/**
 * Monta a linha de uma task.
 * @param {Object} task - Linha da tabela tasks.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaTk(task) {
  const linha = criarElementoTk("tr", task.executar ? "" : "tk-linha--off");
  const onOff = criarElementoTk("td");
  onOff.append(criarBotaoOnOffTk(task));
  const acoes = criarElementoTk("td", "tk-celula-acoes");
  const grupo = criarElementoTk("div", "tk-grupo-acoes");
  grupo.append(...criarBotoesAcaoTk(task));
  acoes.append(grupo);
  const ordem = (task.ordem ?? "—") + " / P" + task.prioridade;
  linha.append(criarCelulaTaskTk(task), criarElementoTk("td", "", ordem),
    criarCelulaDependenciasTk(task), onOff,
    criarCelulaStatusTk(task), criarElementoTk("td", "tk-resultado", resumirTextoTk(task.resultado)),
    criarCelulaGithubTk(task), acoes);
  return linha;
}

/**
 * Diz se a task combina com a busca e o filtro de status.
 * @param {Object} task - Linha da tabela tasks.
 * @param {{busca: string, status: string}} filtro - Busca em minúsculas e status escolhido.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function taskVisivelTk(task, filtro) {
  if (filtro.status && task.status !== filtro.status) return false;
  if (!filtro.busca) return true;
  return [task.codigo, task.titulo, task.instrucao].join(" ").toLowerCase().includes(filtro.busca);
}

/** Desenha a tabela aplicando a busca e o filtro de status. */
function desenharTasksTk() {
  const filtro = { busca: elementoTk("tkBusca").value.trim().toLowerCase(),
    status: elementoTk("tkFiltroStatus").value };
  const visiveis = estadoTk.tasks.filter((task) => taskVisivelTk(task, filtro));
  const corpo = elementoTk("tkLinhas");
  if (!visiveis.length) {
    const vazio = criarElementoTk("td", "tp-vazio", "Nenhuma task encontrada.");
    vazio.colSpan = COLUNAS_TABELA_TK;
    corpo.replaceChildren(criarElementoTk("tr"));
    corpo.firstChild.append(vazio);
  } else {
    corpo.replaceChildren(...visiveis.map(criarLinhaTk));
  }
  const naFila = estadoTk.tasks.filter((t) => t.status === "pendente" && t.executar);
  const prontas = naFila.filter((t) => !dependenciasAbertasTk(t).length).length;
  elementoTk("tkResumo").textContent = visiveis.length + " de " + estadoTk.tasks.length +
    " task(s) · " + naFila.length + " ligada(s) na fila · " + prontas + " pronta(s) para a IA";
}

/** Recarrega as tasks do banco e redesenha a tabela. */
async function recarregarTasksTk() {
  estadoTk.tasks = await estadoTk.repositorio.listarTasks();
  desenharTasksTk();
}

/** Liga os eventos dos filtros e botões do topo. */
function ligarEventosPaginaTk() {
  elementoTk("tkBusca").addEventListener("input", desenharTasksTk);
  elementoTk("tkFiltroStatus").addEventListener("change", desenharTasksTk);
  elementoTk("tkNovaTask").addEventListener("click", () => abrirModalTaskTk(null));
  elementoTk("tkAtualizar").addEventListener("click", recarregarTasksTk);
}

/** Inicia a página: confere login e Professor Administrador e carrega a fila. */
async function iniciarPaginaTk() {
  try {
    estadoTk.repositorio = criarRepositorioTasks(await obterClienteSupabase());
    if (!(await estadoTk.repositorio.usuarioLogado())) {
      bloquearPaginaTk(TEXTO_SEM_LOGIN_TK, true);
      return;
    }
    if (!(await estadoTk.repositorio.ehAdministrador())) {
      bloquearPaginaTk(TEXTO_SEM_ADMIN_TK, false);
      return;
    }
    ligarEventosPaginaTk();
    ligarEventosModaisTk();
    await recarregarTasksTk();
    elementoTk("tkConteudo").hidden = false;
  } catch (erro) {
    bloquearPaginaTk("Erro ao carregar as tasks: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaTk);
