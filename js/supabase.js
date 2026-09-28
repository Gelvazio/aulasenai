// ── Configuração e Funções Supabase ───────────────────
// Cliente supabase-js compartilhado (Auth) + funções REST que enviam o JWT do usuário logado.
// Páginas que usam login carregam antes: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2

const SUPABASE = {
  URL: "https://hxlvonriearllcmfqeri.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NDU1OTQsImV4cCI6MjEwNDIyMTU5NH0.v20Rm-ejMMnCNpxUkz5Ege4NaAPGf_nIv5dNkiBtZAk",
};

let clienteSupabase = null;

/**
 * Devolve o cliente supabase-js compartilhado, criando-o na primeira chamada.
 * @returns {Object|null} Cliente do Supabase, ou null se a biblioteca não foi carregada na página.
 */
function obterClienteSupabase() {
  if (clienteSupabase) return clienteSupabase;
  const bibliotecaCarregada = Boolean(window.supabase?.createClient);
  if (!bibliotecaCarregada) return null;

  clienteSupabase = window.supabase.createClient(SUPABASE.URL, SUPABASE.KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return clienteSupabase;
}

/**
 * Lê o token de acesso (JWT) da sessão atual do Supabase Auth.
 * @returns {Promise<string|null>} Token do usuário logado ou null sem sessão.
 */
async function obterTokenUsuario() {
  const cliente = obterClienteSupabase();
  if (!cliente) return null;
  const { data } = await cliente.auth.getSession();
  return data?.session?.access_token || null;
}

/**
 * Monta os headers das chamadas REST: JWT do usuário logado (RLS com auth.uid()) ou,
 * sem sessão, a chave anônima (apenas operações públicas).
 * @returns {Promise<Object>} Headers da requisição.
 */
async function sbH() {
  const token = await obterTokenUsuario();
  return {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + (token || SUPABASE.KEY),
    "Content-Type": "application/json",
  };
}

/**
 * Lista registros de uma tabela.
 * @param {string} table - Nome da tabela.
 * @param {string} [qs] - Query string do PostgREST (select, filtros, order).
 * @returns {Promise<Object[]>} Registros encontrados.
 * @throws {Error} Se a API responder com erro.
 */
async function sbGet(table, qs = "") {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    headers: await sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/**
 * Cria um registro.
 * @param {string} table - Nome da tabela.
 * @param {Object} body - Campos do registro.
 * @returns {Promise<Object[]>} Registro criado.
 * @throws {Error} Se a API responder com erro.
 */
async function sbPost(table, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...(await sbH()), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/**
 * Atualiza registros pela chave informada.
 * @param {string} table - Nome da tabela.
 * @param {string} pk - Coluna usada no filtro.
 * @param {string|number} pkVal - Valor da coluna.
 * @param {Object} body - Campos a atualizar.
 * @returns {Promise<Object[]>} Registros atualizados.
 * @throws {Error} Se a API responder com erro.
 */
async function sbPatch(table, pk, pkVal, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${pk}=eq.${pkVal}`, {
    method: "PATCH",
    headers: { ...(await sbH()), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/**
 * Remove registros que atendem ao filtro.
 * @param {string} table - Nome da tabela.
 * @param {string} qs - Filtro do PostgREST (ex.: "id=eq.5").
 * @throws {Error} Se a API responder com erro.
 */
async function sbDelete(table, qs) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    method: "DELETE",
    headers: await sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
}
