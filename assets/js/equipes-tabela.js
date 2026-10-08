// Tabela simples das equipes do modal (visão do professor, assets/js/equipes-modal.js): um grupo
// por equipe — linha da equipe (nome, quantidade e ações + Integrante / ✏️ / 🗑️) e uma linha por
// integrante (👑 no líder, papel e ✏️ / 🗑️). "+ Integrante" abre a seleção só com os alunos sem
// equipe. Pedido do usuário em 2026-10-08 (simplificada no mesmo dia).
// Usa as funções e o estado do equipes-modal.js (carregado depois, usado só nos cliques).

const COLUNAS_TABELA_EQUIPES = ['Equipe / Integrante', 'Papel', ''];
const TOTAL_COLUNAS_EQUIPES = COLUNAS_TABELA_EQUIPES.length;
const CLASSE_SELETOR_INTEGRANTE = 'equipes-tabela__seletor';
const MSG_TODOS_COM_EQUIPE = 'Todos os alunos da turma já estão em uma equipe.';
const MSG_ESCOLHA_INTEGRANTE = 'Escolha o aluno que vai entrar na equipe.';

/**
 * Cria uma célula com texto (e colspan opcional).
 * @param {string} texto - Conteúdo da célula.
 * @param {string} [classe] - Classe CSS.
 * @param {number} [colunas] - Quantidade de colunas ocupadas.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaEquipes(texto, classe, colunas) {
  const celula = criarElementoEquipes('td', classe, texto);
  if (colunas) celula.colSpan = colunas;
  return celula;
}

/**
 * Cria a célula de ações com os botões informados.
 * @param {HTMLButtonElement[]} botoes - Botões da linha.
 * @returns {HTMLTableCellElement} Célula de ações.
 */
function criarCelulaAcoesEquipes(botoes) {
  const celula = criarElementoEquipes('td', 'equipes-tabela__acoes');
  const grupo = criarElementoEquipes('div', 'equipes-acoes');
  grupo.append(...botoes);
  celula.append(grupo);
  return celula;
}

/**
 * Cria um botão só com ícone (o texto da ação vai no title e no aria-label).
 * @param {{icone: string, titulo: string, acao: string, id: number, classe?: string}} opcoes -
 *   Dados do botão.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoIconeEquipes(opcoes) {
  const botao = criarBotaoEquipes({ texto: opcoes.icone, acao: opcoes.acao, id: opcoes.id,
    classe: 'equipes-btn--icone ' + (opcoes.classe || '') });
  botao.title = opcoes.titulo;
  botao.setAttribute('aria-label', opcoes.titulo);
  return botao;
}

/**
 * Cria a linha da equipe: nome (quantidade) e ações.
 * @param {Object} equipe - Equipe.
 * @param {number} total - Quantidade de integrantes.
 * @returns {HTMLTableRowElement} Linha da equipe.
 */
function criarLinhaGrupoEquipe(equipe, total) {
  const linha = criarElementoEquipes('tr', 'equipes-tabela__grupo');
  const nome = criarCelulaEquipes('', 'equipes-tabela__nome', TOTAL_COLUNAS_EQUIPES - 1);
  nome.append(criarElementoEquipes('strong', '', equipe.nome + ' (' + total + ')'));
  if (equipe.descricao) nome.title = equipe.descricao;
  linha.append(nome, criarCelulaAcoesEquipes([
    criarBotaoEquipes({ texto: '+ Integrante', acao: 'abrir-integrante', id: equipe.id,
      classe: 'equipes-btn--link' }),
    criarBotaoIconeEquipes({ icone: '✏️', titulo: 'Editar equipe', acao: 'editar-equipe',
      id: equipe.id }),
    criarBotaoIconeEquipes({ icone: '🗑️', titulo: 'Excluir equipe', acao: 'excluir-equipe',
      id: equipe.id })]));
  return linha;
}

/**
 * Cria a linha de um integrante.
 * @param {Object} membro - Integrante.
 * @returns {HTMLTableRowElement} Linha do integrante.
 */
function criarLinhaMembroTabela(membro) {
  const linha = criarElementoEquipes('tr', 'equipes-tabela__membro');
  const coroa = membro.lider ? '👑 ' : '';
  const nome = criarCelulaEquipes(coroa + nomeDoAlunoEquipes(membro.aluno_id));
  if (membro.tarefas) nome.title = membro.tarefas;
  linha.append(nome, criarCelulaEquipes(membro.papel || ''),
    criarCelulaAcoesEquipes([
      criarBotaoIconeEquipes({ icone: '✏️', titulo: 'Editar integrante', acao: 'editar-membro',
        id: membro.id }),
      criarBotaoIconeEquipes({ icone: '🗑️', titulo: 'Remover integrante', acao: 'excluir-membro',
        id: membro.id })]));
  return linha;
}

/**
 * Cria o grupo (tbody) de uma equipe com os integrantes.
 * @param {Object} equipe - Equipe.
 * @returns {HTMLTableSectionElement} Grupo da equipe.
 */
function criarGrupoEquipe(equipe) {
  const membros = membrosDaEquipe(equipe.id);
  const grupo = criarElementoEquipes('tbody', 'equipes-tabela__equipe');
  grupo.dataset.equipeId = String(equipe.id);
  grupo.append(criarLinhaGrupoEquipe(equipe, membros.length), ...membros.map(criarLinhaMembroTabela));
  if (!membros.length) {
    const vazio = criarElementoEquipes('tr', 'equipes-tabela__membro');
    vazio.append(criarCelulaEquipes('Sem integrantes.', 'equipes-vazio', TOTAL_COLUNAS_EQUIPES));
    grupo.append(vazio);
  }
  return grupo;
}

/**
 * Cria a tabela de todas as equipes da turma + matéria.
 * @returns {HTMLTableElement|HTMLParagraphElement} Tabela, ou aviso se não houver equipes.
 */
function criarTabelaEquipes() {
  if (!estadoEquipes.equipes.length) {
    return criarElementoEquipes('p', 'equipes-vazio', 'Nenhuma equipe cadastrada nesta turma.');
  }
  const tabela = criarElementoEquipes('table', 'equipes-tabela');
  const cabecalho = tabela.createTHead().insertRow();
  COLUNAS_TABELA_EQUIPES.forEach((coluna) => cabecalho.append(criarElementoEquipes('th', '',
    coluna)));
  tabela.append(...estadoEquipes.equipes.map(criarGrupoEquipe));
  return tabela;
}

/**
 * Grupo (tbody) da equipe na tabela.
 * @param {number} equipeId - Id da equipe.
 * @returns {HTMLElement|null} Grupo ou null.
 */
function obterGrupoEquipe(equipeId) {
  return elementosEquipes.lista.querySelector('tbody[data-equipe-id="' + equipeId + '"]');
}

/**
 * Cria a linha da seleção de novo integrante: alunos sem equipe, Adicionar e Cancelar.
 * @param {number} equipeId - Id da equipe.
 * @returns {HTMLTableRowElement} Linha da seleção.
 */
function criarSeletorIntegrante(equipeId) {
  const linha = criarElementoEquipes('tr', CLASSE_SELETOR_INTEGRANTE);
  const celula = criarCelulaEquipes('', '', TOTAL_COLUNAS_EQUIPES);
  const select = criarControleEquipes('select', 'novo_integrante');
  const opcoes = [{ valor: '', texto: 'Selecione o aluno sem equipe…' }].concat(
    alunosSemEquipe().map((aluno) => ({ valor: aluno.id, texto: aluno.nome })));
  preencherSelectEquipes(select, opcoes, '');
  const acoes = criarElementoEquipes('div', 'equipes-acoes');
  acoes.append(criarBotaoEquipes({ texto: '✔ Adicionar', acao: 'confirmar-integrante',
    id: equipeId, classe: 'equipes-btn--principal' }),
    criarBotaoEquipes({ texto: 'Cancelar', acao: 'cancelar-integrante', id: equipeId }));
  celula.append(select, acoes);
  linha.append(celula);
  return linha;
}

/**
 * Abre (ou fecha, se já aberta) a seleção de novo integrante logo abaixo da linha da equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {Promise<void>}
 */
async function abrirSeletorIntegrante(equipeId) {
  const grupo = obterGrupoEquipe(equipeId);
  if (!grupo) return;

  const aberto = grupo.querySelector('.' + CLASSE_SELETOR_INTEGRANTE);
  if (aberto) return void aberto.remove();
  if (!alunosSemEquipe().length) {
    return void await mostrarPopup(MSG_TODOS_COM_EQUIPE, { tipo: 'info' });
  }
  grupo.querySelector('.equipes-tabela__grupo').after(criarSeletorIntegrante(equipeId));
}

/**
 * Fecha a seleção de novo integrante da equipe.
 * @param {number} equipeId - Id da equipe.
 * @returns {void}
 */
function cancelarSeletorIntegrante(equipeId) {
  obterGrupoEquipe(equipeId)?.querySelector('.' + CLASSE_SELETOR_INTEGRANTE)?.remove();
}

/**
 * Grava o aluno escolhido na seleção como integrante da equipe (sem papel e sem líder).
 * @param {number} equipeId - Id da equipe.
 * @returns {Promise<void>}
 */
async function confirmarIntegrante(equipeId) {
  const select = obterGrupoEquipe(equipeId)?.querySelector(
    '.' + CLASSE_SELETOR_INTEGRANTE + ' select');
  const alunoId = select?.value;
  if (!alunoId) return void await mostrarPopup(MSG_ESCOLHA_INTEGRANTE, { tipo: 'aviso' });

  await executarGravacaoEquipes(() => estadoEquipes.repositorio.criarMembro({
    equipe_id: equipeId, aluno_id: alunoId, papel: null, tarefas: null, lider: false }));
}
