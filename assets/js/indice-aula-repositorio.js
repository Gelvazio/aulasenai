// Acesso ao Supabase para os cards de aula do ATIVIDADES/index.html (tabela aulas) e para o
// modal "✏️ Editar aula" (CRUD da aula e lista das atividades dela) e para o "Gerenciar
// atividades" (vincular/desvincular atividade.aula_id, #213).
// Depende de: js/supabase.js (obterClienteSupabase, sbGet, sbPatch, sbDelete).

const TABELA_AULAS_CARD = 'aulas';
const TABELA_ATIVIDADE_AULA = 'atividade';
const TABELA_MATERIA_CARD = 'materia';
const CAMPOS_AULA_CARD = 'id,numero,titulo,descricao,materia_id,curso_id,duracao_minutos,' +
    'data_planejada,sequencia,ativo,visivel_alunos,conteudo,nome_card,excluido,' +
    'materia(descricao),curso(nome_completo)';
const CAMPOS_ATIVIDADE_DA_AULA = 'id,nome_atividade,descricao,data_atividade,total_itens,' +
    'pagina,ativo,aula_id';
// Botões das atividades vinculadas nos cards (indice-aula-atividades-vinculadas.js, #249.1).
const CAMPOS_ATIVIDADE_VINCULADA_CARD = 'id,nome_atividade,descricao,pagina,aula_id';
// "Gerenciar atividades" (indice-aula-modal-vinculo.js, #213): atividade com a aula a que pertence.
const CAMPOS_ATIVIDADE_SEM_AULA_VINCULO = 'id,nome_atividade,descricao,pagina,ativo,aula_id';
const CAMPOS_AULA_VINCULO = '(numero,titulo,materia_id)';
const CAMPOS_ATIVIDADE_VINCULO = CAMPOS_ATIVIDADE_SEM_AULA_VINCULO + ',aulas' + CAMPOS_AULA_VINCULO;
// "!inner": só as atividades cuja aula é da matéria pedida.
// Quem é Professor Administrador decide o banco (etiqueta "Id Aula:" do card, #257).
const RPC_ADMINISTRADOR_CARD = 'eh_professor_administrador';
const CAMPOS_ATIVIDADE_DA_MATERIA_VINCULO = CAMPOS_ATIVIDADE_SEM_AULA_VINCULO + ',aulas!inner' +
    CAMPOS_AULA_VINCULO;

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
 * Lê as atividades ligadas às aulas pedidas (atividade.aula_id), pela chave da página
 * (obterChaveDaPagina: pasta/arquivo em minúsculas, sem depender do prefixo do endereço).
 * Atividade sem vínculo, de outra aula ou que o RLS não deixa ler não entra no mapa.
 * @param {number[]} idsAulas - Ids das aulas da matéria.
 * @returns {Promise<Map<string, number>>} aula_id de cada chave de página.
 */
async function buscarVinculosDasAulasCard(idsAulas) {
    const mapa = new Map();
    if (!idsAulas.length) return mapa;

    const lista = idsAulas.map((id) => encodeURIComponent(id)).join(',');
    const linhas = await sbGet(TABELA_ATIVIDADE_AULA,
        'select=pagina,aula_id&aula_id=in.(' + lista + ')');
    linhas.forEach((linha) => {
        const chave = obterChaveDaPagina(linha.pagina);
        if (chave) mapa.set(chave, linha.aula_id);
    });
    return mapa;
}

/**
 * Lê o nome (atividade.nome_atividade) das atividades das páginas dos cards.
 * @param {string[]} paginas - Caminhos (pathname) das páginas de atividade.
 * @returns {Promise<Map<string, string>>} Nome da atividade de cada página (só as com nome).
 */
async function buscarNomesDasAtividadesCard(paginas) {
    const mapa = new Map();
    if (!paginas.length) return mapa;

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const filtro = 'pagina=in.(' + encodeURIComponent(valores) + ')';
    const linhas = await sbGet(TABELA_ATIVIDADE_AULA, 'select=pagina,nome_atividade&' + filtro);
    linhas.filter((linha) => linha.nome_atividade?.trim())
        .forEach((linha) => mapa.set(linha.pagina, linha.nome_atividade.trim()));
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
 * Lista, numa só consulta, as atividades ativas das aulas dos cards (botões vinculados, #249.1).
 * @param {number[]} idsAulas - Ids das aulas.
 * @returns {Promise<Object[]>} Atividades ativas (o que o RLS deixa o usuário ler), por id.
 */
async function buscarAtividadesDasAulasCard(idsAulas) {
    if (!idsAulas.length) return [];

    const lista = idsAulas.map((id) => encodeURIComponent(id)).join(',');
    return sbGet(TABELA_ATIVIDADE_AULA, 'select=' + CAMPOS_ATIVIDADE_VINCULADA_CARD +
        '&aula_id=in.(' + lista + ')&ativo=eq.true&order=id');
}

/**
 * Busca uma atividade pelo id, com a aula a que ela pertence.
 * @param {number} idAtividade - Id da atividade.
 * @returns {Promise<Object|null>} Atividade, ou null se não existir (ou o usuário não a ler).
 */
async function buscarAtividadeVinculoCard(idAtividade) {
    const [atividade] = await sbGet(TABELA_ATIVIDADE_AULA, 'select=' + CAMPOS_ATIVIDADE_VINCULO +
        '&id=eq.' + encodeURIComponent(idAtividade));
    return atividade || null;
}

/**
 * Lista as atividades que podem ser vinculadas: as das aulas da matéria e as sem aula.
 * @param {number} idMateria - Id da matéria da aula.
 * @returns {Promise<Object[]>} Atividades, em ordem de id.
 */
async function listarAtividadesVinculaveisCard(idMateria) {
    const [daMateria, semAula] = await Promise.all([
        sbGet(TABELA_ATIVIDADE_AULA, 'select=' + CAMPOS_ATIVIDADE_DA_MATERIA_VINCULO +
            '&aulas.materia_id=eq.' + encodeURIComponent(idMateria) + '&order=id'),
        sbGet(TABELA_ATIVIDADE_AULA, 'select=' + CAMPOS_ATIVIDADE_SEM_AULA_VINCULO +
            '&aula_id=is.null&order=id'),
    ]);
    return [...daMateria, ...semAula].sort((a, b) => a.id - b.id);
}

/**
 * Liga a atividade a uma aula, ou desliga (sem aula), gravando atividade.aula_id.
 * @param {number} idAtividade - Id da atividade.
 * @param {number|null} idAula - Id da aula, ou null para desvincular.
 * @returns {Promise<boolean>} true se o banco devolveu a linha alterada.
 */
async function definirAulaDaAtividadeCard(idAtividade, idAula) {
    const linhas = await sbPatch(TABELA_ATIVIDADE_AULA, 'id', idAtividade, { aula_id: idAula });
    return Array.isArray(linhas) && linhas.length > 0;
}

/**
 * Diz se o usuário logado é Professor Administrador; falha na consulta = não é.
 * @returns {Promise<boolean>} true se for administrador.
 */
async function verificarAdministradorCard() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    try {
        const { data, error } = await cliente.rpc(RPC_ADMINISTRADOR_CARD);
        return !error && data === true;
    } catch (erro) {
        return false;
    }
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
 * Exclui uma atividade (gabarito, respostas e entregas dela são apagados em cascata).
 * @param {number} idAtividade - Id da atividade.
 */
async function excluirAtividadeDaAulaCard(idAtividade) {
    await sbDelete(TABELA_ATIVIDADE_AULA, 'id=eq.' + encodeURIComponent(idAtividade));
}
