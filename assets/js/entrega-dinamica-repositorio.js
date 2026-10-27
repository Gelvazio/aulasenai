// Atividade Dinâmica no PC (tarefa #410): acesso ao banco para a entrega do aluno
// (tabela entrega_dinamica). O RLS decide: o aluno lê e grava só a própria (e só até entregar);
// o professor lê as dos alunos que pode ver. Sempre com o JWT do usuário logado.
// Depende de js/supabase.js (SUPABASE, sbH, sbGet). Regra: docs/regras/atividade-dinamica.md

const TABELA_ENTREGA_DINAMICA = 'entrega_dinamica';
const COLUNAS_ENTREGA_DINAMICA = 'aluno_id,atividade_id,estado,entregue,entregue_em,atualizado_em';
const MSG_ENTREGA_JA_FEITA = 'Esta atividade já foi entregue e não pode mais ser alterada.';

/**
 * Lê a entrega do próprio aluno nesta atividade.
 * @param {number} atividadeId - Id da atividade.
 * @param {string} alunoId - Id do aluno logado.
 * @returns {Promise<Object|null>} Linha de entrega_dinamica, ou null se ainda não existe.
 * @throws {Error} Se o banco recusar.
 */
async function lerEntregaDoAlunoDinamica(atividadeId, alunoId) {
    const [entrega] = await sbGet(TABELA_ENTREGA_DINAMICA,
        'select=' + COLUNAS_ENTREGA_DINAMICA + '&atividade_id=eq.' + atividadeId
        + '&aluno_id=eq.' + alunoId);
    return entrega || null;
}

/**
 * Lê as entregas desta atividade que o professor pode ver (RLS), da mais recente à mais antiga.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Linhas de entrega_dinamica.
 * @throws {Error} Se o banco recusar.
 */
async function lerEntregasDaAtividadeDinamica(atividadeId) {
    return sbGet(TABELA_ENTREGA_DINAMICA,
        'select=' + COLUNAS_ENTREGA_DINAMICA + '&atividade_id=eq.' + atividadeId
        + '&order=atualizado_em.desc');
}

/**
 * Grava (insere ou atualiza) a entrega do aluno logado.
 * @param {{aluno_id: string, atividade_id: number, estado: Object, entregue: boolean}} registro
 *   - Entrega a gravar.
 * @returns {Promise<Object[]>} Linha gravada.
 * @throws {Error} Se o banco recusar (inclusive quando já foi entregue).
 */
async function gravarEntregaDinamica(registro) {
    const url = SUPABASE.URL + '/rest/v1/' + TABELA_ENTREGA_DINAMICA
        + '?on_conflict=aluno_id,atividade_id';
    const resposta = await fetch(url, {
        method: 'POST',
        headers: { ...(await sbH()), Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(registro)
    });
    if (!resposta.ok) throw new Error(await resposta.text());
    return resposta.json();
}

/**
 * Lê os nomes dos alunos de uma lista de ids.
 * @param {string[]} ids - Ids dos alunos (auth.users).
 * @returns {Promise<Map<string, string>>} Mapa id para nome.
 * @throws {Error} Se o banco recusar.
 */
async function lerNomesDosAlunosDinamica(ids) {
    const nomes = new Map();
    if (ids.length === 0) return nomes;

    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + ids.join(',') + ')');
    alunos.forEach((aluno) => nomes.set(aluno.id, aluno.nome || SEM_NOME_ALUNO_DINAMICA));
    return nomes;
}
