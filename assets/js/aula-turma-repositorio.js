// Acesso ao Supabase para a tabela aula_turma (data e bloqueio de cada aula em cada turma), usado
// pelo ATIVIDADES/index.html: bloqueio da aula pela turma do combo "Turma:"
// (indice-aula-bloqueio.js) e data da aula no "✏️ Editar aula". A matéria da linha é preenchida pelo gatilho do banco.
// Só o professor grava (RLS); logado lê.
// Depende de: js/supabase.js (obterClienteSupabase, sbGet, sbPost, sbPatch).
// Pedidos do usuário em 2026-10-16 (tarefas #185, #186 e #206).

const TABELA_AULA_TURMA = 'aula_turma';
const TABELA_TURMA_ALUNO_AULA_TURMA = 'turmaaluno';
const CAMPOS_AULA_TURMA = 'id,aula_id,turma_codigo,data_aula,bloqueio';

/**
 * Lê as linhas já cadastradas de uma turma (data e bloqueio de cada aula).
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Promise<Map<number, {id: number, aula_id: number, data_aula: ?string,
 *   bloqueio: boolean}>>} Linhas por id da aula.
 * @throws {Error} Se o banco recusar.
 */
async function lerLinhasAulaTurma(turmaCodigo) {
    const linhas = await sbGet(TABELA_AULA_TURMA,
        'select=' + CAMPOS_AULA_TURMA + '&turma_codigo=eq.' + encodeURIComponent(turmaCodigo));
    return new Map(linhas.map((linha) => [linha.aula_id, linha]));
}

/**
 * Lê as aulas bloqueadas em TODAS as turmas informadas (o aluno de duas turmas só perde a aula
 * se ela estiver bloqueada nas duas, como o RLS das atividades).
 * @param {string[]} turmas - Códigos das turmas.
 * @returns {Promise<Set<number>>} Ids das aulas bloqueadas.
 * @throws {Error} Se o banco recusar.
 */
async function lerAulasBloqueadasNasTurmas(turmas) {
    if (!turmas.length) return new Set();

    const lista = turmas.map((codigo) => '"' + String(codigo).replace(/"/g, '') + '"').join(',');
    const linhas = await sbGet(TABELA_AULA_TURMA, 'select=aula_id,turma_codigo&bloqueio=eq.true' +
        '&turma_codigo=in.(' + encodeURIComponent(lista) + ')');
    const contagem = new Map();
    linhas.forEach(({ aula_id: aulaId }) => contagem.set(aulaId, (contagem.get(aulaId) || 0) + 1));
    const bloqueadas = [...contagem].filter(([, total]) => total >= turmas.length);
    return new Set(bloqueadas.map(([aulaId]) => aulaId));
}

/**
 * Lê as turmas do aluno logado (o professor não tem vínculo e recebe lista vazia).
 * @returns {Promise<string[]>} Códigos das turmas do aluno.
 * @throws {Error} Se o banco recusar.
 */
async function lerTurmasDoAlunoAulaTurma() {
    const { data } = await obterClienteSupabase().auth.getSession();
    const alunoId = data?.session?.user?.id;
    if (!alunoId) return [];

    const vinculos = await sbGet(TABELA_TURMA_ALUNO_AULA_TURMA,
        'select=turma_codigo&aluno_id=eq.' + encodeURIComponent(alunoId));
    return [...new Set(vinculos.map((vinculo) => vinculo.turma_codigo))];
}

/**
 * Grava valores de uma aula na turma: atualiza a linha que existe ou cria uma nova.
 * @param {{aulaId: number, turmaCodigo: string, existente: ?{id: number}}} alvo - Aula e turma.
 * @param {{data_aula?: ?string, bloqueio?: boolean}} valores - Colunas a gravar.
 * @returns {Promise<Object>} Linha gravada.
 * @throws {Error} Se o banco recusar ou não devolver a linha.
 */
async function gravarLinhaAulaTurma(alvo, valores) {
    const { aulaId, turmaCodigo, existente } = alvo;
    const [gravada] = existente
        ? await sbPatch(TABELA_AULA_TURMA, 'id', existente.id,
            { ...valores, updated_at: new Date().toISOString() })
        : await sbPost(TABELA_AULA_TURMA,
            { aula_id: aulaId, turma_codigo: turmaCodigo, ...valores });
    if (!gravada) throw new Error('o banco não gravou a aula na turma');
    return gravada;
}

window.lerLinhasAulaTurma = lerLinhasAulaTurma;
window.lerAulasBloqueadasNasTurmas = lerAulasBloqueadasNasTurmas;
window.lerTurmasDoAlunoAulaTurma = lerTurmasDoAlunoAulaTurma;
window.gravarLinhaAulaTurma = gravarLinhaAulaTurma;
