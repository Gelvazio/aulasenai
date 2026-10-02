// ── Header do usuário logado ──────────────────────────
// Genérico: preenche o elemento <div id="header-usuario"></div> de qualquer página com o
// usuário logado (Supabase Auth) e o botão SAIR; sem sessão, mostra o botão ENTRAR.
// Sempre mostra o botão HOME (index.html da raiz) junto do usuário logado.
// Para o PROFESSOR, mostra também o menu USUARIOS / RELATORIOS (abre em nova aba).
// Uso na página: <script src=".../js/header-usuario.js" defer></script> + o div acima.
// Qualquer elemento com data-somente-perfil="PROFESSOR" (e hidden) só aparece para esse perfil.
// Os caminhos (CSS, supabase.js, login.html) são calculados a partir do próprio script,
// então a mesma chamada serve para qualquer pasta do projeto.

const ID_HEADER_USUARIO = "header-usuario";
const URL_SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
const ROTA_CSS_HEADER = "../assets/css/header-usuario.css";
const ROTA_SUPABASE_JS = "supabase.js";
const ROTA_LOGIN = "../login.html";
const ROTA_HOME = "../index.html";
const PERFIL_PROFESSOR_HEADER = "PROFESSOR";
const MENU_PROFESSOR_HEADER = [
  { rotulo: "USUARIOS", rota: "../scripts/criarUsuariosBancoDados.html" },
  { rotulo: "RELATORIOS", rota: "../relatorioAtividades.html" },
];
const PARAMETRO_VOLTAR_HEADER = "voltar";
const TEXTO_HOME = "HOME";
const TEXTO_ENTRAR = "ENTRAR";
const TEXTO_SAIR = "SAIR";
const TEXTO_SEM_LOGIN = "Você não está logado";
const ROTULO_PERFIL = { PROFESSOR: "Professor", ALUNO: "Aluno" };

const urlScriptHeader = document.currentScript?.src || "";

/**
 * Resolve um caminho relativo à pasta deste script (js/).
 * @param {string} rota - Caminho relativo a js/.
 * @returns {string} URL absoluta.
 */
function resolverRotaHeader(rota) {
  return new URL(rota, urlScriptHeader).href;
}

/**
 * Carrega um script e espera terminar.
 * @param {string} url - Endereço do script.
 * @returns {Promise<void>} Resolve quando o script carregou.
 */
function carregarScriptHeader(url) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = url;
    tag.onload = resolve;
    tag.onerror = () => reject(new Error("Falha ao carregar " + url));
    document.head.append(tag);
  });
}

/**
 * Inclui o CSS do header, uma única vez.
 */
function incluirCssHeader() {
  const url = resolverRotaHeader(ROTA_CSS_HEADER);
  if (document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.append(link);
}

/**
 * Garante o cliente do Supabase, reaproveitando o da página (js/supabase.js) quando existir.
 * @returns {Promise<Object|null>} Cliente do Supabase ou null se não foi possível criar.
 */
async function obterClienteHeader() {
  if (!window.supabase?.createClient) await carregarScriptHeader(URL_SUPABASE_CDN);
  if (typeof obterClienteSupabase !== "function") {
    await carregarScriptHeader(resolverRotaHeader(ROTA_SUPABASE_JS));
  }
  return obterClienteSupabase();
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} texto - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoHeader(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

/**
 * Monta o botão HOME, que leva à página inicial do site (index.html da raiz).
 * @returns {HTMLAnchorElement} Link com aparência de botão.
 */
function criarBotaoHome() {
  const botao = criarElementoHeader("a", "header-usuario__botao header-usuario__home", TEXTO_HOME);
  botao.href = resolverRotaHeader(ROTA_HOME);
  return botao;
}

/**
 * Monta o menu do professor (USUARIOS, RELATORIOS), aberto em nova aba.
 * @returns {HTMLElement} Elemento <nav> com os links.
 */
function criarMenuProfessor() {
  const menu = criarElementoHeader("nav", "header-usuario__menu", "");
  MENU_PROFESSOR_HEADER.forEach((item) => {
    const link = criarElementoHeader("a", "header-usuario__menu-link", item.rotulo);
    link.href = resolverRotaHeader(item.rota);
    link.target = "_blank";
    link.rel = "noopener";
    menu.append(link);
  });
  return menu;
}

/**
 * Monta o botão ENTRAR, que volta para a página atual depois do login.
 * @returns {HTMLAnchorElement} Link com aparência de botão.
 */
function criarBotaoEntrar() {
  const login = new URL(resolverRotaHeader(ROTA_LOGIN));
  login.searchParams.set(PARAMETRO_VOLTAR_HEADER, location.pathname + location.search);
  const botao = criarElementoHeader("a", "header-usuario__botao", TEXTO_ENTRAR);
  botao.href = login.href;
  return botao;
}

/**
 * Monta o botão SAIR, que encerra a sessão e sempre vai para a página de login.
 * @param {Object} cliente - Cliente do Supabase.
 * @returns {HTMLButtonElement} Botão de sair.
 */
function criarBotaoSair(cliente) {
  const botao = criarElementoHeader("button", "header-usuario__botao", TEXTO_SAIR);
  botao.type = "button";
  botao.addEventListener("click", async () => {
    await cliente.auth.signOut();
    location.assign(resolverRotaHeader(ROTA_LOGIN));
  });
  return botao;
}

/**
 * Monta o texto do usuário logado: nome (ou e-mail) e perfil.
 * @param {Object} usuario - Usuário do Supabase Auth.
 * @returns {string} Texto de exibição.
 */
function descreverUsuarioHeader(usuario) {
  const nome = usuario.user_metadata?.nome || usuario.email;
  const perfil = ROTULO_PERFIL[usuario.app_metadata?.perfil];
  return "👤 " + nome + (perfil ? " · " + perfil : "");
}

/**
 * Mostra os elementos marcados com data-somente-perfil="X" só quando o perfil logado for X.
 * @param {Object|null} usuario - Usuário logado ou null.
 */
function aplicarVisibilidadePorPerfil(usuario) {
  const perfil = usuario?.app_metadata?.perfil;
  document.querySelectorAll("[data-somente-perfil]").forEach((elemento) => {
    elemento.hidden = elemento.dataset.somentePerfil !== perfil;
  });
}

/**
 * Desenha o header no elemento da página.
 * @param {HTMLElement} destino - Elemento #header-usuario.
 * @param {Object|null} cliente - Cliente do Supabase (null se indisponível).
 * @param {Object|null} usuario - Usuário logado ou null.
 */
function desenharHeaderUsuario(destino, cliente, usuario) {
  const barra = criarElementoHeader("div", "header-usuario__barra", "");
  const texto = usuario ? descreverUsuarioHeader(usuario) : TEXTO_SEM_LOGIN;
  barra.append(criarBotaoHome());
  const ehProfessor = usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_HEADER;
  if (ehProfessor) barra.append(criarMenuProfessor());
  barra.append(criarElementoHeader("span", "header-usuario__nome", texto));
  barra.append(usuario ? criarBotaoSair(cliente) : criarBotaoEntrar());
  destino.replaceChildren(barra);
}

/**
 * Inicia o header: lê a sessão e desenha o usuário logado ou o botão ENTRAR.
 */
async function iniciarHeaderUsuario() {
  const destino = document.getElementById(ID_HEADER_USUARIO);
  if (!destino) return;

  // Sai do <body> para não herdar o padding/margem da página: a barra fica colada no topo.
  document.documentElement.insertBefore(destino, document.body);
  incluirCssHeader();
  try {
    const cliente = await obterClienteHeader();
    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user || null;
    desenharHeaderUsuario(destino, cliente, usuario);
    aplicarVisibilidadePorPerfil(usuario);
  } catch (erro) {
    desenharHeaderUsuario(destino, null, null);
    aplicarVisibilidadePorPerfil(null);
  }
}

// Espera o "load" para que os scripts da própria página (js/supabase.js) já tenham rodado.
window.addEventListener("load", iniciarHeaderUsuario);
