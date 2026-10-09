// Unidade de cada turma (arquivo global). Desde 2026-10-09 a unidade vem SÓ da tabela unidade,
// pela ligação turma.unidade_id (cadastro no modal 🏢 Unidades de cursos.html). Toda consulta de
// turma que mostra a unidade pede a coluna COLUNA_UNIDADE_TURMA, que traz { unidade: { nome } }.
// Usado em todas as listas de seleção de turma: "133933 — AI AIAC 2026/2 V1 · AI SALETE TARDE".

const COLUNA_UNIDADE_TURMA = 'unidade:unidade_id(nome)';

/**
 * Normaliza um texto para comparar sem acentos e sem diferenciar maiúsculas.
 * @param {string} texto - Texto original.
 * @returns {string} Texto em maiúsculas e sem acentos.
 */
function normalizarTextoUnidade(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
}

/**
 * Nome da unidade da turma, vindo da tabela unidade.
 * @param {{unidade?: {nome?: string}}} turma - Turma consultada com COLUNA_UNIDADE_TURMA.
 * @returns {string} Nome da unidade (vazio se a turma não tem unidade).
 */
function nomeUnidadeTurma(turma) {
    return String(turma?.unidade?.nome || '').trim();
}

/**
 * Unidade + turno da turma em maiúsculas (o turno não se repete se o nome já o traz).
 * @param {{unidade?: {nome?: string}, turno?: string}} turma - Turma.
 * @returns {string} Unidade (vazio se não houver dado).
 */
function montarUnidadeTurma(turma) {
    const unidade = nomeUnidadeTurma(turma).toUpperCase();
    const turno = String(turma?.turno || '').trim().toUpperCase();
    const unidadeJaTemTurno = turno && normalizarTextoUnidade(unidade).includes(
        normalizarTextoUnidade(turno));
    if (!turno || unidadeJaTemTurno) return unidade;
    return [unidade, turno].filter(Boolean).join(' ');
}

/**
 * Acrescenta a unidade ao texto de uma opção de turma ("texto · UNIDADE").
 * @param {string} texto - Texto já montado da turma.
 * @param {Object} turma - Turma (com unidade e turno).
 * @returns {string} Texto com a unidade, ou o próprio texto se não houver unidade.
 */
function acrescentarUnidadeTurma(texto, turma) {
    const unidade = montarUnidadeTurma(turma);
    return unidade ? texto + ' · ' + unidade : texto;
}
