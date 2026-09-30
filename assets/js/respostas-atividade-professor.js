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
const COLUNAS_ALUNOS_RELATORIO = ['Nº', 'Aluno', 'Fez Atividade?', 'Status', 'Tentativas',
    'Nota final da Atividade', 'Ações'];
const COLUNAS_RELATORIO = ['Tentativa', 'Situação', 'Acertos', 'Nota', 'Abriu em',
    'Última alteração', 'Entregue em', 'Tempo gasto'];
const TURMA_SEM_CODIGO = '';
const MAXIMO_TENTATIVAS_APROVADO = 2;
const CLASSE_ABA_ATIVA = CLASSE_RELATORIO + '__aba--ativa';
let turmaEscolhidaRelatorio = null;
let filtroSoNaoAtingiuRelatorio = true;
const filtroFezRelatorio = new Set(['sim']);
const filtroStatusRelatorio = new Set();
const filtroTentativasRelatorio = new Set();
const CLASSE_PERGUNTAS_OCULTAS = 'atividade--perguntas-ocultas';
const TEXTO_STATUS = { entregue: '📨 Entregue', andamento: '✏️ Andamento' };
const QUANTIDADES_TENTATIVAS = ['1', '2', '3'];
const CLASSE_NOTAS_OCULTAS = CLASSE_RELATORIO + '__aluno--notas-ocultas';
const CLASSE_ABAIXO_MINIMO = CLASSE_RELATORIO + '__aluno--abaixo-minimo';
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
 * Acrescenta a cada linha do resumo a hora em que o aluno abriu aquela tentativa.
 * Sem a tabela de aberturas (ou sem registro), a linha fica sem aberta_em.
 * @param {Object[]} linhas - Linhas do resumo.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Linhas com aberta_em.
 */
async function acrescentarAberturas(linhas, atividadeId) {
    try {
        const aberturas = await sbGet('abertura_atividade',
            'select=aluno_id,tentativa,aberta_em&atividade_id=eq.' + atividadeId);
        const porChave = new Map(aberturas.map((abertura) =>
            [abertura.aluno_id + '|' + abertura.tentativa, abertura.aberta_em]));
        return linhas.map((linha) =>
            ({ ...linha, aberta_em: porChave.get(linha.aluno_id + '|' + linha.tentativa) }));
    } catch (erro) {
        return linhas;
    }
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
 * Descreve a situação de uma tentativa.
 * @param {Object} linha - Linha do resumo.
 * @returns {string} Texto da situação.
 */
function descreverSituacao(linha) {
    if (linha.entregue_em) return 'Entregue';

    return 'Em andamento (' + linha.respondidas + '/' + linha.total + ')';
}

/**
 * Calcula o tempo entre a abertura e a entrega da tentativa.
 * @param {Object} linha - Linha do resumo (com aberta_em e entregue_em).
 * @returns {string} Tempo no formato "1h 05min 09s" ou "—" se faltar alguma das horas.
 */
function calcularTempoGasto(linha) {
    if (!linha.aberta_em || !linha.entregue_em) return '—';

    const segundos = Math.max(0, Math.round(
        (new Date(linha.entregue_em) - new Date(linha.aberta_em)) / 1000));
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const resto = segundos % 60;
    const partes = [horas ? horas + 'h' : '', (horas || minutos) ? minutos + 'min' : '',
        resto + 's'];
    return partes.filter(Boolean).join(' ');
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
 * Cria o controle "Nova tentativa" do aluno (ao lado da nota final): botão de liberar (só na última tentativa entregue
 * do aluno e abaixo do limite) ou o motivo de não poder liberar.
 * @param {Object} contexto - {secao, atividadeId, linha, ehUltima}.
 * @returns {HTMLElement} Elemento da ação.
 */
function criarControleLiberar(contexto) {
    const { linha, maximo, notaFinal } = contexto;
    const celula = criarElemento('span', CLASSE_RELATORIO + '__acao');
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
    const nota = calcularNota({ acertos: linha.acertos, total: linha.total });
    const abaixoDoMinimo = linha.entregue_em && nota < NOTA_MINIMA_APROVACAO;
    const tr = document.createElement('tr');
    tr.append(
        criarCelulaRelatorio(linha.tentativa + ' de ' + maximo),
        criarCelulaRelatorio(descreverSituacao(linha)),
        criarCelulaRelatorio(linha.entregue_em ? linha.acertos + ' de ' + linha.total : '—'),
        criarCelulaRelatorio(linha.entregue_em ? formatarNota(nota) : '—',
            abaixoDoMinimo ? CLASSE_RELATORIO + '__nota--baixa' : ''),
        criarCelulaRelatorio(formatarDataHora(linha.aberta_em)),
        criarCelulaRelatorio(formatarDataHora(linha.ultima_gravacao)),
        criarCelulaRelatorio(formatarDataHora(linha.entregue_em)),
        criarCelulaRelatorio(calcularTempoGasto(linha)),
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
 * Mostra ou esconde as notas de um aluno (padrão: escondidas).
 * @param {HTMLElement} bloco - Bloco do aluno.
 */
function alternarNotasAluno(bloco) {
    const ocultas = bloco.classList.toggle(CLASSE_NOTAS_OCULTAS);
    const botao = bloco.querySelector('.' + CLASSE_RELATORIO + '__ver-notas');
    botao.textContent = ocultas ? 'Visualizar Notas' : 'Ocultar Notas';
}

/**
 * Diz se o bloco do aluno passa pelos filtros de turma, situação e tentativas.
 * @param {HTMLElement} bloco - Bloco do aluno.
 * @param {string} turma - Código da turma escolhida.
 * @returns {boolean} true se deve aparecer.
 */
function passaNosFiltros(bloco, turma) {
    if (bloco.dataset.turma !== turma) return false;
    if (filtroSoNaoAtingiuRelatorio && bloco.dataset.naoAtingiu !== 'true') return false;
    const filtraStatus = filtroStatusRelatorio.size > 0;
    if (filtraStatus && !filtroStatusRelatorio.has(bloco.dataset.status)) return false;
    const escolheuSoUmaOpcaoFez = filtroFezRelatorio.size === 1;
    if (escolheuSoUmaOpcaoFez && !filtroFezRelatorio.has(bloco.dataset.fez)) return false;
    const semFiltroTentativas = filtroTentativasRelatorio.size === 0;
    return semFiltroTentativas || filtroTentativasRelatorio.has(bloco.dataset.tentativas);
}

/**
 * Cria a tabela de tentativas de um aluno (mostrada só ao clicar em Visualizar Notas).
 * @param {Object[]} tentativas - Linhas do resumo do aluno.
 * @param {Object} base - {secao, atividadeId, maximo}.
 * @returns {HTMLElement} Linha de detalhe com a tabela aninhada.
 */
function montarDetalheAluno(tentativas, base) {
    const tabela = criarElemento('table', CLASSE_RELATORIO + '__tabela-tentativas');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_RELATORIO.forEach((texto) => cabecalho.appendChild(criarElemento('th', '', texto)));
    const corpo = tabela.createTBody();
    tentativas.forEach((linha) => corpo.appendChild(montarLinhaRelatorio({ ...base, linha })));
    const detalhe = criarElemento('tr', CLASSE_RELATORIO + '__detalhe');
    const celula = criarElemento('td');
    celula.colSpan = COLUNAS_ALUNOS_RELATORIO.length;
    celula.appendChild(tabela);
    detalhe.appendChild(celula);
    return detalhe;
}

/**
 * Cria a célula de ações do aluno: Visualizar Notas e Liberar nova tentativa.
 * @param {HTMLElement} bloco - Bloco (tbody) do aluno.
 * @param {Object[]} tentativas - Linhas do resumo do aluno.
 * @param {Object} base - {secao, atividadeId, maximo, notaFinal}.
 * @returns {HTMLTableCellElement} Célula de ações.
 */
function criarCelulaAcoesAluno(bloco, tentativas, base) {
    const celula = criarElemento('td');
    const grupo = criarElemento('div', CLASSE_RELATORIO + '__acoes');
    grupo.append(criarBotao('btn-export ' + CLASSE_RELATORIO + '__ver-notas',
        'Visualizar Notas', () => alternarNotasAluno(bloco)),
    criarControleLiberar({ ...base, linha: tentativas[tentativas.length - 1] }));
    celula.appendChild(grupo);
    return celula;
}

/**
 * Monta o bloco (tbody) de um aluno: uma linha com colunas retas e, escondida, a linha de
 * detalhe com as tentativas e suas notas.
 * @param {Object[]} tentativas - Linhas do resumo do aluno, em ordem de tentativa.
 * @param {{secao: HTMLElement, atividadeId: number, maximo: number}} base - Seção, atividade
 *     e limite de tentativas.
 * @returns {HTMLElement} Bloco do aluno.
 */
function montarBlocoAluno(tentativas, base) {
    const primeira = tentativas[0];
    const semResposta = Boolean(primeira.sem_resposta);
    const bloco = criarElemento('tbody', CLASSE_RELATORIO + '__aluno');
    const notaFinal = semResposta ? null : calcularNotaFinalAluno(tentativas);
    const naoAtingiu = notaFinal === null || notaFinal < NOTA_MINIMA_APROVACAO;
    Object.assign(bloco.dataset, { turma: primeira.turma_codigo || TURMA_SEM_CODIGO,
        aluno: primeira.aluno_id, tentativas: String(semResposta ? 0 : tentativas.length),
        naoAtingiu: String(naoAtingiu), fez: semResposta ? 'nao' : 'sim',
        status: semResposta ? '' : (tentativas[tentativas.length - 1].entregue_em ?
            'entregue' : 'andamento') });
    bloco.classList.add(CLASSE_NOTAS_OCULTAS);
    bloco.classList.toggle(CLASSE_ABAIXO_MINIMO, naoAtingiu);
    const textoNota = notaFinal === null ? '—' : formatarNota(notaFinal);
    const linha = document.createElement('tr');
    const celulaNota = criarElemento('td', CLASSE_RELATORIO + '__col-nota');
    celulaNota.append(criarElemento('span', CLASSE_RELATORIO + '__nota-final', textoNota),
        criarElemento('span', CLASSE_RELATORIO + '__nota-oculta', '••••'));
    linha.append(criarCelulaRelatorio(primeira.numero_chamada ?? ''),
        criarCelulaRelatorio((primeira.nome || '(sem cadastro)') +
            (primeira.fora_da_chamada ? ' (fora da chamada)' : '')),
        criarCelulaRelatorio(semResposta ? '❌ Não' : '✅ Sim',
            CLASSE_RELATORIO + (semResposta ? '__fez--nao' : '__fez--sim')),
        criarCelulaRelatorio(TEXTO_STATUS[bloco.dataset.status] || '—'),
        criarCelulaRelatorio((semResposta ? 0 : tentativas.length) + ' de ' + base.maximo),
        celulaNota);
    linha.appendChild(semResposta ? criarElemento('td') :
        criarCelulaAcoesAluno(bloco, tentativas, { ...base, notaFinal }));
    bloco.appendChild(linha);
    if (!semResposta) bloco.appendChild(montarDetalheAluno(tentativas, base));
    return bloco;
}

/**
 * Monta a tabela do relatório: um bloco por aluno, com colunas alinhadas.
 * @param {Object[]} linhas - Linhas do resumo (ordenadas por aluno e tentativa).
 * @param {{secao: HTMLElement, atividadeId: number, maximo: number}} base - Seção da página,
 *     id da atividade e limite de tentativas.
 * @returns {HTMLElement} Área de rolagem com a tabela pronta.
 */
function montarListaAlunosRelatorio(linhas, base) {
    const porAluno = new Map();
    const ordenadas = [...linhas].sort((a, b) =>
        String(a.turma_codigo).localeCompare(String(b.turma_codigo)) ||
        String(a.nome || '').localeCompare(String(b.nome || ''), 'pt-BR', { sensitivity: 'base' }) ||
        (a.tentativa ?? 0) - (b.tentativa ?? 0));
    ordenadas.forEach((linha) => {
        const grupo = porAluno.get(linha.aluno_id) || [];
        grupo.push(linha);
        porAluno.set(linha.aluno_id, grupo);
    });
    const tabela = criarElemento('table', CLASSE_RELATORIO + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    COLUNAS_ALUNOS_RELATORIO.forEach((texto) =>
        cabecalho.appendChild(criarElemento('th', '', texto)));
    porAluno.forEach((tentativas) => tabela.appendChild(montarBlocoAluno(tentativas, base)));
    const rolagem = criarElemento('div', CLASSE_RELATORIO + '__rolagem');
    rolagem.appendChild(tabela);
    return rolagem;
}

/**
 * Busca no banco local, turno e unidade curricular das turmas (para os cartões das abas).
 * @returns {Promise<Map<string, Object>>} Turmas por código (vazio se a consulta falhar).
 */
async function buscarDadosTurmas() {
    try {
        const turmas = await sbGet('turma', 'select=codigo,nome,turno,local,uc,favorito,hora_inicio,hora_fim');
        return new Map(turmas.map((turma) => [turma.codigo, turma]));
    } catch (erro) {
        return new Map();
    }
}

/**
 * Normaliza um texto para comparar nomes (sem acentos, minúsculo, sem espaços sobrando).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTexto(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Descobre a unidade curricular (matéria) da atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<string>} Nome normalizado da UC ou vazio se não for possível descobrir.
 */
async function buscarUcDaAtividade(atividadeId) {
    const linhas = await sbGet('atividade',
        'select=aulas(materia(descricao))&id=eq.' + encodeURIComponent(atividadeId));
    return normalizarTexto(linhas[0]?.aulas?.materia?.descricao);
}

/**
 * Acrescenta ao resumo TODOS os alunos das turmas da UC da atividade que ainda não responderam
 * nada (linhas marcadas sem_resposta), inclusive os fora da chamada oficial. Se não for possível
 * descobrir a UC, usa todas as turmas. Se a consulta falhar, devolve só as linhas originais.
 * @param {Object[]} linhas - Linhas do resumo.
 * @param {number} atividadeId - Id da atividade.
 * @param {Map<string, Object>} dadosTurmas - Dados das turmas por código (inclui uc).
 * @returns {Promise<Object[]>} Linhas do resumo mais uma linha por aluno sem resposta.
 */
async function acrescentarAlunosSemResposta(linhas, atividadeId, dadosTurmas) {
    try {
        const uc = await buscarUcDaAtividade(atividadeId).catch(() => '');
        const alunos = await sbGet('aluno',
            'select=id,nome,numero_chamada,turma_codigo,na_chamada&order=turma_codigo,numero_chamada');
        const jaResponderam = new Set(linhas.map((linha) => linha.aluno_id));
        const turmaDaUc = (codigo) => !uc || !dadosTurmas.has(codigo) ||
            normalizarTexto(dadosTurmas.get(codigo).uc) === uc;
        const faltantes = alunos
            .filter((aluno) => !jaResponderam.has(aluno.id) && turmaDaUc(aluno.turma_codigo))
            .map((aluno) => ({ aluno_id: aluno.id, nome: aluno.nome,
                numero_chamada: aluno.numero_chamada, turma_codigo: aluno.turma_codigo,
                turma_nome: null, sem_resposta: true, fora_da_chamada: aluno.na_chamada === false }));
        return [...linhas, ...faltantes];
    } catch (erro) {
        return linhas;
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
            codigo, nome: linha.turma_nome || dados.nome || codigo || 'Sem turma', uc: dados.uc || '',
            local: [dados.local, dados.turno].filter(Boolean).join(' ').toUpperCase(),
            favorita: Boolean(dados.favorito),
            inicio: formatarHoraTurma(dados.hora_inicio), fim: formatarHoraTurma(dados.hora_fim),
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
    const respondidas = linhas.filter((linha) => !linha.sem_resposta);
    const alunos = new Set(respondidas.map((linha) => linha.aluno_id)).size;
    const entregas = linhas.filter((linha) => linha.entregue_em).length;
    resumo.textContent = respondidas.length
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
    const idsVisiveis = new Set();
    bloco.querySelectorAll('.' + CLASSE_RELATORIO + '__aluno').forEach((cartao) => {
        cartao.hidden = !passaNosFiltros(cartao, turma);
        if (!cartao.hidden) idsVisiveis.add(cartao.dataset.aluno);
    });
    bloco.querySelector('.' + CLASSE_RELATORIO + '__favorita')?.atualizar();
    bloco.querySelector('.' + CLASSE_RELATORIO + '__horario')?.atualizar();
    bloco.querySelectorAll('.' + CLASSE_RELATORIO + '__aba').forEach((aba) => {
        const ativa = aba.dataset.turma === turma;
        aba.classList.toggle(CLASSE_ABA_ATIVA, ativa);
        aba.setAttribute('aria-selected', String(ativa));
    });
    const visiveis = linhas.filter((linha) => idsVisiveis.has(String(linha.aluno_id)));
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
        if (turma.favorita) aba.append(criarTrechoAbaRelatorio('uc', '⭐ Turma favorita'));
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
 * Cria um interruptor ON/OFF (checkbox estilizado) para os filtros do relatório.
 * @param {string} texto - Rótulo do interruptor.
 * @param {Function} aoMudar - Chamada com true (ON) ou false (OFF).
 * @param {boolean} [ligadoInicial] - Estado inicial do interruptor.
 * @returns {HTMLLabelElement} Interruptor pronto.
 */
function criarInterruptorRelatorio(texto, aoMudar, ligadoInicial = false) {
    const etiqueta = criarElemento('label', CLASSE_RELATORIO + '__interruptor');
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = ligadoInicial;
    caixa.addEventListener('change', () => aoMudar(caixa.checked));
    etiqueta.append(caixa, criarElemento('span', CLASSE_RELATORIO + '__chave'),
        criarElemento('span', CLASSE_RELATORIO + '__interruptor-texto', texto));
    return etiqueta;
}

/**
 * Monta os filtros (interruptores ON/OFF): só quem não atingiu a nota mínima e quantidade de
 * tentativas (1, 2 ou 3; nenhum ligado mostra todos).
 * @param {Function} aoMudar - Chamada quando qualquer filtro muda.
 * @returns {HTMLElement} Barra de filtros.
 */
function montarFiltrosRelatorio(aoMudar) {
    const barra = criarElemento('div', CLASSE_RELATORIO + '__filtros');
    const grupoSituacao = criarElemento('div', CLASSE_RELATORIO + '__grupo-filtro');
    grupoSituacao.append(criarElemento('strong', '', 'Situação'),
        criarInterruptorRelatorio('Não atingiram a nota mínima', (ligado) => {
            filtroSoNaoAtingiuRelatorio = ligado;
            aoMudar();
        }, filtroSoNaoAtingiuRelatorio));
    const grupoTentativas = criarElemento('div', CLASSE_RELATORIO + '__grupo-filtro');
    grupoTentativas.appendChild(criarElemento('strong', '', 'Tentativas'));
    QUANTIDADES_TENTATIVAS.forEach((quantidade) => {
        grupoTentativas.appendChild(criarInterruptorRelatorio(quantidade + 'x', (ligado) => {
            if (ligado) filtroTentativasRelatorio.add(quantidade);
            else filtroTentativasRelatorio.delete(quantidade);
            aoMudar();
        }, filtroTentativasRelatorio.has(quantidade)));
    });
    const grupoFez = criarElemento('div', CLASSE_RELATORIO + '__grupo-filtro');
    grupoFez.appendChild(criarElemento('strong', '', 'Fez a atividade?'));
    [['sim', 'Sim'], ['nao', 'Não']].forEach(([valor, texto]) => {
        grupoFez.appendChild(criarInterruptorRelatorio(texto, (ligado) => {
            if (ligado) filtroFezRelatorio.add(valor);
            else filtroFezRelatorio.delete(valor);
            aoMudar();
        }, filtroFezRelatorio.has(valor)));
    });
    const grupoStatus = criarElemento('div', CLASSE_RELATORIO + '__grupo-filtro');
    grupoStatus.appendChild(criarElemento('strong', '', 'Status'));
    [['entregue', 'Entregue'], ['andamento', 'Andamento']].forEach(([valor, texto]) => {
        grupoStatus.appendChild(criarInterruptorRelatorio(texto, (ligado) => {
            if (ligado) filtroStatusRelatorio.add(valor);
            else filtroStatusRelatorio.delete(valor);
            aoMudar();
        }, filtroStatusRelatorio.has(valor)));
    });
    barra.append(grupoFez, grupoStatus, grupoSituacao, grupoTentativas);
    return barra;
}

/**
 * Cria o interruptor "Mostrar Atividades": liga/desliga a exibição das perguntas para o
 * professor (por padrão desligado, as perguntas ficam escondidas).
 * @returns {HTMLElement} Interruptor pronto.
 */
function montarInterruptorPerguntas() {
    const interruptor = criarInterruptorRelatorio('Mostrar Atividades', (ligado) =>
        document.body.classList.toggle(CLASSE_PERGUNTAS_OCULTAS, !ligado));
    interruptor.querySelector('input').checked =
        !document.body.classList.contains(CLASSE_PERGUNTAS_OCULTAS);
    const grupo = criarElemento('div', CLASSE_RELATORIO + '__grupo-filtro');
    grupo.appendChild(interruptor);
    return grupo;
}

/**
 * Cria um campo de horário (HH:MM) com rótulo.
 * @param {string} rotulo - Texto do rótulo.
 * @returns {{etiqueta: HTMLLabelElement, campo: HTMLInputElement}} Rótulo e campo.
 */
function criarCampoHorarioRelatorio(rotulo) {
    const etiqueta = criarElemento('label', CLASSE_RELATORIO + '__campo-horario', rotulo + ' ');
    const campo = document.createElement('input');
    campo.type = 'time';
    etiqueta.appendChild(campo);
    return { etiqueta, campo };
}

/**
 * Cria o bloco onde o professor define o horário (início e fim) da turma escolhida nas abas.
 * Fora desse horário o aluno da turma não grava alternativas nem entrega. Vazio = sem limite.
 * @param {{codigo: string, inicio: string, fim: string}[]} turmas - Turmas do relatório.
 * @returns {HTMLElement} Bloco com os campos e o botão de salvar.
 */
function criarHorarioTurmaRelatorio(turmas) {
    const bloco = criarElemento('div', CLASSE_RELATORIO + '__horario');
    const inicio = criarCampoHorarioRelatorio('Horário da turma — início:');
    const fim = criarCampoHorarioRelatorio('fim:');
    const botao = criarBotao('btn-export', '💾 Salvar horário', async () => {
        const turma = turmas.find((item) => item.codigo === turmaEscolhidaRelatorio);
        try {
            await definirHorarioTurma({ codigo: turma.codigo,
                inicio: inicio.campo.value, fim: fim.campo.value });
            turma.inicio = inicio.campo.value;
            turma.fim = fim.campo.value;
            await mostrarPopup(turma.inicio ? 'Horário salvo: alunos da turma só gravam e ' +
                'entregam das ' + turma.inicio + ' às ' + turma.fim + '.'
                : 'Horário removido: a turma não tem limite de horário.',
            { tipo: 'sucesso', titulo: 'Horário da turma' });
        } catch (erro) {
            await mostrarPopup(erro.message, { tipo: 'erro' });
        }
    });
    bloco.append(inicio.etiqueta, fim.etiqueta, botao);
    bloco.atualizar = () => {
        const turma = turmas.find((item) => item.codigo === turmaEscolhidaRelatorio);
        inicio.campo.value = turma?.inicio || '';
        fim.campo.value = turma?.fim || '';
    };
    return bloco;
}

/**
 * Cria o botão que marca/desmarca como favorita a turma escolhida nas abas.
 * @param {{codigo: string, favorita: boolean}[]} turmas - Turmas do relatório.
 * @param {Function} aoAlterar - Recarrega o relatório depois de gravar.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoFavoritaRelatorio(turmas, aoAlterar) {
    const botao = criarBotaoFavorita('btn-export ' + CLASSE_RELATORIO + '__favorita', async () => {
        const atual = turmas.find((turma) => turma.codigo === turmaEscolhidaRelatorio);
        try {
            await definirTurmaFavorita(atual?.favorita ? '' : turmaEscolhidaRelatorio);
            await aoAlterar();
        } catch (erro) {
            await mostrarPopup(erro.message, { tipo: 'erro' });
        }
    });
    botao.atualizar = () => atualizarBotaoFavorita(botao, turmas.some((turma) =>
        turma.favorita && turma.codigo === turmaEscolhidaRelatorio));
    botao.atualizar();
    return botao;
}

/**
 * Mostra, no início da atividade, o relatório do professor (cria ou substitui o cartão).
 * @param {HTMLElement} secao - Seção de conteúdo da página.
 * @param {number} atividadeId - Id da atividade no banco.
 * @param {number} maximo - Limite de tentativas da atividade (vem do banco).
 */
async function montarRelatorioProfessor(secao, atividadeId, maximo) {
    if (!document.body.dataset.perguntasIniciadas) {
        document.body.dataset.perguntasIniciadas = 'sim';
        document.body.classList.add(CLASSE_PERGUNTAS_OCULTAS);
    }
    secao.querySelector('.' + CLASSE_RELATORIO)?.remove();
    const bloco = criarElemento('div', 'aula-card ' + CLASSE_RELATORIO);
    bloco.appendChild(criarElemento('span', 'aula-badge', 'PROFESSOR'));
    bloco.appendChild(criarElemento('div', 'aula-title', 'Respostas dos alunos nesta atividade'));
    bloco.appendChild(montarInterruptorPerguntas());
    secao.insertBefore(bloco, secao.firstChild.nextSibling);
    try {
        const dadosTurmas = await buscarDadosTurmas();
        const linhas = await acrescentarAlunosSemResposta(
            await acrescentarAberturas(await buscarResumoTentativas(atividadeId), atividadeId),
            atividadeId, dadosTurmas);
        const resumo = criarElemento('p', CLASSE_RELATORIO + '__resumo');
        bloco.appendChild(resumo);
        atualizarResumoRelatorio(resumo, linhas);
        if (!linhas.length) return;
        const turmas = listarTurmasRelatorio(linhas, dadosTurmas);
        const existe = turmas.some((turma) => turma.codigo === turmaEscolhidaRelatorio);
        const favorita = turmas.find((turma) => turma.favorita);
        if (!existe) turmaEscolhidaRelatorio = (favorita || turmas[0]).codigo;
        bloco.appendChild(montarAbasTurmaRelatorio(turmas,
            (turma) => aplicarFiltroTurmaRelatorio(bloco, linhas, turma)));
        bloco.appendChild(criarHorarioTurmaRelatorio(turmas));
        bloco.appendChild(criarBotaoFavoritaRelatorio(turmas, () =>
            montarRelatorioProfessor(secao, atividadeId, maximo)));
        bloco.appendChild(montarFiltrosRelatorio(
            () => aplicarFiltroTurmaRelatorio(bloco, linhas, turmaEscolhidaRelatorio)));
        bloco.appendChild(montarListaAlunosRelatorio(linhas, { secao, atividadeId, maximo }));
        aplicarFiltroTurmaRelatorio(bloco, linhas, turmaEscolhidaRelatorio);
    } catch (erro) {
        bloco.appendChild(criarElemento('p', CLASSE_RELATORIO + '__erro',
            MSG_ERRO_RELATORIO + erro.message));
    }
}
