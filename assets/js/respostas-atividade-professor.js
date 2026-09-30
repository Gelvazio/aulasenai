// Relatório do professor dentro da página da atividade (carregado só para perfil PROFESSOR):
// lista os alunos que responderam, com tentativa, nota e data/hora, e o botão de liberar nova
// tentativa ao lado de cada aluno. Depende de respostas-atividade.js (criarElemento, popup,
// calcularNota, formatarNota...) e do provedor do banco (enviarAoBanco). O limite de tentativas
// vem do banco (atividade.max_tentativas) e chega por parâmetro.
// Os dados vêm da função resumo_tentativas_atividade (só o professor chama; o gabarito não sai do
// banco). Plano: docs/regra-3-tentativas-atividade.md.

const ROTA_RESUMO_TENTATIVAS = '/rest/v1/rpc/resumo_tentativas_atividade';
const ROTA_LIBERAR_TENTATIVA = '/rest/v1/rpc/liberar_nova_tentativa';
const CLASSE_RELATORIO = 'relatorio-professor';
const COLUNAS_RELATORIO = ['Tentativa', 'Situação', 'Acertos', 'Nota', 'Data e hora',
    'Nova tentativa'];
const TURMA_SEM_CODIGO = '';
const MAXIMO_TENTATIVAS_APROVADO = 2;
const CLASSE_ABA_ATIVA = CLASSE_RELATORIO + '__aba--ativa';
let turmaEscolhidaRelatorio = null;
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
    const { linha, atividadeId, maximo } = contexto;
    const proxima = linha.tentativa + 1;
    const querLiberar = await confirmarPopup('Liberar a tentativa ' + proxima + ' de ' +
        maximo + ' para ' + linha.nome + '?\n\nA atividade abre com as respostas da ' +
        'tentativa anterior já marcadas.',
    { titulo: 'Liberar nova tentativa', textoConfirmar: 'Liberar', textoCancelar: 'Cancelar' });
    if (!querLiberar) return;

    const resposta = await enviarAoBanco(ROTA_LIBERAR_TENTATIVA,
        { p_aluno: linha.aluno_id, p_atividade: atividadeId }, 'return=representation');
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        return mostrarPopup(MSG_ERRO_LIBERAR + (erro.message || resposta.status), { tipo: 'erro' });
    }
    await mostrarPopup('Tentativa ' + proxima + ' de ' + maximo + ' liberada para ' +
        linha.nome + '.', { tipo: 'sucesso', titulo: 'Tentativa liberada' });
    await montarRelatorioProfessor(contexto.secao, atividadeId, maximo);
}

/**
 * Define quantas tentativas o aluno pode ter: quem atingiu a nota mínima pode refazer uma vez
 * para melhorar (2 no total); quem ficou abaixo tem até o máximo da atividade (3).
 * @param {number|null} notaFinal - Maior nota entregue do aluno.
 * @param {number} maximo - Limite geral de tentativas.
 * @returns {number} Total de tentativas permitido.
 */
function calcularLimiteTentativas(notaFinal, maximo) {
    const aprovado = notaFinal !== null && notaFinal >= NOTA_MINIMA_APROVACAO;
    return aprovado ? Math.min(MAXIMO_TENTATIVAS_APROVADO, maximo) : maximo;
}

/**
 * Cria a célula "Nova tentativa" de uma linha: botão de liberar (só na última tentativa entregue
 * do aluno e abaixo do limite) ou o motivo de não poder liberar.
 * @param {Object} contexto - {secao, atividadeId, linha, ehUltima}.
 * @returns {HTMLTableCellElement} Célula da ação.
 */
function criarCelulaLiberar(contexto) {
    const { linha, ehUltima, maximo, notaFinal } = contexto;
    const celula = criarElemento('td', CLASSE_RELATORIO + '__acao');
    if (!ehUltima) return celula;
    if (!linha.entregue_em) {
        celula.textContent = 'Aguardando a entrega';
        return celula;
    }
    const limite = calcularLimiteTentativas(notaFinal, maximo);
    const botao = criarBotao('btn-export ' + CLASSE_RELATORIO + '__liberar',
        '🔓 Liberar nova tentativa', () => liberarTentativaDoAluno(contexto));
    botao.disabled = linha.tentativa >= limite;
    if (botao.disabled) botao.title = 'Limite de ' + limite + ' tentativa(s) para este aluno.';
    celula.appendChild(botao);
    return celula;
}

/**
 * Monta a linha da tabela para uma tentativa de um aluno.
 * @param {Object} contexto - {secao, atividadeId, linha, ehUltima}.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function montarLinhaRelatorio(contexto) {
    const { linha, maximo } = contexto;
    const { situacao, dataHora } = descreverTentativa(linha);
    const nota = calcularNota({ acertos: linha.acertos, total: linha.total });
    const abaixoDoMinimo = linha.entregue_em && nota < NOTA_MINIMA_APROVACAO;
    const tr = document.createElement('tr');
    tr.append(
        criarCelulaRelatorio(linha.tentativa + ' de ' + maximo),
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
 * Calcula a maior nota entre as tentativas entregues de um aluno.
 * @param {Object[]} tentativas - Linhas do resumo do aluno.
 * @returns {number|null} Maior nota ou null se nenhuma tentativa foi entregue.
 */
function calcularNotaFinalAluno(tentativas) {
    const notas = tentativas.filter((linha) => linha.entregue_em)
        .map((linha) => calcularNota({ acertos: linha.acertos, total: linha.total }));
    return notas.length ? Math.max(...notas) : null;
}

/**
 * Monta o bloco de um aluno: nome com a nota final ao lado e, abaixo, a tabela das tentativas.
 * @param {Object[]} tentativas - Linhas do resumo do aluno, em ordem de tentativa.
 * @param {{secao: HTMLElement, atividadeId: number, maximo: number}} base - Seção, atividade
 *     e limite de tentativas.
 * @returns {HTMLElement} Bloco do aluno.
 */
function montarBlocoAluno(tentativas, base) {
    const primeira = tentativas[0];
    const bloco = criarElemento('section', CLASSE_RELATORIO + '__aluno');
    bloco.dataset.turma = primeira.turma_codigo || TURMA_SEM_CODIGO;
    const notaFinal = calcularNotaFinalAluno(tentativas);
    const titulo = criarElemento('h4', CLASSE_RELATORIO + '__aluno-titulo');
    titulo.append(criarElemento('span', '', [primeira.numero_chamada, primeira.nome ||
        '(sem cadastro)'].filter((parte) => parte !== null && parte !== undefined &&
        parte !== '').join(' - ')));
    titulo.append(criarElemento('span', CLASSE_RELATORIO + '__nota-final',
        'Nota final da Atividade: ' + (notaFinal === null ? '—' : formatarNota(notaFinal))));
    const tabela = criarElemento('table', CLASSE_RELATORIO + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_RELATORIO.forEach((texto) => cabecalho.appendChild(criarElemento('th', '', texto)));
    const corpo = tabela.createTBody();
    tentativas.forEach((linha, indice) => {
        const ehUltima = indice === tentativas.length - 1;
        corpo.appendChild(montarLinhaRelatorio({ ...base, linha, ehUltima, notaFinal }));
    });
    const rolagem = criarElemento('div', CLASSE_RELATORIO + '__rolagem');
    rolagem.appendChild(tabela);
    bloco.append(titulo, rolagem);
    return bloco;
}

/**
 * Monta a lista do relatório: um bloco por aluno com as respectivas tentativas agrupadas.
 * @param {Object[]} linhas - Linhas do resumo (ordenadas por aluno e tentativa).
 * @param {{secao: HTMLElement, atividadeId: number, maximo: number}} base - Seção da página,
 *     id da atividade e limite de tentativas.
 * @returns {HTMLElement} Lista pronta.
 */
function montarListaAlunosRelatorio(linhas, base) {
    const porAluno = new Map();
    linhas.forEach((linha) => {
        const grupo = porAluno.get(linha.aluno_id) || [];
        grupo.push(linha);
        porAluno.set(linha.aluno_id, grupo);
    });
    const lista = criarElemento('div', CLASSE_RELATORIO + '__alunos');
    porAluno.forEach((tentativas) => lista.appendChild(montarBlocoAluno(tentativas, base)));
    return lista;
}

/**
 * Busca no banco local, turno e unidade curricular das turmas (para os cartões das abas).
 * @returns {Promise<Map<string, Object>>} Turmas por código (vazio se a consulta falhar).
 */
async function buscarDadosTurmas() {
    try {
        const turmas = await sbGet('turma', 'select=codigo,nome,turno,local,uc');
        return new Map(turmas.map((turma) => [turma.codigo, turma]));
    } catch (erro) {
        return new Map();
    }
}

/**
 * Lista as turmas que aparecem no relatório, com dados do cartão e a quantidade de alunos.
 * @param {Object[]} linhas - Linhas do resumo.
 * @param {Map<string, Object>} dadosTurmas - Local, turno e UC por código de turma.
 * @returns {{codigo: string, nome: string, local: string, uc: string, alunos: number}[]}
 *     Turmas em ordem de nome.
 */
function listarTurmasRelatorio(linhas, dadosTurmas) {
    const turmas = new Map();
    linhas.forEach((linha) => {
        const codigo = linha.turma_codigo || TURMA_SEM_CODIGO;
        const dados = dadosTurmas.get(codigo) || {};
        const turma = turmas.get(codigo) || {
            codigo, nome: linha.turma_nome || codigo || 'Sem turma', uc: dados.uc || '',
            local: [dados.local, dados.turno].filter(Boolean).join(' ').toUpperCase(),
            alunos: new Set(),
        };
        turma.alunos.add(linha.aluno_id);
        turmas.set(codigo, turma);
    });
    return Array.from(turmas.values())
        .map((turma) => ({ ...turma, alunos: turma.alunos.size }))
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/**
 * Atualiza o resumo (alunos e entregas) conforme a turma escolhida.
 * @param {HTMLElement} resumo - Parágrafo do resumo.
 * @param {Object[]} linhas - Linhas do resumo (já filtradas pela turma).
 */
function atualizarResumoRelatorio(resumo, linhas) {
    const alunos = new Set(linhas.map((linha) => linha.aluno_id)).size;
    const entregas = linhas.filter((linha) => linha.entregue_em).length;
    resumo.textContent = linhas.length
        ? alunos + ' aluno(s) responderam · ' + entregas + ' tentativa(s) entregue(s).'
        : MSG_SEM_RESPOSTAS;
}

/**
 * Aplica o filtro por turma: mostra só as linhas da turma, marca o cartão e atualiza o resumo.
 * @param {HTMLElement} bloco - Cartão do relatório.
 * @param {Object[]} linhas - Todas as linhas do resumo.
 * @param {string} turma - Código da turma escolhida.
 */
function aplicarFiltroTurmaRelatorio(bloco, linhas, turma) {
    turmaEscolhidaRelatorio = turma;
    bloco.querySelectorAll('.' + CLASSE_RELATORIO + '__aluno').forEach((tr) => {
        tr.hidden = tr.dataset.turma !== turma;
    });
    bloco.querySelectorAll('.' + CLASSE_RELATORIO + '__aba').forEach((aba) => {
        const ativa = aba.dataset.turma === turma;
        aba.classList.toggle(CLASSE_ABA_ATIVA, ativa);
        aba.setAttribute('aria-selected', String(ativa));
    });
    const visiveis = linhas.filter((linha) => (linha.turma_codigo || TURMA_SEM_CODIGO) === turma);
    atualizarResumoRelatorio(bloco.querySelector('.' + CLASSE_RELATORIO + '__resumo'), visiveis);
}

/**
 * Cria um trecho de texto dentro do cartão da aba.
 * @param {string} sufixo - Sufixo da classe (local, uc ou turma).
 * @param {string} texto - Texto exibido.
 * @returns {HTMLSpanElement} Trecho pronto.
 */
function criarTrechoAbaRelatorio(sufixo, texto) {
    return criarElemento('span', CLASSE_RELATORIO + '__aba-' + sufixo, texto);
}

/**
 * Monta as abas de turma como cartões (LOCAL TURNO, unidade curricular, turma e quantidade),
 * no mesmo estilo da página de criar usuários. Não há opção "todas as turmas".
 * @param {{codigo: string, nome: string, local: string, uc: string, alunos: number}[]} turmas
 *     Turmas do relatório.
 * @param {Function} aoEscolher - Chamada com o código da turma escolhida.
 * @returns {HTMLElement} Barra de abas.
 */
function montarAbasTurmaRelatorio(turmas, aoEscolher) {
    const barra = criarElemento('div', CLASSE_RELATORIO + '__abas');
    barra.setAttribute('role', 'tablist');
    barra.setAttribute('aria-label', 'Filtrar por turma');
    turmas.forEach((turma) => {
        const aba = criarBotao(CLASSE_RELATORIO + '__aba', '', () => aoEscolher(turma.codigo));
        if (turma.local) aba.append(criarTrechoAbaRelatorio('local', turma.local));
        if (turma.uc) aba.append(criarTrechoAbaRelatorio('uc', turma.uc));
        aba.append(criarTrechoAbaRelatorio('turma', turma.nome + ' (' + turma.alunos + ')'));
        aba.dataset.turma = turma.codigo;
        aba.setAttribute('role', 'tab');
        barra.appendChild(aba);
    });
    return barra;
}

/**
 * Mostra, no início da atividade, o relatório do professor (cria ou substitui o cartão).
 * @param {HTMLElement} secao - Seção de conteúdo da página.
 * @param {number} atividadeId - Id da atividade no banco.
 * @param {number} maximo - Limite de tentativas da atividade (vem do banco).
 */
async function montarRelatorioProfessor(secao, atividadeId, maximo) {
    secao.querySelector('.' + CLASSE_RELATORIO)?.remove();
    const bloco = criarElemento('div', 'aula-card ' + CLASSE_RELATORIO);
    bloco.appendChild(criarElemento('span', 'aula-badge', 'PROFESSOR'));
    bloco.appendChild(criarElemento('div', 'aula-title', 'Respostas dos alunos nesta atividade'));
    secao.insertBefore(bloco, secao.firstChild.nextSibling);
    try {
        const linhas = await buscarResumoTentativas(atividadeId);
        const resumo = criarElemento('p', CLASSE_RELATORIO + '__resumo');
        bloco.appendChild(resumo);
        atualizarResumoRelatorio(resumo, linhas);
        if (!linhas.length) return;
        const turmas = listarTurmasRelatorio(linhas, await buscarDadosTurmas());
        const existe = turmas.some((turma) => turma.codigo === turmaEscolhidaRelatorio);
        if (!existe) turmaEscolhidaRelatorio = turmas[0].codigo;
        bloco.appendChild(montarAbasTurmaRelatorio(turmas,
            (turma) => aplicarFiltroTurmaRelatorio(bloco, linhas, turma)));
        bloco.appendChild(montarListaAlunosRelatorio(linhas, { secao, atividadeId, maximo }));
        aplicarFiltroTurmaRelatorio(bloco, linhas, turmaEscolhidaRelatorio);
    } catch (erro) {
        bloco.appendChild(criarElemento('p', CLASSE_RELATORIO + '__erro',
            MSG_ERRO_RELATORIO + erro.message));
    }
}
