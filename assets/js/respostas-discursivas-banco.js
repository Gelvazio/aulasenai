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
const ROTA_MINIMO_QUESTOES_DISCURSIVA = '/rest/v1/rpc/minimo_questoes_para_entregar';
const ROTA_GABARITO_LIBERADO_DISCURSIVA = '/rest/v1/rpc/aluno_pode_ver_gabarito';
const ROTA_NOTA_LIBERADA_DISCURSIVA = '/rest/v1/rpc/aluno_pode_ver_nota';
const PREFERENCIA_UPSERT_DISCURSIVA = 'resolution=merge-duplicates,return=minimal';
const PREFERENCIA_IGNORAR_REPETIDA = 'resolution=ignore-duplicates,return=minimal';
const PERFIL_PROFESSOR_DISCURSIVA = 'PROFESSOR';
const CODIGO_ENTREGA_REPETIDA = 409;
const MSG_ERRO_GRAVAR_TOPICO = 'Resposta NÃO gravada. Confira a internet e tente de novo.';
const MSG_ERRO_ENTREGAR_DISCURSIVA = 'Não foi possível registrar a entrega. Confira se todos ' +
    'os tópicos estão gravados e tente de novo.';
// Carga da abertura: uma chamada ao Supabase pendurada deixava a página parada em
// "Carregando..." sem o botão "Exportar Meu Gabarito" (#196.3); a mesma carga, repetida, termina.
const LIMITE_CARGA_DISCURSIVA_MS = 8000;
const TENTATIVAS_CARGA_DISCURSIVA = 3;
const MSG_CARGA_DEMORADA = 'A carga da avaliação passou de ' +
    LIMITE_CARGA_DISCURSIVA_MS / 1000 + ' s';

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
    // Duas FKs ligam aluno e turma (turma_codigo e turma.lider_aluno_id): o embed diz qual usar.
    const linhas = await sbGet('aluno', 'select=nome,turma_codigo,' +
        'turma!aluno_turma_codigo_fkey(nome)&id=eq.' + encodeURIComponent(usuario.id));
    const aluno = linhas[0];
    if (!aluno) return { nome: usuario.user_metadata?.nome || usuario.email, turma: '' };
    const nomeTurma = aluno.turma?.nome ? aluno.turma.nome + ' (' + aluno.turma_codigo + ')' : '';
    return { nome: aluno.nome, turma: nomeTurma };
}

/**
 * Lê a tentativa em andamento: a maior liberada pelo professor (mínimo 1).
 * @param {number} atividadeId - Id da atividade.
 * @param {string} alunoId - Id do usuário logado.
 * @returns {Promise<number>} Tentativa em andamento.
 */
async function lerTentativaDiscursiva(atividadeId, alunoId) {
    // Filtro pelo usuário: o RLS deixa o professor ler as liberações dos alunos da turma.
    const liberacoes = await sbGet('liberacao_atividade',
        'select=tentativa&atividade_id=eq.' + atividadeId + '&aluno_id=eq.' + alunoId);
    return Math.max(1, ...liberacoes.map((liberacao) => liberacao.tentativa));
}

/**
 * Lê do banco as respostas gravadas pelo usuário logado em uma tentativa.
 * @param {Object} sessao - Estado do repositório (atividade, tentativa e usuário).
 * @returns {Promise<Object<string, string>>} Mapa chave do tópico → texto gravado.
 */
async function lerRespostasDiscursivas(sessao) {
    const filtro = filtroDoUsuarioDiscursiva(sessao);
    const linhas = await sbGet(TABELA_RESPOSTA_DISCURSIVA, 'select=item,topico,texto&' + filtro);
    const respostas = {};
    linhas.forEach((linha) => { respostas[chaveTopico(linha.item, linha.topico)] = linha.texto; });
    return respostas;
}

/**
 * Monta o filtro da atividade, da tentativa e do usuário logado.
 * O professor lê pelo RLS as linhas dos alunos da turma; sem o aluno_id, elas cairiam na tela dele.
 * @param {Object} sessao - Estado do repositório (atividade, tentativa e usuário).
 * @returns {string} Filtro PostgREST.
 */
function filtroDoUsuarioDiscursiva(sessao) {
    return 'atividade_id=eq.' + sessao.atividade.id + '&tentativa=eq.' + sessao.tentativa +
        '&aluno_id=eq.' + sessao.usuario.id;
}

/**
 * Lê a data da entrega do usuário logado na tentativa (vazio se ainda não entregou).
 * @param {Object} sessao - Estado do repositório (atividade, tentativa e usuário).
 * @returns {Promise<string>} Data ISO da entrega ou ''.
 */
async function lerEntregaDiscursiva(sessao) {
    const filtro = filtroDoUsuarioDiscursiva(sessao);
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
 * Lê o mínimo de questões completas que o aluno logado precisa para entregar
 * (o do aluno, senão o da atividade, senão todas — função minimo_questoes_para_entregar).
 * @param {Object} sessao - Estado do repositório (atividade e usuário).
 * @returns {Promise<number|null>} Mínimo ou null (falha: a página exige todas, como antes).
 */
async function lerMinimoQuestoesDiscursiva(sessao) {
    try {
        const resposta = await enviarPedidoDiscursivo({
            rota: ROTA_MINIMO_QUESTOES_DISCURSIVA,
            corpo: { p_atividade: sessao.atividade.id, p_aluno: sessao.usuario.id },
            preferencia: 'return=representation',
        });
        if (!resposta.ok) return null;
        const minimo = Number(await resposta.json());
        return minimo > 0 ? minimo : null;
    } catch (erro) {
        return null;
    }
}

/**
 * Indica se o gabarito desta atividade já foi liberado para a turma do aluno logado
 * (função aluno_pode_ver_gabarito; não registra pedido de gabarito).
 * @param {Object} sessao - Estado do repositório (atividade).
 * @returns {Promise<boolean>} true se liberado (falha = false).
 */
async function lerGabaritoLiberadoDiscursiva(sessao) {
    try {
        const resposta = await enviarPedidoDiscursivo({
            rota: ROTA_GABARITO_LIBERADO_DISCURSIVA, corpo: { p_atividade: sessao.atividade.id },
            preferencia: 'return=representation',
        });
        if (!resposta.ok) return false;
        return (await resposta.json()) === true;
    } catch (erro) {
        return false;
    }
}

/**
 * Diz se a NOTA (e o resultado por tópico) já foi liberada para a turma do aluno que entregou:
 * por "Liberar notas" ou por "Liberar gabaritos" (função aluno_pode_ver_nota, #393).
 * @param {Object} sessao - Estado do repositório.
 * @returns {Promise<boolean>} true se o aluno pode ver a nota e o resultado.
 */
async function lerNotaLiberadaDiscursiva(sessao) {
    try {
        const resposta = await enviarPedidoDiscursivo({
            rota: ROTA_NOTA_LIBERADA_DISCURSIVA, corpo: { p_atividade: sessao.atividade.id },
            preferencia: 'return=representation',
        });
        if (!resposta.ok) return false;
        return (await resposta.json()) === true;
    } catch (erro) {
        return false;
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
    sessao.tentativa = await lerTentativaDiscursiva(sessao.atividade.id, sessao.usuario.id);
    const [entregueEm, avisoHorario, minimoQuestoes] = await Promise.all([
        lerEntregaDiscursiva(sessao),
        ehProfessor ? '' : explicarHorarioDiscursiva(),
        ehProfessor ? null : lerMinimoQuestoesDiscursiva(sessao),
    ]);
    // Gabarito liberado para a turma do aluno que entregou: a prova volta com respostas e nota.
    const gabaritoLiberado = Boolean(!ehProfessor && entregueEm &&
        await lerGabaritoLiberadoDiscursiva(sessao));
    // Nota liberada (#393): só a nota e o resultado por tópico, sem o padrão de resposta.
    const resultadoLiberado = Boolean(!ehProfessor && entregueEm &&
        (gabaritoLiberado || await lerNotaLiberadaDiscursiva(sessao)));
    // Regra global das práticas (#160): o aluno que já entregou não vê mais as próprias respostas
    // até o professor liberar a nota ou o gabarito; elas nem são lidas do banco.
    const respostasOcultas = Boolean(!ehProfessor && entregueEm && !resultadoLiberado);
    const respostas = respostasOcultas ? {} : await lerRespostasDiscursivas(sessao);
    const deveRegistrarAbertura = !ehProfessor && !entregueEm && sessao.atividade.ativo;
    if (deveRegistrarAbertura) {
        await registrarAberturaDiscursiva({ atividadeId: sessao.atividade.id,
            tentativa: sessao.tentativa, alunoId: sessao.usuario.id });
    }
    return {
        disponivel: true, logado: true, ehProfessor, ...identificacao, respostas, respostasOcultas,
        entregueEm, minimoQuestoes, gabaritoLiberado, resultadoLiberado,
        avisoHorario, tentativa: sessao.tentativa, ativa: sessao.atividade.ativo,
        maximoTentativas: sessao.atividade.max_tentativas, atividadeId: sessao.atividade.id,
    };
}

/**
 * Espera a promessa até o limite de tempo.
 * @param {Promise<*>} promessa - Operação a esperar.
 * @param {number} milissegundos - Tempo máximo.
 * @returns {Promise<*>} Resultado da promessa.
 * @throws {Error} Se passar do limite ou a promessa falhar.
 */
function esperarComLimiteDiscursiva(promessa, milissegundos) {
    let temporizador = null;
    const limite = new Promise((_, rejeitar) => {
        temporizador = setTimeout(() => rejeitar(new Error(MSG_CARGA_DEMORADA)), milissegundos);
    });
    return Promise.race([promessa, limite]).finally(() => clearTimeout(temporizador));
}

/**
 * Carrega os dados da página com limite de tempo, repetindo a carga se ela travar ou falhar
 * (só leituras; a abertura repetida é ignorada pelo banco).
 * @param {Object} sessao - Estado do repositório.
 * @returns {Promise<Object>} Dados iniciais da página (ver carregarDiscursiva).
 * @throws {Error} Se todas as tentativas falharem.
 */
async function carregarDiscursivaComLimite(sessao) {
    for (let tentativa = 1; ; tentativa++) {
        try {
            const carga = carregarDiscursiva(sessao);
            return await esperarComLimiteDiscursiva(carga, LIMITE_CARGA_DISCURSIVA_MS);
        } catch (erro) {
            if (tentativa >= TENTATIVAS_CARGA_DISCURSIVA) throw erro;
            console.warn('Carga da avaliação repetida (' + tentativa + '):', erro.message);
        }
    }
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
 *     lerEntrega: Function, entregar: Function, chaveTopico: Function}} Operações de dados.
 */
function criarRepositorioDiscursivo() {
    const sessao = { usuario: null, atividade: null, tentativa: 1 };
    return {
        carregar: () => carregarDiscursivaComLimite(sessao),
        gravarTopico: (resposta) => gravarTopicoDiscursivo(sessao, resposta),
        lerGravadas: () => lerRespostasDiscursivas(sessao),
        lerEntrega: () => lerEntregaDiscursiva(sessao),
        entregar: () => entregarDiscursiva(sessao),
        chaveTopico,
    };
}

window.criarRepositorioDiscursivo = criarRepositorioDiscursivo;
