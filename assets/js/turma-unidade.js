// Unidade da turma (local + turno, em maiúsculas), usada em todas as listas de seleção de turma:
// ex.: "AI SALETE TARDE", "AI CEPLAS MANHÃ", "ROBERTO MACHADO TARDE". Pedido do usuário em
// 2026-10-08. O turno não se repete quando o local já o traz (ex.: "... TAIÓ TARDE").

/**
 * Normaliza um texto para comparar sem acentos e sem diferenciar maiúsculas.
 * @param {string} texto - Texto original.
 * @returns {string} Texto em maiúsculas e sem acentos.
 */
function normalizarTextoUnidade(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
}

/**
 * Monta a unidade da turma: local + turno, em maiúsculas.
 * @param {{local?: string, turno?: string}} turma - Turma do banco ou da lista.
 * @returns {string} Unidade (vazio se a turma não tem local nem turno).
 */
function montarUnidadeTurma(turma) {
    const local = String(turma?.local || '').trim().toUpperCase();
    const turno = String(turma?.turno || '').trim().toUpperCase();
    const localJaTemTurno = turno && normalizarTextoUnidade(local).includes(
        normalizarTextoUnidade(turno));
    if (!turno || localJaTemTurno) return local;
    return [local, turno].filter(Boolean).join(' ');
}

/**
 * Acrescenta a unidade ao texto de uma opção de turma ("texto · UNIDADE").
 * @param {string} texto - Texto já montado da turma.
 * @param {Object} turma - Turma (com local e turno).
 * @returns {string} Texto com a unidade, ou o próprio texto se não houver unidade.
 */
function acrescentarUnidadeTurma(texto, turma) {
    const unidade = montarUnidadeTurma(turma);
    return unidade ? texto + ' · ' + unidade : texto;
}
