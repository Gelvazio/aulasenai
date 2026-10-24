// ── Repositório da página materias-pendentes.html ────────────────
// Acesso aos dados da página (#357): usuário logado, papel de Professor Administrador (RPC do
// banco), cursos (curso.ano e curso.semestre, filtrados pela RLS) e o materias-pendentes.json
// gerado por scripts/status-materias/gerar_materias_pendentes_json.py (só nomes de peça e ✅/⬜).
// O papel nunca vem do e-mail nem do user_metadata: quem decide é eh_professor_administrador().
// Depende de js/supabase.js (obterClienteSupabase). Regras: materias-pendentes-regras.js

const TABELA_CURSO_PENDENTES = "curso";
const COLUNAS_CURSO_PENDENTES = "id, nome_completo, ano, semestre, ativo";
const RPC_ADMINISTRADOR_PENDENTES = "eh_professor_administrador";
const ROTA_JSON_PENDENTES = "materias-pendentes.json";
const MENSAGEM_JSON_PENDENTES = "Não foi possível carregar materias-pendentes.json";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroPendentes(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Lê o materias-pendentes.json (arquivo estático do site, gerado pelo script do projeto).
 * @param {Function} buscar - fetch injetado.
 * @returns {Promise<{gerado_em: string, materias: Object[]}>} Conteúdo do JSON.
 * @throws {Error} Se o arquivo não puder ser lido.
 */
async function lerJsonPendentes(buscar) {
  const resposta = await buscar(ROTA_JSON_PENDENTES, { cache: "no-store" });
  if (!resposta.ok) throw new Error(MENSAGEM_JSON_PENDENTES);
  return resposta.json();
}

/**
 * Cria o repositório da página, com o cliente do Supabase e o fetch injetados.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @param {Function} [buscar] - fetch (padrão: o do navegador).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioMateriasPendentes(cliente, buscar = window.fetch.bind(window)) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /** @returns {Promise<boolean>} Se o usuário logado é o Professor Administrador. */
    async ehAdministrador() {
      return dadosOuErroPendentes(await cliente.rpc(RPC_ADMINISTRADOR_PENDENTES)) === true;
    },

    /** @returns {Promise<Object[]>} Cursos pelo nome (id, nome, ano, semestre, ativo). */
    async listarCursos() {
      return dadosOuErroPendentes(await cliente.from(TABELA_CURSO_PENDENTES)
        .select(COLUNAS_CURSO_PENDENTES).order("nome_completo"));
    },

    /** @returns {Promise<{gerado_em: string, materias: Object[]}>} Pendências do JSON. */
    async carregarPendencias() {
      return lerJsonPendentes(buscar);
    },
  };
}
