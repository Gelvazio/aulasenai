// Provedor "banco" das respostas das atividades (usado por assets/js/respostas-atividade.js).
// Ler a atividade é livre; o login (Supabase Auth) só é pedido ao marcar uma alternativa.
// Respostas: tabela resposta_atividade (upsert por aluno/atividade/item).
// Entrega: tabela entrega_atividade.
// O gabarito NUNCA vem para a página do aluno (tabela gabarito só é lida pelo professor).
// Depende de: supabase-js v2 (CDN), js/supabase.js (SUPABASE, sbH, sbGet) e js/login.js
// (PAGINA_LOGIN, PARAMETRO_VOLTAR, fazerLogout).

const ROTA_RESPOSTAS = '/rest/v1/resposta_atividade?on_conflict=aluno_id,atividade_id,item';
const ROTA_ENTREGAS = '/rest/v1/entrega_atividade';
const PREFERENCIA_UPSERT = 'resolution=merge-duplicates,return=minimal';
const CODIGO_JA_EXISTE = 409;
const DIGITOS_ITEM = 2;
const MSG_ENTRAR_PARA_RESPONDER = 'Para responder, entre com o seu usuário e senha.\n\n' +
    'Ir para a página de login agora?';
const MSG_LEITURA_LIVRE = 'Você pode ler a atividade à vontade. ' +
    'Para marcar as respostas, entre com o seu usuário.';
const MSG_ERRO_ENTREGA = 'Não foi possível registrar a entrega. Confira se todas as questões ' +
    'estão respondidas e tente de novo.';

/**
 * Formata o número do item como aparece na página (ex.: 1 → "01").
 * @param {number} item - Número do item no banco.
 * @returns {string} Número com dois dígitos.
 */
function formatarNumeroItem(item) {
    return String(item).padStart(DIGITOS_ITEM, '0');
}

/**
 * Busca a atividade desta página no banco pelo caminho da URL.
 * @returns {Promise<{id: number, total_itens: number}|null>} Atividade ou null se não existir.
 */
async function buscarAtividadeDaPagina() {
    const caminho = encodeURIComponent(location.pathname);
    const linhas = await sbGet('atividade', 'select=id,total_itens&pagina=eq.' + caminho);
    return linhas[0] || null;
}

/**
 * Lê o aluno logado (nome e turma); o professor não tem linha em aluno e usa o user_metadata.
 * @param {Object} usuario - Usuário do Supabase Auth.
 * @returns {Promise<{nome: string, turma: string}>} Nome e turma para exibir.
 */
async function lerIdentificacao(usuario) {
    const linhas = await sbGet('aluno',
        'select=nome,turma_codigo,turma(nome)&id=eq.' + encodeURIComponent(usuario.id));
    const aluno = linhas[0];
    if (!aluno) return { nome: usuario.user_metadata?.nome || usuario.email, turma: '' };
    const nomeTurma = aluno.turma?.nome ? aluno.turma.nome + ' (' + aluno.turma_codigo + ')' : '';
    return { nome: aluno.nome, turma: nomeTurma };
}

/**
 * Lê as respostas e a entrega do aluno logado nesta atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{respostas: Object<string, string>, entregueEm: string}>} Dados do aluno.
 */
async function lerRespostasDoAluno(atividadeId) {
    const [linhas, entregas] = await Promise.all([
        sbGet('resposta_atividade', 'select=item,letra&atividade_id=eq.' + atividadeId),
        sbGet('entrega_atividade', 'select=entregue_em&atividade_id=eq.' + atividadeId),
    ]);
    const respostas = {};
    linhas.forEach((linha) => { respostas[formatarNumeroItem(linha.item)] = linha.letra; });
    return { respostas, entregueEm: entregas[0]?.entregue_em || '' };
}

/**
 * Envia uma gravação autenticada (JWT do aluno) para a API REST.
 * @param {string} rota - Rota a partir da URL do projeto.
 * @param {Object} corpo - Corpo JSON.
 * @param {string} preferencia - Header Prefer.
 * @returns {Promise<Response>} Resposta do fetch.
 */
async function enviarAoBanco(rota, corpo, preferencia) {
    return fetch(SUPABASE.URL + rota, {
        method: 'POST',
        headers: { ...(await sbH()), Prefer: preferencia },
        body: JSON.stringify(corpo),
    });
}

/**
 * Pergunta se o aluno quer entrar e o leva ao login, voltando depois para esta atividade.
 */
function irParaLogin() {
    if (!window.confirm(MSG_ENTRAR_PARA_RESPONDER)) return;
    const retorno = location.pathname + location.search + location.hash;
    location.assign(PAGINA_LOGIN + '?' + PARAMETRO_VOLTAR + '=' + encodeURIComponent(retorno));
}

/**
 * Monta o bloco de identificação do modo banco: "Conectado como…" ou convite para entrar.
 * @param {{usuario: Object|null, nome: string, turma: string}} sessao - Dados da sessão.
 * @returns {HTMLElement} Bloco de identificação.
 */
function montarIdentificacaoBanco(sessao) {
    const bloco = criarElemento('div', 'aula-card identificacao-estudante');
    bloco.appendChild(criarElemento('span', 'aula-badge', 'IDENTIFICAÇÃO'));
    if (!sessao.usuario) {
        bloco.appendChild(criarElemento('div', 'aula-title', 'Leitura livre'));
        bloco.appendChild(criarElemento('p', 'identificacao-estudante__texto', MSG_LEITURA_LIVRE));
        bloco.appendChild(criarBotao('btn-export', '🔑 Entrar para responder', irParaLogin));
        return bloco;
    }
    const complemento = sessao.turma ? ' — Turma ' + sessao.turma : '';
    bloco.appendChild(criarElemento('div', 'aula-title', 'Conectado como ' + sessao.nome));
    bloco.appendChild(criarElemento('p', 'identificacao-estudante__texto',
        'Suas respostas são salvas automaticamente' + complemento + '.'));
    bloco.appendChild(criarBotao('btn-export btn-export--secundario', '🚪 Sair', fazerLogout));
    return bloco;
}

/**
 * Carrega a sessão, a atividade e as respostas do aluno (se logado).
 * @param {Object} sessao - Objeto da sessão do provedor (preenchido aqui).
 * @returns {Promise<Object>} Dados iniciais para a página (disponivel=false se não houver banco).
 */
async function carregarDoBanco(sessao) {
    const cliente = obterClienteSupabase();
    if (!cliente) return { disponivel: false };
    try {
        sessao.atividade = await buscarAtividadeDaPagina();
        if (!sessao.atividade) return { disponivel: false };
        const { data } = await cliente.auth.getSession();
        sessao.usuario = data?.session?.user || null;
        if (!sessao.usuario) return { disponivel: true, logado: false, respostas: {} };

        Object.assign(sessao, await lerIdentificacao(sessao.usuario));
        const doAluno = await lerRespostasDoAluno(sessao.atividade.id);
        const identificacao = { nome: sessao.nome, turma: sessao.turma };
        return { disponivel: true, logado: true, ...identificacao, ...doAluno };
    } catch (erro) {
        console.warn('Banco indisponível:', erro.message);
        return { disponivel: false };
    }
}

/**
 * Cria o provedor de respostas no banco (mesma interface do provedor local).
 * @returns {Object} Provedor usado por respostas-atividade.js.
 */
function criarProvedorRespostasBanco() {
    const sessao = { usuario: null, atividade: null, nome: '', turma: '' };
    return {
        carregar: () => carregarDoBanco(sessao),
        montarIdentificacao: () => montarIdentificacaoBanco(sessao),
        podeResponder() {
            if (sessao.usuario) return true;
            irParaLogin();
            return false;
        },
        async salvarResposta(numero, letra) {
            const corpo = {
                aluno_id: sessao.usuario.id,
                atividade_id: sessao.atividade.id,
                item: Number(numero),
                letra,
            };
            const resposta = await enviarAoBanco(ROTA_RESPOSTAS, corpo, PREFERENCIA_UPSERT);
            if (!resposta.ok) throw new Error(MSG_ERRO_SALVAR);
        },
        async entregar() {
            const corpo = { aluno_id: sessao.usuario.id, atividade_id: sessao.atividade.id };
            const resposta = await enviarAoBanco(ROTA_ENTREGAS, corpo, 'return=representation');
            const jaEntregue = resposta.status === CODIGO_JA_EXISTE;
            if (jaEntregue) return { entregueEm: new Date().toISOString() };
            if (!resposta.ok) throw new Error(MSG_ERRO_ENTREGA);
            const [entrega] = await resposta.json();
            return { entregueEm: entrega?.entregue_em };
        },
    };
}

window.criarProvedorRespostasBanco = criarProvedorRespostasBanco;
