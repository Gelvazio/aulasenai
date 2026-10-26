// Professor: caixa "Liberar perguntas" no topo da atividade montada por perguntas-json.js. Define
// quantas perguntas (e, nas práticas, quais tópicos) ficam ATIVAS para os alunos; grava pela função
// liberar_itens do banco (só professor) e recarrega a página. O JSON sempre tem todas as perguntas.
// Depende de js/supabase.js (SUPABASE, sbH). Regra: .claude/rules/atividades-banco.md (#389).

const ROTA_LIBERAR_ITENS = '/rest/v1/rpc/liberar_itens';
const PERFIL_PROFESSOR_LIBERAR = 'PROFESSOR';
const TEXTO_SALVAR_LIBERAR = 'Salvar';
const CLASSE_LIBERAR = 'liberar-itens';

/**
 * Diz se o usuário logado é PROFESSOR.
 * @returns {Promise<boolean>} true se o perfil da sessão é PROFESSOR.
 */
async function ehProfessorLiberar() {
    const { data } = await obterClienteSupabase().auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_LIBERAR;
}

/**
 * Grava a liberação no banco.
 * @param {{atividadeId: number, quantidade: number, topicos: number[]|null}} dados - Liberação.
 * @returns {Promise<void>} Resolve quando gravou; lança erro se o banco recusar.
 */
async function gravarLiberacao({ atividadeId, quantidade, topicos }) {
    const resposta = await fetch(SUPABASE.URL + ROTA_LIBERAR_ITENS, {
        method: 'POST', headers: await sbH(),
        body: JSON.stringify({ p_atividade_id: atividadeId, p_quantidade: quantidade,
            p_topicos: topicos }),
    });
    if (!resposta.ok) throw new Error('liberar_itens: ' + resposta.status);
}

/**
 * Cria a caixa do professor e a põe antes da âncora (ou no início do conteúdo).
 * @param {{atividadeId: number, total: number, ativos: number, tipo: string,
 *     topicosAtivos: number[]}} dados - Atividade, total no JSON e o que está ativo.
 * @returns {HTMLElement} Caixa criada.
 */
function criarCaixaLiberar(dados) {
    const caixa = document.createElement('div');
    caixa.className = 'aula-card ' + CLASSE_LIBERAR;
    const entrada = Object.assign(document.createElement('input'),
        { type: 'number', min: 1, max: dados.total, value: dados.ativos });
    const rotulo = document.createElement('label');
    rotulo.append('🔓 Perguntas liberadas aos alunos (de ' + dados.total + '): ', entrada);
    caixa.append(rotulo);
    const caixasTopicos = [1, 2, 3].map((topico) => {
        const marca = Object.assign(document.createElement('input'),
            { type: 'checkbox', value: topico, checked: dados.topicosAtivos.includes(topico) });
        const nome = document.createElement('label');
        nome.append(marca, ' ' + String.fromCharCode(96 + topico) + ') ');
        if (dados.tipo !== 'objetiva') caixa.append(nome);
        return marca;
    });
    const botao = Object.assign(document.createElement('button'),
        { type: 'button', className: 'btn-export', textContent: TEXTO_SALVAR_LIBERAR });
    botao.addEventListener('click', async () => {
        botao.disabled = true;
        try {
            await gravarLiberacao({ atividadeId: dados.atividadeId,
                quantidade: Number(entrada.value),
                topicos: dados.tipo === 'objetiva' ? null
                    : caixasTopicos.filter((m) => m.checked).map((m) => Number(m.value)) });
            location.reload();
        } catch (erro) {
            botao.disabled = false;
            alert('Não foi possível salvar: ' + erro.message);
        }
    });
    caixa.append(botao);
    return caixa;
}

/**
 * Mostra a caixa de liberação só para o professor.
 * @param {{atividadeId: number, total: number, ativos: number, tipo: string,
 *     topicosAtivos: number[], antesDe: HTMLElement}} dados - Atividade, estado e onde pôr.
 * @returns {Promise<void>} Resolve quando decidiu e (se professor) inseriu a caixa.
 */
async function mostrarLiberarItensProfessor(dados) {
    if (!(await ehProfessorLiberar())) return;
    dados.antesDe.before(criarCaixaLiberar(dados));
}

window.mostrarLiberarItensProfessor = mostrarLiberarItensProfessor;
