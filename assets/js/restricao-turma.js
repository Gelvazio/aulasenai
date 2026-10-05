// Restrição de página por turma. Genérico: vale para qualquer página.
// Uso: <body class="restrito-turma" data-turmas-permitidas="135081,135080"> + este script (defer).
// O conteúdo (<main> e <footer>) fica escondido até a conferência:
//   - aluno: liberado só se tiver vínculo, na turmaaluno, com uma das turmas permitidas;
//   - professor: sempre liberado, com um aviso de para quais turmas a página está visível;
//   - sem login: pede para entrar.
// ⚠️ É uma restrição de exibição (a página é estática e publicada); nunca colocar nela
// gabarito ou dado sensível. Depende de supabase-js + js/supabase.js (carregados se faltarem).

const RAIZ_RESTRICAO_TURMA = document.currentScript ? document.currentScript.src : location.href;
const URL_SUPABASE_RESTRICAO = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
const ROTA_SUPABASE_RESTRICAO = '../../js/supabase.js';
const ROTA_CSS_RESTRICAO = '../css/restricao-turma.css';
const CLASSE_LIBERADO_TURMA = 'restrito-turma--liberado';
const PERFIL_PROFESSOR_RESTRICAO = 'PROFESSOR';
const MSG_RESTRICAO_SEM_LOGIN = '🔒 Entre no sistema para ver esta atividade.';
const MSG_RESTRICAO_OUTRA_TURMA = '🔒 Esta atividade está disponível só para a turma ';
const MSG_RESTRICAO_ERRO = '⚠️ Não foi possível conferir a sua turma. Recarregue a página ' +
  'ou avise o professor.';
const MSG_RESTRICAO_PROFESSOR = '👩‍🏫 Visível para os alunos somente da(s) turma(s): ';

/**
 * Carrega um script e espera ele terminar.
 * @param {string} endereco - URL do script.
 * @returns {Promise<void>}
 */
function carregarScriptRestricao(endereco) {
  return new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = endereco;
    script.onload = () => resolver();
    script.onerror = () => rejeitar(new Error('Falha ao carregar ' + endereco));
    document.head.appendChild(script);
  });
}

/**
 * Inclui o CSS da restrição (uma vez).
 * @returns {void}
 */
function garantirEstiloRestricao() {
  if (document.querySelector('link[data-restricao-turma]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(ROTA_CSS_RESTRICAO, RAIZ_RESTRICAO_TURMA).href;
  link.dataset.restricaoTurma = 'sim';
  document.head.appendChild(link);
}

/**
 * Garante o cliente do Supabase, carregando as bibliotecas que faltarem.
 * @returns {Promise<Object>} Cliente do Supabase.
 */
async function obterClienteRestricao() {
  if (!window.supabase?.createClient) await carregarScriptRestricao(URL_SUPABASE_RESTRICAO);
  if (typeof obterClienteSupabase !== 'function') {
    await carregarScriptRestricao(new URL(ROTA_SUPABASE_RESTRICAO, RAIZ_RESTRICAO_TURMA).href);
  }
  return obterClienteSupabase();
}

/**
 * Lê as turmas permitidas do atributo data-turmas-permitidas do <body>.
 * @returns {string[]} Códigos das turmas.
 */
function lerTurmasPermitidas() {
  const valor = document.body.dataset.turmasPermitidas || '';
  return valor.split(',').map((codigo) => codigo.trim()).filter(Boolean);
}

/**
 * Mostra um aviso logo abaixo do <header> (ou no topo do container).
 * @param {string} texto - Mensagem.
 * @param {string} modificador - 'bloqueio' ou 'professor'.
 * @returns {void}
 */
function mostrarAvisoRestricao(texto, modificador) {
  const aviso = document.createElement('p');
  aviso.className = 'restricao-turma-aviso restricao-turma-aviso--' + modificador;
  aviso.textContent = texto;
  const cabecalho = document.querySelector('header');
  if (cabecalho) return void cabecalho.after(aviso);

  document.body.prepend(aviso);
}

/**
 * Libera o conteúdo da página.
 * @returns {void}
 */
function liberarConteudoTurma() {
  document.body.classList.add(CLASSE_LIBERADO_TURMA);
}

/**
 * Indica se o aluno tem vínculo com alguma das turmas (RLS: o aluno lê só os próprios vínculos).
 * @param {Object} cliente - Cliente do Supabase.
 * @param {{alunoId: string, turmas: string[]}} filtro - Aluno e turmas permitidas.
 * @returns {Promise<boolean>} true se pertence a uma das turmas.
 * @throws {Error} Erro do banco.
 */
async function alunoEstaNasTurmas(cliente, filtro) {
  const { data, error } = await cliente.from('turmaaluno').select('turma_codigo')
    .eq('aluno_id', filtro.alunoId).in('turma_codigo', filtro.turmas).limit(1);
  if (error) throw error;
  return data.length > 0;
}

/**
 * Confere o usuário logado e libera ou bloqueia o conteúdo.
 * @returns {Promise<void>}
 */
async function aplicarRestricaoTurma() {
  garantirEstiloRestricao();
  const turmas = lerTurmasPermitidas();
  if (!turmas.length) return liberarConteudoTurma();

  try {
    const cliente = await obterClienteRestricao();
    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    if (!usuario) return mostrarAvisoRestricao(MSG_RESTRICAO_SEM_LOGIN, 'bloqueio');

    const ehProfessor = usuario.app_metadata?.perfil === PERFIL_PROFESSOR_RESTRICAO;
    if (ehProfessor) {
      mostrarAvisoRestricao(MSG_RESTRICAO_PROFESSOR + turmas.join(', '), 'professor');
      return liberarConteudoTurma();
    }
    const pertence = await alunoEstaNasTurmas(cliente, { alunoId: usuario.id, turmas });
    if (pertence) return liberarConteudoTurma();

    mostrarAvisoRestricao(MSG_RESTRICAO_OUTRA_TURMA + turmas.join(', ') + '.', 'bloqueio');
  } catch (erro) {
    mostrarAvisoRestricao(MSG_RESTRICAO_ERRO, 'bloqueio');
  }
}

aplicarRestricaoTurma();
