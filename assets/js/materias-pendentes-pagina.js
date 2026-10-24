// ── Página materias-pendentes.html (menu "Matérias Pendentes", #357) ─────────────
// Tela do Professor Administrador: confere login e papel (banco), mostra os filtros Curso, Ano e
// Semestre e, para cada matéria pendente, o que falta (CONTEÚDO, AULAS, ATIVIDADE OBJETIVA etc.).
// Só leitura. Dados: materias-pendentes-repositorio.js · regras: materias-pendentes-regras.js.
// Todo texto vai para a tela por textContent (nada de innerHTML com dados).

const TEXTO_SEM_LOGIN_MP =
  "Entre com a conta do Professor Administrador para ver as matérias pendentes.";
const TEXTO_SEM_ADMIN_MP = "Acesso restrito ao Professor Administrador.";
const ROTA_LOGIN_MP = "login.html";
const TEXTO_ENTRAR_MP = "Entrar";
const TEXTO_TODOS_CURSOS_MP = "Todos os cursos";
const TEXTO_TODOS_ANOS_MP = "Todos os anos";
const TEXTO_TODOS_SEMESTRES_MP = "Todos os semestres";
const SUFIXO_SEMESTRE_MP = "º semestre";
const SITUACAO_NAO_INICIADA_MP = "NÃO INICIADA";
const TEXTO_VAZIO_MP = "Nenhuma matéria pendente para o filtro escolhido.";
const TEXTO_DETALHES_MP = "O QUE FALTA";
const CLASSE_SITUACAO_MP = "mp-materia__situacao";
const CLASSE_SITUACAO_NAO_INICIADA_MP = "mp-materia__situacao--nao-iniciada";

const estadoMp = {
  repositorio: null, materias: [], cursosPorId: new Map(), cursos: [], geradoEm: "",
};

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoMp(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto (sempre por textContent).
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS ("" para nenhuma).
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoMp(tag, classe, texto = "") {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

/**
 * Troca hífen e sublinhado do nome da pasta por espaço.
 * @param {string} pasta - Nome da pasta da matéria.
 * @returns {string} Nome legível.
 */
function nomeLegivelMp(pasta) {
  return pasta.replace(/[-_]+/g, " ").trim();
}

/**
 * Mostra o aviso de bloqueio (sem login ou sem permissão) e esconde o conteúdo.
 * @param {string} texto - Mensagem para o usuário.
 * @param {boolean} comLink - true para incluir o link para o login.
 */
function bloquearPaginaMp(texto, comLink) {
  const bloqueio = elementoMp("mpBloqueio");
  bloqueio.textContent = texto + " ";
  if (comLink) {
    const link = criarElementoMp("a", "mp-bloqueio__link", TEXTO_ENTRAR_MP);
    link.href = ROTA_LOGIN_MP + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoMp("mpConteudo").hidden = true;
}

/**
 * Preenche um <select> com a opção "todos" e as demais opções.
 * @param {HTMLSelectElement} seletor - Elemento select.
 * @param {string} textoTodos - Texto da opção com valor vazio.
 * @param {{valor: string, texto: string}[]} opcoes - Demais opções.
 */
function preencherSeletorMp(seletor, textoTodos, opcoes) {
  seletor.replaceChildren(new Option(textoTodos, ""));
  opcoes.forEach(({ valor, texto }) => seletor.append(new Option(texto, valor)));
}

/** Preenche os três filtros com os cursos que têm matéria no JSON, os anos e os semestres. */
function preencherFiltrosMp() {
  const idsComMateria = new Set(estadoMp.materias.map((materia) => materia.curso_id));
  const cursos = estadoMp.cursos.filter((curso) => idsComMateria.has(curso.id))
    .map((curso) => ({ valor: String(curso.id), texto: curso.nome_completo }));
  if (idsComMateria.has(null)) {
    cursos.push({ valor: VALOR_SEM_CURSO_PENDENTES, texto: ROTULO_SEM_CURSO_PENDENTES });
  }
  preencherSeletorMp(elementoMp("mpCurso"), TEXTO_TODOS_CURSOS_MP, cursos);
  const anos = valoresDistintosDoCurso(estadoMp.cursos, "ano");
  const semestres = valoresDistintosDoCurso(estadoMp.cursos, "semestre");
  preencherSeletorMp(elementoMp("mpAno"), TEXTO_TODOS_ANOS_MP,
    anos.map((ano) => ({ valor: String(ano), texto: String(ano) })));
  preencherSeletorMp(elementoMp("mpSemestre"), TEXTO_TODOS_SEMESTRES_MP,
    semestres.map((valor) => ({ valor: String(valor), texto: valor + SUFIXO_SEMESTRE_MP })));
}

/**
 * Lê os valores escolhidos nos filtros.
 * @returns {{curso: string, ano: string, semestre: string}} Filtro atual.
 */
function lerFiltroMp() {
  return {
    curso: elementoMp("mpCurso").value,
    ano: elementoMp("mpAno").value,
    semestre: elementoMp("mpSemestre").value,
  };
}

/**
 * Monta o bloco "O QUE FALTA" da matéria, com as categorias e os itens pendentes.
 * @param {Object} materia - Matéria do JSON.
 * @returns {HTMLDetailsElement} Bloco recolhível.
 */
function criarDetalhesMp(materia) {
  const detalhes = criarElementoMp("details", "mp-detalhes");
  detalhes.append(criarElementoMp("summary", "mp-detalhes__titulo", TEXTO_DETALHES_MP));
  pendenciasDaMateria(materia).forEach(({ categoria, itens }) => {
    const bloco = criarElementoMp("div", "mp-categoria");
    bloco.append(criarElementoMp("h4", "mp-categoria__nome", `${categoria} (${itens.length})`));
    const lista = criarElementoMp("ul", "mp-categoria__itens");
    itens.forEach((item) => lista.append(criarElementoMp("li", "", item)));
    bloco.append(lista);
    detalhes.append(bloco);
  });
  return detalhes;
}

/**
 * Monta a barra de progresso e o percentual da matéria.
 * @param {Object} materia - Matéria do JSON.
 * @returns {HTMLElement} Linha de telemetria.
 */
function criarTelemetriaMp(materia) {
  const linha = criarElementoMp("div", "mp-materia__telemetria");
  const barra = criarElementoMp("progress", "mp-progresso");
  barra.max = materia.pecas_total;
  barra.value = materia.pecas_ok;
  barra.setAttribute("aria-label", `${materia.pecas_ok} de ${materia.pecas_total} peças`);
  const texto = `${materia.pecas_ok}/${materia.pecas_total} · ${materia.percentual}%`;
  linha.append(barra, criarElementoMp("span", "mp-materia__percentual", texto));
  return linha;
}

/**
 * Monta o cartão de uma matéria pendente.
 * @param {Object} materia - Matéria do JSON.
 * @returns {HTMLElement} Cartão da matéria.
 */
function criarCartaoMateriaMp(materia) {
  const cartao = criarElementoMp("article", "mp-cartao mp-materia");
  cartao.append(criarElementoMp("h3", "mp-materia__nome", nomeLegivelMp(materia.materia)));
  const estaNaoIniciada = materia.situacao.includes(SITUACAO_NAO_INICIADA_MP);
  const classeSituacao = estaNaoIniciada
    ? CLASSE_SITUACAO_MP + " " + CLASSE_SITUACAO_NAO_INICIADA_MP
    : CLASSE_SITUACAO_MP;
  cartao.append(criarElementoMp("p", classeSituacao, materia.situacao));
  cartao.append(criarTelemetriaMp(materia), criarDetalhesMp(materia));
  return cartao;
}

/**
 * Desenha os grupos de cursos com as matérias pendentes do filtro e o resumo.
 */
function desenharListaMp() {
  const { materias: todas, cursosPorId } = estadoMp;
  const materias = filtrarMateriasPendentes(todas, cursosPorId, lerFiltroMp());
  const lista = elementoMp("mpLista");
  lista.replaceChildren();
  elementoMp("mpResumo").textContent = materias.length
    ? `${materias.length} matéria(s) pendente(s) — dados de ${estadoMp.geradoEm}`
    : TEXTO_VAZIO_MP;
  agruparMateriasPorCurso(materias, estadoMp.cursosPorId).forEach(({ curso, materias: grupo }) => {
    const secao = criarElementoMp("section", "mp-grupo");
    secao.append(criarElementoMp("h2", "mp-grupo__titulo", curso));
    const grade = criarElementoMp("div", "mp-grupo__materias");
    grupo.forEach((materia) => grade.append(criarCartaoMateriaMp(materia)));
    secao.append(grade);
    lista.append(secao);
  });
}

/** Liga os filtros: qualquer mudança (ou o "Limpar filtros") redesenha a lista. */
function ligarEventosMp() {
  const formulario = elementoMp("mpFiltros");
  formulario.addEventListener("change", desenharListaMp);
  formulario.addEventListener("reset", () => setTimeout(desenharListaMp));
}

/** Carrega os dados e abre a página. */
async function carregarDadosMp() {
  const [cursos, pendencias] = await Promise.all([
    estadoMp.repositorio.listarCursos(), estadoMp.repositorio.carregarPendencias(),
  ]);
  estadoMp.cursos = cursos;
  estadoMp.cursosPorId = new Map(cursos.map((curso) => [curso.id, curso]));
  estadoMp.materias = pendencias.materias;
  estadoMp.geradoEm = pendencias.gerado_em;
  preencherFiltrosMp();
  ligarEventosMp();
  desenharListaMp();
  elementoMp("mpConteudo").hidden = false;
}

/** Inicia a página: confere login e Professor Administrador (RPC) e carrega os dados. */
async function iniciarPaginaMp() {
  try {
    estadoMp.repositorio = criarRepositorioMateriasPendentes(await obterClienteSupabase());
    if (!(await estadoMp.repositorio.usuarioLogado())) {
      bloquearPaginaMp(TEXTO_SEM_LOGIN_MP, true);
      return;
    }
    if (!(await estadoMp.repositorio.ehAdministrador())) {
      bloquearPaginaMp(TEXTO_SEM_ADMIN_MP, false);
      return;
    }
    await carregarDadosMp();
  } catch (erro) {
    bloquearPaginaMp("Erro ao carregar as matérias pendentes: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaMp);
