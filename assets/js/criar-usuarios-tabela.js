// Tabela de alunos da página scripts/criarUsuariosBancoDados.html: seleção por aluno, marcar
// todos, filtro por situação e coluna "Cadastrado" (Sim/Não, conforme auth.users).

const SITUACAO_SIM = 'Sim';
const SITUACAO_NAO = 'Não';
const SITUACAO_DESCONHECIDA = '?';
const FILTRO_TODOS = 'todos';
const FILTRO_SIM = 'sim';
const FILTRO_NAO = 'nao';
const FILTROS_SITUACAO = {
    [FILTRO_TODOS]: null,
    [FILTRO_SIM]: SITUACAO_SIM,
    [FILTRO_NAO]: SITUACAO_NAO,
};

/**
 * Diz se o e-mail já existe em auth.users.
 * @param {string} email - E-mail do aluno.
 * @param {Map<string, string>|null} cadastrados - E-mails cadastrados; null se a consulta falhou.
 * @returns {string} "Sim", "Não" ou "?" (consulta indisponível).
 */
function obterSituacaoCadastro(email, cadastrados) {
    if (!cadastrados) return SITUACAO_DESCONHECIDA;

    return cadastrados.has(email.toLowerCase()) ? SITUACAO_SIM : SITUACAO_NAO;
}

/**
 * Cria uma célula de tabela com texto.
 * @param {string|number} valor - Texto da célula.
 * @returns {HTMLTableCellElement} Célula pronta.
 */
function criarCelulaGuia(valor) {
    const celula = document.createElement('td');
    celula.textContent = String(valor);
    return celula;
}

/**
 * Grava a situação de cadastro na linha (atributo e célula colorida).
 * @param {HTMLTableRowElement} linha - Linha do aluno.
 * @param {string} situacao - "Sim", "Não" ou "?".
 */
function pintarSituacaoGuia(linha, situacao) {
    const celula = linha.querySelector('.guia-situacao');
    linha.dataset.situacao = situacao;
    celula.textContent = situacao;
    celula.classList.toggle('guia-situacao--sim', situacao === SITUACAO_SIM);
    celula.classList.toggle('guia-situacao--nao', situacao === SITUACAO_NAO);
}

/**
 * Cria uma linha da tabela: caixa de seleção, número, nome, e-mail e "Cadastrado" (sem senha).
 * @param {Object} aluno - Aluno da lista de presença.
 * @param {Map<string, string>|null} cadastrados - E-mails cadastrados.
 * @param {Function} aoMudarSelecao - Chamada quando a caixa da linha muda.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function criarLinhaAlunoGuia(aluno, cadastrados, aoMudarSelecao) {
    const linha = document.createElement('tr');
    linha.dataset.email = aluno.email;

    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.className = 'guia-marcar';
    caixa.addEventListener('change', aoMudarSelecao);
    const celulaCaixa = document.createElement('td');
    celulaCaixa.append(caixa);

    const celulaSituacao = criarCelulaGuia('');
    celulaSituacao.className = 'guia-situacao';
    linha.append(celulaCaixa, criarCelulaGuia(aluno.numero), criarCelulaGuia(aluno.nome),
        criarCelulaGuia(aluno.email), celulaSituacao);
    pintarSituacaoGuia(linha, obterSituacaoCadastro(aluno.email, cadastrados));
    return linha;
}

/**
 * Cria a tabela de alunos de uma turma.
 * @param {Object} turma - Turma com a lista de alunos.
 * @param {Map<string, string>|null} cadastrados - E-mails cadastrados.
 * @param {Function} aoMudarSelecao - Chamada quando uma caixa de linha muda.
 * @returns {HTMLTableElement} Tabela pronta.
 */
function criarTabelaAlunosGuia(turma, cadastrados, aoMudarSelecao) {
    const tabela = document.createElement('table');
    tabela.className = 'guia-tabela';
    tabela.innerHTML = '<thead><tr><th></th><th>Nº</th><th>Aluno</th><th>E-mail de login</th>'
        + '<th>Cadastrado</th></tr></thead>';
    const corpo = document.createElement('tbody');
    corpo.append(...turma.alunos.map((aluno) => (
        criarLinhaAlunoGuia(aluno, cadastrados, aoMudarSelecao))));
    tabela.append(corpo);
    return tabela;
}

/**
 * Lista as linhas de alunos da tabela.
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @returns {HTMLTableRowElement[]} Linhas do corpo.
 */
function obterLinhasGuia(tabela) {
    return Array.from(tabela.tBodies[0].rows);
}

/**
 * Lista os e-mails marcados entre as linhas visíveis (as ocultas pelo filtro não contam).
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @returns {string[]} E-mails selecionados.
 */
function obterEmailsMarcadosGuia(tabela) {
    return obterLinhasGuia(tabela)
        .filter((linha) => !linha.hidden && linha.querySelector('.guia-marcar').checked)
        .map((linha) => linha.dataset.email);
}

/**
 * Marca ou desmarca todas as linhas visíveis.
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @param {boolean} marcado - Novo estado das caixas.
 */
function marcarTodosGuia(tabela, marcado) {
    obterLinhasGuia(tabela).forEach((linha) => {
        if (!linha.hidden) linha.querySelector('.guia-marcar').checked = marcado;
    });
}

/**
 * Diz se todas as linhas visíveis estão marcadas (mantém o interruptor "Marcar todos" ligado).
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @returns {boolean} true se há linhas visíveis e todas estão marcadas.
 */
function todosVisiveisMarcadosGuia(tabela) {
    const visiveis = obterLinhasGuia(tabela).filter((linha) => !linha.hidden);
    return visiveis.length > 0
        && visiveis.every((linha) => linha.querySelector('.guia-marcar').checked);
}

/**
 * Mostra só as linhas da situação escolhida; as ocultas perdem a marcação.
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @param {string} filtro - Chave de FILTROS_SITUACAO.
 */
function aplicarFiltroGuia(tabela, filtro) {
    const situacaoDesejada = FILTROS_SITUACAO[filtro];
    obterLinhasGuia(tabela).forEach((linha) => {
        const combina = !situacaoDesejada || linha.dataset.situacao === situacaoDesejada;
        linha.hidden = !combina;
        if (!combina) linha.querySelector('.guia-marcar').checked = false;
    });
}

/**
 * Atualiza a coluna "Cadastrado" de uma tabela.
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @param {Map<string, string>|null} cadastrados - E-mails cadastrados.
 */
function atualizarSituacoesGuia(tabela, cadastrados) {
    obterLinhasGuia(tabela).forEach((linha) => {
        pintarSituacaoGuia(linha, obterSituacaoCadastro(linha.dataset.email, cadastrados));
    });
}
