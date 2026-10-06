// ── Página correcao-discursiva.html: correção das avaliações discursivas ─────
// O professor escolhe a avaliação, a turma e a tentativa entregue; para cada tópico vê a
// resposta do aluno e o padrão de resposta e lança a nota (0 até os pontos do tópico). A IA só
// sugere (assets/js/correcao-discursiva-ia.js); a nota que vale é a do professor, gravada na
// tabela correcao_discursiva (assets/js/correcao-discursiva-repositorio.js). Avisos pelo popup.

const ROTA_LOGIN_CD = "login.html";
const TEXTO_SEM_LOGIN_CD = "Entre com uma conta de professor para corrigir as avaliações.";
const TEXTO_SEM_PROFESSOR_CD = "Acesso restrito aos professores.";
const TEXTO_SEM_CLIENTE_CD = "Não foi possível conectar ao banco de dados.";
const TEXTO_SELECIONE_CD = "Selecione…";
const TEXTO_TODAS_TURMAS_CD = "Todas as turmas";
const TEXTO_SEM_ENTREGAS_CD = "Nenhuma entrega nesta seleção.";
const TEXTO_BRANCO_CD = "(em branco)";
const NOTA_MAXIMA_CD = 10;
const PASSO_NOTA_CD = "0.05";

const estadoCd = {
  repositorio: null, avaliacoes: [], entregas: [], correcoes: [], topicos: [],
  respostas: new Map(), sugestoes: new Map(), entregaAtual: null,
};

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoCd(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCd(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Formata um número com vírgula (máximo de 2 casas).
 * @param {number} valor - Número.
 * @returns {string} Número formatado.
 */
function formatarNumeroCd(valor) {
  return (Math.round(Number(valor) * 100) / 100).toString().replace(".", ",");
}

/**
 * Chave de um tópico: "item-topico".
 * @param {{item: number, topico: number}} linha - Linha com item e tópico.
 * @returns {string} Chave.
 */
function chaveTopicoCd(linha) {
  return linha.item + "-" + linha.topico;
}

/**
 * Mostra a mensagem de bloqueio e esconde o conteúdo.
 * @param {string} texto - Mensagem.
 * @param {boolean} [comLogin] - Se mostra o link ENTRAR.
 */
function bloquearPaginaCd(texto, comLogin) {
  const bloqueio = elementoCd("cdBloqueio");
  bloqueio.replaceChildren(criarElementoCd("p", "", texto));
  if (comLogin) {
    const link = criarElementoCd("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_CD + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoCd("cdConteudo").hidden = true;
}

/**
 * Mostra um aviso pelo popup (cai para o resumo da página se o popup não carregou).
 * @param {string} texto - Mensagem.
 * @param {string} tipo - Tipo do popup (sucesso, erro, aviso, info).
 * @returns {Promise<void>}
 */
async function avisarCd(texto, tipo) {
  if (typeof mostrarPopup === "function") {
    await mostrarPopup(texto, { tipo, titulo: "Correção" });
    return;
  }
  elementoCd("cdResumo").textContent = texto;
}

/**
 * Preenche um <select> com uma opção inicial e as opções informadas.
 * @param {HTMLSelectElement} lista - Combo.
 * @param {string} textoInicial - Texto da primeira opção (valor vazio).
 * @param {{valor: string, texto: string}[]} opcoes - Opções.
 */
function preencherComboCd(lista, textoInicial, opcoes) {
  const inicial = criarElementoCd("option", "", textoInicial);
  inicial.value = "";
  lista.replaceChildren(inicial, ...opcoes.map((opcao) => {
    const elemento = criarElementoCd("option", "", opcao.texto);
    elemento.value = opcao.valor;
    return elemento;
  }));
}

/**
 * Quantas notas do professor já existem numa tentativa.
 * @param {Object} entrega - Linha do resumo (aluno_id, tentativa).
 * @returns {number} Tópicos com nota do professor.
 */
function contarCorrigidosCd(entrega) {
  return estadoCd.correcoes.filter((linha) => linha.aluno_id === entrega.aluno_id &&
    linha.tentativa === entrega.tentativa && linha.nota_professor !== null).length;
}

/**
 * Texto de uma entrega no combo: "Nome — tentativa 1 — ✅ corrigida (30/30)".
 * @param {Object} entrega - Linha do resumo.
 * @returns {string} Texto da opção.
 */
function descreverEntregaCd(entrega) {
  const total = estadoCd.topicos.length;
  const corrigidos = contarCorrigidosCd(entrega);
  const situacao = corrigidos === total && total > 0 ? "✅ corrigida" : "⏳ a corrigir";
  return (entrega.nome || "Aluno") + " — tentativa " + entrega.tentativa + " — " + situacao +
    " (" + corrigidos + "/" + total + ")";
}

/**
 * Preenche o combo de turmas com as turmas das entregas.
 */
function preencherTurmasCd() {
  const turmas = new Map();
  estadoCd.entregas.forEach((linha) => turmas.set(linha.turma_codigo || "",
    (linha.turma_codigo || "Sem turma") + (linha.turma_nome ? " — " + linha.turma_nome : "")));
  const opcoes = [...turmas].map(([valor, texto]) => ({ valor, texto }));
  preencherComboCd(elementoCd("cdTurma"), TEXTO_TODAS_TURMAS_CD, opcoes);
}

/**
 * Preenche o combo de entregas (filtrado pela turma escolhida) e o resumo.
 */
function preencherEntregasCd() {
  const turma = elementoCd("cdTurma").value;
  const entregas = estadoCd.entregas.filter((linha) => !turma || linha.turma_codigo === turma);
  const opcoes = entregas.map((linha) => ({
    valor: linha.aluno_id + "|" + linha.tentativa, texto: descreverEntregaCd(linha) }));
  const lista = elementoCd("cdEntrega");
  const selecionada = lista.value;
  preencherComboCd(lista, entregas.length ? TEXTO_SELECIONE_CD : TEXTO_SEM_ENTREGAS_CD, opcoes);
  if (opcoes.some((opcao) => opcao.valor === selecionada)) lista.value = selecionada;
  const corrigidas = entregas.filter((linha) =>
    contarCorrigidosCd(linha) === estadoCd.topicos.length).length;
  elementoCd("cdResumo").textContent = entregas.length + " entrega(s) · " + corrigidas +
    " corrigida(s) · " + (entregas.length - corrigidas) + " a corrigir";
}

/**
 * Carrega entregas, tópicos e correções da avaliação escolhida.
 * @returns {Promise<void>}
 */
async function aoEscolherAvaliacaoCd() {
  const atividadeId = Number(elementoCd("cdAvaliacao").value);
  elementoCd("cdCorrecao").hidden = true;
  estadoCd.entregaAtual = null;
  if (!atividadeId) {
    estadoCd.entregas = [];
    preencherTurmasCd();
    preencherEntregasCd();
    return;
  }
  try {
    const repositorio = estadoCd.repositorio;
    [estadoCd.entregas, estadoCd.topicos, estadoCd.correcoes] = await Promise.all([
      repositorio.listarEntregas(atividadeId), repositorio.listarTopicos(atividadeId),
      repositorio.listarCorrecoes(atividadeId)]);
    preencherTurmasCd();
    preencherEntregasCd();
  } catch (erro) {
    await avisarCd("Não foi possível carregar a avaliação: " + erro.message, "erro");
  }
}

/**
 * Cria um bloco de texto rotulado (resposta do aluno, padrão ou critérios).
 * @param {string} rotulo - Rótulo do bloco.
 * @param {string} texto - Conteúdo.
 * @param {string} modificador - Classe modificadora.
 * @returns {HTMLElement} Bloco.
 */
function criarBlocoCd(rotulo, texto, modificador) {
  const bloco = criarElementoCd("div", "cd-bloco " + modificador);
  bloco.append(criarElementoCd("span", "cd-bloco__rotulo", rotulo), document.createTextNode(texto));
  return bloco;
}

/**
 * Cria um campo numérico de nota (0 até os pontos do tópico).
 * @param {string} rotulo - Rótulo.
 * @param {{campo: string, chave: string, pontos: number, valor: any}} dados - Dados do campo.
 * @returns {HTMLLabelElement} Campo com rótulo.
 */
function criarCampoNotaCd(rotulo, { campo, chave, pontos, valor }) {
  const etiqueta = criarElementoCd("label", "tp-campo", rotulo);
  const entrada = criarElementoCd("input", "guia-filtro");
  Object.assign(entrada, { type: "number", min: "0", max: String(pontos), step: PASSO_NOTA_CD });
  entrada.dataset.campo = campo;
  entrada.dataset.chave = chave;
  entrada.value = valor === null || valor === undefined ? "" : String(valor);
  etiqueta.append(entrada);
  return etiqueta;
}

/**
 * Cria a linha de notas de um tópico (IA, professor e comentário).
 * @param {Object} topico - Tópico.
 * @param {Object|undefined} correcao - Correção já gravada.
 * @returns {HTMLElement} Linha de notas.
 */
function criarNotasTopicoCd(topico, correcao) {
  const chave = chaveTopicoCd(topico);
  const pontos = Number(topico.pontos);
  const notas = criarElementoCd("div", "cd-notas");
  const comentario = criarElementoCd("label", "tp-campo cd-notas__comentario", "Comentário");
  const campoComentario = criarElementoCd("input", "guia-filtro");
  campoComentario.type = "text";
  campoComentario.dataset.campo = "comentario";
  campoComentario.dataset.chave = chave;
  campoComentario.value = correcao?.comentario || "";
  comentario.append(campoComentario);
  notas.append(
    criarCampoNotaCd("Nota da IA", { campo: "nota_ia", chave, pontos, valor: correcao?.nota_ia }),
    criarCampoNotaCd("Nota do professor (até " + formatarNumeroCd(pontos) + ")",
      { campo: "nota_professor", chave, pontos, valor: correcao?.nota_professor }),
    comentario);
  return notas;
}

/**
 * Cria o bloco de um tópico: enunciado, resposta, padrão, critérios e notas.
 * @param {Object} topico - Tópico.
 * @param {Object|undefined} correcao - Correção já gravada.
 * @returns {HTMLElement} Bloco do tópico.
 */
function criarTopicoCd(topico, correcao) {
  const bloco = criarElementoCd("div", "cd-topico");
  const letra = letraTopicoIa(topico.topico);
  bloco.append(
    criarElementoCd("p", "cd-topico__enunciado", letra + ") " + topico.enunciado + " (" +
      formatarNumeroCd(topico.pontos) + " ponto)"),
    criarBlocoCd("Resposta do aluno", estadoCd.respostas.get(chaveTopicoCd(topico)) ||
      TEXTO_BRANCO_CD, "cd-bloco--resposta"),
    criarBlocoCd("Resposta esperada", topico.resposta_esperada || "—", "cd-bloco--padrao"),
    criarBlocoCd("Critérios", topico.criterios || "—", "cd-bloco--padrao"),
    criarNotasTopicoCd(topico, correcao));
  return bloco;
}

/**
 * Desenha os itens da tentativa escolhida, agrupando os tópicos por item.
 */
function desenharItensCd() {
  const { aluno_id: alunoId, tentativa } = estadoCd.entregaAtual;
  const correcoes = new Map(estadoCd.correcoes
    .filter((linha) => linha.aluno_id === alunoId && linha.tentativa === tentativa)
    .map((linha) => [chaveTopicoCd(linha), linha]));
  const itens = new Map();
  estadoCd.topicos.forEach((topico) => {
    if (!itens.has(topico.item)) {
      const caixa = criarElementoCd("div", "cd-item");
      caixa.append(criarElementoCd("h3", "", "ITEM " + String(topico.item).padStart(2, "0")));
      itens.set(topico.item, caixa);
    }
    itens.get(topico.item).append(criarTopicoCd(topico, correcoes.get(chaveTopicoCd(topico))));
  });
  elementoCd("cdItens").replaceChildren(...itens.values());
  atualizarTotalCd();
}

/**
 * Soma as notas do professor na tela e mostra o total e a nota de 0 a 10.
 */
function atualizarTotalCd() {
  const campos = [...document.querySelectorAll('[data-campo="nota_professor"]')];
  const preenchidos = campos.filter((campo) => campo.value !== "");
  const soma = preenchidos.reduce((total, campo) => total + Number(campo.value), 0);
  const pontos = estadoCd.topicos.reduce((total, topico) => total + Number(topico.pontos), 0);
  const nota = pontos ? (soma / pontos) * NOTA_MAXIMA_CD : 0;
  elementoCd("cdTotal").textContent = "Pontos: " + formatarNumeroCd(soma) + " de " +
    formatarNumeroCd(pontos) + " · Nota: " + formatarNumeroCd(nota) + " · Tópicos corrigidos: " +
    preenchidos.length + "/" + campos.length;
}

/**
 * Abre a tentativa escolhida: lê as respostas do aluno e desenha a correção.
 * @returns {Promise<void>}
 */
async function aoEscolherEntregaCd() {
  const [alunoId, tentativa] = elementoCd("cdEntrega").value.split("|");
  const entrega = estadoCd.entregas.find((linha) =>
    linha.aluno_id === alunoId && String(linha.tentativa) === tentativa);
  elementoCd("cdCorrecao").hidden = !entrega;
  estadoCd.entregaAtual = entrega || null;
  estadoCd.sugestoes = new Map();
  elementoCd("cdRespostaIa").value = "";
  if (!entrega) return;
  try {
    const respostas = await estadoCd.repositorio.listarRespostas({
      atividadeId: Number(elementoCd("cdAvaliacao").value), alunoId,
      tentativa: Number(tentativa) });
    estadoCd.respostas = new Map(respostas.map((linha) => [chaveTopicoCd(linha), linha.texto]));
    elementoCd("cdTitulo").textContent = "2. Correção — " + (entrega.nome || "Aluno") +
      " (tentativa " + entrega.tentativa + ")";
    desenharItensCd();
  } catch (erro) {
    await avisarCd("Não foi possível ler as respostas: " + erro.message, "erro");
  }
}

/**
 * Copia o prompt da IA (sem o nome do aluno) para a área de transferência.
 * @returns {Promise<void>}
 */
async function aoCopiarPromptCd() {
  const lista = elementoCd("cdAvaliacao");
  const titulo = lista.options[lista.selectedIndex]?.textContent || "";
  const prompt = montarPromptIa(titulo, estadoCd.topicos, estadoCd.respostas);
  try {
    await navigator.clipboard.writeText(prompt);
    await avisarCd("Prompt copiado. Cole numa IA e traga a resposta para o campo abaixo.",
      "sucesso");
  } catch (erro) {
    elementoCd("cdRespostaIa").value = prompt;
    await avisarCd("Não deu para copiar sozinho: o prompt foi colocado no campo; copie dele.",
      "aviso");
  }
}

/**
 * Campo de um tópico na tela.
 * @param {string} chave - Chave "item-topico".
 * @param {string} campo - Nome do campo (data-campo).
 * @returns {HTMLInputElement|null} Campo encontrado.
 */
function campoTopicoCd(chave, campo) {
  return document.querySelector('[data-chave="' + chave + '"][data-campo="' + campo + '"]');
}

/**
 * Preenche o valor de um campo de um tópico.
 * @param {string} chave - Chave "item-topico".
 * @param {string} campo - Nome do campo (data-campo).
 * @param {string} valor - Valor.
 */
function preencherCampoCd(chave, campo, valor) {
  const entrada = campoTopicoCd(chave, campo);
  if (entrada) entrada.value = valor;
}

/**
 * Lê a resposta colada da IA e preenche as notas da IA (e o comentário vazio).
 * @returns {Promise<void>}
 */
async function aoLerIaCd() {
  estadoCd.sugestoes = lerSugestoesIa(elementoCd("cdRespostaIa").value);
  estadoCd.sugestoes.forEach((sugestao, chave) => {
    preencherCampoCd(chave, "nota_ia", String(sugestao.nota));
    const comentario = campoTopicoCd(chave, "comentario");
    if (comentario && !comentario.value) comentario.value = sugestao.comentario;
  });
  await avisarCd(estadoCd.sugestoes.size + " sugestão(ões) lida(s) de " +
    estadoCd.topicos.length + " tópico(s). Confira antes de usar.", "info");
}

/**
 * Copia as notas da IA para a nota do professor (o professor confere e salva).
 */
function aoUsarIaCd() {
  document.querySelectorAll('[data-campo="nota_ia"]').forEach((campo) => {
    if (campo.value !== "") preencherCampoCd(campo.dataset.chave, "nota_professor", campo.value);
  });
  atualizarTotalCd();
}

/**
 * Lê os campos de um tópico e monta a linha da correcao_discursiva.
 * @param {Object} topico - Tópico.
 * @param {{atividadeId: number, entrega: Object}} contexto - Avaliação e entrega.
 * @returns {Object} Linha para gravar.
 * @throws {Error} Se uma nota estiver fora de 0 até os pontos do tópico.
 */
function montarLinhaCorrecaoCd(topico, { atividadeId, entrega }) {
  const chave = chaveTopicoCd(topico);
  const ler = (campo) => campoTopicoCd(chave, campo).value;
  const numero = (texto) => (texto === "" ? null : Number(texto.replace(",", ".")));
  const notaIa = numero(ler("nota_ia"));
  const notaProfessor = numero(ler("nota_professor"));
  const foraDoLimite = [notaIa, notaProfessor].some((nota) =>
    nota !== null && (Number.isNaN(nota) || nota < 0 || nota > Number(topico.pontos)));
  if (foraDoLimite) {
    throw new Error("Item " + topico.item + "-" + letraTopicoIa(topico.topico) +
      ": a nota vai de 0 até " + formatarNumeroCd(topico.pontos) + ".");
  }
  return { aluno_id: entrega.aluno_id, atividade_id: atividadeId, tentativa: entrega.tentativa,
    item: topico.item, topico: topico.topico, nota_ia: notaIa, nota_professor: notaProfessor,
    comentario: ler("comentario").trim() || null };
}

/**
 * Grava a correção da tentativa e atualiza a lista de entregas.
 * @returns {Promise<void>}
 */
async function aoSalvarCd() {
  const entrega = estadoCd.entregaAtual;
  if (!entrega) return;
  const atividadeId = Number(elementoCd("cdAvaliacao").value);
  try {
    const linhas = estadoCd.topicos.map((topico) =>
      montarLinhaCorrecaoCd(topico, { atividadeId, entrega }));
    await estadoCd.repositorio.salvarCorrecoes(linhas);
    estadoCd.correcoes = await estadoCd.repositorio.listarCorrecoes(atividadeId);
    preencherEntregasCd();
    const faltam = linhas.filter((linha) => linha.nota_professor === null).length;
    const texto = faltam ? "Correção salva. Faltam " + faltam + " tópico(s) sem nota do " +
      "professor: a nota só aparece para o aluno com todos corrigidos."
      : "✅ Correção salva e completa.";
    await avisarCd(texto, faltam ? "aviso" : "sucesso");
  } catch (erro) {
    await avisarCd("Correção NÃO salva: " + erro.message, "erro");
  }
}

/**
 * Liga os eventos da página.
 */
function ligarEventosCd() {
  elementoCd("cdAvaliacao").addEventListener("change", aoEscolherAvaliacaoCd);
  elementoCd("cdTurma").addEventListener("change", preencherEntregasCd);
  elementoCd("cdEntrega").addEventListener("change", aoEscolherEntregaCd);
  elementoCd("cdCopiarPrompt").addEventListener("click", aoCopiarPromptCd);
  elementoCd("cdLerIa").addEventListener("click", aoLerIaCd);
  elementoCd("cdUsarIa").addEventListener("click", aoUsarIaCd);
  elementoCd("cdSalvar").addEventListener("click", aoSalvarCd);
  elementoCd("cdItens").addEventListener("input", atualizarTotalCd);
}

/**
 * Inicia a página: confere login e perfil e carrega as avaliações discursivas.
 * @returns {Promise<void>}
 */
async function iniciarCorrecaoCd() {
  const cliente = typeof obterClienteSupabase === "function" ? obterClienteSupabase() : null;
  if (!cliente) return bloquearPaginaCd(TEXTO_SEM_CLIENTE_CD);
  estadoCd.repositorio = criarRepositorioCorrecao(cliente);
  const usuario = await estadoCd.repositorio.usuarioLogado();
  if (!usuario) return bloquearPaginaCd(TEXTO_SEM_LOGIN_CD, true);
  const ehProfessor = estadoCd.repositorio.ehProfessor(usuario);
  if (!ehProfessor) return bloquearPaginaCd(TEXTO_SEM_PROFESSOR_CD);
  try {
    estadoCd.avaliacoes = await estadoCd.repositorio.listarAvaliacoesDiscursivas();
  } catch (erro) {
    return bloquearPaginaCd("Não foi possível carregar as avaliações: " + erro.message);
  }
  preencherComboCd(elementoCd("cdAvaliacao"), TEXTO_SELECIONE_CD, estadoCd.avaliacoes.map(
    (atividade) => ({ valor: String(atividade.id), texto: atividade.nome_atividade + " — " +
      decodeURIComponent(atividade.pagina).split("/").slice(-4, -2).join(" / ") })));
  ligarEventosCd();
  elementoCd("cdConteudo").hidden = false;
  return undefined;
}

document.addEventListener("DOMContentLoaded", iniciarCorrecaoCd);
