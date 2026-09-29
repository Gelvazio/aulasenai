// Acesso ao Supabase para o CRUD de atividades (modal do ATIVIDADES/index.html).
// Depende de: js/supabase.js (obterClienteSupabase, sbGet, sbPost, sbPatch, sbDelete).

const TABELA_ATIVIDADE = 'atividade';
const PERFIL_PROFESSOR_CRUD = 'PROFESSOR';
const CAMPOS_ATIVIDADE_CRUD = 'id,descricao,data_atividade,total_itens,pagina,ativo,aula_id,' +
    'aulas(numero,titulo)';
const CONSULTA_AULAS_CRUD = 'select=id,numero,titulo,materia(descricao)&order=materia_id,numero';

/**
 * Indica se há um professor logado (perfil vem do app_metadata, que só a service_role altera).
 * @returns {Promise<boolean>} true se o usuário logado é professor.
 */
async function usuarioEhProfessorCrud() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data } = await cliente.auth.getSession();
    return data?.session?.user?.app_metadata?.perfil === PERFIL_PROFESSOR_CRUD;
}

/**
 * Lista as atividades cadastradas cujo link está entre as páginas informadas.
 * @param {string[]} paginas - Caminhos (pathname) das páginas de atividade.
 * @returns {Promise<Object[]>} Atividades cadastradas, da data mais recente para a mais antiga.
 */
async function listarAtividadesCrud(paginas) {
    if (!paginas.length) return [];

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const filtro = 'pagina=in.(' + encodeURIComponent(valores) + ')';
    return sbGet(TABELA_ATIVIDADE,
        'select=' + CAMPOS_ATIVIDADE_CRUD + '&' + filtro + '&order=data_atividade.desc,id');
}

/**
 * Lista as aulas cadastradas, para escolher a aula da atividade.
 * @returns {Promise<Object[]>} Aulas com a matéria.
 */
async function listarAulasCrud() {
    return sbGet('aulas', CONSULTA_AULAS_CRUD);
}

/**
 * Cria (sem id) ou atualiza (com id) uma atividade.
 * @param {Object} dados - Campos da atividade (id opcional).
 * @returns {Promise<Object[]>} Registro gravado.
 */
async function gravarAtividadeCrud(dados) {
    const { id, ...campos } = dados;
    if (id) return sbPatch(TABELA_ATIVIDADE, 'id', id, campos);

    return sbPost(TABELA_ATIVIDADE, campos);
}

/**
 * Exclui uma atividade (gabarito, respostas e entregas dela são apagados em cascata).
 * @param {number} id - Id da atividade.
 */
async function excluirAtividadeCrud(id) {
    await sbDelete(TABELA_ATIVIDADE, 'id=eq.' + encodeURIComponent(id));
}
