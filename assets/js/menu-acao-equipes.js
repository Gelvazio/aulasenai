// Ação "equipes" do menu das atividades (js/menu.js): item { rotulo, acao: 'equipes', papeis }
// no MENU-ATIVIDADES.js da matéria. Carrega sob demanda o que o modal precisa (supabase-js,
// js/supabase.js, popup, repositório e modal), descobre a pasta da matéria e abre o modal de
// equipes por turma + matéria (assets/js/equipes-modal.js).

const RAIZ_ACAO_EQUIPES = document.currentScript ? document.currentScript.src : location.href;
const MARCADOR_PASTA_MATERIAIS = '/MATERIAIS/';
const CAMINHO_CSS_EQUIPES = '../css/equipes-modal.css';
const DEPENDENCIAS_EQUIPES = [
  {
    estaCarregada: () => Boolean(window.supabase?.createClient),
    endereco: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  },
  {
    estaCarregada: () => typeof obterClienteSupabase === 'function',
    endereco: '../../js/supabase.js',
  },
  { estaCarregada: () => typeof confirmarPopup === 'function', endereco: 'popup.js' },
  {
    estaCarregada: () => typeof criarRepositorioEquipes === 'function',
    endereco: 'equipes-repositorio.js',
  },
  { estaCarregada: () => typeof abrirModalEquipes === 'function', endereco: 'equipes-modal.js' },
];

/**
 * Carrega um script (uma vez) e espera ele terminar.
 * @param {string} endereco - URL absoluta do script.
 * @returns {Promise<void>} Resolve quando o script carregar.
 */
function carregarScriptEquipes(endereco) {
  return new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = endereco;
    script.onload = () => resolver();
    script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + endereco));
    document.head.appendChild(script);
  });
}

/**
 * Inclui o CSS do modal de equipes na página (uma única vez).
 * @returns {void}
 */
function garantirEstiloEquipes() {
  if (document.querySelector('link[data-equipes]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(CAMINHO_CSS_EQUIPES, RAIZ_ACAO_EQUIPES).href;
  link.dataset.equipes = 'sim';
  document.head.appendChild(link);
}

/**
 * Carrega, em ordem, as dependências que a página ainda não tem.
 * @returns {Promise<void>}
 */
async function garantirDependenciasEquipes() {
  garantirEstiloEquipes();
  for (const dependencia of DEPENDENCIAS_EQUIPES) {
    if (dependencia.estaCarregada()) continue;
    await carregarScriptEquipes(new URL(dependencia.endereco, RAIZ_ACAO_EQUIPES).href);
  }
}

/**
 * Caminho da pasta de atividades a partir de /MATERIAIS/ (igual ao atividade.pagina do banco).
 * @param {string} urlBase - URL do MENU-ATIVIDADES.js da matéria.
 * @returns {string} Ex.: /MATERIAIS/CURSO/MATERIA/ATIVIDADES/
 */
function obterPrefixoPastaEquipes(urlBase) {
  const caminho = decodeURIComponent(new URL('.', urlBase).pathname);
  const inicio = caminho.indexOf(MARCADOR_PASTA_MATERIAIS);
  if (inicio < 0) return caminho;

  return caminho.slice(inicio);
}

/**
 * Abre o modal de equipes da matéria desta pasta.
 * @param {{item: Object, urlBase: string}} contexto - Item do menu e URL do arquivo de dados.
 * @returns {Promise<void>}
 */
async function executarAcaoEquipes(contexto) {
  await garantirDependenciasEquipes();
  const cliente = obterClienteSupabase();
  abrirModalEquipes({
    repositorio: criarRepositorioEquipes(cliente),
    prefixoPasta: obterPrefixoPastaEquipes(contexto.urlBase),
    papeis: Array.isArray(contexto.item.papeis) ? contexto.item.papeis : [],
  });
}

window.ACOES_MENU_ATIVIDADES = window.ACOES_MENU_ATIVIDADES || {};
window.ACOES_MENU_ATIVIDADES.equipes = executarAcaoEquipes;
