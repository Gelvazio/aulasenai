// Tabela de alunos da página scripts/criarUsuariosBancoDados.html: seleção por aluno, marcar
// todos, filtro por situação, coluna "Senha" (senha inicial, para o professor repassar) e coluna
// "Cadastrado" (Sim/Não, conforme auth.users) e coluna "Aluno anotou?" (Sim/Não, ao lado do nome).
// Ao trocar "Aluno anotou?", o professor grava no banco (tabela usuario, ligada ao auth.users pela
// chave primária: senha_informada e senha_informada_em) que a senha foi informada ao aluno e
// recebe um popup de confirmação. Ao abrir a página, o valor vem dessa tabela.

const SENHA_OCULTA = '—';
const PERFIL_PROFESSOR_LISTA = 'PROFESSOR';
const SITUACAO_SIM = 'Sim';
const SITUACAO_NAO = 'Não';
const SITUACAO_DESCONHECIDA = '?';
const MSG_SEM_USUARIO = 'este usuário ainda não está cadastrado no Auth (grave-o antes).';
const EVENTO_ANOTOU_ALTERADO = 'anotou-alterado';
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
 * Monta o popup de confirmação da gravação de "Aluno anotou?".
 * @param {string} nome - Nome do aluno.
 * @param {boolean} informada - Novo valor gravado.
 * @returns {string} Mensagem do popup.
 */
function montarMensagemAnotou(nome, informada) {
    return informada
        ? 'A senha de ' + nome + ' foi informada ao aluno e isso foi gravado no banco de dados.'
        : 'Registro removido do banco de dados: a senha de ' + nome
            + ' NÃO consta como informada.';
}

/**
 * Grava no banco a escolha de "Aluno anotou?"; se falhar, volta a escolha anterior e avisa.
 * @param {HTMLSelectElement} escolha - Lista Sim/Não da linha.
 * @param {{aluno: Object, usuarioId: string|undefined}} alvo - Aluno da lista e o id dele no
 *   auth.users (chave da tabela usuario).
 * @param {Function} pintar - Atualiza a cor da escolha.
 */
async function gravarEscolhaAnotouGuia(escolha, alvo, pintar) {
    const informada = escolha.value === SITUACAO_SIM;
    const aluno = alvo.aluno;
    escolha.disabled = true;
    try {
        if (!alvo.usuarioId) throw new Error(MSG_SEM_USUARIO);
        const encontrado = await gravarSenhaInformada(alvo.usuarioId, informada);
        if (!encontrado) throw new Error(MSG_SEM_USUARIO);
        pintar();
        escolha.dispatchEvent(new CustomEvent(EVENTO_ANOTOU_ALTERADO, { bubbles: true }));
        await mostrarPopup(montarMensagemAnotou(aluno.nome, informada),
            { tipo: informada ? 'sucesso' : 'info', titulo: 'Gravado no banco de dados' });
    } catch (erro) {
        escolha.value = informada ? SITUACAO_NAO : SITUACAO_SIM;
        pintar();
        await mostrarPopup('Não foi possível gravar no banco de dados: ' + erro.message,
            { tipo: 'erro' });
    } finally {
        escolha.disabled = false;
    }
}

/**
 * Cria a célula "Aluno anotou?" com a escolha Sim/Não (padrão Não; o valor vem do banco).
 * Só o professor logado, em host local, consegue alterar.
 * @param {Object} aluno - Aluno da lista de presença.
 * @param {{cadastrados: Map<string, string>|null, senhasInformadas: Set<string>|null,
 *   podeGravar: boolean}} contexto - Ids do auth.users por e-mail, ids com senha já informada
 *   (tabela usuario) e permissão de gravar.
 * @returns {HTMLTableCellElement} Célula com a lista de escolha.
 */
function criarCelulaAnotouGuia(aluno, contexto) {
    const escolha = document.createElement('select');
    escolha.className = 'guia-anotou';
    escolha.setAttribute('aria-label', 'Aluno anotou? ' + aluno.email);
    [SITUACAO_NAO, SITUACAO_SIM].forEach((texto) => {
        escolha.append(new Option(texto, texto));
    });
    const usuarioId = contexto.cadastrados?.get(aluno.email.toLowerCase());
    const jaInformada = usuarioId && contexto.senhasInformadas?.has(usuarioId);
    escolha.value = jaInformada ? SITUACAO_SIM : SITUACAO_NAO;
    escolha.disabled = !contexto.podeGravar || !contexto.senhasInformadas;
    const pintar = () => {
        escolha.classList.toggle(CLASSE_ANOTOU_SIM, escolha.value === SITUACAO_SIM);
        escolha.classList.toggle(CLASSE_ANOTOU_NAO, escolha.value === SITUACAO_NAO);
    };
    pintar();
    escolha.addEventListener('change', () => (
        gravarEscolhaAnotouGuia(escolha, { aluno, usuarioId }, pintar)));
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
 * (professor logado). A senha das linhas de perfil PROFESSOR só aparece para o Professor
 * Administrador (contexto.mostrarSenhaProfessor, confirmado pelo banco).
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
    const ehLinhaProfessor = aluno.perfil === PERFIL_PROFESSOR_LISTA;
    const podeVerSenha = contexto.mostrarSenha
        && (!ehLinhaProfessor || contexto.mostrarSenhaProfessor === true);
    linha.atualizarSenha = () => {
        celulaSenha.textContent = podeVerSenha && caixa.checked ? aluno.senha || '' : SENHA_OCULTA;
    };
    const celulaSituacao = criarCelulaGuia('');
    celulaSituacao.className = 'guia-situacao';
    linha.append(celulaCaixa, criarCelulaGuia(aluno.numero), criarCelulaGuia(aluno.nome),
        criarCelulaAnotouGuia(aluno, contexto), criarCelulaGuia(aluno.email), celulaSenha,
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
    corpo.append(...[...turma.alunos]
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
        .map((aluno) => (
        criarLinhaAlunoGuia(aluno, contexto, aoMudarSelecao))));
    tabela.append(corpo);
    return tabela;
}

/**
 * Mostra a senha só nas linhas marcadas (a de professor, só para o Professor Administrador).
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
 * Mostra só as linhas que combinam com os dois filtros (Cadastrado e "Aluno anotou?");
 * as ocultas perdem a marcação.
 * @param {HTMLTableElement} tabela - Tabela de alunos.
 * @param {string} filtro - Chave de FILTROS_SITUACAO (coluna Cadastrado).
 * @param {string} [filtroAnotou] - Chave de FILTROS_SITUACAO (coluna "Aluno anotou?").
 */
function aplicarFiltroGuia(tabela, filtro, filtroAnotou = FILTRO_TODOS) {
    const situacaoDesejada = FILTROS_SITUACAO[filtro];
    const anotouDesejado = FILTROS_SITUACAO[filtroAnotou];
    obterLinhasGuia(tabela).forEach((linha) => {
        const anotou = linha.querySelector('.guia-anotou')?.value;
        const combinaCadastro = !situacaoDesejada || linha.dataset.situacao === situacaoDesejada;
        const combinaAnotou = !anotouDesejado || anotou === anotouDesejado;
        const combina = combinaCadastro && combinaAnotou;
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
