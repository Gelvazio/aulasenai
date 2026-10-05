// ── Repositório das equipes por turma + matéria ─────────────────────────────────────────────
// Acesso ao Supabase para o modal de equipes (assets/js/equipes-modal.js). Quem pode gravar é
// decidido pelo banco: RLS de equipe/equipe_membro + professor_tem_turma(). O trigger
// equipe_membro_preparar recusa aluno fora da turma.
// SQL: database/2026-10-05-equipes-turma-materia.sql

const TABELA_EQUIPE = 'equipe';
const TABELA_EQUIPE_MEMBRO = 'equipe_membro';
const TABELA_TURMA_EQUIPES = 'turma';
const TABELA_TURMAPROFESSOR_EQUIPES = 'turmaprofessor';
const TABELA_TURMAALUNO_EQUIPES = 'turmaaluno';
const TABELA_USUARIO_EQUIPES = 'usuario';
const TABELA_ATIVIDADE_EQUIPES = 'atividade';
const RPC_ADMINISTRADOR_EQUIPES = 'eh_professor_administrador';
const RPC_MINHAS_EQUIPES = 'minhas_equipes';
const PERFIL_PROFESSOR_EQUIPES = 'PROFESSOR';
const COLUNAS_TURMA_EQUIPES = 'codigo, nome, turno';
const COLUNAS_EQUIPE = 'id, turma_codigo, materia_id, nome, descricao, criado_em';
const COLUNAS_MEMBRO = 'id, equipe_id, aluno_id, papel, tarefas, lider';
const COLUNAS_MATERIA_ATIVIDADE = 'aulas(materia(id, descricao))';

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroEquipes(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria as funções de leitura do contexto (usuário, turmas, matéria e alunos).
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de leitura.
 */
function criarLeiturasContextoEquipes(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /**
     * @param {Object} usuario - Usuário logado.
     * @returns {boolean} Verdadeiro para o perfil PROFESSOR do app_metadata.
     */
    ehProfessor(usuario) {
      return usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_EQUIPES;
    },

    /**
     * Descobre a matéria pelas atividades cadastradas nesta pasta (atividade.pagina).
     * @param {string} prefixoPasta - Caminho da pasta, ex.: /MATERIAIS/.../ATIVIDADES/
     * @returns {Promise<{id: number, descricao: string}|null>} Matéria ou null.
     */
    async buscarMateriaDaPasta(prefixoPasta) {
      const linhas = dadosOuErroEquipes(await cliente.from(TABELA_ATIVIDADE_EQUIPES)
        .select(COLUNAS_MATERIA_ATIVIDADE).like('pagina', prefixoPasta + '%').limit(1));
      return linhas[0]?.aulas?.materia || null;
    },

    /**
     * Turmas do professor: todas para o administrador; senão, as da turmaprofessor.
     * @param {string} professorId - Id do professor logado.
     * @returns {Promise<Object[]>} Turmas ordenadas pelo código.
     */
    async listarTurmasDoProfessor(professorId) {
      const turmas = dadosOuErroEquipes(await cliente.from(TABELA_TURMA_EQUIPES)
        .select(COLUNAS_TURMA_EQUIPES).order('codigo'));
      const { data: ehAdministrador } = await cliente.rpc(RPC_ADMINISTRADOR_EQUIPES);
      if (ehAdministrador) return turmas;

      const vinculos = dadosOuErroEquipes(await cliente.from(TABELA_TURMAPROFESSOR_EQUIPES)
        .select('turma_codigo').eq('professor_id', professorId));
      const codigos = new Set(vinculos.map((vinculo) => vinculo.turma_codigo));
      return turmas.filter((turma) => codigos.has(turma.codigo));
    },

    /**
     * Alunos vinculados à turma (turmaaluno), com o nome do usuario.
     * @param {string} turmaCodigo - Código da turma.
     * @returns {Promise<{id: string, nome: string}[]>} Alunos pelo nome.
     */
    async listarAlunosDaTurma(turmaCodigo) {
      const vinculos = dadosOuErroEquipes(await cliente.from(TABELA_TURMAALUNO_EQUIPES)
        .select('aluno_id').eq('turma_codigo', turmaCodigo));
      const ids = vinculos.map((vinculo) => vinculo.aluno_id);
      if (!ids.length) return [];

      const usuarios = dadosOuErroEquipes(await cliente.from(TABELA_USUARIO_EQUIPES)
        .select('id, nome_completo').in('id', ids));
      const nomes = new Map(usuarios.map((usuario) => [usuario.id, usuario.nome_completo]));
      return ids
        .map((id) => ({ id, nome: nomes.get(id) || 'Aluno sem nome' }))
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    },

    /**
     * Equipes do aluno logado na matéria (com os colegas), pela função minhas_equipes.
     * @param {number} materiaId - Id da matéria.
     * @returns {Promise<Object[]>} Linhas equipe × membro.
     */
    async listarMinhasEquipes(materiaId) {
      return dadosOuErroEquipes(await cliente.rpc(RPC_MINHAS_EQUIPES,
        { p_materia_id: materiaId }));
    },
  };
}

/**
 * Cria as funções de CRUD das tabelas equipe e equipe_membro.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de CRUD.
 */
function criarCrudEquipes(cliente) {
  return {
    /**
     * @param {{turmaCodigo: string, materiaId: number}} filtro - Turma e matéria.
     * @returns {Promise<Object[]>} Equipes pelo nome.
     */
    async listarEquipes(filtro) {
      return dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE).select(COLUNAS_EQUIPE)
        .eq('turma_codigo', filtro.turmaCodigo).eq('materia_id', filtro.materiaId)
        .order('nome'));
    },

    /**
     * @param {number[]} equipeIds - Ids das equipes.
     * @returns {Promise<Object[]>} Membros dessas equipes.
     */
    async listarMembros(equipeIds) {
      if (!equipeIds.length) return [];
      return dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE_MEMBRO).select(COLUNAS_MEMBRO)
        .in('equipe_id', equipeIds));
    },

    /** @param {Object} equipe - turma_codigo, materia_id, nome, descricao. */
    async criarEquipe(equipe) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE).insert(equipe));
    },

    /**
     * @param {number} id - Id da equipe.
     * @param {{nome: string, descricao: string|null}} campos - Novos valores.
     */
    async alterarEquipe(id, campos) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE).update(campos).eq('id', id));
    },

    /** @param {number} id - Id da equipe (os membros saem em cascata). */
    async excluirEquipe(id) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE).delete().eq('id', id));
    },

    /** @param {Object} membro - equipe_id, aluno_id, papel, tarefas, lider. */
    async criarMembro(membro) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE_MEMBRO).insert(membro));
    },

    /**
     * @param {number} id - Id do membro.
     * @param {Object} campos - equipe_id, papel, tarefas e/ou lider.
     */
    async alterarMembro(id, campos) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE_MEMBRO).update(campos).eq('id', id));
    },

    /** @param {number} id - Id do membro. */
    async excluirMembro(id) {
      dadosOuErroEquipes(await cliente.from(TABELA_EQUIPE_MEMBRO).delete().eq('id', id));
    },
  };
}

/**
 * Cria o repositório das equipes, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de leitura do contexto + CRUD.
 */
function criarRepositorioEquipes(cliente) {
  return { ...criarLeiturasContextoEquipes(cliente), ...criarCrudEquipes(cliente) };
}
