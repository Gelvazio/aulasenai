// ── Atividades das equipes (visão do professor) ─────────────────────────────────────────────
// Liga cada equipe às atividades da matéria que ela faz junto (tabela equipe_atividade, SQL em
// database/2026-10-20-equipe-atividade.sql). No modal de equipes (assets/js/equipes-modal.js):
//  - barra "Ligar TODAS as equipes da turma a uma atividade";
//  - em cada equipe, o botão "📎 Atividades" abre a lista de caixas de seleção.
// Quem pode gravar é o RLS (professor da turma); o aluno líder nem vê estes controles.
// Usa as funções e o estado do equipes-modal.js (carregado depois, usado só nos cliques).

const CLASSE_LISTA_ATIVIDADES = 'equipes-tabela__atividades';
const CLASSE_CAIXA_ATIVIDADE = 'equipes-atividades__caixa';
const MSG_ESCOLHA_ATIVIDADE = 'Escolha a atividade que será ligada às equipes.';
const MSG_SEM_ATIVIDADES = 'Esta matéria ainda não tem atividades cadastradas.';
const MSG_SEM_EQUIPES_ATIVIDADE = 'Cadastre ao menos uma equipe antes de ligar atividades.';
const MSG_LIGADAS_TODAS = 'Atividade ligada a todas as equipes da turma.';

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
  rotulo.append(caixa, ' ' + nomeDaAtividadeEquipes(dados.atividade));
  return rotulo;
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
  estadoEquipes.atividades.forEach((atividade) => celula.append(criarCaixaAtividadeEquipe(
    { equipeId, atividade, marcada: ligadas.has(atividade.id) })));
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
  try {
    if (caixa.checked) await repositorio.ligarEquipesAtividade([equipeId], atividadeId);
    else await repositorio.desligarEquipeAtividade(equipeId, atividadeId);
    atualizarEstadoLigacao({ equipeId, atividadeId, ligar: caixa.checked });
  } catch (erro) {
    caixa.checked = !caixa.checked;
    await mostrarPopup(traduzirErroEquipes(erro), { tipo: 'erro' });
  }
}
