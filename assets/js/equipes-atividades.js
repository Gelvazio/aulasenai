// ── Atividades das equipes (visão do professor) ─────────────────────────────────────────────
// Liga cada equipe às atividades da matéria que ela faz junto (tabela equipe_atividade, SQL em
// database/2026-10-20-equipe-atividade.sql). No modal de equipes (assets/js/equipes-modal.js):
//  - barra "Ligar TODAS as equipes da turma a uma atividade";
//  - em cada equipe, o botão "📎 Atividades" abre a lista de caixas de seleção.
// Quem pode gravar é o RLS (professor da turma); o aluno líder nem vê estes controles.
// Usa as funções e o estado do equipes-modal.js (carregado depois, usado só nos cliques).

const CLASSE_LISTA_ATIVIDADES = 'equipes-tabela__atividades';
const CLASSE_CAIXA_ATIVIDADE = 'equipes-atividades__caixa';
const CLASSE_ITEM_LIGADO = 'equipes-atividades__item--ligada';
const TITULO_ATIVIDADES = 'Atividades desta equipe — marque as que ela faz junto';
const MSG_ESCOLHA_ATIVIDADE = 'Escolha a atividade que será ligada às equipes.';
const MSG_SEM_ATIVIDADES = 'Esta matéria ainda não tem atividades cadastradas.';
const MSG_SEM_EQUIPES_ATIVIDADE = 'Cadastre ao menos uma equipe antes de ligar atividades.';
const MSG_LIGADAS_TODAS = 'Atividade ligada a todas as equipes da turma.';
const ROTULO_CONFIRMAR_RESPOSTAS = '✅ Confirmar Respostas';
const TITULO_ATIVIDADES_ALUNO = 'Atividades da equipe';
const TEXTO_LIDER_CONFIRMA = 'O líder confirma as respostas da equipe.';
const MSG_CONFIRMAR_RESPOSTAS = 'As respostas do líder vão SUBSTITUIR as respostas de todos os ' +
  'integrantes da equipe nesta atividade. Continuar?';
const TITULO_CONFIRMAR_RESPOSTAS = 'Confirmar Respostas da equipe';
const CODIGO_SEM_PERMISSAO_EQUIPES = '42501';
const MSG_SEM_PERMISSAO_CONFIRMAR = 'Só o líder da equipe ou o professor pode confirmar as ' +
  'respostas.';

/**
 * Carrega as atividades ligadas às equipes do aluno (vazio se a leitura falhar).
 * @returns {Promise<Object[]>} Linhas equipe × atividade.
 */
async function carregarAtividadesDoAluno() {
  try {
    return await estadoEquipes.repositorio.listarAtividadesDaMinhaEquipe(
      estadoEquipes.materia.id);
  } catch (erro) {
    return [];
  }
}

/**
 * Cria a seção "Atividades da equipe" do card do aluno.
 * @param {number} equipeId - Id da equipe do card.
 * @returns {HTMLElement|null} Seção, ou null se a equipe não tem atividade ligada.
 */
function criarSecaoAtividadesDoAluno(equipeId) {
  const atividades = estadoEquipes.atividadesMinhaEquipe
    .filter((linha) => linha.equipe_id === equipeId);
  if (!atividades.length) return null;

  const secao = criarElementoEquipes('section', 'equipes-atividades-aluno');
  const lista = criarElementoEquipes('ul', 'equipes-atividades-aluno__lista');
  atividades.forEach((linha) => {
    const item = criarElementoEquipes('li', 'equipes-atividades-aluno__item');
    item.append(criarElementoEquipes('span', 'equipes-atividades__nome',
      linha.nome_atividade || 'Atividade ' + linha.atividade_id));
    if (linha.eu_lider) {
      item.append(criarBotaoConfirmarRespostas(equipeId, linha.atividade_id));
    }
    lista.append(item);
  });
  secao.append(criarElementoEquipes('h4', '', TITULO_ATIVIDADES_ALUNO), lista);
  const souLider = atividades.some((linha) => linha.eu_lider);
  if (!souLider) secao.append(criarElementoEquipes('small', '', TEXTO_LIDER_CONFIRMA));
  return secao;
}

/**
 * Traduz o erro da confirmação de respostas.
 * @param {Object} erro - Erro do supabase-js.
 * @returns {string} Mensagem para o usuário.
 */
function traduzirErroConfirmarRespostas(erro) {
  if (erro?.code === CODIGO_SEM_PERMISSAO_EQUIPES) return MSG_SEM_PERMISSAO_CONFIRMAR;
  return erro?.message || String(erro);
}

/**
 * Confirma as respostas do líder para a equipe (após o popup) e avisa o resultado.
 * @param {number} atividadeId - Id da atividade (data-id do botão).
 * @param {HTMLButtonElement} botao - Botão clicado (desabilitado durante a chamada).
 * @returns {Promise<void>}
 */
async function confirmarRespostasDaEquipe(atividadeId, botao) {
  const equipeId = Number(botao.dataset.equipeId);
  const confirmou = await confirmarPopup(MSG_CONFIRMAR_RESPOSTAS,
    { tipo: 'aviso', titulo: TITULO_CONFIRMAR_RESPOSTAS, textoConfirmar: 'Continuar' });
  if (!confirmou) return;

  botao.disabled = true;
  try {
    const resultado = await estadoEquipes.repositorio.confirmarRespostasEquipe(
      atividadeId, equipeId);
    const total = (resultado || []).reduce((soma, linha) => soma + linha.alunos_clonados, 0);
    await mostrarPopup('Respostas confirmadas para ' + total + ' integrante(s).',
      { tipo: 'sucesso' });
  } catch (erro) {
    await mostrarPopup(traduzirErroConfirmarRespostas(erro), { tipo: 'erro' });
  } finally {
    botao.disabled = false;
  }
}

/**
 * Diz se o usuário pode ligar equipes a atividades (só o professor; o RLS confirma no banco).
 * @returns {boolean} Verdadeiro para o professor.
 */
function podeLigarAtividadesEquipes() {
  return !estadoEquipes.ehLider;
}

/**
 * Carrega as atividades da matéria e as ligações das equipes da turma para o estado do modal.
 * @returns {Promise<void>}
 */
async function carregarAtividadesEquipes() {
  estadoEquipes.atividades = [];
  estadoEquipes.ligacoes = [];
  if (!podeLigarAtividadesEquipes()) return;

  const repositorio = estadoEquipes.repositorio;
  estadoEquipes.atividades = await repositorio.listarAtividadesDaMateria(estadoEquipes.materia.id);
  estadoEquipes.ligacoes = await repositorio.listarLigacoesAtividade(
    estadoEquipes.equipes.map((equipe) => equipe.id));
}

/**
 * Ids das atividades ligadas a uma equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {Set<number>} Ids das atividades.
 */
function atividadesDaEquipe(equipeId) {
  const ligadas = estadoEquipes.ligacoes.filter((ligacao) => ligacao.equipe_id === equipeId);
  return new Set(ligadas.map((ligacao) => ligacao.atividade_id));
}

/**
 * Rótulo do botão "Atividades" de uma equipe, com a quantidade ligada.
 * @param {number} equipeId - Id da equipe.
 * @returns {string} Texto do botão.
 */
function rotuloBotaoAtividades(equipeId) {
  return '📎 Atividades (' + atividadesDaEquipe(equipeId).size + ')';
}

/**
 * Cria o botão "Atividades" da linha da equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoAtividadesEquipe(equipeId) {
  return criarBotaoEquipes({ texto: rotuloBotaoAtividades(equipeId),
    acao: 'abrir-atividades-equipe', id: equipeId, classe: 'equipes-btn--link' });
}

/**
 * Nome mostrado de uma atividade.
 * @param {Object} atividade - Linha de atividade.
 * @returns {string} Nome (ou "Atividade N").
 */
function nomeDaAtividadeEquipes(atividade) {
  return atividade.nome_atividade || 'Atividade ' + atividade.id;
}

/**
 * Cria a barra "Ligar todas as equipes da turma a uma atividade".
 * @returns {HTMLElement|null} Barra, ou null se não for professor ou não houver equipes.
 */
function criarBarraAtividadesEquipes() {
  const semAcesso = !podeLigarAtividadesEquipes() || !estadoEquipes.equipes.length;
  if (semAcesso) return null;

  const barra = criarElementoEquipes('div', 'equipes-barra equipes-barra--atividades');
  const select = criarControleEquipes('select', 'atividade_todas');
  const opcoes = [{ valor: '', texto: 'Selecione a atividade…' }].concat(
    estadoEquipes.atividades.map((atividade) => (
      { valor: String(atividade.id), texto: nomeDaAtividadeEquipes(atividade) })));
  preencherSelectEquipes(select, opcoes, '');
  barra.append(criarCampoEquipes('Atividade', select),
    criarBotaoEquipes({ texto: '🔗 Ligar TODAS as equipes da turma', acao: 'ligar-todas-atividade',
      classe: 'equipes-btn--principal' }));
  return barra;
}

/**
 * Liga todas as equipes da turma à atividade escolhida (ignora as que já têm).
 * @returns {Promise<void>}
 */
async function ligarTodasEquipesAtividade() {
  const select = elementosEquipes.lista.querySelector('select[name="atividade_todas"]');
  const atividadeId = Number(select?.value);
  if (!atividadeId) return void await mostrarPopup(MSG_ESCOLHA_ATIVIDADE, { tipo: 'aviso' });
  if (!estadoEquipes.equipes.length) {
    return void await mostrarPopup(MSG_SEM_EQUIPES_ATIVIDADE, { tipo: 'aviso' });
  }
  const gravou = await executarGravacaoEquipes(() => (
    estadoEquipes.repositorio.ligarEquipesAtividade(
      estadoEquipes.equipes.map((equipe) => equipe.id), atividadeId)));
  if (gravou) mostrarMensagemEquipes(MSG_LIGADAS_TODAS);
}

/**
 * Cria a caixa de seleção (com rótulo) de uma atividade para uma equipe.
 * @param {{equipeId: number, atividade: Object, marcada: boolean}} dados - Dados da caixa.
 * @returns {HTMLLabelElement} Rótulo com a caixa.
 */
function criarCaixaAtividadeEquipe(dados) {
  const caixa = criarElementoEquipes('input', CLASSE_CAIXA_ATIVIDADE);
  caixa.type = 'checkbox';
  caixa.checked = dados.marcada;
  caixa.dataset.equipeId = String(dados.equipeId);
  caixa.dataset.atividadeId = String(dados.atividade.id);
  const rotulo = criarElementoEquipes('label', 'equipes-atividades__item');
  rotulo.classList.toggle(CLASSE_ITEM_LIGADO, dados.marcada);
  rotulo.append(caixa, criarElementoEquipes('span', 'equipes-atividades__nome',
    nomeDaAtividadeEquipes(dados.atividade)));
  return rotulo;
}

/**
 * Cria o botão "Confirmar Respostas" de uma atividade ligada a uma equipe.
 * @param {number} equipeId - Id da equipe.
 * @param {number} atividadeId - Id da atividade.
 * @returns {HTMLButtonElement} Botão (data-id = atividade, data-equipe-id = equipe).
 */
function criarBotaoConfirmarRespostas(equipeId, atividadeId) {
  const botao = criarBotaoEquipes({ texto: ROTULO_CONFIRMAR_RESPOSTAS,
    acao: 'confirmar-respostas', id: atividadeId, classe: 'equipes-btn--confirmar' });
  botao.dataset.equipeId = String(equipeId);
  return botao;
}

/**
 * Cria a célula do professor: caixa da atividade + botão de confirmar (só se estiver ligada).
 * @param {{equipeId: number, atividade: Object, marcada: boolean}} dados - Dados da célula.
 * @returns {HTMLDivElement} Célula da grade.
 */
function criarCelulaAtividadeProfessor(dados) {
  const celula = criarElementoEquipes('div', 'equipes-atividades__celula');
  const botao = criarBotaoConfirmarRespostas(dados.equipeId, dados.atividade.id);
  botao.hidden = !dados.marcada;
  celula.append(criarCaixaAtividadeEquipe(dados), botao);
  return celula;
}

/**
 * Mostra ou esconde o botão de confirmar conforme a caixa da atividade está marcada.
 * @param {HTMLInputElement} caixa - Caixa de seleção da atividade.
 * @returns {void}
 */
function alternarBotaoConfirmarDaCaixa(caixa) {
  const botao = caixa.closest('.equipes-atividades__celula')
    ?.querySelector('button[data-acao="confirmar-respostas"]');
  if (botao) botao.hidden = !caixa.checked;
}

/**
 * Atividades da matéria com as ligadas à equipe primeiro (demais na ordem atual).
 * @param {Set<number>} ligadas - Ids das atividades ligadas.
 * @returns {Object[]} Atividades ordenadas.
 */
function ordenarAtividadesLigadasPrimeiro(ligadas) {
  const estaLigada = (atividade) => ligadas.has(atividade.id);
  return estadoEquipes.atividades.filter(estaLigada).concat(
    estadoEquipes.atividades.filter((atividade) => !estaLigada(atividade)));
}

/**
 * Cria a linha com as caixas de seleção das atividades de uma equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {HTMLTableRowElement} Linha da lista.
 */
function criarLinhaAtividadesEquipe(equipeId) {
  const linha = criarElementoEquipes('tr', CLASSE_LISTA_ATIVIDADES);
  const celula = criarCelulaEquipes('', '', TOTAL_COLUNAS_EQUIPES);
  linha.append(celula);
  if (!estadoEquipes.atividades.length) {
    celula.append(criarElementoEquipes('span', 'equipes-vazio', MSG_SEM_ATIVIDADES));
    return linha;
  }
  const ligadas = atividadesDaEquipe(equipeId);
  const grade = criarElementoEquipes('div', 'equipes-atividades__grade');
  ordenarAtividadesLigadasPrimeiro(ligadas).forEach((atividade) => grade.append(
    criarCelulaAtividadeProfessor({ equipeId, atividade, marcada: ligadas.has(atividade.id) })));
  celula.append(criarElementoEquipes('div', 'equipes-atividades__titulo', TITULO_ATIVIDADES),
    grade);
  return linha;
}

/**
 * Abre (ou fecha, se já aberta) a lista de atividades logo abaixo da linha da equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {void}
 */
function abrirAtividadesEquipe(equipeId) {
  const grupo = obterGrupoEquipe(equipeId);
  if (!grupo) return;

  const aberta = grupo.querySelector('.' + CLASSE_LISTA_ATIVIDADES);
  if (aberta) return void aberta.remove();

  grupo.querySelector('.equipes-tabela__grupo').after(criarLinhaAtividadesEquipe(equipeId));
}

/**
 * Atualiza as ligações do estado e o texto do botão depois de marcar ou desmarcar.
 * @param {{equipeId: number, atividadeId: number, ligar: boolean}} mudanca - Mudança feita.
 * @returns {void}
 */
function atualizarEstadoLigacao(mudanca) {
  const { equipeId, atividadeId, ligar } = mudanca;
  estadoEquipes.ligacoes = estadoEquipes.ligacoes.filter((ligacao) => !(
    ligacao.equipe_id === equipeId && ligacao.atividade_id === atividadeId));
  if (ligar) estadoEquipes.ligacoes.push({ equipe_id: equipeId, atividade_id: atividadeId });
  const botao = obterGrupoEquipe(equipeId)?.querySelector(
    'button[data-acao="abrir-atividades-equipe"]');
  if (botao) botao.textContent = rotuloBotaoAtividades(equipeId);
}

/**
 * Trata a marcação/desmarcação de uma atividade da equipe: grava no banco (desfaz se falhar).
 * @param {Event} evento - Evento "change" do modal.
 * @returns {Promise<void>}
 */
async function tratarMudancaAtividadesEquipes(evento) {
  const caixa = evento.target;
  if (!caixa.classList?.contains(CLASSE_CAIXA_ATIVIDADE)) return;

  const equipeId = Number(caixa.dataset.equipeId);
  const atividadeId = Number(caixa.dataset.atividadeId);
  const repositorio = estadoEquipes.repositorio;
  const item = caixa.closest('.equipes-atividades__item');
  item?.classList.toggle(CLASSE_ITEM_LIGADO, caixa.checked);
  alternarBotaoConfirmarDaCaixa(caixa);
  try {
    if (caixa.checked) await repositorio.ligarEquipesAtividade([equipeId], atividadeId);
    else await repositorio.desligarEquipeAtividade(equipeId, atividadeId);
    atualizarEstadoLigacao({ equipeId, atividadeId, ligar: caixa.checked });
  } catch (erro) {
    caixa.checked = !caixa.checked;
    item?.classList.toggle(CLASSE_ITEM_LIGADO, caixa.checked);
    alternarBotaoConfirmarDaCaixa(caixa);
    await mostrarPopup(traduzirErroEquipes(erro), { tipo: 'erro' });
  }
}
