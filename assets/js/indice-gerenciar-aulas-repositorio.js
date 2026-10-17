// Acesso ao Supabase do "📚 Gerenciar Aulas" do ATIVIDADES/index.html (tarefa #250): listar as
// aulas da matéria da página (sem as excluídas), inserir, editar e excluir.
// Excluir apaga a aula de verdade pela função excluir_aula do banco (#254), que só aceita o
// Professor Administrador e recusa a aula com atividade vinculada; inserir e editar seguem o
// RLS da tabela aulas (só professor).
// Depende de: js/supabase.js (sbGet, sbPost, sbPatch, obterClienteSupabase).

const TABELA_AULAS_GERENCIAR = 'aulas';
const TABELA_MATERIA_GERENCIAR = 'materia';
const CAMPOS_AULA_GERENCIAR = 'id,numero,titulo,descricao,materia_id,curso_id,duracao_minutos,' +
    'data_planejada,sequencia,ativo,visivel_alunos,conteudo,rotulo_card,nome_card,excluido';
const AULA_NAO_EXCLUIDA_GERENCIAR = 0;
const RPC_EXCLUIR_AULA_GERENCIAR = 'excluir_aula';
const RPC_ADMINISTRADOR_GERENCIAR = 'eh_professor_administrador';

/**
 * Busca a matéria pelo nome (materia.descricao, sem diferenciar maiúsculas) e pelo curso.
 * @param {string} nome - Nome da matéria (nome da pasta com espaços).
 * @param {string} curso - Id do curso (vazio = qualquer curso).
 * @returns {Promise<{id: number, curso_id: number}|null>} Matéria, ou null se não houver
 *     exatamente uma.
 */
async function buscarMateriaGerenciarAulas(nome, curso) {
    const filtroCurso = curso ? '&curso_id=eq.' + encodeURIComponent(curso) : '';
    const linhas = await sbGet(TABELA_MATERIA_GERENCIAR,
        'select=id,curso_id&descricao=ilike.' + encodeURIComponent(nome) + filtroCurso);
    return linhas.length === 1 ? linhas[0] : null;
}

/**
 * Lista as aulas não excluídas de uma matéria, em ordem de número.
 * @param {number} idMateria - Id da matéria.
 * @returns {Promise<Object[]>} Aulas da matéria.
 */
async function listarAulasGerenciar(idMateria) {
    return sbGet(TABELA_AULAS_GERENCIAR, 'select=' + CAMPOS_AULA_GERENCIAR +
        '&materia_id=eq.' + encodeURIComponent(idMateria) +
        '&excluido=eq.' + AULA_NAO_EXCLUIDA_GERENCIAR + '&order=numero,id');
}

/**
 * Cria uma aula na matéria.
 * @param {Object} valores - Colunas da tabela aulas (com materia_id e curso_id).
 * @returns {Promise<Object>} Aula criada.
 * @throws {Error} Se o banco recusar (RLS ou número repetido).
 */
async function inserirAulaGerenciar(valores) {
    const [aula] = await sbPost(TABELA_AULAS_GERENCIAR, valores);
    if (!aula) throw new Error('O banco não devolveu a aula criada.');
    return aula;
}

/**
 * Grava os campos de uma aula.
 * @param {number} idAula - Id da aula.
 * @param {Object} valores - Colunas da tabela aulas.
 * @returns {Promise<Object>} Aula gravada.
 * @throws {Error} Se nenhuma linha for alterada (RLS) ou o banco recusar.
 */
async function atualizarAulaGerenciar(idAula, valores) {
    const [aula] = await sbPatch(TABELA_AULAS_GERENCIAR, 'id', idAula, valores);
    if (!aula) throw new Error('Nenhuma linha alterada.');
    return aula;
}

/**
 * Exclui a aula de vez (DELETE pela função excluir_aula, só Professor Administrador, #254).
 * @param {number} idAula - Id da aula.
 * @throws {Error} Se o banco recusar ou não achar a aula.
 */
async function excluirAulaGerenciar(idAula) {
    const cliente = obterClienteSupabase();
    if (!cliente) throw new Error('Supabase indisponível.');
    const { data, error } = await cliente.rpc(RPC_EXCLUIR_AULA_GERENCIAR, { p_aula: idAula });
    if (error) throw new Error(error.message);
    if (data !== true) throw new Error('A aula não foi encontrada no banco.');
}

/**
 * Diz se o usuário logado é Professor Administrador (quem decide é o banco). Falha na consulta =
 * não é administrador (só desliga o 🗑️; o banco recusaria a exclusão de qualquer jeito).
 * @returns {Promise<boolean>} true se for administrador.
 */
async function usuarioEhAdministradorGerenciar() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;
    try {
        const { data, error } = await cliente.rpc(RPC_ADMINISTRADOR_GERENCIAR);
        return !error && data === true;
    } catch (erro) {
        return false;
    }
}
