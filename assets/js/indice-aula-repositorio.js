// Acesso ao Supabase para os cards de aula do ATIVIDADES/index.html (tabela aulas) e para o
// modal "✏️ Editar aula" (CRUD da aula e lista das atividades dela).
// Depende de: js/supabase.js (obterClienteSupabase, sbGet, sbPatch, sbDelete).

const TABELA_AULAS_CARD = 'aulas';
const TABELA_ATIVIDADE_AULA = 'atividade';
const TABELA_MATERIA_CARD = 'materia';
const CAMPOS_AULA_CARD = 'id,numero,titulo,descricao,materia_id,curso_id,duracao_minutos,' +
    'data_planejada,sequencia,ativo,visivel_alunos,conteudo,rotulo_card,nome_card,excluido,' +
    'materia(descricao),curso(nome_completo)';
const CAMPOS_ATIVIDADE_DA_AULA = 'id,nome_atividade,descricao,data_atividade,total_itens,' +
    'pagina,ativo,aula_id';
const RPC_EXCLUIR_AULA_CARD = 'excluir_aula';
const RPC_ADMINISTRADOR_CARD = 'eh_professor_administrador';

/**
 * Lê as atividades das páginas dos cards, cada uma com a aula completa.
 * @param {string[]} paginas - Caminhos (pathname) das páginas de atividade.
 * @returns {Promise<Map<string, Object>>} Aula de cada página.
 */
async function buscarAulasDasPaginasCard(paginas) {
    const mapa = new Map();
    if (!paginas.length) return mapa;

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const filtro = 'pagina=in.(' + encodeURIComponent(valores) + ')';
    const linhas = await sbGet(TABELA_ATIVIDADE_AULA,
        'select=pagina,aulas(' + CAMPOS_AULA_CARD + ')&' + filtro);
    linhas.filter((linha) => linha.aulas).forEach((linha) => mapa.set(linha.pagina, linha.aulas));
    return mapa;
}

/**
 * Lista as aulas de uma matéria (para achar a aula de um card cuja atividade não foi lida).
 * @param {number} idMateria - Id da matéria.
 * @returns {Promise<Object[]>} Aulas da matéria.
 */
async function listarAulasDaMateriaCard(idMateria) {
    return sbGet(TABELA_AULAS_CARD,
        'select=' + CAMPOS_AULA_CARD + '&materia_id=eq.' + encodeURIComponent(idMateria));
}

/**
 * Busca o id da matéria pelo nome (materia.descricao, sem diferenciar maiúsculas) e pelo curso.
 * @param {string} nome - Nome da matéria (nome da pasta com espaços).
 * @param {string} curso - Id do curso (vazio = qualquer curso).
 * @returns {Promise<number|null>} Id da matéria, ou null se não houver exatamente uma.
 */
async function buscarMateriaPeloNomeCard(nome, curso) {
    const filtroCurso = curso ? '&curso_id=eq.' + encodeURIComponent(curso) : '';
    const linhas = await sbGet(TABELA_MATERIA_CARD,
        'select=id&descricao=ilike.' + encodeURIComponent(nome) + filtroCurso);
    return linhas.length === 1 ? linhas[0].id : null;
}

/**
 * Lista as atividades ligadas a uma aula.
 * @param {number} idAula - Id da aula.
 * @returns {Promise<Object[]>} Atividades da aula, em ordem de id.
 */
async function listarAtividadesDaAulaCard(idAula) {
    return sbGet(TABELA_ATIVIDADE_AULA, 'select=' + CAMPOS_ATIVIDADE_DA_AULA +
        '&aula_id=eq.' + encodeURIComponent(idAula) + '&order=id');
}

/**
 * Grava os campos da aula (o RLS só deixa o professor alterar).
 * @param {number} idAula - Id da aula.
 * @param {Object} valores - Colunas da tabela aulas.
 * @returns {Promise<boolean>} true se o banco devolveu a linha alterada.
 */
async function gravarAulaCard(idAula, valores) {
    const linhas = await sbPatch(TABELA_AULAS_CARD, 'id', idAula, valores);
    return Array.isArray(linhas) && linhas.length > 0;
}

/**
 * Exclui a aula logicamente (aulas.excluido = 1) pela função do banco (só administrador).
 * @param {number} idAula - Id da aula.
 * @returns {Promise<boolean>} true se excluiu.
 */
async function excluirAulaCard(idAula) {
    const { data, error } = await obterClienteSupabase().rpc(RPC_EXCLUIR_AULA_CARD,
        { p_aula: idAula });
    return !error && data === true;
}

/**
 * Exclui uma atividade (gabarito, respostas e entregas dela são apagados em cascata).
 * @param {number} idAtividade - Id da atividade.
 */
async function excluirAtividadeDaAulaCard(idAtividade) {
    await sbDelete(TABELA_ATIVIDADE_AULA, 'id=eq.' + encodeURIComponent(idAtividade));
}

/**
 * Diz se o usuário logado é o Professor Administrador (só ele exclui aulas).
 * @returns {Promise<boolean>} true se for o administrador.
 */
async function verificarAdministradorCard() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data, error } = await cliente.rpc(RPC_ADMINISTRADOR_CARD);
    return !error && data === true;
}
