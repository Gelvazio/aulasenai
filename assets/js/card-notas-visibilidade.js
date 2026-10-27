// Card "Notas e média" do índice de atividades: botão ON/OFF que mostra ou esconde o card aos
// ALUNOS (tarefa #383, etapa 532). Valor por matéria e turma, na tabela card_notas_visivel
// (RLS + JWT do usuário logado). Sem linha = escondido (padrão OFF). Só o professor liga/desliga,
// ao lado do título, para a turma escolhida no combo Turma; o aluno só vê o card se a linha da
// turma dele estiver ligada. Carregado ANTES de card-notas-media.js, de quem usa estadoNotas,
// criarInterruptorSimplesNotas e pintarInterruptorNotas (só em tempo de execução).
// Depende de js/supabase.js (SUPABASE, sbGet, sbH). Regra: docs/database.md

const TABELA_VISIBILIDADE_CARD = 'card_notas_visivel';
const ROTULO_VISIBILIDADE_CARD = 'Mostrar';
const MSG_FALHA_VISIBILIDADE_CARD = 'Não foi possível gravar a visibilidade do card.';
const MSG_SEM_MATERIA_VISIBILIDADE_CARD = 'Matéria não identificada para a visibilidade do card.';
const MSG_SEM_TURMA_VISIBILIDADE_CARD = 'Turma não informada para a visibilidade do card.';

const CHAVE_MOSTRAR_CARD_NOTAS = 'card-notas-media:mostrar';
const VALOR_LIGADO_MOSTRAR_CARD = 'sim';
const VALOR_DESLIGADO_MOSTRAR_CARD = 'nao';
const CLASSE_CORPO_OCULTO_CARD = 'card-notas-media--corpo-oculto';

const estadoVisibilidadeCard = { botao: null, visivel: false };

/**
 * Lê no localStorage se o interruptor "Mostrar" ficou ligado; sem valor salvo, vale OFF.
 * @returns {boolean} true só se o valor salvo for "sim".
 */
function lerPreferenciaMostrarNotas() {
    try {
        return localStorage.getItem(CHAVE_MOSTRAR_CARD_NOTAS) === VALOR_LIGADO_MOSTRAR_CARD;
    } catch (erro) {
        return false;
    }
}

/**
 * Guarda no localStorage o estado do interruptor "Mostrar" (sem falhar se for bloqueado).
 * @param {boolean} ligado - Estado do interruptor.
 */
function salvarPreferenciaMostrarNotas(ligado) {
    try {
        localStorage.setItem(CHAVE_MOSTRAR_CARD_NOTAS,
            ligado ? VALOR_LIGADO_MOSTRAR_CARD : VALOR_DESLIGADO_MOSTRAR_CARD);
    } catch (erro) {
        console.warn('Preferência "Mostrar" não salva no navegador:', erro.message);
    }
}

/**
 * Lê se o card está visível aos alunos da turma na matéria.
 * @param {number} materiaId - Id da matéria.
 * @param {string} turma - Código da turma.
 * @returns {Promise<boolean>} true só se existir linha com visivel = true.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerVisibilidadeCard(materiaId, turma) {
    if (!materiaId || !turma) return false;

    const linhas = await sbGet(TABELA_VISIBILIDADE_CARD, 'select=visivel&materia_id=eq.' +
        materiaId + '&turma_codigo=eq.' + encodeURIComponent(turma));
    return linhas.length > 0 && linhas[0].visivel === true;
}

/**
 * Grava (upsert) a visibilidade do card para a turma na matéria.
 * @param {{materiaId: number, turma: string, visivel: boolean}} dados - Dados da visibilidade.
 * @returns {Promise<void>}
 * @throws {Error} Se faltar matéria ou turma, ou o banco recusar a gravação.
 */
async function gravarVisibilidadeCard({ materiaId, turma, visivel }) {
    if (!materiaId) throw new Error(MSG_SEM_MATERIA_VISIBILIDADE_CARD);
    if (!turma) throw new Error(MSG_SEM_TURMA_VISIBILIDADE_CARD);

    const resposta = await fetch(SUPABASE.URL + '/rest/v1/' + TABELA_VISIBILIDADE_CARD +
        '?on_conflict=materia_id,turma_codigo', {
        method: 'POST',
        headers: { ...(await sbH()),
            Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ materia_id: materiaId, turma_codigo: turma,
            visivel: Boolean(visivel) }),
    });
    if (resposta.ok) return;

    const detalhe = await resposta.text();
    throw new Error(detalhe || MSG_FALHA_VISIBILIDADE_CARD);
}

/**
 * Diz se o aluno logado pode ver o card (linha ligada para a turma dele nesta matéria).
 * @returns {Promise<boolean>} true se o professor ligou o card para a turma do aluno.
 */
async function cardVisivelParaAlunoNotas() {
    try {
        const materiaId = await lerMateriaIdDaPagina();
        return await lerVisibilidadeCard(materiaId, estadoNotas.turma);
    } catch (erro) {
        console.warn('Visibilidade do card indisponível:', erro.message);
        return false;
    }
}

/**
 * Professor: mostra ou esconde o corpo do card (combos, filtro, tabela, rodapé e aviso)
 * conforme o interruptor "Mostrar". Com OFF, nem o professor vê as notas — só o título e o
 * próprio interruptor continuam à vista, para ligar de novo.
 * @param {boolean} visivel - Estado do interruptor "Mostrar".
 */
function aplicarVisibilidadeCorpoNotas(visivel) {
    if (!estadoNotas.ehProfessor) return;

    estadoNotas.elementos.card.classList.toggle(CLASSE_CORPO_OCULTO_CARD, !visivel);
    salvarPreferenciaMostrarNotas(visivel);
}

/**
 * Grava o novo estado do botão e o repinta; em falha, volta ao estado anterior.
 * @param {HTMLButtonElement} botao - Botão ON/OFF.
 * @returns {Promise<void>}
 */
async function alternarVisibilidadeNotas(botao) {
    const turma = estadoNotas.turma;
    const novo = !estadoVisibilidadeCard.visivel;
    botao.disabled = true;
    try {
        await gravarVisibilidadeCard({ materiaId: estadoNotas.materiaId, turma, visivel: novo });
        if (estadoNotas.turma === turma) {
            estadoVisibilidadeCard.visivel = novo;
        }
    } catch (erro) {
        mostrarAvisoNotas(MSG_FALHA_VISIBILIDADE_CARD + ' ' + erro.message, true);
    }
    pintarInterruptorNotas(botao, estadoVisibilidadeCard.visivel);
    aplicarVisibilidadeCorpoNotas(estadoVisibilidadeCard.visivel);
    botao.disabled = false;
}

/**
 * Cria (uma vez) o botão ON/OFF ao lado do título do card.
 * @returns {HTMLButtonElement} Botão da visibilidade.
 */
function criarBotaoVisibilidadeNotas() {
    if (estadoVisibilidadeCard.botao) return estadoVisibilidadeCard.botao;

    const controle = criarInterruptorSimplesNotas(ROTULO_VISIBILIDADE_CARD);
    controle.botao.addEventListener('click', () =>
        executarComCarregandoNotas(() => alternarVisibilidadeNotas(controle.botao)));
    const { visibilidade } = estadoNotas.elementos;
    visibilidade.replaceChildren(controle.etiqueta);
    visibilidade.hidden = false;
    estadoVisibilidadeCard.botao = controle.botao;
    return controle.botao;
}

/**
 * Professor: mostra o botão e o pinta conforme a preferência salva no navegador (padrão OFF).
 * O valor do banco não entra aqui: ele não pode sobrescrever o estado visual do professor
 * (que já foi aplicado na montagem do card); o clique no botão é que grava no banco.
 * Chamado a cada troca de turma.
 */
function atualizarVisibilidadeNotas() {
    const botao = criarBotaoVisibilidadeNotas();
    estadoVisibilidadeCard.visivel = lerPreferenciaMostrarNotas();
    pintarInterruptorNotas(botao, estadoVisibilidadeCard.visivel);
    aplicarVisibilidadeCorpoNotas(estadoVisibilidadeCard.visivel);
    botao.disabled = !estadoNotas.materiaId || !estadoNotas.turma;
}
