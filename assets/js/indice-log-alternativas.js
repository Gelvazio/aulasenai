// Link "🧾 LOG" ao lado do link de cada atividade no índice (só PROFESSOR logado). Abre um modal
// com a lista de alunos (turmas do professor; o administrador vê todas) e, ao escolher o aluno,
// mostra o log das alternativas dele naquela atividade (tabela log_resposta_atividade, preenchida
// pelo gatilho do banco: MARCOU, TROCOU, APAGOU). Só leitura; o RLS limita aos alunos do professor.
// Carregado pelo assets/js/atividades-crud-modal.js. Depende de js/supabase.js (sbGet,
// obterClienteSupabase) e do popup (assets/js/popup.js), quando disponível.

const SELETOR_CARD_LOG = 'article.aula';
const SELETOR_LINK_LOG = 'a.btn.principal';
const ATRIBUTO_HREF_GUARDADO_LOG = 'data-href-bloqueado';
const PERFIL_PROFESSOR_LOG = 'PROFESSOR';
const CLASSE_LOG = 'log-alternativas';
const TEXTO_SELECIONE_ALUNO_LOG = 'Selecione o aluno…';
const ROTULOS_OPERACAO_LOG = { MARCOU: '✅ Marcou', TROCOU: '🔁 Trocou', APAGOU: '🗑️ Apagou' };
const MSG_SEM_REGISTROS_LOG = 'Nenhuma alternativa registrada para este aluno nesta atividade ' +
    '(o log grava só os cliques feitos a partir de 06/10/2026).';
const FORMATO_DATA_HORA_LOG = { day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit' };
const estadoLog = { modal: null, atividade: null };

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoLog(tag, classe = '', texto = '') {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
}

/**
 * Indica se o usuário logado é professor (perfil do app_metadata).
 * @returns {Promise<boolean>} true se for professor.
 */
async function usuarioEhProfessorLog() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_LOG;
}

/**
 * Converte o link do card no caminho da página (pathname), mesmo com o card bloqueado.
 * @param {HTMLAnchorElement} link - Link principal do card.
 * @returns {string|null} Caminho da página .html ou null.
 */
function caminhoDoLinkLog(link) {
    const endereco = link.getAttribute('href') || link.getAttribute(ATRIBUTO_HREF_GUARDADO_LOG);
    if (!endereco) return null;

    const caminho = decodeURIComponent(new URL(endereco, location.href).pathname);
    return caminho.toLowerCase().endsWith('.html') ? caminho : null;
}

/**
 * Busca as atividades cadastradas das páginas do índice.
 * @param {string[]} paginas - Caminhos das páginas.
 * @returns {Promise<Object[]>} Linhas {id, pagina, nome_atividade, descricao}.
 */
async function buscarAtividadesLog(paginas) {
    if (!paginas.length) return [];

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    return sbGet('atividade', 'select=id,pagina,nome_atividade,descricao&pagina=in.(' +
        encodeURIComponent(valores) + ')');
}

/**
 * Lista os alunos das turmas visíveis ao professor, com o nome e a turma.
 * @returns {Promise<{id: string, nome: string, turma: string}[]>} Alunos em ordem de nome.
 */
async function buscarAlunosLog() {
    const vinculos = await sbGet('turmaaluno', 'select=aluno_id,turma_codigo');
    const ids = [...new Set(vinculos.map((vinculo) => vinculo.aluno_id))];
    if (!ids.length) return [];

    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + ids.join(',') + ')');
    const nomes = new Map(alunos.map((aluno) => [aluno.id, aluno.nome]));
    const turmas = new Map();
    vinculos.forEach((vinculo) => {
        const lista = turmas.get(vinculo.aluno_id) || [];
        turmas.set(vinculo.aluno_id, lista.concat(vinculo.turma_codigo));
    });
    return ids.map((id) => ({ id, nome: nomes.get(id) || id, turma: turmas.get(id).join(', ') }))
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/**
 * Conta os registros de log de cada aluno na atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, number>>} Aluno → quantidade de registros.
 */
async function contarRegistrosLog(atividadeId) {
    const linhas = await sbGet('log_resposta_atividade',
        'select=aluno_id&atividade_id=eq.' + atividadeId);
    const contagem = new Map();
    linhas.forEach((linha) => contagem.set(linha.aluno_id, (contagem.get(linha.aluno_id) || 0) + 1));
    return contagem;
}

/**
 * Busca o log de um aluno numa atividade, do mais antigo para o mais novo.
 * @param {number} atividadeId - Id da atividade.
 * @param {string} alunoId - Id do aluno.
 * @returns {Promise<Object[]>} Registros do log.
 */
async function buscarLogDoAluno(atividadeId, alunoId) {
    return sbGet('log_resposta_atividade',
        'select=registrado_em,tentativa,item,letra_anterior,letra_nova,operacao,herdada' +
        '&atividade_id=eq.' + atividadeId + '&aluno_id=eq.' + alunoId +
        '&order=registrado_em.asc,id.asc');
}

/**
 * Monta (uma vez) o modal do log e liga os eventos de fechar.
 * @returns {{fundo: HTMLElement, titulo: HTMLElement, lista: HTMLSelectElement,
 *   resultado: HTMLElement}} Elementos do modal.
 */
function montarModalLog() {
    const fundo = criarElementoLog('div', CLASSE_LOG + '__fundo');
    fundo.hidden = true;
    const caixa = criarElementoLog('div', CLASSE_LOG + '__caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoLog('div', CLASSE_LOG + '__cabecalho');
    const titulo = criarElementoLog('h2', CLASSE_LOG + '__titulo');
    const fechar = criarElementoLog('button', CLASSE_LOG + '__fechar', '✕ Fechar');
    fechar.type = 'button';
    cabecalho.append(titulo, fechar);
    const rotulo = criarElementoLog('label', CLASSE_LOG + '__rotulo', 'Aluno: ');
    const lista = document.createElement('select');
    lista.className = CLASSE_LOG + '__lista';
    rotulo.append(lista);
    const resultado = criarElementoLog('div', CLASSE_LOG + '__resultado');
    caixa.append(cabecalho, rotulo, resultado);
    fundo.append(caixa);
    document.body.append(fundo);
    const fecharModal = () => { fundo.hidden = true; };
    fechar.addEventListener('click', fecharModal);
    fundo.addEventListener('click', (evento) => { if (evento.target === fundo) fecharModal(); });
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && !fundo.hidden) fecharModal();
    });
    lista.addEventListener('change', () => mostrarLogDoAlunoSelecionado());
    return { fundo, titulo, lista, resultado };
}

/**
 * Preenche a lista de alunos (com a quantidade de registros de cada um).
 * @param {{id: string, nome: string, turma: string}[]} alunos - Alunos visíveis.
 * @param {Map<string, number>} contagem - Registros por aluno.
 */
function preencherListaAlunosLog(alunos, contagem) {
    const { lista } = estadoLog.modal;
    lista.replaceChildren(new Option(TEXTO_SELECIONE_ALUNO_LOG, ''));
    alunos.forEach((aluno) => {
        const total = contagem.get(aluno.id) || 0;
        const texto = aluno.nome + ' (' + aluno.turma + ') — ' + total +
            (total === 1 ? ' registro' : ' registros');
        lista.append(new Option(texto, aluno.id));
    });
}

/**
 * Formata a data e a hora de um registro no padrão brasileiro.
 * @param {string} valor - Data ISO do banco.
 * @returns {string} Data e hora.
 */
function formatarDataHoraLog(valor) {
    return new Date(valor).toLocaleString('pt-BR', FORMATO_DATA_HORA_LOG);
}

/**
 * Monta a tabela do log de um aluno.
 * @param {Object[]} registros - Registros do log.
 * @returns {HTMLTableElement} Tabela pronta.
 */
function montarTabelaLog(registros) {
    const tabela = criarElementoLog('table', CLASSE_LOG + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Data e hora', 'Tentativa', 'Questão', 'Operação', 'De', 'Para'].forEach((texto) => {
        cabecalho.append(criarElementoLog('th', '', texto));
    });
    const corpo = tabela.createTBody();
    registros.forEach((registro) => {
        const linha = corpo.insertRow();
        const operacao = ROTULOS_OPERACAO_LOG[registro.operacao] || registro.operacao;
        [formatarDataHoraLog(registro.registrado_em), String(registro.tentativa),
            String(registro.item).padStart(2, '0'),
            operacao + (registro.herdada ? ' (herdada)' : ''),
            registro.letra_anterior || '—', registro.letra_nova || '—']
            .forEach((texto) => linha.insertCell().textContent = texto);
    });
    return tabela;
}

/**
 * Carrega e mostra o log do aluno escolhido na lista.
 */
async function mostrarLogDoAlunoSelecionado() {
    const { lista, resultado } = estadoLog.modal;
    resultado.replaceChildren();
    if (!lista.value) return;

    resultado.append(criarElementoLog('p', CLASSE_LOG + '__aviso', 'Carregando…'));
    try {
        const registros = await buscarLogDoAluno(estadoLog.atividade.id, lista.value);
        resultado.replaceChildren(registros.length
            ? montarTabelaLog(registros)
            : criarElementoLog('p', CLASSE_LOG + '__aviso', MSG_SEM_REGISTROS_LOG));
    } catch (erro) {
        resultado.replaceChildren(criarElementoLog('p', CLASSE_LOG + '__erro',
            'Não foi possível carregar o log: ' + erro.message));
    }
}

/**
 * Abre o modal do log de uma atividade.
 * @param {{id: number, nome_atividade: string, descricao: string}} atividade - Atividade do card.
 */
async function abrirModalLog(atividade) {
    estadoLog.modal = estadoLog.modal || montarModalLog();
    estadoLog.atividade = atividade;
    const { fundo, titulo, resultado } = estadoLog.modal;
    titulo.textContent = '🧾 Log das alternativas — ID ' + atividade.id + ' · ' +
        (atividade.nome_atividade || atividade.descricao || '');
    resultado.replaceChildren(criarElementoLog('p', CLASSE_LOG + '__aviso', 'Carregando alunos…'));
    fundo.hidden = false;
    try {
        const [alunos, contagem] = await Promise.all([buscarAlunosLog(),
            contarRegistrosLog(atividade.id)]);
        preencherListaAlunosLog(alunos, contagem);
        resultado.replaceChildren();
    } catch (erro) {
        resultado.replaceChildren(criarElementoLog('p', CLASSE_LOG + '__erro',
            'Não foi possível carregar os alunos: ' + erro.message));
    }
}

/**
 * Coloca o link "🧾 LOG" logo depois do link da atividade no card.
 * @param {HTMLAnchorElement} link - Link principal do card.
 * @param {Object} atividade - Atividade cadastrada do card.
 */
function inserirLinkLog(link, atividade) {
    if (link.parentElement.querySelector('.' + CLASSE_LOG + '__link')) return;

    // Botão (não <a>): continua clicável mesmo com o card bloqueado, que desativa os links.
    const botao = criarElementoLog('button', CLASSE_LOG + '__link', '🧾 LOG');
    botao.type = 'button';
    botao.title = 'Log das alternativas marcadas pelos alunos';
    botao.addEventListener('click', () => abrirModalLog(atividade));
    link.after(botao);
}

/**
 * Inicia o recurso: só para professor; um link por card com atividade cadastrada.
 */
async function iniciarLogAlternativas() {
    try {
        if (!(await usuarioEhProfessorLog())) return;

        const links = [...document.querySelectorAll(SELETOR_CARD_LOG + ' ' + SELETOR_LINK_LOG)];
        const caminhos = links.map(caminhoDoLinkLog);
        const atividades = await buscarAtividadesLog([...new Set(caminhos.filter(Boolean))]);
        const porPagina = new Map(atividades.map((atividade) => [atividade.pagina, atividade]));
        links.forEach((link, indice) => {
            const atividade = porPagina.get(caminhos[indice]);
            if (atividade) inserirLinkLog(link, atividade);
        });
    } catch (erro) {
        console.warn('Log das alternativas indisponível:', erro.message);
    }
}

iniciarLogAlternativas();
