// Repositório das avaliações discursivas no banco (Supabase), usado por avaliacao-discursiva.js.
// Só acesso a dados, sempre com o JWT do usuário logado (js/supabase.js: SUPABASE, sbH, sbGet).
// Respostas: tabela resposta_discursiva (uma linha por item, tópico e tentativa).
// Entrega: tabela entrega_atividade; o RLS só aceita com todos os tópicos gravados.
// O padrão de resposta (topico_discursivo) nunca é lido aqui: só o professor tem acesso.
// Plano: docs/avaliacao-pratica-discursiva-itic.md

const ROTA_RESPOSTA_DISCURSIVA =
    '/rest/v1/resposta_discursiva?on_conflict=aluno_id,atividade_id,tentativa,item,topico';
const TABELA_RESPOSTA_DISCURSIVA = 'resposta_discursiva';
const ROTA_ENTREGA_DISCURSIVA = '/rest/v1/entrega_atividade';
const ROTA_ABERTURA_DISCURSIVA = '/rest/v1/abertura_atividade';
const ROTA_HORARIO_DISCURSIVA = '/rest/v1/rpc/horario_da_turma_do_aluno';
const PREFERENCIA_UPSERT_DISCURSIVA = 'resolution=merge-duplicates,return=minimal';
const PREFERENCIA_IGNORAR_REPETIDA = 'resolution=ignore-duplicates,return=minimal';
const PERFIL_PROFESSOR_DISCURSIVA = 'PROFESSOR';
const CODIGO_ENTREGA_REPETIDA = 409;
const MSG_ERRO_GRAVAR_TOPICO = 'Resposta NÃO gravada. Confira a internet e tente de novo.';
const MSG_ERRO_ENTREGAR_DISCURSIVA = 'Não foi possível registrar a entrega. Confira se todos ' +
    'os tópicos estão gravados e tente de novo.';

/**
 * Monta a chave de um tópico usada nos mapas de respostas (ex.: item 3, tópico 2 → "3-2").
 * @param {number} item - Número da questão.
 * @param {number} topico - Número do tópico dentro da questão.
 * @returns {string} Chave do tópico.
 */
function chaveTopico(item, topico) {
    return item + '-' + topico;
}

/**
 * Envia uma requisição autenticada (JWT do usuário) para a API REST.
 * @param {{rota: string, metodo?: string, corpo?: Object, preferencia?: string}} pedido - Dados.
 * @returns {Promise<Response>} Resposta do fetch.
 */
async function enviarPedidoDiscursivo(pedido) {
    const cabecalhos = await sbH();
    if (pedido.preferencia) cabecalhos.Prefer = pedido.preferencia;
    return fetch(SUPABASE.URL + pedido.rota, {
        method: pedido.metodo || 'POST',
        headers: cabecalhos,
        body: pedido.corpo ? JSON.stringify(pedido.corpo) : undefined,
    });
}

/**
 * Busca a atividade desta página no banco pelo caminho da URL.
 * @returns {Promise<Object|null>} Atividade (id, total_itens, max_tentativas, ativo) ou null se
 *     não estiver cadastrada.
 */
async function buscarAtividadeDiscursiva() {
    const caminho = encodeURIComponent(location.pathname);
    const linhas = await sbGet('atividade',
        'select=id,total_itens,max_tentativas,ativo&pagina=eq.' + caminho);
    return linhas[0] || null;
}

/**
 * Lê nome e turma do aluno logado (o professor não tem linha em aluno).
 * @param {Object} usuario - Usuário do Supabase Auth.
 * @returns {Promise<{nome: string, turma: string}>} Identificação para exibir.
 */
async function lerIdentificacaoDiscursiva(usuario) {
    const linhas = await sbGet('aluno',
        'select=nome,turma_codigo,turma(nome)&id=eq.' + encodeURIComponent(usuario.id));
    const aluno = linhas[0];
    if (!aluno) return { nome: usuario.user_metadata?.nome || usuario.email, turma: '' };
    const nomeTurma = aluno.turma?.nome ? aluno.turma.nome + ' (' + aluno.turma_codigo + ')' : '';
    return { nome: aluno.nome, turma: nomeTurma };
}

/**
 * Lê a tentativa em andamento: a maior liberada pelo professor (mínimo 1).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number>} Tentativa em andamento.
 */
async function lerTentativaDiscursiva(atividadeId) {
    const liberacoes = await sbGet('liberacao_atividade',
        'select=tentativa&atividade_id=eq.' + atividadeId);
    return Math.max(1, ...liberacoes.map((liberacao) => liberacao.tentativa));
}

/**
 * Lê do banco as respostas gravadas de uma tentativa.
 * @param {number} atividadeId - Id da atividade.
 * @param {number} tentativa - Tentativa.
 * @returns {Promise<Object<string, string>>} Mapa chave do tópico → texto gravado.
 */
async function lerRespostasDiscursivas(atividadeId, tentativa) {
    const filtro = 'atividade_id=eq.' + atividadeId + '&tentativa=eq.' + tentativa;
    const linhas = await sbGet(TABELA_RESPOSTA_DISCURSIVA, 'select=item,topico,texto&' + filtro);
    const respostas = {};
    linhas.forEach((linha) => { respostas[chaveTopico(linha.item, linha.topico)] = linha.texto; });
    return respostas;
}

/**
 * Lê a data da entrega de uma tentativa (vazio se ainda não entregou).
 * @param {number} atividadeId - Id da atividade.
 * @param {number} tentativa - Tentativa.
 * @returns {Promise<string>} Data ISO da entrega ou ''.
 */
async function lerEntregaDiscursiva(atividadeId, tentativa) {
    const filtro = 'atividade_id=eq.' + atividadeId + '&tentativa=eq.' + tentativa;
    const entregas = await sbGet('entrega_atividade', 'select=entregue_em&' + filtro);
    return entregas[0]?.entregue_em || '';
}

/**
 * Se a turma do aluno tem horário e agora está fora dele, devolve a mensagem explicando.
 * @returns {Promise<string>} Mensagem ou '' (dentro do horário, sem restrição ou erro).
 */
async function explicarHorarioDiscursiva() {
    try {
        const resposta = await enviarPedidoDiscursivo({
            rota: ROTA_HORARIO_DISCURSIVA, corpo: {}, preferencia: 'return=representation',
        });
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
 * Registra a primeira abertura da tentativa (falha silenciosa: nunca impede responder).
 * @param {{atividadeId: number, tentativa: number, alunoId: string}} dados - Identificação.
 */
async function registrarAberturaDiscursiva(dados) {
    try {
        await enviarPedidoDiscursivo({
            rota: ROTA_ABERTURA_DISCURSIVA,
            corpo: { aluno_id: dados.alunoId, atividade_id: dados.atividadeId,
                tentativa: dados.tentativa },
            preferencia: PREFERENCIA_IGNORAR_REPETIDA,
        });
    } catch (erro) {
        console.warn('Abertura não registrada:', erro.message);
    }
}

/**
 * Carrega sessão, atividade, tentativa, respostas e entrega do usuário logado.
 * @param {Object} sessao - Estado do repositório (preenchido aqui).
 * @returns {Promise<Object>} Dados iniciais da página (disponivel=false sem banco ou cadastro).
 */
async function carregarDiscursiva(sessao) {
    const cliente = obterClienteSupabase();
    if (!cliente) return { disponivel: false };

    sessao.atividade = await buscarAtividadeDiscursiva();
    if (!sessao.atividade) return { disponivel: false };

    const { data } = await cliente.auth.getSession();
    sessao.usuario = data?.session?.user || null;
    if (!sessao.usuario) return { disponivel: true, logado: false, respostas: {} };

    const ehProfessor = sessao.usuario.app_metadata?.perfil === PERFIL_PROFESSOR_DISCURSIVA;
    const identificacao = await lerIdentificacaoDiscursiva(sessao.usuario);
    sessao.tentativa = await lerTentativaDiscursiva(sessao.atividade.id);
    const [respostas, entregueEm, avisoHorario] = await Promise.all([
        lerRespostasDiscursivas(sessao.atividade.id, sessao.tentativa),
        lerEntregaDiscursiva(sessao.atividade.id, sessao.tentativa),
        ehProfessor ? '' : explicarHorarioDiscursiva(),
    ]);
    const deveRegistrarAbertura = !ehProfessor && !entregueEm && sessao.atividade.ativo;
    if (deveRegistrarAbertura) {
        await registrarAberturaDiscursiva({ atividadeId: sessao.atividade.id,
            tentativa: sessao.tentativa, alunoId: sessao.usuario.id });
    }
    return {
        disponivel: true, logado: true, ehProfessor, ...identificacao, respostas, entregueEm,
        avisoHorario, tentativa: sessao.tentativa, ativa: sessao.atividade.ativo,
        maximoTentativas: sessao.atividade.max_tentativas,
    };
}

/**
 * Grava (upsert) o texto de um tópico; texto vazio apaga a resposta do tópico.
 * @param {Object} sessao - Estado do repositório.
 * @param {{item: number, topico: number, texto: string}} resposta - Resposta do tópico.
 * @throws {Error} Se o banco recusar (mensagem explica o horário quando for o caso).
 */
async function gravarTopicoDiscursivo(sessao, resposta) {
    const chave = {
        aluno_id: sessao.usuario.id, atividade_id: sessao.atividade.id,
        tentativa: sessao.tentativa, item: resposta.item, topico: resposta.topico,
    };
    const textoLimpo = resposta.texto.trim();
    const pedido = textoLimpo
        ? { rota: ROTA_RESPOSTA_DISCURSIVA, corpo: { ...chave, texto: resposta.texto },
            preferencia: PREFERENCIA_UPSERT_DISCURSIVA }
        : { rota: '/rest/v1/' + TABELA_RESPOSTA_DISCURSIVA + '?' + Object.entries(chave)
            .map(([campo, valor]) => campo + '=eq.' + valor).join('&'), metodo: 'DELETE' };
    const retorno = await enviarPedidoDiscursivo(pedido);
    if (!retorno.ok) throw new Error(await explicarHorarioDiscursiva() || MSG_ERRO_GRAVAR_TOPICO);
}

/**
 * Registra a entrega da tentativa em andamento (entrega repetida é tratada como sucesso).
 * @param {Object} sessao - Estado do repositório.
 * @returns {Promise<string>} Data ISO da entrega.
 * @throws {Error} Se o banco recusar a entrega.
 */
async function entregarDiscursiva(sessao) {
    const retorno = await enviarPedidoDiscursivo({
        rota: ROTA_ENTREGA_DISCURSIVA, preferencia: 'return=representation',
        corpo: { aluno_id: sessao.usuario.id, atividade_id: sessao.atividade.id,
            tentativa: sessao.tentativa },
    });
    if (retorno.status === CODIGO_ENTREGA_REPETIDA) return new Date().toISOString();
    if (!retorno.ok) {
        throw new Error(await explicarHorarioDiscursiva() || MSG_ERRO_ENTREGAR_DISCURSIVA);
    }
    const [entrega] = await retorno.json();
    return entrega?.entregue_em || new Date().toISOString();
}

/**
 * Cria o repositório das respostas discursivas desta página.
 * @returns {{carregar: Function, gravarTopico: Function, lerGravadas: Function,
 *     entregar: Function, chaveTopico: Function}} Operações de dados.
 */
function criarRepositorioDiscursivo() {
    const sessao = { usuario: null, atividade: null, tentativa: 1 };
    return {
        carregar: () => carregarDiscursiva(sessao),
        gravarTopico: (resposta) => gravarTopicoDiscursivo(sessao, resposta),
        lerGravadas: () => lerRespostasDiscursivas(sessao.atividade.id, sessao.tentativa),
        entregar: () => entregarDiscursiva(sessao),
        chaveTopico,
    };
}

window.criarRepositorioDiscursivo = criarRepositorioDiscursivo;
