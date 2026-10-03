// ── Modal REGRAS (CLAUDE.md) ──────────────────────────
// Abre um modal com as regras do projeto (CLAUDE.md da raiz) renderizadas em HTML, com índice
// das seções. Carregado sob demanda pelo js/header-usuario.js (menu REGRAS, só administrador).
// Uso: await abrirModalRegras(urlClaudeMd).

const URL_MARKED_REGRAS = "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js";
const URL_DOMPURIFY_REGRAS = "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js";
const ROTA_CSS_REGRAS = "../css/regras-modal.css";
const ID_MODAL_REGRAS = "modal-regras";
const PREFIXO_SECAO_REGRAS = "regra-secao-";
const TITULO_MODAL_REGRAS = "📜 Regras do projeto (CLAUDE.md)";
const TEXTO_CARREGANDO_REGRAS = "Carregando regras…";
const TEXTO_ERRO_REGRAS = "Não foi possível carregar o CLAUDE.md.";
const TEXTO_INDICE_REGRAS = "Seções";
const TEXTO_FILTRO_REGRAS = "Filtrar seções…";

const urlScriptRegras = document.currentScript?.src || "";

/**
 * Carrega um script externo uma única vez.
 * @param {string} url - Endereço do script.
 * @returns {Promise<void>} Resolve quando o script carregou.
 */
function carregarScriptRegras(url) {
  if (document.querySelector(`script[src="${url}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = url;
    tag.onload = resolve;
    tag.onerror = () => reject(new Error("Falha ao carregar " + url));
    document.head.append(tag);
  });
}

/**
 * Inclui o CSS do modal, uma única vez.
 */
function incluirCssRegras() {
  const url = new URL(ROTA_CSS_REGRAS, urlScriptRegras).href;
  if (document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.append(link);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoRegras(tag, classe, texto = "") {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

/**
 * Monta a estrutura vazia do modal (<dialog>), com cabeçalho, índice e conteúdo.
 * @returns {HTMLDialogElement} Modal pronto para receber as regras.
 */
function criarEstruturaModalRegras() {
  const modal = criarElementoRegras("dialog", "regras-modal");
  modal.id = ID_MODAL_REGRAS;
  modal.setAttribute("aria-label", TITULO_MODAL_REGRAS);

  const topo = criarElementoRegras("header", "regras-modal__topo");
  const fechar = criarElementoRegras("button", "regras-modal__fechar", "✕");
  fechar.type = "button";
  fechar.setAttribute("aria-label", "Fechar");
  fechar.addEventListener("click", () => modal.close());
  topo.append(criarElementoRegras("h2", "regras-modal__titulo", TITULO_MODAL_REGRAS), fechar);

  const corpo = criarElementoRegras("div", "regras-modal__corpo");
  const indice = criarElementoRegras("nav", "regras-modal__indice");
  const conteudo = criarElementoRegras("article", "regras-modal__conteudo",
    TEXTO_CARREGANDO_REGRAS);
  corpo.append(indice, conteudo);
  modal.append(topo, corpo);

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
  document.body.append(modal);
  return modal;
}

/**
 * Busca o CLAUDE.md e devolve o HTML seguro (Markdown → HTML → DOMPurify).
 * @param {string} urlClaudeMd - Endereço do CLAUDE.md.
 * @returns {Promise<string>} HTML sanitizado.
 * @throws {Error} Se o arquivo não puder ser lido.
 */
async function obterHtmlRegras(urlClaudeMd) {
  await carregarScriptRegras(URL_MARKED_REGRAS);
  await carregarScriptRegras(URL_DOMPURIFY_REGRAS);
  const resposta = await fetch(urlClaudeMd, { cache: "no-store" });
  if (!resposta.ok) throw new Error(TEXTO_ERRO_REGRAS);
  const markdown = await resposta.text();
  return window.DOMPurify.sanitize(window.marked.parse(markdown));
}

/**
 * Cria um item do índice que rola o conteúdo até a seção.
 * @param {HTMLElement} titulo - Título (h2) da seção.
 * @param {HTMLElement} conteudo - Área de conteúdo do modal.
 * @returns {HTMLButtonElement} Botão do índice.
 */
function criarItemIndiceRegras(titulo, conteudo) {
  const item = criarElementoRegras("button", "regras-modal__item", titulo.textContent);
  item.type = "button";
  item.addEventListener("click", () => {
    conteudo.scrollTo({ top: titulo.offsetTop - conteudo.offsetTop, behavior: "smooth" });
  });
  return item;
}

/**
 * Liga o campo de filtro: mostra só os itens do índice que contêm o texto digitado.
 * @param {HTMLInputElement} filtro - Campo de filtro.
 * @param {HTMLElement[]} itens - Itens do índice.
 */
function ligarFiltroIndiceRegras(filtro, itens) {
  filtro.addEventListener("input", () => {
    const termo = filtro.value.trim().toLowerCase();
    itens.forEach((item) => {
      item.hidden = Boolean(termo) && !item.textContent.toLowerCase().includes(termo);
    });
  });
}

/**
 * Monta o índice a partir dos títulos h2 do conteúdo renderizado.
 * @param {HTMLElement} indice - Área do índice.
 * @param {HTMLElement} conteudo - Área de conteúdo com as regras.
 */
function montarIndiceRegras(indice, conteudo) {
  const titulos = [...conteudo.querySelectorAll("h2")];
  titulos.forEach((titulo, posicao) => { titulo.id = PREFIXO_SECAO_REGRAS + posicao; });
  const itens = titulos.map((titulo) => criarItemIndiceRegras(titulo, conteudo));

  const filtro = criarElementoRegras("input", "regras-modal__filtro");
  filtro.type = "search";
  filtro.placeholder = TEXTO_FILTRO_REGRAS;
  ligarFiltroIndiceRegras(filtro, itens);

  const rotulo = criarElementoRegras("strong", "regras-modal__indice-titulo",
    TEXTO_INDICE_REGRAS + " (" + titulos.length + ")");
  indice.replaceChildren(rotulo, filtro, ...itens);
}

/**
 * Preenche o modal com as regras; em caso de falha, mostra a mensagem de erro.
 * @param {HTMLDialogElement} modal - Modal aberto.
 * @param {string} urlClaudeMd - Endereço do CLAUDE.md.
 */
async function preencherModalRegras(modal, urlClaudeMd) {
  const indice = modal.querySelector(".regras-modal__indice");
  const conteudo = modal.querySelector(".regras-modal__conteudo");
  try {
    conteudo.innerHTML = await obterHtmlRegras(urlClaudeMd);
    conteudo.querySelectorAll("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener";
    });
    montarIndiceRegras(indice, conteudo);
  } catch (erro) {
    console.error("Erro ao carregar as regras:", erro);
    conteudo.textContent = TEXTO_ERRO_REGRAS;
  }
}

/**
 * Abre o modal das regras; na primeira vez, cria a estrutura e carrega o CLAUDE.md.
 * @param {string} urlClaudeMd - Endereço do CLAUDE.md da raiz do projeto.
 */
async function abrirModalRegras(urlClaudeMd) {
  incluirCssRegras();
  const existente = document.getElementById(ID_MODAL_REGRAS);
  if (existente) {
    existente.showModal();
    return;
  }

  const modal = criarEstruturaModalRegras();
  modal.showModal();
  await preencherModalRegras(modal, urlClaudeMd);
}

window.abrirModalRegras = abrirModalRegras;
