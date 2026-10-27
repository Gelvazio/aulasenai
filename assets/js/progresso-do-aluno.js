// Aluno: quadro "📊 Meu progresso" no topo da atividade (objetiva e discursiva) com SÓ a linha
// dele: uma célula por questão (sem resposta · em andamento · completa, as mesmas cores do
// Progresso da turma do professor), a barra e "N de T questões respondidas". Atualiza a cada 5 s.
// NÃO mostra: colegas, notas (nem acertos), suspeita de cópia, faltas, quantidade mínima,
// Gráficos, Cálculo Nota nem "Entregue". Só lê as respostas do próprio aluno (o RLS de
// resposta_atividade e resposta_discursiva já limita a ele); a estrutura da prova vem da página
// (lerEstrutura de progresso-turma-fontes.js). Ligado por assets/js/respostas-atividade.js e
// assets/js/avaliacao-discursiva.js. Depende de js/supabase.js.
// Pedido do usuário em 2026-10-14 (tarefa #141). Regra: docs/regras/atividades.md

const CLASSE_MEU_PROGRESSO = 'progresso-turma';
const CLASSE_MEU_PROGRESSO_AREA = 'meu-progresso';
const PERFIL_PROFESSOR_MEU_PROGRESSO = 'PROFESSOR';
const INTERVALO_MEU_PROGRESSO_MS = 5000;
const ARQUIVO_FONTES_MEU_PROGRESSO = 'progresso-turma-fontes.js';
const ARQUIVO_CSS_MEU_PROGRESSO = '../css/progresso-turma-global.css';
const SELETOR_CABECALHO_MEU_PROGRESSO = '.container > header';
const TITULO_MEU_PROGRESSO = '📊 Meu progresso (atualiza a cada 5 segundos)';
const BASE_SCRIPTS_MEU_PROGRESSO = document.currentScript?.src.replace(/[^/]*$/, '') || '';
// Por tipo: tabela das respostas, colunas e o que conta como parte respondida.
const RESPOSTAS_MEU_PROGRESSO = {
    objetiva: { tabela: 'resposta_atividade', colunas: 'aluno_id,tentativa,item',
        temResposta: () => true },
    discursiva: { tabela: 'resposta_discursiva', colunas: 'aluno_id,tentativa,item,texto',
        temResposta: (linha) => (linha.texto || '').trim() !== '' },
};
const SITUACOES_MEU_PROGRESSO = {
    vazia: { modificador: 'vazia', texto: 'sem resposta' },
    andamento: { modificador: 'andamento', texto: 'em andamento' },
    completa: { modificador: 'completa', texto: 'completa' },
};

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoMeuProgresso(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Carrega um script da pasta assets/js e espera terminar.
 * @param {string} arquivo - Nome do arquivo.
 * @returns {Promise<void>} Resolve quando o script carregou.
 */
function carregarScriptMeuProgresso(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_MEU_PROGRESSO + arquivo;
        script.onload = resolver;
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Situação de uma questão pelas partes respondidas.
 * @param {number} respondidas - Partes respondidas.
 * @param {number} total - Partes da questão.
 * @returns {{modificador: string, texto: string}} Situação.
 */
function situacaoDaQuestaoMeuProgresso(respondidas, total) {
    if (!respondidas) return SITUACOES_MEU_PROGRESSO.vazia;
    if (respondidas >= total) return SITUACOES_MEU_PROGRESSO.completa;
    return SITUACOES_MEU_PROGRESSO.andamento;
}

/**
 * Lê as partes respondidas pelo aluno em cada questão, na tentativa mais recente.
 * @param {{atividadeId: number, alunoId: string, tipo: string}} dados - Atividade, aluno e tipo.
 * @returns {Promise<Map<number, number>>} Questão → partes respondidas.
 * @throws {Error} Se o banco recusar.
 */
async function lerMinhasRespostas(dados) {
    const consulta = RESPOSTAS_MEU_PROGRESSO[dados.tipo];
    const linhas = await sbGet(consulta.tabela, 'select=' + consulta.colunas +
        '&atividade_id=eq.' + dados.atividadeId + '&aluno_id=eq.' + dados.alunoId);
    const progresso = contarPartesPorAluno(linhas, consulta.temResposta);
    return progresso.get(dados.alunoId)?.porQuestao || new Map();
}

/**
 * Desenha as células das questões, a barra e a contagem do aluno.
 * @param {HTMLElement} conteudo - Onde desenhar.
 * @param {{estrutura: Map<number, number>, porQuestao: Map<number, number>}} medida - Estrutura
 *     da prova e partes respondidas pelo aluno.
 */
function desenharMeuProgresso(conteudo, medida) {
    const grade = criarElementoMeuProgresso('div', CLASSE_MEU_PROGRESSO + '__questoes');
    let completas = 0;
    medida.estrutura.forEach((total, item) => {
        const respondidas = medida.porQuestao.get(item) || 0;
        const situacao = situacaoDaQuestaoMeuProgresso(respondidas, total);
        if (situacao === SITUACOES_MEU_PROGRESSO.completa) completas += 1;
        const numero = String(item).padStart(2, '0');
        const celula = criarElementoMeuProgresso('span', CLASSE_MEU_PROGRESSO + '__questao ' +
            CLASSE_MEU_PROGRESSO + '__questao--' + situacao.modificador, numero);
        celula.title = 'Questão ' + numero + ': ' + situacao.texto;
        grade.appendChild(celula);
    });
    const percentual = Math.round((completas / medida.estrutura.size) * 100);
    const barra = criarElementoMeuProgresso('div', CLASSE_MEU_PROGRESSO + '__barra');
    const preenchida = criarElementoMeuProgresso('div',
        CLASSE_MEU_PROGRESSO + '__barra-preenchida');
    preenchida.style.width = percentual + '%';
    barra.appendChild(preenchida);
    conteudo.replaceChildren(grade, barra, criarElementoMeuProgresso('p',
        CLASSE_MEU_PROGRESSO + '__resumo', completas + ' de ' + medida.estrutura.size +
        ' questões respondidas (' + percentual + '%)'));
}

/**
 * Lê o aluno logado (sem login ou professor: null).
 * @returns {Promise<string|null>} Id do aluno logado.
 */
async function lerAlunoLogadoMeuProgresso() {
    const { data } = await obterClienteSupabase().auth.getSession();
    const usuario = data?.session?.user;
    if (!usuario || usuario.app_metadata?.perfil === PERFIL_PROFESSOR_MEU_PROGRESSO) return null;
    return usuario.id;
}

/**
 * Monta o quadro "Meu progresso" do aluno logado abaixo do cabeçalho e o atualiza a cada 5 s.
 * Uma falha de leitura mantém o último desenho (a atividade continua normal).
 * @param {number} atividadeId - Id da atividade no banco.
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 */
async function montarMeuProgresso(atividadeId, tipo) {
    const cabecalho = document.querySelector(SELETOR_CABECALHO_MEU_PROGRESSO);
    const jaExiste = document.querySelector('.' + CLASSE_MEU_PROGRESSO_AREA);
    const temTipo = Boolean(RESPOSTAS_MEU_PROGRESSO[tipo]);
    if (!atividadeId || !cabecalho || jaExiste || !temTipo) return;

    const alunoId = await lerAlunoLogadoMeuProgresso();
    if (!alunoId) return;
    if (!window.FONTES_PROGRESSO_TURMA) {
        await carregarScriptMeuProgresso(ARQUIVO_FONTES_MEU_PROGRESSO);
    }
    const estrutura = window.FONTES_PROGRESSO_TURMA[tipo].lerEstrutura();
    if (!estrutura.size) return;

    const area = criarElementoMeuProgresso('section',
        CLASSE_MEU_PROGRESSO + ' ' + CLASSE_MEU_PROGRESSO_AREA);
    const conteudo = criarElementoMeuProgresso('div', CLASSE_MEU_PROGRESSO + '__geral',
        'Lendo...');
    area.append(criarElementoMeuProgresso('h2', CLASSE_MEU_PROGRESSO + '__titulo',
        TITULO_MEU_PROGRESSO), conteudo);
    cabecalho.after(area);

    const atualizar = async () => {
        try {
            const porQuestao = await lerMinhasRespostas({ atividadeId, alunoId, tipo });
            desenharMeuProgresso(conteudo, { estrutura, porQuestao });
        } catch (erro) {
            console.warn('Meu progresso:', erro.message);
        }
    };
    await atualizar();
    setInterval(atualizar, INTERVALO_MEU_PROGRESSO_MS);
}

(function incluirEstiloMeuProgresso() {
    if (!BASE_SCRIPTS_MEU_PROGRESSO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MEU_PROGRESSO + ARQUIVO_CSS_MEU_PROGRESSO;
    document.head.appendChild(link);
})();

window.montarMeuProgresso = montarMeuProgresso;
