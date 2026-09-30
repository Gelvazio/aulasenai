// Tabela de alunos da página scripts/criarUsuariosBancoDados.html: seleção por aluno, marcar
// todos, filtro por situação, coluna "Senha" (senha inicial, para o professor repassar) e coluna
// "Cadastrado" (Sim/Não, conforme auth.users) e coluna "Aluno anotou?" (Sim/Não, marcada pelo
// professor ao lado do nome; fica guardada neste navegador, por e-mail).

const SENHA_OCULTA = '—';
const PERFIL_PROFESSOR_LISTA = 'PROFESSOR';
const SITUACAO_SIM = 'Sim';
const SITUACAO_NAO = 'Não';
const SITUACAO_DESCONHECIDA = '?';
const CHAVE_ANOTOU = 'senai_aluno_anotou';
const CLASSE_ANOTOU_SIM = 'guia-anotou--sim';
const CLASSE_ANOTOU_NAO = 'guia-anotou--nao';
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
 * Lê no navegador quais alunos o professor marcou como "anotou".
 * @returns {Object<string, string>} E-mail (minúsculo) → "Sim" ou "Não".
 */
function lerAnotouGuia() {
    try {
        return JSON.parse(window.localStorage.getItem(CHAVE_ANOTOU)) || {};
    } catch (erro) {
        return {};
    }
}

/**
 * Guarda no navegador se o aluno anotou (sem falhar se o armazenamento estiver bloqueado).
 * @param {string} email - E-mail do aluno.
 * @param {string} resposta - "Sim" ou "Não".
 */
function gravarAnotouGuia(email, resposta) {
    try {
        const anotou = lerAnotouGuia();
        anotou[email.toLowerCase()] = resposta;
        window.localStorage.setItem(CHAVE_ANOTOU, JSON.stringify(anotou));
    } catch (erro) {
        console.warn('Não foi possível guardar "Aluno anotou?":', erro.message);
    }
}

/**
 * Cria a célula "Aluno anotou?" com a escolha Sim/Não (padrão Não) e a cor da resposta.
 * @param {string} email - E-mail do aluno.
 * @returns {HTMLTableCellElement} Célula com a lista de escolha.
 */
function criarCelulaAnotouGuia(email) {
    const escolha = document.createElement('select');
    escolha.className = 'guia-anotou';
    escolha.setAttribute('aria-label', 'Aluno anotou? ' + email);
    [SITUACAO_NAO, SITUACAO_SIM].forEach((texto) => {
        escolha.append(new Option(texto, texto));
    });
    escolha.value = lerAnotouGuia()[email.toLowerCase()] || SITUACAO_NAO;
    const pintar = () => {
        escolha.classList.toggle(CLASSE_ANOTOU_SIM, escolha.value === SITUACAO_SIM);
        escolha.classList.toggle(CLASSE_ANOTOU_NAO, escolha.value === SITUACAO_NAO);
    };
    pintar();
    escolha.addEventListener('change', () => {
        pintar();
        gravarAnotouGuia(email, escolha.value);
    });
    const celula = document.createElement('td');
    celula.append(escolha);
    return celula;
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
 * Cria uma linha da tabela: caixa de seleção, número, nome, "Aluno anotou?", e-mail, senha
 * inicial e "Cadastrado".
 * A senha só aparece para o aluno selecionado e quando contexto.mostrarSenha for verdadeiro
 * (professor logado). A senha do professor nunca é mostrada.
 * @param {Object} aluno - Aluno da lista de presença.
 * @param {{cadastrados: Map<string, string>|null, mostrarSenha: boolean}} contexto - Cadastrados
 *   e permissão de ver a senha.
 * @param {Function} aoMudarSelecao - Chamada quando a caixa da linha muda.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function criarLinhaAlunoGuia(aluno, contexto, aoMudarSelecao) {
    const linha = document.createElement('tr');
    linha.dataset.email = aluno.email;

    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.className = 'guia-marcar';
    caixa.addEventListener('change', aoMudarSelecao);
    const celulaCaixa = document.createElement('td');
    celulaCaixa.append(caixa);

    const celulaSenha = criarCelulaGuia(SENHA_OCULTA);
    const podeVerSenha = contexto.mostrarSenha && aluno.perfil !== PERFIL_PROFESSOR_LISTA;
    linha.atualizarSenha = () => {
        celulaSenha.textContent = podeVerSenha && caixa.checked ? aluno.senha || '' : SENHA_OCULTA;
    };
    const celulaSituacao = criarCelulaGuia('');
    celulaSituacao.className = 'guia-situacao';
    linha.append(celulaCaixa, criarCelulaGuia(aluno.numero), criarCelulaGuia(aluno.nome),
        criarCelulaAnotouGuia(aluno.email), criarCelulaGuia(aluno.email), celulaSenha,
        celulaSituacao);
    pintarSituacaoGuia(linha, obterSituacaoCadastro(aluno.email, contexto.cadastrados));
    return linha;
}

/**
 * Cria a tabela de alunos de uma turma.
 * A coluna Senha sempre existe; o conteúdo só aparece se contexto.mostrarSenha.
 * @param {Object} turma - Turma com a lista de alunos.
 * @param {{cadastrados: Map<string, string>|null, mostrarSenha: boolean}} contexto - Cadastrados
 *   e permissão de ver a senha.
 * @param {Function} aoMudarSelecao - Chamada quando uma caixa de linha muda.
 * @returns {HTMLTableElement} Tabela pronta.
 */
function criarTabelaAlunosGuia(turma, contexto, aoMudarSelecao) {
    const tabela = document.createElement('table');
    tabela.className = 'guia-tabela';
    tabela.innerHTML = '<thead><tr><th></th><th>Nº</th><th>Aluno</th>'
        + '<th>Aluno anotou? (Sim/Não)</th><th>E-mail de login</th>'
        + '<th>Senha</th><th>Cadastrado</th></tr></thead>';
    const corpo = document.createElement('tbody');
    corpo.append(...turma.alunos.map((aluno) => (
        criarLinhaAlunoGuia(aluno, contexto, aoMudarSelecao))));
    tabela.append(corpo);
    return tabela;
}

/**
 * Mostra a senha só nas linhas marcadas (a do professor continua sempre oculta).
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 */
function atualizarSenhasGuia(tabela) {
    obterLinhasGuia(tabela).forEach((linha) => linha.atualizarSenha());
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
