// Professor: painel "Correção de IA" no topo do Progresso da turma GLOBAL
// (progresso-turma-global.js), só nas atividades discursivas (objetiva tem nota automática).
// Mostra "Atividades entregues: N", "Questões corrigidas: X de Y" e o estado do último pedido,
// e tem o botão "Executar correção de IA agora" (só perfil PROFESSOR), que grava UM pedido na
// tabela pedido_correcao_ia (estado PENDENTE); quem corrige é o Claude Code (/corrigir-ia).
// Leitura e gravação com o JWT do professor logado (RLS); nunca chave de serviço.
// Contrato do banco: pedido_correcao_ia(atividade_id, solicitado_por default auth.uid(),
// estado, solicitado_em default now()); correcao_discursiva.nota_ia; topico_discursivo.
// Tarefa CORRECAO-IA-PAINEL.2. Depende de js/supabase.js. Regra: docs/regras/atividades.md

const CLASSE_CORRECAO_IA = 'correcao-ia';
const TABELA_PEDIDO_CORRECAO_IA = 'pedido_correcao_ia';
const ESTADO_PENDENTE_CORRECAO_IA = 'PENDENTE';
const PERFIL_PROFESSOR_CORRECAO_IA = 'PROFESSOR';
const LINHAS_POR_PAGINA_CORRECAO_IA = 1000;
const SELETOR_LEGENDA_CORRECAO_IA = '.progresso-turma__legenda';
const SELETOR_CONTAGEM_CORRECAO_IA = '.progresso-turma__contagem';
const CLASSE_PENDENTE_CORRECAO_IA = CLASSE_CORRECAO_IA + '__linha--pendente';
const TEXTO_BOTAO_CORRECAO_IA = '🤖 Executar correção de IA agora ✨';
const MSG_PEDIDO_ENVIADO_CORRECAO_IA = 'Pedido enviado: execute /corrigir-ia no Claude Code';
const MSG_PEDIDO_JA_EXISTE_CORRECAO_IA = 'Já existe um pedido pendente: execute /corrigir-ia ' +
    'no Claude Code';
const ARQUIVO_CSS_CORRECAO_IA = '../css/correcao-ia-progresso.css';
const BASE_SCRIPTS_CORRECAO_IA = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Lê todas as linhas de uma consulta do banco, página a página (JWT do usuário).
 * @param {string} tabela - Tabela do banco.
 * @param {string} consulta - Filtros, colunas e ordem (sem limit e offset).
 * @returns {Promise<Object[]>} Todas as linhas.
 */
async function lerTodasAsLinhasCorrecaoIa(tabela, consulta) {
    const linhas = [];
    for (let inicio = 0; ; inicio += LINHAS_POR_PAGINA_CORRECAO_IA) {
        const pagina = await sbGet(tabela, consulta + '&limit=' + LINHAS_POR_PAGINA_CORRECAO_IA +
            '&offset=' + inicio);
        linhas.push(...pagina);
        if (pagina.length < LINHAS_POR_PAGINA_CORRECAO_IA) return linhas;
    }
}

/**
 * Diz se o usuário logado é PROFESSOR.
 * @returns {Promise<boolean>} true se o perfil da sessão é PROFESSOR.
 */
async function ehProfessorCorrecaoIa() {
    const { data } = await obterClienteSupabase().auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_CORRECAO_IA;
}

/**
 * Alunos que entregaram ESTA atividade (só o id atual, em entrega_atividade), dentro dos alunos
 * que o quadro está mostrando (turma escolhida).
 * @param {number} atividadeId - Id da atividade atual.
 * @param {Object[]} alunosDoQuadro - Alunos do quadro (com alunoId).
 * @returns {Promise<Set<string>>} Ids dos alunos que entregaram a atividade.
 */
async function lerIdsEntreguesIdAtualCorrecaoIa(atividadeId, alunosDoQuadro) {
    const entregas = await lerTodasAsLinhasCorrecaoIa('entrega_atividade',
        'select=aluno_id&atividade_id=eq.' + atividadeId + '&order=aluno_id');
    const idsDoQuadro = new Set(alunosDoQuadro.map((aluno) => aluno.alunoId));
    return new Set(entregas.map((linha) => linha.aluno_id).filter((id) => idsDoQuadro.has(id)));
}

/**
 * Conta as questões corrigidas pela IA e o total esperado, só dos alunos que entregaram.
 * @param {number} atividadeId - Id da atividade.
 * @param {Set<string>} idsEntregues - Ids dos alunos que entregaram.
 * @returns {Promise<{corrigidas: number, total: number}>} Questões corrigidas e esperadas.
 */
async function contarQuestoesCorrigidasIa(atividadeId, idsEntregues) {
    if (!idsEntregues.size) return { corrigidas: 0, total: 0 };

    const filtro = 'atividade_id=eq.' + atividadeId;
    const [topicos, correcoes] = await Promise.all([
        lerTodasAsLinhasCorrecaoIa('topico_discursivo', 'select=item,topico&' + filtro +
            '&order=item,topico'),
        lerTodasAsLinhasCorrecaoIa('correcao_discursiva',
            'select=aluno_id,tentativa,item,topico&' + filtro + '&nota_ia=not.is.null' +
            '&order=aluno_id,tentativa,item,topico'),
    ]);
    // Tuplas distintas: mais de uma tentativa corrigida não pode passar do total esperado.
    const distintas = new Set(correcoes
        .filter((linha) => idsEntregues.has(linha.aluno_id))
        .map((linha) => linha.aluno_id + '|' + linha.item + '|' + linha.topico));
    return { corrigidas: distintas.size, total: topicos.length * idsEntregues.size };
}

/**
 * Id da atividade desta página: o mesmo do selo do título (atividade.pagina). Com mais de um id
 * na página, vale o do quadro se estiver entre eles; sem selo, vale o do quadro.
 * @param {number} idDoQuadro - Id que o quadro de progresso recebeu.
 * @returns {number} Id da atividade a usar.
 */
function obterIdAtividadeDaPaginaCorrecaoIa(idDoQuadro) {
    const ids = window.obterIdsAtividadeDaPagina?.() || [];
    if (!ids.length || ids.includes(Number(idDoQuadro))) return idDoQuadro;
    return ids[0];
}

/**
 * Lê o estado do último pedido de correção da atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<string|null>} Estado (PENDENTE, CONCLUIDO...) ou null se nunca pediu.
 */
async function lerEstadoUltimoPedidoIa(atividadeId) {
    const linhas = await sbGet(TABELA_PEDIDO_CORRECAO_IA, 'select=estado&atividade_id=eq.' +
        atividadeId + '&order=solicitado_em.desc&limit=1');
    return linhas[0]?.estado || null;
}

/**
 * Grava um pedido PENDENTE, sem duplicar se já existe um pendente da atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<string>} Mensagem para o professor.
 */
async function pedirCorrecaoIa(atividadeId) {
    if (await existePedidoPendenteIa(atividadeId)) return MSG_PEDIDO_JA_EXISTE_CORRECAO_IA;

    try {
        await sbPost(TABELA_PEDIDO_CORRECAO_IA, { atividade_id: atividadeId,
            estado: ESTADO_PENDENTE_CORRECAO_IA });
    } catch (erro) {
        // O índice único do banco barra o clique duplo: o outro pedido já vale.
        if (await existePedidoPendenteIa(atividadeId)) return MSG_PEDIDO_JA_EXISTE_CORRECAO_IA;
        throw erro;
    }
    return MSG_PEDIDO_ENVIADO_CORRECAO_IA;
}

/**
 * Diz se a atividade já tem pedido de correção PENDENTE.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<boolean>} true se existe pedido pendente.
 */
async function existePedidoPendenteIa(atividadeId) {
    const pendentes = await sbGet(TABELA_PEDIDO_CORRECAO_IA, 'select=estado&atividade_id=eq.' +
        atividadeId + '&estado=eq.' + ESTADO_PENDENTE_CORRECAO_IA + '&limit=1');
    return pendentes.length > 0;
}

/**
 * Cria um elemento do painel com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} sufixo - Sufixo da classe (depois de "correcao-ia__").
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCorrecaoIa(tag, sufixo, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = CLASSE_CORRECAO_IA + '__' + sufixo;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Cria o botão "Executar correção de IA agora" (grava o pedido e mostra a mensagem).
 * @param {Function} atividadeId - Devolve o id da atividade (lido do HTML da página).
 * @param {{mensagem: HTMLElement, aoPedir: Function}} tela - Mensagem e atualização do painel.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoCorrecaoIa(atividadeId, tela) {
    const botao = criarElementoCorrecaoIa('button', 'botao', TEXTO_BOTAO_CORRECAO_IA);
    botao.type = 'button';
    botao.addEventListener('click', async () => {
        botao.disabled = true;
        try {
            tela.mensagem.textContent = await pedirCorrecaoIa(atividadeId());
            await tela.aoPedir();
        } catch (erro) {
            tela.mensagem.textContent = 'Não foi possível enviar o pedido: ' + erro.message;
        } finally {
            botao.disabled = false;
        }
    });
    return botao;
}

/**
 * Cria o painel "Correção de IA". O botão só existe para o PROFESSOR.
 * @param {{atividadeId: number, lerAlunos: Function}} dados - Atividade e função que devolve
 *   os alunos do quadro (com aluno.entregue e aluno.alunoId).
 * @returns {Promise<{elemento: HTMLElement, atualizar: Function}>} Painel e sua atualização.
 */
async function criarPainelCorrecaoIa({ atividadeId, lerAlunos }) {
    const elemento = document.createElement('div');
    elemento.className = CLASSE_CORRECAO_IA;
    const textos = {
        entregues: criarElementoCorrecaoIa('span', 'linha'),
        corrigidas: criarElementoCorrecaoIa('span', 'linha'),
        pedido: criarElementoCorrecaoIa('span', 'linha'),
    };
    const mensagem = criarElementoCorrecaoIa('span', 'mensagem');

    const atualizarSemFalha = async () => {
        try {
            await atualizar();
        } catch (erro) {
            console.warn('Correção de IA do progresso:', erro.message);
        }
    };
    const idDaPagina = () => obterIdAtividadeDaPaginaCorrecaoIa(atividadeId);
    const atualizar = async () => {
        const idEntregues = await lerIdsEntreguesIdAtualCorrecaoIa(idDaPagina(), lerAlunos());
        const contagem = await contarQuestoesCorrigidasIa(idDaPagina(), idEntregues);
        textos.entregues.textContent = '📦 Atividades entregues: ' + idEntregues.size;
        textos.corrigidas.textContent = '✅ Questões corrigidas: ' + contagem.corrigidas +
            ' de ' + contagem.total;
        const estado = await lerEstadoUltimoPedidoIa(idDaPagina());
        textos.pedido.textContent = '🕒 Último pedido: ' + (estado || 'nenhum');
        textos.pedido.classList.toggle(CLASSE_PENDENTE_CORRECAO_IA,
            estado === ESTADO_PENDENTE_CORRECAO_IA);
    };
    if (await ehProfessorCorrecaoIa()) {
        elemento.append(criarBotaoCorrecaoIa(idDaPagina, { mensagem, aoPedir: atualizar }));
    }
    elemento.append(textos.entregues, textos.corrigidas, textos.pedido, mensagem);
    return { elemento, atualizar: atualizarSemFalha };
}

/**
 * Põe o painel lá em cima, à direita dos filtros: agrupa legenda, filtros e contagem numa coluna
 * e o painel ao lado. Sem esses elementos, o painel só vai para o fim da área.
 * @param {HTMLElement} area - Área "Progresso da turma".
 * @param {HTMLElement} painel - Painel "Correção de IA".
 * @returns {void}
 */
function posicionarPainelCorrecaoIa(area, painel) {
    const legenda = area.querySelector(SELETOR_LEGENDA_CORRECAO_IA);
    const contagem = area.querySelector(SELETOR_CONTAGEM_CORRECAO_IA);
    if (!legenda || !contagem) {
        area.appendChild(painel);
        return;
    }
    const grupo = [];
    for (let no = legenda; no; no = no.nextElementSibling) {
        grupo.push(no);
        if (no === contagem) break;
    }
    const topo = criarElementoCorrecaoIa('div', 'topo');
    topo.className = CLASSE_CORRECAO_IA + '-topo';
    const filtros = criarElementoCorrecaoIa('div', 'filtros');
    filtros.className = CLASSE_CORRECAO_IA + '-topo__filtros';
    legenda.before(topo);
    filtros.append(...grupo);
    topo.append(filtros, painel);
}

(function incluirEstiloCorrecaoIa() {
    if (!BASE_SCRIPTS_CORRECAO_IA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_CORRECAO_IA + ARQUIVO_CSS_CORRECAO_IA;
    document.head.appendChild(link);
})();

window.criarPainelCorrecaoIa = criarPainelCorrecaoIa;
window.posicionarPainelCorrecaoIa = posicionarPainelCorrecaoIa;
