// ── Página cursos.html: CRUD da tabela curso e vínculo das turmas (menu CURSO) ──
// Tela do Professor Administrador. Cada curso tem ✏️ Editar, 🏫 Turmas (modal de vínculo em
// assets/js/cursos-modais.js) e Desativar/Ativar. Não há exclusão: apagar um curso apagaria as
// aulas dele em cascata, por isso desativar grava ativo = 0.
// A unidade vem só da tabela unidade (curso.unidade_id e turma.unidade_id); o CRUD das unidades
// fica no modal 🏢 Unidades (assets/js/unidades-modal.js).
// Dados: assets/js/cursos-repositorio.js; avisos: assets/js/popup.js.

const TEXTO_SEM_LOGIN_CU = "Entre com a conta do Professor Administrador para gerenciar os cursos.";
const TEXTO_SEM_ADMIN_CU = "Acesso restrito ao Professor Administrador.";
const TEXTO_SEM_TURMA_CU = "Nenhuma turma vinculada.";
const COLUNAS_TABELA_CU = 5;
const ROTA_LOGIN_CU = "login.html";
const CURSO_ATIVO = 1;
const CURSO_INATIVO = 0;

const estadoCu = { repositorio: null, cursos: [], turmas: [], unidades: [] };

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoCu(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCu(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Cria um botão (type="button") com a ação de clique.
 * @param {{texto: string, classe: string, titulo?: string, aoClicar: Function}} opcoes - Dados.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoCu(opcoes) {
  const botao = criarElementoCu("button", opcoes.classe, opcoes.texto);
  botao.type = "button";
  if (opcoes.titulo) botao.title = opcoes.titulo;
  botao.addEventListener("click", opcoes.aoClicar);
  return botao;
}

/**
 * Mostra a mensagem de bloqueio e esconde o conteúdo.
 * @param {string} texto - Mensagem.
 * @param {boolean} [comLogin] - Se mostra o link ENTRAR.
 */
function bloquearPaginaCu(texto, comLogin) {
  const bloqueio = elementoCu("cuBloqueio");
  bloqueio.replaceChildren(criarElementoCu("p", "", texto));
  if (comLogin) {
    const link = criarElementoCu("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_CU + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoCu("cuConteudo").hidden = true;
}

/**
 * Diz se o curso está ativo (null conta como ativo, padrão da coluna).
 * @param {Object} curso - Linha da tabela curso.
 * @returns {boolean} Verdadeiro se ativo.
 */
function cursoEstaAtivoCu(curso) {
  return curso.ativo !== CURSO_INATIVO;
}

/**
 * Turmas vinculadas a um curso.
 * @param {number} cursoId - Id do curso.
 * @returns {Object[]} Turmas do curso.
 */
function turmasDoCursoCu(cursoId) {
  return estadoCu.turmas.filter((turma) => turma.curso_id === cursoId);
}

/**
 * Nome da unidade pelo id (tabela unidade).
 * @param {number|null} unidadeId - Id da unidade.
 * @returns {string} Nome da unidade ou texto vazio.
 */
function nomeDaUnidadeCu(unidadeId) {
  return estadoCu.unidades.find((unidade) => unidade.id === unidadeId)?.nome || "";
}

/**
 * Descreve uma turma: "124519 — T TIIN 2026/1 M1 · SENAI RIO DO SUL MANHÃ" (unidade da tabela).
 * @param {Object} turma - Linha da tabela turma.
 * @returns {string} Texto da turma.
 */
function descreverTurmaCu(turma) {
  const unidade = [nomeDaUnidadeCu(turma.unidade_id), turma.turno].filter(Boolean).join(" ");
  const texto = turma.codigo + " — " + (turma.nome || "");
  if (!unidade) return texto;
  return texto + " · " + unidade.toUpperCase();
}

/**
 * Nome do curso pelo id.
 * @param {number} cursoId - Id do curso.
 * @returns {string} Nome do curso ou texto vazio.
 */
function nomeDoCursoCu(cursoId) {
  return estadoCu.cursos.find((curso) => curso.id === cursoId)?.nome_completo || "";
}

/**
 * Traduz o erro do banco em mensagem para o professor.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem.
 */
function mensagemErroCu(erro) {
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Cria a célula de ações do curso: Editar, Turmas e Desativar/Ativar.
 * @param {Object} curso - Linha da tabela curso.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaAcoesCu(curso) {
  const celula = criarElementoCu("td", "cu-celula-acoes");
  const grupo = criarElementoCu("div", "cu-grupo-acoes");
  const textoSituacao = cursoEstaAtivoCu(curso) ? "⛔ Desativar" : "✅ Ativar";
  celula.append(grupo);
  grupo.append(
    criarBotaoCu({ texto: "✏️ Editar", classe: "guia-botao tp-botao-pequeno",
      aoClicar: () => abrirModalCursoCu(curso) }),
    criarBotaoCu({ texto: "🏫 Turmas", classe: "guia-botao tp-botao-pequeno",
      aoClicar: () => abrirModalTurmasCu(curso.id) }),
    criarBotaoCu({ texto: textoSituacao, classe: "guia-botao tp-botao-pequeno tp-botao-secundario",
      aoClicar: () => alternarSituacaoCursoCu(curso) }));
  return celula;
}

/**
 * Cria a célula com as turmas vinculadas ao curso.
 * @param {number} cursoId - Id do curso.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaTurmasCu(cursoId) {
  const celula = criarElementoCu("td");
  const turmas = turmasDoCursoCu(cursoId);
  if (!turmas.length) {
    celula.append(criarElementoCu("span", "tp-detalhe", TEXTO_SEM_TURMA_CU));
    return celula;
  }
  const lista = criarElementoCu("ul", "tp-lista-professores");
  lista.append(...turmas.map((turma) => criarElementoCu("li", "tp-professor cu-etiqueta",
    turma.codigo + " — " + (turma.nome || ""))));
  celula.append(lista);
  return celula;
}

/**
 * Monta a linha de um curso: Curso | Unidade | Situação | Turmas | Ações (à direita).
 * @param {Object} curso - Linha da tabela curso.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaCursoCu(curso) {
  const linha = criarElementoCu("tr", cursoEstaAtivoCu(curso) ? "" : "cu-linha--inativa");
  const celulaCurso = criarElementoCu("td", "", curso.nome_completo || "");
  celulaCurso.append(criarElementoCu("span", "tp-detalhe", curso.descricao || ""));
  const situacao = cursoEstaAtivoCu(curso) ? "Ativo" : "Inativo";
  linha.append(celulaCurso, criarElementoCu("td", "", nomeDaUnidadeCu(curso.unidade_id)),
    criarElementoCu("td", "", situacao), criarCelulaTurmasCu(curso.id), criarCelulaAcoesCu(curso));
  return linha;
}

/**
 * Diz se o curso combina com a busca (nome, unidade, descrição ou turma vinculada).
 * @param {Object} curso - Linha da tabela curso.
 * @param {string} busca - Texto buscado, em minúsculas.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function cursoVisivelCu(curso, busca) {
  if (!busca) return true;
  const turmas = turmasDoCursoCu(curso.id).map(descreverTurmaCu);
  const unidade = nomeDaUnidadeCu(curso.unidade_id);
  const texto = [curso.nome_completo, unidade, curso.descricao, ...turmas].join(" ");
  return texto.toLowerCase().includes(busca);
}

/** Desenha a tabela de cursos aplicando a busca. */
function desenharCursosCu() {
  const busca = elementoCu("cuBusca").value.trim().toLowerCase();
  const visiveis = estadoCu.cursos.filter((curso) => cursoVisivelCu(curso, busca));
  const corpo = elementoCu("cuLinhas");
  if (!visiveis.length) {
    const vazio = criarElementoCu("td", "tp-vazio", "Nenhum curso encontrado.");
    vazio.colSpan = COLUNAS_TABELA_CU;
    corpo.replaceChildren(criarElementoCu("tr"));
    corpo.firstChild.append(vazio);
  } else {
    corpo.replaceChildren(...visiveis.map(criarLinhaCursoCu));
  }
  const semCurso = estadoCu.turmas.filter((turma) => turma.curso_id === null).length;
  elementoCu("cuResumo").textContent = visiveis.length + " de " + estadoCu.cursos.length +
    " curso(s) · " + semCurso + " turma(s) sem curso";
}

/** Recarrega cursos, turmas e unidades do banco e redesenha a tabela e os modais abertos. */
async function recarregarDadosCu() {
  const repositorio = estadoCu.repositorio;
  [estadoCu.cursos, estadoCu.turmas, estadoCu.unidades] = await Promise.all([
    repositorio.listarCursos(), repositorio.listarTurmas(), repositorio.listarUnidades()]);
  desenharCursosCu();
  atualizarModalTurmasCu();
  atualizarModalUnidadesCu();
}

/**
 * Desativa ou ativa o curso depois da confirmação (nunca apaga).
 * @param {Object} curso - Linha da tabela curso.
 */
async function alternarSituacaoCursoCu(curso) {
  const desativar = cursoEstaAtivoCu(curso);
  const acao = desativar ? "Desativar" : "Ativar";
  const confirmou = await confirmarPopup(acao + " o curso \"" + curso.nome_completo + "\"?",
    { tipo: "pergunta", titulo: acao + " curso" });
  if (!confirmou) return;
  try {
    const ativo = desativar ? CURSO_INATIVO : CURSO_ATIVO;
    await estadoCu.repositorio.alterarCurso(curso.id, { ativo });
  } catch (erro) {
    await mostrarPopup(mensagemErroCu(erro), { tipo: "erro", titulo: "Curso não alterado" });
    return;
  }
  await recarregarDadosCu();
}

/** Inicia a página: confere login e Professor Administrador e carrega os dados. */
async function iniciarPaginaCu() {
  try {
    estadoCu.repositorio = criarRepositorioCursos(await obterClienteSupabase());
    const usuario = await estadoCu.repositorio.usuarioLogado();
    if (!usuario) {
      bloquearPaginaCu(TEXTO_SEM_LOGIN_CU, true);
      return;
    }
    if (!(await estadoCu.repositorio.ehAdministrador())) {
      bloquearPaginaCu(TEXTO_SEM_ADMIN_CU, false);
      return;
    }
    elementoCu("cuBusca").addEventListener("input", desenharCursosCu);
    ligarEventosModaisCu();
    ligarEventosUnidadesCu();
    await recarregarDadosCu();
    elementoCu("cuConteudo").hidden = false;
  } catch (erro) {
    bloquearPaginaCu("Erro ao carregar os cursos: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaCu);
