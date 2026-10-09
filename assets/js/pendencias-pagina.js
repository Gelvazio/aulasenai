// ── Página pendencias.html (MATERIAIS/AGENDA_COLABORADOR): CRUD da tabela pendencias ──
// Tela do Professor Administrador para cadastrar as pendências de aulas. Dados em
// assets/js/pendencias-repositorio.js; avisos e confirmações em assets/js/popup.js; formulário
// de cadastro e edição no modal (assets/js/pendencias-modal.js).
// Segurança no banco (RLS + eh_professor_administrador). Filtros na própria página, combinados.

const STATUS_PENDENCIA = {
  PENDENTE: "⬜ Pendente",
  EM_ANDAMENTO: "🔄 Em andamento",
  CONCLUIDA: "✅ Concluída",
};
const STATUS_PADRAO_PENDENCIA = "PENDENTE";
const FILTRO_EXCLUIDO = { nao: "Não excluídas", sim: "Excluídas", todas: "Todas" };
const FILTRO_EXCLUIDO_PADRAO = "nao";
const VALOR_TODOS_PD = "";
const TEXTO_SEM_LOGIN_PD = "Entre com a conta do Professor Administrador para ver as pendências.";
const TEXTO_SEM_ADMIN_PD = "Acesso restrito ao Professor Administrador.";
const TEXTO_BOTAO_CADASTRAR_PD = "Cadastrar";
const TEXTO_BOTAO_SALVAR_PD = "Salvar alterações";
const TITULO_NOVA_PD = "Nova pendência";
const TITULO_EDITAR_PD = "Editar pendência";
const ROTA_LOGIN_PD = "../../login.html";

const estadoPd = { repositorio: null, pendencias: [], editandoId: null };

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoPd(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoPd(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Data de hoje no formato do campo date (AAAA-MM-DD), no fuso local.
 * @returns {string} Data de hoje.
 */
function hojePd() {
  const agora = new Date();
  const ajuste = agora.getTimezoneOffset() * 60000;
  return new Date(agora.getTime() - ajuste).toISOString().slice(0, 10);
}

/**
 * Formata AAAA-MM-DD como DD/MM/AAAA.
 * @param {string} data - Data do banco.
 * @returns {string} Data no padrão brasileiro.
 */
function formatarDataPd(data) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return dia + "/" + mes + "/" + ano;
}

/**
 * Preenche um <select> com pares valor → texto.
 * @param {HTMLSelectElement} select - Lista a preencher.
 * @param {Object<string, string>} opcoes - Mapa valor → texto.
 * @param {string} [textoTodos] - Texto de uma primeira opção "todos" (valor vazio), opcional.
 */
function preencherSelectPd(select, opcoes, textoTodos) {
  const pares = Object.entries(opcoes);
  if (textoTodos !== undefined) pares.unshift([VALOR_TODOS_PD, textoTodos]);
  select.replaceChildren(...pares.map(([valor, texto]) => {
    const opcao = criarElementoPd("option", "", texto);
    opcao.value = valor;
    return opcao;
  }));
}

/**
 * Mostra a mensagem de bloqueio e esconde o conteúdo.
 * @param {string} texto - Mensagem.
 * @param {boolean} [comLogin] - Se mostra o link ENTRAR.
 */
function bloquearPaginaPd(texto, comLogin) {
  const bloqueio = elementoPd("pdBloqueio");
  bloqueio.replaceChildren(criarElementoPd("p", "", texto));
  if (comLogin) {
    const link = criarElementoPd("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_PD + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoPd("pdConteudo").hidden = true;
}

/**
 * Traduz o erro do banco para uma mensagem simples.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem para o professor.
 */
function mensagemErroPd(erro) {
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Lê os filtros da tela.
 * @returns {Object} Valores dos filtros (textos já em minúsculas).
 */
function lerFiltrosPd() {
  return {
    id: elementoPd("pdFiltroId").value.trim(),
    nome: elementoPd("pdFiltroNome").value.trim().toLowerCase(),
    descricao: elementoPd("pdFiltroDescricao").value.trim().toLowerCase(),
    responsavel: elementoPd("pdFiltroResponsavel").value.trim().toLowerCase(),
    dataDe: elementoPd("pdFiltroDataDe").value,
    dataAte: elementoPd("pdFiltroDataAte").value,
    status: elementoPd("pdFiltroStatus").value,
    excluido: elementoPd("pdFiltroExcluido").value,
  };
}

/**
 * Diz se a pendência passa pelo filtro de excluído.
 * @param {Object} pendencia - Linha da tabela.
 * @param {string} filtro - "nao", "sim" ou "todas".
 * @returns {boolean} true se passa.
 */
function passaFiltroExcluidoPd(pendencia, filtro) {
  if (filtro === "todas") return true;
  const estaExcluida = Number(pendencia.excluido) === 1;
  return filtro === "sim" ? estaExcluida : !estaExcluida;
}

/**
 * Diz se a pendência atende a todos os filtros (combinados).
 * @param {Object} pendencia - Linha da tabela.
 * @param {Object} filtros - Filtros lidos da tela.
 * @returns {boolean} true se atende.
 */
function atendeFiltrosPd(pendencia, filtros) {
  if (filtros.id && String(pendencia.id) !== filtros.id) return false;
  if (filtros.nome && !pendencia.nome.toLowerCase().includes(filtros.nome)) return false;
  const descricao = (pendencia.descricao || "").toLowerCase();
  if (filtros.descricao && !descricao.includes(filtros.descricao)) return false;
  const responsavel = pendencia.responsavel.toLowerCase();
  if (filtros.responsavel && !responsavel.includes(filtros.responsavel)) return false;
  if (filtros.dataDe && pendencia.datainicio < filtros.dataDe) return false;
  if (filtros.dataAte && pendencia.datainicio > filtros.dataAte) return false;
  if (filtros.status && pendencia.status !== filtros.status) return false;
  return passaFiltroExcluidoPd(pendencia, filtros.excluido);
}

/**
 * Cria um botão pequeno de ação da linha.
 * @param {string} texto - Rótulo do botão.
 * @param {string} classe - Classe extra.
 * @param {Function} acao - Função chamada no clique.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoLinhaPd(texto, classe, acao) {
  const botao = criarElementoPd("button", "guia-botao tp-botao-pequeno " + classe, texto);
  botao.type = "button";
  botao.addEventListener("click", acao);
  return botao;
}

/**
 * Cria a lista de status da linha (troca rápida, grava na hora).
 * @param {Object} pendencia - Linha da tabela.
 * @returns {HTMLTableCellElement} Célula com a lista.
 */
function criarCelulaStatusPd(pendencia) {
  const celula = criarElementoPd("td");
  const select = criarElementoPd("select", "guia-filtro pd-status-linha");
  preencherSelectPd(select, STATUS_PENDENCIA);
  select.value = pendencia.status;
  select.setAttribute("aria-label", "Status da pendência " + pendencia.id);
  select.disabled = Number(pendencia.excluido) === 1;
  select.addEventListener("change", () => trocarStatusPd(pendencia, select));
  celula.append(select);
  return celula;
}

/**
 * Cria a célula de ações: editar e excluir, ou restaurar quando excluída.
 * @param {Object} pendencia - Linha da tabela.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaAcoesPd(pendencia) {
  const celula = criarElementoPd("td", "tp-celula-acoes");
  if (Number(pendencia.excluido) === 1) {
    celula.append(criarBotaoLinhaPd("♻️ Restaurar", "tp-botao-secundario",
      () => restaurarPendenciaPd(pendencia)));
    return celula;
  }
  celula.append(
    criarBotaoLinhaPd("✏️ Editar", "tp-botao-secundario", () => editarPendenciaPd(pendencia)),
    criarBotaoLinhaPd("🗑️ Excluir", "tp-botao-perigo", () => excluirPendenciaPd(pendencia)));
  return celula;
}

/**
 * Monta a linha da tabela de uma pendência.
 * @param {Object} pendencia - Linha da tabela.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaPd(pendencia) {
  const linha = criarElementoPd("tr");
  const estaExcluida = Number(pendencia.excluido) === 1;
  linha.classList.toggle("pd-linha--excluida", estaExcluida);
  linha.classList.toggle("tp-linha--editando", estadoPd.editandoId === pendencia.id);
  linha.append(
    criarElementoPd("td", "", String(pendencia.id)),
    criarElementoPd("td", "", pendencia.nome),
    criarElementoPd("td", "pd-descricao", pendencia.descricao || ""),
    criarElementoPd("td", "", pendencia.responsavel),
    criarElementoPd("td", "", formatarDataPd(pendencia.datainicio)),
    criarCelulaStatusPd(pendencia),
    criarElementoPd("td", "", estaExcluida ? "Sim" : "Não"),
    criarCelulaAcoesPd(pendencia));
  return linha;
}

/** Aplica os filtros e redesenha a tabela e o resumo. */
function desenharPendenciasPd() {
  const filtros = lerFiltrosPd();
  const visiveis = estadoPd.pendencias.filter((pendencia) => atendeFiltrosPd(pendencia, filtros));
  const corpo = elementoPd("pdLinhas");
  if (!visiveis.length) {
    const vazio = criarElementoPd("td", "tp-vazio", "Nenhuma pendência encontrada.");
    vazio.colSpan = 8;
    const linha = criarElementoPd("tr");
    linha.append(vazio);
    corpo.replaceChildren(linha);
  } else {
    corpo.replaceChildren(...visiveis.map(criarLinhaPd));
  }
  elementoPd("pdResumo").textContent = "Mostrando " + visiveis.length + " de " +
    estadoPd.pendencias.length + " pendência(s) cadastrada(s).";
}

/** Relê as pendências do banco e redesenha. */
async function recarregarPendenciasPd() {
  estadoPd.pendencias = await estadoPd.repositorio.listar();
  desenharPendenciasPd();
}

/** Volta o formulário ao modo "nova pendência". */
function limparFormularioPd() {
  estadoPd.editandoId = null;
  elementoPd("pdFormulario").reset();
  elementoPd("pdDataInicio").value = hojePd();
  elementoPd("pdStatus").value = STATUS_PADRAO_PENDENCIA;
  elementoPd("pdTituloFormulario").textContent = TITULO_NOVA_PD;
  elementoPd("pdSalvar").textContent = TEXTO_BOTAO_CADASTRAR_PD;
  desenharPendenciasPd();
}

/**
 * Carrega uma pendência no formulário do modal para edição e abre o modal.
 * @param {Object} pendencia - Linha da tabela.
 */
function editarPendenciaPd(pendencia) {
  estadoPd.editandoId = pendencia.id;
  elementoPd("pdNome").value = pendencia.nome;
  elementoPd("pdDescricao").value = pendencia.descricao || "";
  elementoPd("pdResponsavel").value = pendencia.responsavel;
  elementoPd("pdDataInicio").value = pendencia.datainicio;
  elementoPd("pdStatus").value = pendencia.status;
  elementoPd("pdTituloFormulario").textContent = TITULO_EDITAR_PD + " #" + pendencia.id;
  elementoPd("pdSalvar").textContent = TEXTO_BOTAO_SALVAR_PD;
  desenharPendenciasPd();
  abrirModalPendenciaPd();
}

/**
 * Lê e valida os campos do formulário.
 * @returns {Object|null} Dados da pendência, ou null se faltar algo.
 */
function lerFormularioPd() {
  const dados = {
    nome: elementoPd("pdNome").value.trim(),
    descricao: elementoPd("pdDescricao").value.trim() || null,
    responsavel: elementoPd("pdResponsavel").value.trim(),
    datainicio: elementoPd("pdDataInicio").value,
    status: elementoPd("pdStatus").value,
  };
  const estaCompleto = dados.nome && dados.responsavel && dados.datainicio && dados.status;
  return estaCompleto ? dados : null;
}

/**
 * Grava o formulário: cria ou altera a pendência.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarPendenciaPd(evento) {
  evento.preventDefault();
  const dados = lerFormularioPd();
  if (!dados) {
    await mostrarPopup("Preencha nome, responsável, data de início e status.", { tipo: "aviso" });
    return;
  }
  const editando = estadoPd.editandoId !== null;
  try {
    if (editando) await estadoPd.repositorio.alterar(estadoPd.editandoId, dados);
    else await estadoPd.repositorio.criar(dados);
  } catch (erro) {
    await mostrarPopup(mensagemErroPd(erro), { tipo: "erro", titulo: "Pendência não gravada" });
    return;
  }
  await recarregarPendenciasPd();
  fecharModalPendenciaPd();
  await mostrarPopup(editando ? "Pendência alterada." : "Pendência cadastrada.",
    { tipo: "sucesso" });
}

/**
 * Troca o status direto na linha e grava na hora.
 * @param {Object} pendencia - Linha da tabela.
 * @param {HTMLSelectElement} select - Lista de status da linha.
 */
async function trocarStatusPd(pendencia, select) {
  const novoStatus = select.value;
  try {
    await estadoPd.repositorio.alterar(pendencia.id, { status: novoStatus });
  } catch (erro) {
    select.value = pendencia.status;
    await mostrarPopup(mensagemErroPd(erro), { tipo: "erro", titulo: "Status não gravado" });
    return;
  }
  await recarregarPendenciasPd();
  await mostrarPopup("Status da pendência #" + pendencia.id + ": " +
    STATUS_PENDENCIA[novoStatus] + ".", { tipo: "sucesso" });
}

/**
 * Exclusão lógica (excluido = 1) depois da confirmação.
 * @param {Object} pendencia - Linha da tabela.
 */
async function excluirPendenciaPd(pendencia) {
  const confirmou = await confirmarPopup("Excluir a pendência #" + pendencia.id + " — " +
    pendencia.nome + "? Ela poderá ser restaurada no filtro \"Excluídas\".",
  { tipo: "pergunta", titulo: "Excluir pendência" });
  if (!confirmou) return;
  try {
    await estadoPd.repositorio.excluir(pendencia.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroPd(erro), { tipo: "erro", titulo: "Pendência não excluída" });
    return;
  }
  if (estadoPd.editandoId === pendencia.id) fecharModalPendenciaPd();
  await recarregarPendenciasPd();
  await mostrarPopup("Pendência excluída.", { tipo: "sucesso" });
}

/**
 * Restaura uma pendência excluída (excluido = 0) depois da confirmação.
 * @param {Object} pendencia - Linha da tabela.
 */
async function restaurarPendenciaPd(pendencia) {
  const confirmou = await confirmarPopup("Restaurar a pendência #" + pendencia.id + " — " +
    pendencia.nome + "?", { tipo: "pergunta", titulo: "Restaurar pendência" });
  if (!confirmou) return;
  try {
    await estadoPd.repositorio.restaurar(pendencia.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroPd(erro),
      { tipo: "erro", titulo: "Pendência não restaurada" });
    return;
  }
  await recarregarPendenciasPd();
  await mostrarPopup("Pendência restaurada.", { tipo: "sucesso" });
}

/** Preenche as listas de status e de excluído e o formulário vazio. */
function prepararCamposPd() {
  preencherSelectPd(elementoPd("pdStatus"), STATUS_PENDENCIA);
  preencherSelectPd(elementoPd("pdFiltroStatus"), STATUS_PENDENCIA, "Todos");
  preencherSelectPd(elementoPd("pdFiltroExcluido"), FILTRO_EXCLUIDO);
  elementoPd("pdFiltroExcluido").value = FILTRO_EXCLUIDO_PADRAO;
  elementoPd("pdDataInicio").value = hojePd();
  elementoPd("pdStatus").value = STATUS_PADRAO_PENDENCIA;
}

/** Liga os eventos do formulário e dos filtros. */
function ligarEventosPd() {
  elementoPd("pdFormulario").addEventListener("submit", salvarPendenciaPd);
  ligarModalPendenciaPd();
  const filtros = elementoPd("pdFiltros");
  filtros.addEventListener("input", desenharPendenciasPd);
  filtros.addEventListener("submit", (evento) => evento.preventDefault());
  // O reset limpa os campos só depois do evento; o padrão de "excluído" é reaplicado depois.
  filtros.addEventListener("reset", () => setTimeout(() => {
    elementoPd("pdFiltroExcluido").value = FILTRO_EXCLUIDO_PADRAO;
    desenharPendenciasPd();
  }));
}

/** Inicia a página: confere login e Professor Administrador e carrega as pendências. */
async function iniciarPaginaPd() {
  try {
    estadoPd.repositorio = criarRepositorioPendencias(await obterClienteSupabase());
    const usuario = await estadoPd.repositorio.usuarioLogado();
    if (!usuario) {
      bloquearPaginaPd(TEXTO_SEM_LOGIN_PD, true);
      return;
    }
    if (!(await estadoPd.repositorio.ehAdministrador())) {
      bloquearPaginaPd(TEXTO_SEM_ADMIN_PD, false);
      return;
    }
    prepararCamposPd();
    ligarEventosPd();
    await recarregarPendenciasPd();
    elementoPd("pdConteudo").hidden = false;
  } catch (erro) {
    bloquearPaginaPd("Erro ao carregar as pendências: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaPd);
