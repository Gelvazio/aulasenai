// Acesso ao Supabase para a tabela aula_turma (data e bloqueio de cada aula em cada turma),
// usado pelo índice de atividades (cards e "✏️ Editar aula") e pela lista de datas do Progresso
// da turma (datas-aulas-turma.js). Só o professor grava (RLS); logado lê.
// Depende de: js/supabase.js (sbGet, sbPost, sbPatch, sbDelete).
// Pedidos do usuário em 2026-10-16 (tarefas #185, #186 e #188).

const TABELA_AULA_TURMA = 'aula_turma';
const TABELA_TURMA_ALUNO_AULA_TURMA = 'turmaaluno';

/**
 * Lê as linhas já cadastradas da turma (data e bloqueio de cada aula).
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Promise<Map<number, {id: number, aula_id: number, data_aula: ?string,
 *   bloqueio: boolean}>>} Linhas por id da aula.
 * @throws {Error} Se o banco recusar.
 */
async function lerLinhasAulaTurma(turmaCodigo) {
    const linhas = await sbGet(TABELA_AULA_TURMA,
        'select=id,aula_id,data_aula,bloqueio&turma_codigo=eq.' + encodeURIComponent(turmaCodigo));
    return new Map(linhas.map((linha) => [linha.aula_id, linha]));
}

/**
 * Lê a primeira turma do aluno logado (o professor não tem vínculo e recebe null).
 * @returns {Promise<string|null>} Código da turma, ou null se não houver.
 * @throws {Error} Se o banco recusar.
 */
async function lerTurmaDoAlunoAulaTurma() {
    const [vinculo] = await sbGet(TABELA_TURMA_ALUNO_AULA_TURMA,
        'select=turma_codigo&order=turma_codigo&limit=1');
    return vinculo?.turma_codigo || null;
}

/**
 * Grava data e bloqueio de uma aula na turma: cria, atualiza ou remove a linha (sem data e sem
 * bloqueio ela não tem mais o que guardar).
 * @param {{aulaId: number, turmaCodigo: string, existente: ?{id: number}}} alvo - Aula e turma.
 * @param {{data_aula: ?string, bloqueio: boolean}} valores - Valores a guardar.
 * @returns {Promise<?{id: number}>} Linha gravada, ou null se foi removida (ou nem criada).
 * @throws {Error} Se o banco recusar.
 */
async function gravarLinhaAulaTurma(alvo, valores) {
    const { aulaId, turmaCodigo, existente } = alvo;
    const estaVazia = !valores.data_aula && !valores.bloqueio;
    if (estaVazia) {
        if (existente) await sbDelete(TABELA_AULA_TURMA, 'id=eq.' + existente.id);
        return null;
    }
    if (existente) {
        const [atualizada] = await sbPatch(TABELA_AULA_TURMA, 'id', existente.id,
            { ...valores, updated_at: new Date().toISOString() });
        return atualizada;
    }
    const [criada] = await sbPost(TABELA_AULA_TURMA,
        { aula_id: aulaId, turma_codigo: turmaCodigo, ...valores });
    return criada;
}

window.lerLinhasAulaTurma = lerLinhasAulaTurma;
window.lerTurmaDoAlunoAulaTurma = lerTurmaDoAlunoAulaTurma;
window.gravarLinhaAulaTurma = gravarLinhaAulaTurma;
