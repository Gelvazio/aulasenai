// ── Repositório da página correcao-discursiva.html ─────────────────
// Acesso ao Supabase para corrigir as avaliações discursivas: tópicos (padrão de resposta),
// respostas dos alunos e notas (tabela correcao_discursiva). Quem pode ler e gravar é decidido
// pelo banco (RLS: professor só dos alunos das turmas dele; administrador de todos).
// Depende de js/supabase.js (obterClienteSupabase).

const TABELA_TOPICO_CORRECAO = "topico_discursivo";
const TABELA_RESPOSTA_CORRECAO = "resposta_discursiva";
const TABELA_CORRECAO = "correcao_discursiva";
const TABELA_ATIVIDADE_CORRECAO = "atividade";
const TABELA_ENTREGA_CORRECAO = "entrega_atividade";
const TABELA_ALUNO_CORRECAO = "aluno";
const TABELA_TURMA_CORRECAO = "turma";
const PERFIL_PROFESSOR_CORRECAO = "PROFESSOR";
const COLUNAS_TOPICO_CORRECAO = "item, topico, enunciado, pontos, resposta_esperada, criterios";
const COLUNAS_CORRECAO = "aluno_id, atividade_id, tentativa, item, topico, nota_ia, " +
  "nota_professor, comentario, corrigido_em";
const CHAVE_CORRECAO = "aluno_id,atividade_id,tentativa,item,topico";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroCorrecao(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioCorrecao(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /**
     * Se o usuário é professor (o banco confere de novo em cada leitura e gravação).
     * @param {Object} usuario - Usuário logado.
     * @returns {boolean} Verdadeiro para o perfil PROFESSOR do app_metadata.
     */
    ehProfessor(usuario) {
      return usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_CORRECAO;
    },

    /** @returns {Promise<Object[]>} Atividades discursivas (com tópicos), pelo nome. */
    async listarAvaliacoesDiscursivas() {
      const topicos = dadosOuErroCorrecao(await cliente.from(TABELA_TOPICO_CORRECAO)
        .select("atividade_id"));
      const ids = [...new Set(topicos.map((linha) => linha.atividade_id))];
      if (!ids.length) return [];
      return dadosOuErroCorrecao(await cliente.from(TABELA_ATIVIDADE_CORRECAO)
        .select("id, nome_atividade, descricao, pagina").in("id", ids).order("pagina"));
    },

    /**
     * Tentativas entregues da atividade, com nome e turma do aluno (o RLS só devolve alunos das
     * turmas do professor; o administrador vê todos).
     * @param {number} atividadeId - Id da atividade.
     * @returns {Promise<Object[]>} Linhas {aluno_id, nome, turma_codigo, turma_nome, tentativa,
     *     entregue_em}, por turma e nome.
     */
    async listarEntregas(atividadeId) {
      const entregas = dadosOuErroCorrecao(await cliente.from(TABELA_ENTREGA_CORRECAO)
        .select("aluno_id, tentativa, entregue_em").eq("atividade_id", atividadeId));
      if (!entregas.length) return [];
      const ids = [...new Set(entregas.map((linha) => linha.aluno_id))];
      const alunos = dadosOuErroCorrecao(await cliente.from(TABELA_ALUNO_CORRECAO)
        .select("id, nome, turma_codigo, desistente").in("id", ids));
      const turmas = dadosOuErroCorrecao(await cliente.from(TABELA_TURMA_CORRECAO)
        .select("codigo, nome"));
      const porAluno = new Map(alunos.map((aluno) => [aluno.id, aluno]));
      const porTurma = new Map(turmas.map((turma) => [turma.codigo, turma.nome]));
      // Entrega de aluno desistente (#342) fica fora da correção.
      const ativas = entregas.filter((linha) => !porAluno.get(linha.aluno_id)?.desistente);
      return ativas.map((linha) => {
        const aluno = porAluno.get(linha.aluno_id) || {};
        return { ...linha, nome: aluno.nome, turma_codigo: aluno.turma_codigo,
          turma_nome: porTurma.get(aluno.turma_codigo) };
      }).sort((x, y) => String(x.turma_codigo).localeCompare(String(y.turma_codigo)) ||
        String(x.nome).localeCompare(String(y.nome)) || x.tentativa - y.tentativa);
    },

    /**
     * Tópicos da atividade com o padrão de resposta (leitura só do professor).
     * @param {number} atividadeId - Id da atividade.
     * @returns {Promise<Object[]>} Tópicos em ordem de item e tópico.
     */
    async listarTopicos(atividadeId) {
      return dadosOuErroCorrecao(await cliente.from(TABELA_TOPICO_CORRECAO)
        .select(COLUNAS_TOPICO_CORRECAO).eq("atividade_id", atividadeId)
        .order("item").order("topico"));
    },

    /**
     * Respostas do aluno numa tentativa.
     * @param {{atividadeId: number, alunoId: string, tentativa: number}} chave - Tentativa.
     * @returns {Promise<Object[]>} Linhas com item, tópico e texto.
     */
    async listarRespostas({ atividadeId, alunoId, tentativa }) {
      return dadosOuErroCorrecao(await cliente.from(TABELA_RESPOSTA_CORRECAO)
        .select("item, topico, texto").eq("atividade_id", atividadeId)
        .eq("aluno_id", alunoId).eq("tentativa", tentativa));
    },

    /**
     * Correções já gravadas da atividade (todas as tentativas visíveis ao professor).
     * @param {number} atividadeId - Id da atividade.
     * @returns {Promise<Object[]>} Linhas da correcao_discursiva.
     */
    async listarCorrecoes(atividadeId) {
      return dadosOuErroCorrecao(await cliente.from(TABELA_CORRECAO)
        .select(COLUNAS_CORRECAO).eq("atividade_id", atividadeId));
    },

    /**
     * Grava (insere ou atualiza) as notas de uma tentativa.
     * @param {Object[]} linhas - Linhas da correcao_discursiva.
     * @returns {Promise<void>}
     */
    async salvarCorrecoes(linhas) {
      dadosOuErroCorrecao(await cliente.from(TABELA_CORRECAO)
        .upsert(linhas, { onConflict: CHAVE_CORRECAO }));
    },
  };
}
