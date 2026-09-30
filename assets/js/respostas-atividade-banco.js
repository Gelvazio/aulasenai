// Provedor "banco" das respostas das atividades (usado por assets/js/respostas-atividade.js).
// Ler a atividade é livre; o login (Supabase Auth) só é pedido ao marcar uma alternativa.
// Respostas: tabela resposta_atividade (upsert por aluno/atividade/tentativa/item).
// Entrega: tabela entrega_atividade (uma por tentativa).
// Tentativas: o limite vem do banco (atividade.max_tentativas); nova tentativa só o professor libera
// (tabela liberacao_atividade). Plano: docs/regra-3-tentativas-atividade.md.
// O gabarito NUNCA vem para a página do aluno (tabela gabarito só é lida pelo professor).
// Depende de: supabase-js v2 (CDN), js/supabase.js (SUPABASE, sbH, sbGet) e js/login.js
// (PAGINA_LOGIN, PARAMETRO_VOLTAR, fazerLogout).

const ROTA_RESPOSTAS =
    '/rest/v1/resposta_atividade?on_conflict=aluno_id,atividade_id,tentativa,item';
const ROTA_ENTREGAS = '/rest/v1/entrega_atividade';
const ROTA_NOTA = '/rest/v1/rpc/nota_da_tentativa';
const PERFIL_PROFESSOR_PAGINA = 'PROFESSOR';
const MSG_PROFESSOR_NAO_ASSINA = 'O professor não assina atividades: só os alunos respondem. ' +
    'Aqui você acompanha as respostas e libera novas tentativas.';
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
    const linhas = await sbGet('atividade',
        'select=id,total_itens,max_tentativas&pagina=eq.' + caminho);
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
 * Lê a tentativa em andamento do aluno logado: a maior liberada pelo professor (mínimo 1).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number>} Número da tentativa em andamento.
 */
async function lerTentativaAtual(atividadeId) {
    const liberacoes = await sbGet('liberacao_atividade',
        'select=tentativa&atividade_id=eq.' + atividadeId);
    return Math.max(1, ...liberacoes.map((liberacao) => liberacao.tentativa));
}

/**
 * Lê acertos e total da tentativa entregue (a conta é feita no banco: o gabarito não sai).
 * @param {number} atividadeId - Id da atividade.
 * @param {number} tentativa - Tentativa entregue.
 * @returns {Promise<{acertos: number, total: number}|null>} Resultado ou null se indisponível.
 */
async function lerResultadoDaTentativa(atividadeId, tentativa) {
    const corpo = { p_atividade: atividadeId, p_tentativa: tentativa };
    const resposta = await enviarAoBanco(ROTA_NOTA, corpo, 'return=representation');
    if (!resposta.ok) return null;
    const [linha] = await resposta.json();
    return linha && linha.total > 0 ? linha : null;
}

/**
 * Lê as respostas e a entrega do aluno logado na tentativa em andamento desta atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{respostas: Object<string, string>, entregueEm: string, tentativa: number}>}
 *     Dados do aluno.
 */
async function lerRespostasDoAluno(atividadeId) {
    const tentativa = await lerTentativaAtual(atividadeId);
    const filtro = 'atividade_id=eq.' + atividadeId + '&tentativa=eq.' + tentativa;
    const [linhas, entregas] = await Promise.all([
        sbGet('resposta_atividade', 'select=item,letra&' + filtro),
        sbGet('entrega_atividade', 'select=entregue_em&' + filtro),
    ]);
    const respostas = {};
    linhas.forEach((linha) => { respostas[formatarNumeroItem(linha.item)] = linha.letra; });
    return { respostas, entregueEm: entregas[0]?.entregue_em || '', tentativa };
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
 * Se a turma do aluno tem horário e agora está fora dele, devolve a mensagem explicando.
 * @returns {Promise<string>} Mensagem de horário ou vazio (dentro do horário ou sem restrição).
 */
async function explicarForaDoHorario() {
    try {
        const resposta = await enviarAoBanco('/rest/v1/rpc/horario_da_turma_do_aluno', {},
            'return=representation');
        if (!resposta.ok) return '';

        const [horario] = await resposta.json();
        if (!horario || horario.dentro) return '';

        return 'Fora do horário da turma! Só é possível responder e entregar das ' +
            horario.hora_inicio.slice(0, 5) + ' às ' + horario.hora_fim.slice(0, 5) +
            ' (horário de Brasília).';
    } catch (erro) {
        return '';
    }
}

/**
 * Registra a hora em que o aluno abriu a tentativa em andamento (só a primeira abertura vale).
 * Falha silenciosa: nunca impede o aluno de responder.
 * @param {number} atividadeId - Id da atividade.
 * @param {number} tentativa - Tentativa em andamento.
 * @param {string} alunoId - Id do aluno logado.
 */
async function registrarAbertura(atividadeId, tentativa, alunoId) {
    try {
        await enviarAoBanco('/rest/v1/abertura_atividade',
            { aluno_id: alunoId, atividade_id: atividadeId, tentativa },
            'resolution=ignore-duplicates,return=minimal');
    } catch (erro) {
        console.warn('Abertura não registrada:', erro.message);
    }
}

/**
 * Pergunta se o aluno quer entrar e o leva ao login, voltando depois para esta atividade.
 */
async function irParaLogin() {
    const querEntrar = await confirmarPopup(MSG_ENTRAR_PARA_RESPONDER, {
        titulo: 'Entrar para responder', textoConfirmar: 'Ir para o login',
        textoCancelar: 'Agora não',
    });
    if (!querEntrar) return;
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
    const textoTentativa = sessao.ehProfessor ? MSG_PROFESSOR_NAO_ASSINA
        : 'Tentativa ' + sessao.tentativa + ' de ' + sessao.maximoTentativas + '. ' +
            MSG_REGRA_TENTATIVAS;
    bloco.appendChild(criarElemento('p', 'identificacao-estudante__tentativa', textoTentativa));
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
        sessao.tentativa = doAluno.tentativa;
        const ehAluno = sessao.usuario.app_metadata?.perfil !== PERFIL_PROFESSOR_PAGINA;
        if (ehAluno && !doAluno.entregueEm) {
            await registrarAbertura(sessao.atividade.id, doAluno.tentativa, sessao.usuario.id);
        }
        const identificacao = { nome: sessao.nome, turma: sessao.turma };
        const resultado = doAluno.entregueEm
            ? await lerResultadoDaTentativa(sessao.atividade.id, doAluno.tentativa) : null;
        sessao.ehProfessor = sessao.usuario.app_metadata?.perfil === PERFIL_PROFESSOR_PAGINA;
        sessao.maximoTentativas = sessao.atividade.max_tentativas;
        return {
            disponivel: true, logado: true, ...identificacao, ...doAluno, resultado,
            ehProfessor: sessao.ehProfessor, atividadeId: sessao.atividade.id,
            maximoTentativas: sessao.maximoTentativas,
        };
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
    const sessao = {
        usuario: null, atividade: null, nome: '', turma: '', tentativa: 1, maximoTentativas: 1,
        ehProfessor: false,
    };
    return {
        carregar: () => carregarDoBanco(sessao),
        montarIdentificacao: () => montarIdentificacaoBanco(sessao),
        podeResponder() {
            if (sessao.ehProfessor) {
                mostrarPopup(MSG_PROFESSOR_NAO_ASSINA, { tipo: 'aviso' });
                return false;
            }
            if (sessao.usuario) return true;
            irParaLogin();
            return false;
        },
        async salvarResposta(numero, letra) {
            const corpo = {
                aluno_id: sessao.usuario.id,
                atividade_id: sessao.atividade.id,
                tentativa: sessao.tentativa,
                item: Number(numero),
                letra,
            };
            const resposta = await enviarAoBanco(ROTA_RESPOSTAS, corpo, PREFERENCIA_UPSERT);
            if (!resposta.ok) throw new Error(await explicarForaDoHorario() || MSG_ERRO_SALVAR);
        },
        async lerGravadas() {
            const filtro = 'atividade_id=eq.' + sessao.atividade.id +
                '&tentativa=eq.' + sessao.tentativa;
            const linhas = await sbGet('resposta_atividade', 'select=item,letra&' + filtro);
            const gravadas = {};
            linhas.forEach((linha) => { gravadas[formatarNumeroItem(linha.item)] = linha.letra; });
            return gravadas;
        },
        async entregar() {
            const corpo = {
                aluno_id: sessao.usuario.id,
                atividade_id: sessao.atividade.id,
                tentativa: sessao.tentativa,
            };
            const resposta = await enviarAoBanco(ROTA_ENTREGAS, corpo, 'return=representation');
            const jaEntregue = resposta.status === CODIGO_JA_EXISTE;
            if (jaEntregue) {
                const resultado = await lerResultadoDaTentativa(sessao.atividade.id,
                    sessao.tentativa);
                return { entregueEm: new Date().toISOString(), tentativa: sessao.tentativa,
                    resultado };
            }
            if (!resposta.ok) throw new Error(await explicarForaDoHorario() || MSG_ERRO_ENTREGA);
            const [entrega] = await resposta.json();
            const resultado = await lerResultadoDaTentativa(sessao.atividade.id, sessao.tentativa);
            return { entregueEm: entrega?.entregue_em, tentativa: sessao.tentativa, resultado };
        },
    };
}

window.criarProvedorRespostasBanco = criarProvedorRespostasBanco;
