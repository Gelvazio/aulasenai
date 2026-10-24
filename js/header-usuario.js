// ── Header do usuário logado ──────────────────────────
// Genérico: preenche o elemento <div id="header-usuario"></div> de qualquer página com o
// usuário logado (Supabase Auth) e o botão SAIR; sem sessão, mostra o botão ENTRAR.
// Sempre mostra o botão HOME (index.html da raiz) junto do usuário logado.
// Só para o Professor Administrador (confirmado pelo banco), mostra o menu USUARIOS / RELATORIOS /
// ALUNOS / CORREÇÃO / TURMAS / CURSO / PENDÊNCIAS e REGRAS (nova aba; REGRAS = visualizador
// .claude/rules/index.html, 2026-10-13). Os demais professores não veem esses menus.
// Esse menu sai em 2 linhas de propósito (#358, 2026-10-24): a primeira metade dos itens em cima
// e a segunda metade embaixo (cada metade num .header-usuario__menu-linha), com o botão EQUIPES
// dentro da segunda linha, antes do link REGRAS.
// Guarda de sessão (2026-10-09): em toda página, menos o login.html da raiz, sem login
// nada aparece (modal "Aguarde, carregando..." até confirmar) e vai para o login.html.
// Uso na página: <script src=".../js/header-usuario.js"></script> como PRIMEIRO script do <head>
// (sem defer) + o div acima. A tag é posta por assets/gerador-menu/tags_header.py.
// Em páginas de matéria (/MATERIAIS/<CURSO>/<MATÉRIA>/), o botão 👥 EQUIPES aparece só para o
// professor e para o aluno líder (usuario.lider = 1), que cadastram e alteram as equipes.
// Qualquer elemento com data-somente-perfil="PROFESSOR" (e hidden) só aparece para esse perfil.
// O header também carrega a camada do celular (assets/css/celular.css, #265) em toda página,
// depois do CSS dela (letras maiores, toque fácil, uma coluna; só até 768 px).
// Os caminhos (CSS, supabase.js, login.html) são calculados a partir do próprio script,
// então a mesma chamada serve para qualquer pasta do projeto.

const ID_HEADER_USUARIO = "header-usuario";
const URL_SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
const ROTA_CSS_HEADER = "../assets/css/header-usuario.css";
// Camada do celular (#265): entra depois do CSS da página para vencer na cascata (até 768 px).
const ROTA_CSS_CELULAR = "../assets/css/celular.css";
const ROTA_SUPABASE_JS = "supabase.js";
const ROTA_LOGIN = "../login.html";
const ROTA_HOME = "../index.html";
const PERFIL_PROFESSOR_HEADER = "PROFESSOR";
// Só para o Professor Administrador (confirmado pelo banco: RPC eh_professor_administrador).
const MENU_ADMINISTRADOR_HEADER = [
  { rotulo: "USUARIOS", rota: "../scripts/criarUsuariosBancoDados.html" },
  { rotulo: "RELATORIOS", rota: "../relatorioAtividades.html" },
  { rotulo: "ALUNOS", rota: "../alunos.html" },
  { rotulo: "CORREÇÃO", rota: "../correcao-discursiva.html" },
  { rotulo: "TURMAS", rota: "../turmas.html" },
  { rotulo: "CURSO", rota: "../cursos.html" },
  { rotulo: "PENDÊNCIAS", rota: "../MATERIAIS/AGENDA_COLABORADOR/pendencias.html" },
  // Telemetria das matérias por curso/ano/semestre (o que falta em cada uma, #357).
  { rotulo: "Matérias Pendentes", rota: "../materias-pendentes.html" },
  // Só visualizador das regras e do quadro (scripts/regras/gerar_visualizador_regras.py).
  { rotulo: "Regras", rota: "../.claude/rules/index.html" },
];
// Menu em 2 linhas (#358): o botão EQUIPES entra logo antes deste item do menu.
const ROTULO_REGRAS_HEADER = "Regras";
const CLASSE_LINHA_MENU_HEADER = "header-usuario__menu-linha";
const TOTAL_LINHAS_MENU_HEADER = 2;
const RPC_ADMINISTRADOR_HEADER = "eh_professor_administrador";
const PARAMETRO_VOLTAR_HEADER = "voltar";
const TEXTO_HOME = "🏠 Início";
const TEXTO_SAIR = "🚪 Sair";
// Sem login (2026-10-09): card verde piscando, centralizado na barra, que leva ao login.
const ROTA_CSS_ENTRAR_DESTAQUE = "../assets/css/header-entrar-destaque.css";
const TEXTO_ENTRAR_DESTAQUE_TITULO = "VOCÊ NÃO ESTÁ LOGADO!";
const TEXTO_ENTRAR_DESTAQUE_ACAO = "CLIQUE AQUI PARA ENTRAR";
const ICONE_ENTRAR_DESTAQUE_INICIO = "🔒";
const ICONE_ENTRAR_DESTAQUE_FIM = "👉🔑";
// Se a página tiver este espaço (ex.: index.html), o card vai para ele em vez da barra.
const ID_ENTRAR_DESTAQUE_PAGINA = "entrar-destaque";
const ROTULO_PERFIL = { PROFESSOR: "Professor", ALUNO: "Aluno" };
// Botão EQUIPES (global, 2026-10-08): professor e aluno líder, em toda página dentro de
// uma matéria (/MATERIAIS/<CURSO>/<MATÉRIA>/...); abre o modal de equipes daquela matéria.
const TEXTO_EQUIPES_HEADER = "👥 EQUIPES";
const ROTA_ACAO_EQUIPES_JS = "../assets/js/menu-acao-equipes.js";
const MARCADOR_MATERIAIS_HEADER = "/MATERIAIS/";
// Id da atividade no título (2026-10-24): script carregado só em página de atividade.
const ROTA_ID_ATIVIDADE_JS = "../assets/js/atividade-id-titulo.js";
const SELETOR_TITULO_ATIVIDADE_HEADER = ".container > header h1";
const PASTAS_SEM_MATERIA_HEADER = ["MATERIAS-GERAIS", "AGENDA_COLABORADOR"];
const PAPEIS_EQUIPES_HEADER = ["Líder (coordenador)", "Integrante"];
const TABELA_USUARIO_HEADER = "usuario";
// Guarda de sessão (2026-10-09): sem login nada da página aparece e vai para o index.html.
// Páginas públicas (relativas à raiz do site): só o login.html (o index.html exige login desde
// 2026-10-23; sem sessão, toda página protegida vai para o login.html?voltar=...).
const PAGINAS_PUBLICAS_HEADER = ["login.html", "login"];
const ROTA_RAIZ_HEADER = "../";
const ROTA_GIF_CARREGANDO = "../assets/img/carregando.gif";
const TEXTO_CARREGANDO = "Aguarde, carregando...";
const ID_MODAL_CARREGANDO = "sessao-carregando";
const CHAVE_SESSAO_SUPABASE = "sb-hxlvonriearllcmfqeri-auth-token";
const MILISSEGUNDOS_POR_SEGUNDO = 1000;

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
 * Inclui um CSS do header, uma única vez.
 * @param {string} [rota] - Caminho relativo a js/ (padrão: o CSS do header).
 */
function incluirCssHeader(rota = ROTA_CSS_HEADER) {
  const url = resolverRotaHeader(rota);
  if (document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.append(link);
}

/**
 * Inclui a camada do celular (#265) e a deixa por último no <head>, depois do CSS da página
 * e dos CSS do header (que podem ter entrado depois), para vencer na cascata.
 */
function incluirCssCelularPorUltimo() {
  incluirCssHeader(ROTA_CSS_CELULAR);
  const link = document.querySelector(`link[href="${resolverRotaHeader(ROTA_CSS_CELULAR)}"]`);
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
 * Monta o menu do professor, vazio: os itens só entram se o banco confirmar o administrador.
 * @returns {HTMLElement} Elemento <nav> do menu.
 */
function criarMenuProfessor() {
  return criarElementoHeader("nav", "header-usuario__menu", "");
}

/**
 * Cria um link do menu do header, aberto em nova aba.
 * @param {{rotulo: string, rota: string}} item - Rótulo e rota relativa a js/.
 * @returns {HTMLAnchorElement} Link do menu.
 */
function criarLinkMenuHeader(item) {
  const link = criarElementoHeader("a", "header-usuario__menu-link", item.rotulo);
  link.href = resolverRotaHeader(item.rota);
  link.target = "_blank";
  link.rel = "noopener";
  return link;
}

/**
 * Cria uma linha do menu do header com os elementos recebidos.
 * @param {HTMLElement[]} itens - Links e botões que ficam na linha.
 * @returns {HTMLDivElement} Linha do menu.
 */
function criarLinhaMenuHeader(itens) {
  const linha = criarElementoHeader("div", CLASSE_LINHA_MENU_HEADER, "");
  linha.append(...itens);
  return linha;
}

/**
 * Divide os itens ao meio e põe cada metade numa linha própria do menu (metade em cima,
 * metade embaixo). Sobrando item, a primeira linha fica com o extra.
 * @param {HTMLElement} menu - Elemento <nav> do menu.
 * @param {HTMLElement[]} itens - Links e botões do menu, na ordem de exibição.
 */
function montarLinhasMenuHeader(menu, itens) {
  if (!itens.length) return;

  const quantidadePrimeiraLinha = Math.ceil(itens.length / TOTAL_LINHAS_MENU_HEADER);
  const primeiraLinha = itens.slice(0, quantidadePrimeiraLinha);
  const segundaLinha = itens.slice(quantidadePrimeiraLinha);
  menu.append(criarLinhaMenuHeader(primeiraLinha));
  if (segundaLinha.length) menu.append(criarLinhaMenuHeader(segundaLinha));
}

/**
 * Descobre a pasta da matéria da página atual (/MATERIAIS/<CURSO>/<MATÉRIA>/).
 * @returns {string|null} URL absoluta da pasta da matéria ou null fora de uma matéria.
 */
function obterPastaMateriaHeader() {
  const caminho = decodeURIComponent(location.pathname);
  const inicio = caminho.indexOf(MARCADOR_MATERIAIS_HEADER);
  if (inicio < 0) return null;

  const partes = caminho.slice(inicio + MARCADOR_MATERIAIS_HEADER.length).split("/");
  const [curso, materia] = partes;
  const estaNumaMateria = partes.length > 2 && Boolean(curso && materia);
  if (!estaNumaMateria || PASTAS_SEM_MATERIA_HEADER.includes(curso)) return null;
  const pasta = caminho.slice(0, inicio) + MARCADOR_MATERIAIS_HEADER + curso + "/" + materia + "/";
  return new URL(pasta, location.href).href;
}

/**
 * Cria o botão EQUIPES: carrega a ação de equipes sob demanda e abre o modal da matéria.
 * @param {string|null} pastaMateria - URL da pasta da matéria (null = o professor escolhe a
 *   matéria no modal).
 * @returns {HTMLButtonElement} Botão do header.
 */
function criarBotaoEquipesHeader(pastaMateria) {
  const botao = criarElementoHeader("button", "header-usuario__menu-link", TEXTO_EQUIPES_HEADER);
  botao.type = "button";
  botao.addEventListener("click", async () => {
    try {
      if (typeof window.ACOES_MENU_ATIVIDADES?.equipes !== "function") {
        await carregarScriptHeader(resolverRotaHeader(ROTA_ACAO_EQUIPES_JS));
      }
      // urlBase = um arquivo dentro da pasta da matéria (a ação usa a pasta dele).
      await window.ACOES_MENU_ATIVIDADES.equipes({
        item: { papeis: PAPEIS_EQUIPES_HEADER, semMateria: !pastaMateria },
        urlBase: pastaMateria ? pastaMateria + "index.html" : location.href,
      });
    } catch (erro) {
      console.error("Não foi possível abrir as equipes:", erro);
    }
  });
  return botao;
}

/**
 * Diz se o usuário logado é aluno líder (usuario.lider = 1, lido da própria linha pelo RLS).
 * @param {Object} cliente - Cliente do Supabase.
 * @param {Object} usuario - Usuário logado.
 * @returns {Promise<boolean>} Verdadeiro se for líder.
 */
async function ehAlunoLiderHeader(cliente, usuario) {
  try {
    const { data, error } = await cliente.from(TABELA_USUARIO_HEADER).select("lider")
      .eq("id", usuario.id).maybeSingle();
    return !error && data?.lider === 1;
  } catch (erro) {
    console.warn("Não foi possível conferir o aluno líder:", erro);
    return false;
  }
}

/**
 * Diz se o usuário logado pode ver o botão EQUIPES: professor (sempre) ou aluno líder dentro
 * de uma matéria. Quem decide o acesso aos dados continua sendo o RLS.
 * @param {{cliente: Object, usuario: Object, pastaMateria: string|null}} contexto - Cliente,
 *   usuário logado e pasta da matéria da página (null fora de uma matéria).
 * @returns {Promise<boolean>} Verdadeiro se o botão deve aparecer.
 */
async function podeVerBotaoEquipes(contexto) {
  const { cliente, usuario, pastaMateria } = contexto;
  // Professor: sempre (fora de uma matéria, escolhe a matéria no modal). Líder: só na matéria.
  if (usuario.app_metadata?.perfil === PERFIL_PROFESSOR_HEADER) return true;
  if (!pastaMateria) return false;
  return ehAlunoLiderHeader(cliente, usuario);
}

/**
 * Põe o botão EQUIPES antes do elemento de referência (o nome do usuário); só para
 * professor ou aluno líder. Para o Professor Administrador o botão já entra dentro da
 * segunda linha do menu, antes do link REGRAS (#358).
 * @param {{cliente: Object, usuario: Object|null, referencia: HTMLElement}} contexto -
 *   Cliente, usuário logado e elemento antes do qual o botão entra.
 * @returns {Promise<void>}
 */
async function incluirBotaoEquipesHeader(contexto) {
  const { cliente, usuario, referencia } = contexto;
  if (!usuario) return;

  const pastaMateria = obterPastaMateriaHeader();
  if (!(await podeVerBotaoEquipes({ cliente, usuario, pastaMateria }))) return;

  referencia.before(criarBotaoEquipesHeader(pastaMateria));
}

/**
 * Diz se o usuário logado é Professor Administrador, pelo banco. O e-mail e o user_metadata
 * não decidem nada: quem decide é eh_professor_administrador().
 * @param {Object} cliente - Cliente do Supabase.
 * @returns {Promise<boolean>} Verdadeiro se o banco confirmar o papel.
 */
async function ehProfessorAdministradorHeader(cliente) {
  try {
    const { data, error } = await cliente.rpc(RPC_ADMINISTRADOR_HEADER);
    return !error && data === true;
  } catch (erro) {
    console.warn("Não foi possível conferir o Professor Administrador:", erro);
    return false;
  }
}

/**
 * Monta a lista de elementos do menu do administrador, na ordem de exibição: os links de
 * MENU_ADMINISTRADOR_HEADER com o botão EQUIPES logo antes do link Regras (o último).
 * @returns {HTMLElement[]} Links e botões do menu.
 */
function montarItensMenuAdministrador() {
  const pastaMateria = obterPastaMateriaHeader();
  const itens = [];
  MENU_ADMINISTRADOR_HEADER.forEach((item) => {
    const ehLinkRegras = item.rotulo === ROTULO_REGRAS_HEADER;
    if (ehLinkRegras) itens.push(criarBotaoEquipesHeader(pastaMateria));
    itens.push(criarLinkMenuHeader(item));
  });
  return itens;
}

/**
 * Acrescenta ao menu os itens do Professor Administrador, em 2 linhas (metade em cima,
 * metade embaixo). O papel já foi confirmado pelo banco por quem chama.
 * @param {HTMLElement} menu - Elemento <nav> do menu do professor.
 */
function incluirMenuAdministrador(menu) {
  montarLinhasMenuHeader(menu, montarItensMenuAdministrador());
}

/**
 * Põe no header os acessos de quem está logado: o Professor Administrador recebe o menu em
 * 2 linhas (com o botão EQUIPES dentro); os demais, só o botão EQUIPES, quando têm direito.
 * @param {{cliente: Object, usuario: Object|null, menu: HTMLElement|null,
 *   referencia: HTMLElement}} contexto - Cliente, usuário logado, menu do professor (null
 *   para quem não é professor) e o elemento antes do qual o botão EQUIPES entra.
 * @returns {Promise<void>}
 */
async function incluirAcessosHeader(contexto) {
  const { cliente, usuario, menu, referencia } = contexto;
  const ehAdministrador = Boolean(menu) && (await ehProfessorAdministradorHeader(cliente));
  if (ehAdministrador) {
    incluirMenuAdministrador(menu);
    return;
  }
  await incluirBotaoEquipesHeader({ cliente, usuario, referencia });
}

/**
 * Monta o endereço do login, que volta para a página atual depois de entrar.
 * @returns {string} URL do login.html com o parâmetro de volta.
 */
function montarUrlEntrarHeader() {
  const login = new URL(resolverRotaHeader(ROTA_LOGIN));
  login.searchParams.set(PARAMETRO_VOLTAR_HEADER, location.pathname + location.search);
  return login.href;
}

/**
 * Cria um ícone decorativo do botão de destaque (lido como enfeite pelo leitor de tela).
 * @param {string} icone - Emoji do ícone.
 * @param {string} modificador - Sufixo da classe (inicio ou fim).
 * @returns {HTMLSpanElement} Ícone.
 */
function criarIconeEntrarDestaque(icone, modificador) {
  const classe = "header-entrar-destaque__icone header-entrar-destaque__icone--" + modificador;
  const elemento = criarElementoHeader("span", classe, icone);
  elemento.setAttribute("aria-hidden", "true");
  return elemento;
}

/**
 * Monta o botão de destaque para quem não está logado: card verde, piscando, com ícones,
 * "VOCÊ NÃO ESTÁ LOGADO! CLIQUE AQUI PARA ENTRAR"; leva ao login e volta para esta página.
 * @returns {HTMLAnchorElement} Link em forma de card.
 */
function criarBotaoEntrarDestaque() {
  incluirCssHeader(ROTA_CSS_ENTRAR_DESTAQUE);
  const texto = criarElementoHeader("span", "header-entrar-destaque__texto", "");
  texto.append(
    criarElementoHeader("strong", "header-entrar-destaque__titulo", TEXTO_ENTRAR_DESTAQUE_TITULO),
    criarElementoHeader("span", "header-entrar-destaque__acao", TEXTO_ENTRAR_DESTAQUE_ACAO),
  );
  const botao = criarElementoHeader("a", "header-entrar-destaque", "");
  botao.href = montarUrlEntrarHeader();
  botao.append(
    criarIconeEntrarDestaque(ICONE_ENTRAR_DESTAQUE_INICIO, "inicio"),
    texto,
    criarIconeEntrarDestaque(ICONE_ENTRAR_DESTAQUE_FIM, "fim"),
  );
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
 * Sem login: põe o card de entrar no espaço #entrar-destaque da página (se existir) ou no centro
 * da barra; a barra fica só com o HOME.
 * @param {HTMLElement} destino - Elemento #header-usuario.
 * @param {HTMLElement} barra - Barra já com o botão HOME.
 */
function desenharHeaderSemLogin(destino, barra) {
  const botao = criarBotaoEntrarDestaque();
  const espacoPagina = document.getElementById(ID_ENTRAR_DESTAQUE_PAGINA);
  if (espacoPagina) {
    espacoPagina.replaceChildren(botao);
    espacoPagina.hidden = false;
  } else {
    barra.classList.add("header-usuario__barra--sem-login");
    barra.append(botao);
  }
  destino.replaceChildren(barra);
}

/**
 * Desenha o header no elemento da página.
 * @param {HTMLElement} destino - Elemento #header-usuario.
 * @param {Object|null} cliente - Cliente do Supabase (null se indisponível).
 * @param {Object|null} usuario - Usuário logado ou null.
 */
function desenharHeaderUsuario(destino, cliente, usuario) {
  const barra = criarElementoHeader("div", "header-usuario__barra", "");
  barra.append(criarBotaoHome());
  if (!usuario) {
    desenharHeaderSemLogin(destino, barra);
    return;
  }
  const ehProfessor = usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_HEADER;
  const menu = ehProfessor ? criarMenuProfessor() : null;
  if (menu) barra.append(menu);
  const texto = descreverUsuarioHeader(usuario);
  const nome = criarElementoHeader("span", "header-usuario__nome", texto);
  barra.append(nome);
  if (cliente) incluirAcessosHeader({ cliente, usuario, menu, referencia: nome });
  barra.append(criarBotaoSair(cliente));
  destino.replaceChildren(barra);
  if (cliente) incluirIdDaAtividadeNoTitulo();
}

/**
 * Em página de atividade (dentro de /MATERIAIS/ e com o cabeçalho ".container > header h1"),
 * carrega o script que mostra o id da atividade no título. Falha ao carregar não atrapalha.
 */
function incluirIdDaAtividadeNoTitulo() {
  const estaEmMateria = decodeURIComponent(location.pathname).includes(MARCADOR_MATERIAIS_HEADER);
  if (!estaEmMateria || !document.querySelector(SELETOR_TITULO_ATIVIDADE_HEADER)) return;

  carregarScriptHeader(resolverRotaHeader(ROTA_ID_ATIVIDADE_JS)).catch((erro) => {
    console.warn(erro.message);
  });
}

/**
 * Diz se a página atual é pública (só o login.html da raiz do site).
 * @returns {boolean} Verdadeiro se a página pode abrir sem login.
 */
function ehPaginaPublicaHeader() {
  const raiz = decodeURIComponent(new URL(resolverRotaHeader(ROTA_RAIZ_HEADER)).pathname);
  const caminho = decodeURIComponent(location.pathname);
  if (!caminho.startsWith(raiz)) return false;
  return PAGINAS_PUBLICAS_HEADER.includes(caminho.slice(raiz.length));
}

/**
 * Lê a sessão gravada pelo Supabase Auth, sem esperar a biblioteca carregar.
 * @returns {Object|null} Sessão gravada ou null se não houver ou não puder ser lida.
 */
function lerSessaoGravadaHeader() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO_SUPABASE) || "null");
  } catch (erro) {
    return null;
  }
}

/**
 * Diz se a sessão gravada ainda serve: token válido ou renovável pelo refresh_token.
 * @param {Object|null} sessao - Sessão gravada.
 * @returns {boolean} Verdadeiro se vale a pena confirmar a sessão no Supabase.
 */
function sessaoGravadaServe(sessao) {
  if (!sessao?.access_token) return false;
  const tokenValido = sessao.expires_at * MILISSEGUNDOS_POR_SEGUNDO > Date.now();
  return tokenValido || Boolean(sessao.refresh_token);
}

/**
 * Sai da página sem login: para o carregamento e vai para o login.html (que volta para cá).
 */
function redirecionarSemSessao() {
  window.stop();
  location.replace(montarUrlEntrarHeader());
}

/**
 * Esconde a página e mostra o modal "Aguarde, carregando..." enquanto a sessão é conferida.
 * O modal fica fora do <body> e com visibility própria, por isso aparece com a página oculta.
 */
function mostrarModalCarregando() {
  document.documentElement.style.visibility = "hidden";
  const modal = criarElementoHeader("div", "sessao-carregando", "");
  modal.id = ID_MODAL_CARREGANDO;
  modal.style.visibility = "visible";
  const caixa = criarElementoHeader("div", "sessao-carregando__caixa", "");
  const gif = document.createElement("img");
  gif.className = "sessao-carregando__gif";
  gif.src = resolverRotaHeader(ROTA_GIF_CARREGANDO);
  gif.alt = "";
  caixa.append(gif, criarElementoHeader("p", "sessao-carregando__texto", TEXTO_CARREGANDO));
  modal.append(caixa);
  document.documentElement.append(modal);
}

/**
 * Tira o modal de carregamento e mostra a página (sessão confirmada).
 */
function liberarPaginaHeader() {
  document.getElementById(ID_MODAL_CARREGANDO)?.remove();
  document.documentElement.style.visibility = "";
}

/**
 * Guarda de sessão: roda assim que o script é lido (primeiro script do <head>). Página
 * pública passa direto; sem sessão gravada sai na hora; com sessão, mostra o modal até
 * o Supabase confirmar em iniciarHeaderUsuario.
 * @returns {boolean} Verdadeiro se a página precisa de login.
 */
function protegerPaginaHeader() {
  if (ehPaginaPublicaHeader()) return false;

  incluirCssHeader();
  mostrarModalCarregando();
  if (!sessaoGravadaServe(lerSessaoGravadaHeader())) redirecionarSemSessao();
  return true;
}

/**
 * Confirma a sessão no Supabase Auth (renova o token se preciso).
 * @returns {Promise<{cliente: Object|null, usuario: Object|null}>} Cliente e usuário logado.
 */
async function confirmarSessaoHeader() {
  try {
    const cliente = await obterClienteHeader();
    const { data } = await cliente.auth.getSession();
    return { cliente, usuario: data?.session?.user || null };
  } catch (erro) {
    console.warn("Não foi possível confirmar a sessão:", erro);
    return { cliente: null, usuario: null };
  }
}

/**
 * Inicia o header: confirma a sessão (sem login, página protegida vai para o index.html),
 * libera a página e desenha o usuário logado ou o botão ENTRAR.
 */
async function iniciarHeaderUsuario() {
  // Antes do await: com internet lenta a página já nasce no tamanho do celular.
  incluirCssCelularPorUltimo();
  const { cliente, usuario } = await confirmarSessaoHeader();
  if (paginaPrecisaLogin && !usuario) return redirecionarSemSessao();

  liberarPaginaHeader();
  aplicarVisibilidadePorPerfil(usuario);
  const destino = document.getElementById(ID_HEADER_USUARIO);
  if (!destino) {
    incluirCssCelularPorUltimo();
    return;
  }

  // Sai do <body> para não herdar o padding/margem da página: a barra fica colada no topo.
  document.documentElement.insertBefore(destino, document.body);
  incluirCssHeader();
  desenharHeaderUsuario(destino, cliente, usuario);
  incluirCssCelularPorUltimo();
}

const paginaPrecisaLogin = protegerPaginaHeader();
// DOMContentLoaded: os scripts da própria página (js/supabase.js, defer ou no fim do <body>)
// já rodaram (vale também para página antiga que ainda carrega este script com defer).
if (document.readyState === "complete") {
  iniciarHeaderUsuario();
} else {
  document.addEventListener("DOMContentLoaded", iniciarHeaderUsuario);
}
