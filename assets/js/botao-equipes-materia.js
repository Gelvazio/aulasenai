// ── Botão "Minha equipe" no índice de atividades da matéria ───────────────────
// Reutilizável em qualquer MATERIAIS/<CURSO>/<MATÉRIA>/ATIVIDADES/index.html: basta a tag
// <script src="../../../../assets/js/botao-equipes-materia.js" defer></script> depois do
// supabase-js e de js/supabase.js. Só aparece para o aluno comum logado (professor e aluno líder
// da turma já têm o botão EQUIPES no topo, de js/header-usuario.js). Abre o modal de equipes
// da matéria, que no modo aluno mostra a própria equipe e as atividades ligadas a ela.
(function () {
  const URL_SCRIPT = document.currentScript?.src || "";
  const ROTA_ACAO_EQUIPES_JS = "menu-acao-equipes.js";
  const ROTA_CSS = "../css/botao-equipes-materia.css";
  const CLASSE_BOTAO = "botao-equipes-materia";
  const TEXTO_BOTAO = "👥 Minha equipe";
  const SELETOR_TITULO = "header h1";
  const MARCADOR_MATERIAIS = "/MATERIAIS/";
  const PASTAS_SEM_MATERIA = ["MATERIAS-GERAIS", "AGENDA_COLABORADOR"];
  const PERFIL_PROFESSOR = "PROFESSOR";
  const TABELA_USUARIO = "usuario";
  const PAPEIS_EQUIPES = ["Líder (coordenador)", "Integrante"];
  const TENTATIVAS_CLIENTE = 20;
  const INTERVALO_TENTATIVA_MS = 250;

  /**
   * Espera um tempo.
   * @param {number} milissegundos - Duração da espera.
   * @returns {Promise<void>} Resolve ao fim do tempo.
   */
  function esperar(milissegundos) {
    return new Promise((resolve) => setTimeout(resolve, milissegundos));
  }

  /**
   * Espera o cliente Supabase compartilhado (js/supabase.js) ficar disponível.
   * @returns {Promise<Object|null>} Cliente ou null se não carregou a tempo.
   */
  async function aguardarCliente() {
    for (let i = 0; i < TENTATIVAS_CLIENTE; i++) {
      const cliente = typeof obterClienteSupabase === "function" ? obterClienteSupabase() : null;
      if (cliente) return cliente;
      await esperar(INTERVALO_TENTATIVA_MS);
    }
    return null;
  }

  /**
   * Descobre a pasta da matéria da página atual (/MATERIAIS/<CURSO>/<MATÉRIA>/).
   * @returns {string|null} URL absoluta da pasta da matéria ou null fora de uma matéria.
   */
  function obterPastaMateria() {
    const caminho = decodeURIComponent(location.pathname);
    const inicio = caminho.indexOf(MARCADOR_MATERIAIS);
    if (inicio < 0) return null;

    const partes = caminho.slice(inicio + MARCADOR_MATERIAIS.length).split("/");
    const [curso, materia] = partes;
    const estaNumaMateria = partes.length > 2 && Boolean(curso && materia);
    if (!estaNumaMateria || PASTAS_SEM_MATERIA.includes(curso)) return null;
    const pasta = caminho.slice(0, inicio) + MARCADOR_MATERIAIS + curso + "/" + materia + "/";
    return new URL(pasta, location.href).href;
  }

  /**
   * Carrega um script e espera terminar.
   * @param {string} url - Endereço do script.
   * @returns {Promise<void>} Resolve quando o script carregou.
   */
  function carregarScript(url) {
    return new Promise((resolve, reject) => {
      const tag = document.createElement("script");
      tag.src = url;
      tag.onload = resolve;
      tag.onerror = () => reject(new Error("Falha ao carregar " + url));
      document.head.append(tag);
    });
  }

  /**
   * Inclui o CSS do botão, uma única vez.
   */
  function incluirCss() {
    const url = new URL(ROTA_CSS, URL_SCRIPT).href;
    if (document.querySelector(`link[href="${url}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.append(link);
  }

  /**
   * Diz se o usuário é aluno líder da turma (usuario.lider = 1, lido da própria linha pelo RLS).
   * @param {Object} cliente - Cliente do Supabase.
   * @param {Object} usuario - Usuário logado.
   * @returns {Promise<boolean>} Verdadeiro se for líder.
   */
  async function ehAlunoLider(cliente, usuario) {
    const { data, error } = await cliente.from(TABELA_USUARIO).select("lider")
      .eq("id", usuario.id).maybeSingle();
    return !error && data?.lider === 1;
  }

  /**
   * Abre o modal de equipes da matéria, carregando a ação sob demanda.
   * @param {string} pastaMateria - URL da pasta da matéria.
   * @returns {Promise<void>}
   */
  async function abrirEquipes(pastaMateria) {
    try {
      if (typeof window.ACOES_MENU_ATIVIDADES?.equipes !== "function") {
        await carregarScript(new URL(ROTA_ACAO_EQUIPES_JS, URL_SCRIPT).href);
      }
      await window.ACOES_MENU_ATIVIDADES.equipes({
        item: { papeis: PAPEIS_EQUIPES, semMateria: false },
        urlBase: pastaMateria + "index.html",
      });
    } catch (erro) {
      console.warn("Não foi possível abrir as equipes:", erro);
    }
  }

  /**
   * Cria o botão e o põe logo abaixo do título (<h1>) do <header> da página.
   * @param {string} pastaMateria - URL da pasta da matéria.
   */
  function inserirBotao(pastaMateria) {
    const titulo = document.querySelector(SELETOR_TITULO);
    if (!titulo) return;

    incluirCss();
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = CLASSE_BOTAO;
    botao.textContent = TEXTO_BOTAO;
    botao.addEventListener("click", () => abrirEquipes(pastaMateria));
    titulo.after(botao);
  }

  /**
   * Mostra o botão só para aluno logado que não é líder da turma.
   */
  async function iniciar() {
    try {
      const pastaMateria = obterPastaMateria();
      if (!pastaMateria) return;

      const cliente = await aguardarCliente();
      if (!cliente) return;

      const { data } = await cliente.auth.getSession();
      const usuario = data?.session?.user;
      if (!usuario) return;

      const ehProfessor = usuario.app_metadata?.perfil === PERFIL_PROFESSOR;
      if (ehProfessor || (await ehAlunoLider(cliente, usuario))) return;
      inserirBotao(pastaMateria);
    } catch (erro) {
      console.warn("Botão Minha equipe indisponível:", erro);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
