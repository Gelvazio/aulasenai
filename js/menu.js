/**
 * Menu de navegação aplicado no topo do <header> das páginas de atividades.
 *
 * Os itens vêm do arquivo de dados MENU-ATIVIDADES.js da pasta ATIVIDADES/, carregado antes
 * deste script: window.MENU_ATIVIDADES = { titulo, itens: [{ rotulo, link } |
 * { rotulo, subitens: [...] }] }. Os links são relativos à pasta do arquivo de dados, por isso
 * o menu funciona em qualquer subpasta, inclusive abrindo a página por file://.
 */

const NOME_ARQUIVO_DADOS = 'MENU-ATIVIDADES.js';
const CLASSE_MENU = 'menu-atividades';
const CLASSE_ABERTO = 'menu-atividades--aberto';
const CLASSE_SUBMENU_ABERTO = 'menu-atividades__grupo--aberto';
const CLASSE_LINK_ATUAL = 'menu-atividades__link--atual';
const ROTULO_ALTERNAR = '☰ Menu';
const TECLA_FECHAR = 'Escape';

/**
 * Lê os dados do menu definidos pela página.
 * @returns {{titulo: string, itens: Array<Object>}|null} Dados do menu ou null se ausentes.
 */
function lerDadosMenu() {
  const dados = window.MENU_ATIVIDADES;
  const temItens = Boolean(dados) && Array.isArray(dados.itens);
  if (!temItens) return null;

  return dados;
}

/**
 * Descobre a URL do arquivo de dados, base para resolver os links relativos.
 * @returns {string|null} URL absoluta do MENU-ATIVIDADES.js ou null se não encontrado.
 */
function obterUrlBase() {
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const scriptDados = scripts.find((script) => script.src.endsWith(NOME_ARQUIVO_DADOS));
  if (!scriptDados) return null;

  return scriptDados.src;
}

/**
 * Normaliza o caminho de uma URL para comparação (sem âncora, sem busca, decodificado).
 * @param {string} endereco - URL absoluta.
 * @returns {string} Caminho decodificado.
 */
function normalizarCaminho(endereco) {
  return decodeURIComponent(new URL(endereco).pathname);
}

/**
 * Cria o link de um item simples, destacando a página atual.
 * @param {{rotulo: string, link: string}} item - Item do menu.
 * @param {string} urlBase - URL do arquivo de dados.
 * @returns {HTMLAnchorElement} Link montado.
 */
function criarLink(item, urlBase) {
  const link = document.createElement('a');
  link.className = 'menu-atividades__link';
  link.textContent = item.rotulo;
  link.href = new URL(item.link, urlBase).href;

  const ehPaginaAtual = normalizarCaminho(link.href) === normalizarCaminho(location.href);
  if (ehPaginaAtual) {
    link.classList.add(CLASSE_LINK_ATUAL);
    link.setAttribute('aria-current', 'page');
  }
  return link;
}

/**
 * Cria o botão que abre e fecha o submenu de um grupo.
 * @param {string} rotulo - Texto do grupo.
 * @returns {HTMLButtonElement} Botão do grupo.
 */
function criarBotaoGrupo(rotulo) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'menu-atividades__grupo-botao';
  botao.textContent = rotulo;
  botao.setAttribute('aria-expanded', 'false');
  botao.addEventListener('click', alternarSubmenu);
  return botao;
}

/**
 * Cria um grupo com submenu; o grupo fica marcado se contiver a página atual.
 * @param {{rotulo: string, subitens: Array<Object>}} item - Item com subitens.
 * @param {string} urlBase - URL do arquivo de dados.
 * @returns {HTMLLIElement} Item de lista com botão e submenu.
 */
function criarGrupo(item, urlBase) {
  const grupo = document.createElement('li');
  grupo.className = 'menu-atividades__item menu-atividades__grupo';

  const submenu = document.createElement('ul');
  submenu.className = 'menu-atividades__submenu';
  item.subitens.forEach((subitem) => {
    const linha = document.createElement('li');
    linha.appendChild(criarLink(subitem, urlBase));
    submenu.appendChild(linha);
  });

  const botao = criarBotaoGrupo(item.rotulo);
  const contemPaginaAtual = Boolean(submenu.querySelector(`.${CLASSE_LINK_ATUAL}`));
  if (contemPaginaAtual) botao.classList.add('menu-atividades__grupo-botao--atual');

  grupo.append(botao, submenu);
  return grupo;
}

/**
 * Cria um item da barra: grupo (com subitens) ou link direto.
 * @param {Object} item - Item do menu.
 * @param {string} urlBase - URL do arquivo de dados.
 * @returns {HTMLLIElement} Item de lista.
 */
function criarItem(item, urlBase) {
  if (Array.isArray(item.subitens)) return criarGrupo(item, urlBase);

  const linha = document.createElement('li');
  linha.className = 'menu-atividades__item';
  linha.appendChild(criarLink(item, urlBase));
  return linha;
}

/**
 * Cria o botão ☰ que mostra a lista em telas pequenas.
 * @param {HTMLElement} menu - Elemento nav do menu.
 * @returns {HTMLButtonElement} Botão de alternar.
 */
function criarBotaoAlternar(menu) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'menu-atividades__alternar';
  botao.textContent = ROTULO_ALTERNAR;
  botao.setAttribute('aria-expanded', 'false');
  botao.addEventListener('click', () => {
    const estaAberto = menu.classList.toggle(CLASSE_ABERTO);
    botao.setAttribute('aria-expanded', String(estaAberto));
  });
  return botao;
}

/**
 * Monta o elemento nav completo do menu.
 * @param {{titulo: string, itens: Array<Object>}} dados - Dados do menu.
 * @param {string} urlBase - URL do arquivo de dados.
 * @returns {HTMLElement} Elemento nav.
 */
function montarMenu(dados, urlBase) {
  const menu = document.createElement('nav');
  menu.className = CLASSE_MENU;
  menu.setAttribute('aria-label', 'Menu das atividades');

  const titulo = document.createElement('span');
  titulo.className = 'menu-atividades__titulo';
  titulo.textContent = dados.titulo || '';

  const lista = document.createElement('ul');
  lista.className = 'menu-atividades__lista';
  dados.itens.forEach((item) => lista.appendChild(criarItem(item, urlBase)));

  menu.append(titulo, criarBotaoAlternar(menu), lista);
  return menu;
}

/**
 * Fecha todos os submenus abertos, exceto o grupo informado.
 * @param {HTMLElement|null} grupoMantido - Grupo que deve continuar aberto.
 * @returns {void}
 */
function fecharSubmenus(grupoMantido) {
  document.querySelectorAll(`.${CLASSE_SUBMENU_ABERTO}`).forEach((grupo) => {
    if (grupo === grupoMantido) return;
    grupo.classList.remove(CLASSE_SUBMENU_ABERTO);
    grupo.querySelector('.menu-atividades__grupo-botao').setAttribute('aria-expanded', 'false');
  });
}

/**
 * Abre ou fecha o submenu do grupo clicado (clique funciona também no toque).
 * @param {MouseEvent} evento - Clique no botão do grupo.
 * @returns {void}
 */
function alternarSubmenu(evento) {
  const botao = evento.currentTarget;
  const grupo = botao.parentElement;
  fecharSubmenus(grupo);

  const estaAberto = grupo.classList.toggle(CLASSE_SUBMENU_ABERTO);
  botao.setAttribute('aria-expanded', String(estaAberto));
}

/**
 * Fecha os submenus ao clicar fora do menu.
 * @param {MouseEvent} evento - Clique na página.
 * @returns {void}
 */
function tratarCliqueFora(evento) {
  const clicouNoMenu = Boolean(evento.target.closest(`.${CLASSE_MENU}`));
  if (clicouNoMenu) return;

  fecharSubmenus(null);
}

/**
 * Fecha os submenus ao pressionar Esc.
 * @param {KeyboardEvent} evento - Tecla pressionada.
 * @returns {void}
 */
function tratarTecla(evento) {
  if (evento.key !== TECLA_FECHAR) return;

  fecharSubmenus(null);
}

/**
 * Insere o menu no topo do primeiro <header> da página.
 * @returns {void}
 */
function inicializarMenu() {
  const dados = lerDadosMenu();
  const urlBase = obterUrlBase();
  const cabecalho = document.querySelector('header');
  const podeMontar = Boolean(dados && urlBase && cabecalho);
  if (!podeMontar) return;

  cabecalho.prepend(montarMenu(dados, urlBase));
  document.addEventListener('click', tratarCliqueFora);
  document.addEventListener('keydown', tratarTecla);
}

inicializarMenu();
