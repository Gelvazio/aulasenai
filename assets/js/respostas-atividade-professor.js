// Relatório do professor dentro da página da atividade (carregado só para perfil PROFESSOR):
// lista os alunos que responderam, com tentativa, nota e data/hora, e o botão de liberar nova
// tentativa ao lado de cada aluno. Depende de respostas-atividade.js (criarElemento, popup,
// MAXIMO_TENTATIVAS, calcularNota, formatarNota...) e do provedor do banco (enviarAoBanco).
// Os dados vêm da função resumo_tentativas_atividade (só o professor chama; o gabarito não sai do
// banco). Plano: docs/regra-3-tentativas-atividade.md.

const ROTA_RESUMO_TENTATIVAS = '/rest/v1/rpc/resumo_tentativas_atividade';
const ROTA_LIBERAR_TENTATIVA = '/rest/v1/rpc/liberar_nova_tentativa';
const CLASSE_RELATORIO = 'relatorio-professor';
const COLUNAS_RELATORIO = ['Nº', 'Aluno', 'Turma', 'Tentativa', 'Situação', 'Acertos', 'Nota',
    'Data e hora', 'Nova tentativa'];
const MSG_SEM_RESPOSTAS = 'Nenhum aluno respondeu esta atividade ainda.';
const MSG_ERRO_RELATORIO = 'Não foi possível carregar as respostas dos alunos: ';
const MSG_ERRO_LIBERAR = 'Não foi possível liberar a nova tentativa: ';

/**
 * Busca no banco uma linha por aluno e tentativa (acertos e total já calculados lá).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Linhas do resumo, ordenadas por turma, número e tentativa.
 * @throws {Error} Se o banco recusar (ex.: usuário não é professor).
 */
async function buscarResumoTentativas(atividadeId) {
    const resposta = await enviarAoBanco(ROTA_RESUMO_TENTATIVAS,
        { p_atividade: atividadeId }, 'return=representation');
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        throw new Error(erro.message || resposta.status);
    }
    return resposta.json();
}

/**
 * Formata data e hora para exibição (dd/mm/aaaa hh:mm:ss).
 * @param {string|null} dataIso - Data ISO ou vazio.
 * @returns {string} Data e hora formatadas ou "—".
 */
function formatarDataHora(dataIso) {
    return dataIso ? new Date(dataIso).toLocaleString('pt-BR') : '—';
}

/**
 * Monta a descrição da situação e da data de uma tentativa.
 * @param {Object} linha - Linha do resumo.
 * @returns {{situacao: string, dataHora: string}} Texto da situação e da data/hora.
 */
function descreverTentativa(linha) {
    if (linha.entregue_em) {
        return { situacao: 'Entregue', dataHora: formatarDataHora(linha.entregue_em) };
    }
    return {
        situacao: 'Em andamento (' + linha.respondidas + '/' + linha.total + ')',
        dataHora: formatarDataHora(linha.ultima_gravacao) + ' (última gravação)',
    };
}

/**
 * Cria uma célula de texto do relatório.
 * @param {string|number} texto - Conteúdo da célula.
 * @param {string} [classe] - Classe CSS extra.
 * @returns {HTMLTableCellElement} Célula pronta.
 */
function criarCelulaRelatorio(texto, classe) {
    return criarElemento('td', classe || '', String(texto));
}

/**
 * Libera a próxima tentativa do aluno (confirma em popup, chama o banco e recarrega a lista).
 * @param {Object} contexto - {secao, atividadeId, linha} com a linha da última tentativa.
 */
async function liberarTentativaDoAluno(contexto) {
    const { linha, atividadeId } = contexto;
    const proxima = linha.tentativa + 1;
    const querLiberar = await confirmarPopup('Liberar a tentativa ' + proxima + ' de ' +
        MAXIMO_TENTATIVAS + ' para ' + linha.nome + '?\n\nA atividade abre com as respostas da ' +
        'tentativa anterior já marcadas.',
    { titulo: 'Liberar nova tentativa', textoConfirmar: 'Liberar', textoCancelar: 'Cancelar' });
    if (!querLiberar) return;

    const resposta = await enviarAoBanco(ROTA_LIBERAR_TENTATIVA,
        { p_aluno: linha.aluno_id, p_atividade: atividadeId }, 'return=representation');
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        return mostrarPopup(MSG_ERRO_LIBERAR + (erro.message || resposta.status), { tipo: 'erro' });
    }
    await mostrarPopup('Tentativa ' + proxima + ' de ' + MAXIMO_TENTATIVAS + ' liberada para ' +
        linha.nome + '.', { tipo: 'sucesso', titulo: 'Tentativa liberada' });
    await montarRelatorioProfessor(contexto.secao, atividadeId);
}

/**
 * Cria a célula "Nova tentativa" de uma linha: botão de liberar (só na última tentativa entregue
 * do aluno e abaixo do limite) ou o motivo de não poder liberar.
 * @param {Object} contexto - {secao, atividadeId, linha, ehUltima}.
 * @returns {HTMLTableCellElement} Célula da ação.
 */
function criarCelulaLiberar(contexto) {
    const { linha, ehUltima } = contexto;
    const celula = criarElemento('td', CLASSE_RELATORIO + '__acao');
    if (!ehUltima) return celula;
    if (!linha.entregue_em) {
        celula.textContent = 'Aguardando a entrega';
    } else if (linha.tentativa >= MAXIMO_TENTATIVAS) {
        celula.textContent = 'Usou as ' + MAXIMO_TENTATIVAS + ' tentativas';
    } else {
        celula.appendChild(criarBotao('btn-export ' + CLASSE_RELATORIO + '__liberar',
            '🔓 Liberar nova tentativa', () => liberarTentativaDoAluno(contexto)));
    }
    return celula;
}

/**
 * Monta a linha da tabela para uma tentativa de um aluno.
 * @param {Object} contexto - {secao, atividadeId, linha, ehUltima}.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function montarLinhaRelatorio(contexto) {
    const { linha } = contexto;
    const { situacao, dataHora } = descreverTentativa(linha);
    const nota = calcularNota({ acertos: linha.acertos, total: linha.total });
    const abaixoDoMinimo = linha.entregue_em && nota < NOTA_MINIMA_APROVACAO;
    const tr = document.createElement('tr');
    tr.append(
        criarCelulaRelatorio(linha.numero_chamada ?? ''),
        criarCelulaRelatorio(linha.nome || '(sem cadastro)'),
        criarCelulaRelatorio(linha.turma_nome || linha.turma_codigo || ''),
        criarCelulaRelatorio(linha.tentativa + ' de ' + MAXIMO_TENTATIVAS),
        criarCelulaRelatorio(situacao),
        criarCelulaRelatorio(linha.entregue_em ? linha.acertos + ' de ' + linha.total : '—'),
        criarCelulaRelatorio(linha.entregue_em ? formatarNota(nota) : '—',
            abaixoDoMinimo ? CLASSE_RELATORIO + '__nota--baixa' : ''),
        criarCelulaRelatorio(dataHora),
        criarCelulaLiberar(contexto),
    );
    return tr;
}

/**
 * Monta a tabela do relatório (uma linha por aluno e tentativa).
 * @param {Object[]} linhas - Linhas do resumo.
 * @param {{secao: HTMLElement, atividadeId: number}} base - Seção da página e id da atividade.
 * @returns {HTMLTableElement} Tabela pronta.
 */
function montarTabelaRelatorio(linhas, base) {
    const tabela = criarElemento('table', CLASSE_RELATORIO + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_RELATORIO.forEach((texto) => cabecalho.appendChild(criarElemento('th', '', texto)));
    const corpo = tabela.createTBody();
    linhas.forEach((linha, indice) => {
        const proxima = linhas[indice + 1];
        const ehUltima = !proxima || proxima.aluno_id !== linha.aluno_id;
        corpo.appendChild(montarLinhaRelatorio({ ...base, linha, ehUltima }));
    });
    return tabela;
}

/**
 * Mostra, no início da atividade, o relatório do professor (cria ou substitui o cartão).
 * @param {HTMLElement} secao - Seção de conteúdo da página.
 * @param {number} atividadeId - Id da atividade no banco.
 */
async function montarRelatorioProfessor(secao, atividadeId) {
    secao.querySelector('.' + CLASSE_RELATORIO)?.remove();
    const bloco = criarElemento('div', 'aula-card ' + CLASSE_RELATORIO);
    bloco.appendChild(criarElemento('span', 'aula-badge', 'PROFESSOR'));
    bloco.appendChild(criarElemento('div', 'aula-title', 'Respostas dos alunos nesta atividade'));
    secao.insertBefore(bloco, secao.firstChild.nextSibling);
    try {
        const linhas = await buscarResumoTentativas(atividadeId);
        const alunos = new Set(linhas.map((linha) => linha.aluno_id)).size;
        const entregas = linhas.filter((linha) => linha.entregue_em).length;
        bloco.appendChild(criarElemento('p', CLASSE_RELATORIO + '__resumo', linhas.length
            ? alunos + ' aluno(s) responderam · ' + entregas + ' tentativa(s) entregue(s).'
            : MSG_SEM_RESPOSTAS));
        if (!linhas.length) return;
        const rolagem = criarElemento('div', CLASSE_RELATORIO + '__rolagem');
        rolagem.appendChild(montarTabelaRelatorio(linhas, { secao, atividadeId }));
        bloco.appendChild(rolagem);
    } catch (erro) {
        bloco.appendChild(criarElemento('p', CLASSE_RELATORIO + '__erro',
            MSG_ERRO_RELATORIO + erro.message));
    }
}
