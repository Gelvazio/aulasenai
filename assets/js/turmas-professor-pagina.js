// ── Página turmas.html: consulta das turmas com os professores vinculados (turmaprofessor) ──
// Tela do Professor Administrador. Cada turma tem, à esquerda, o botão "Vincular Professor", que
// abre o modal da turma (assets/js/turmas-professor-modais.js) com os professores dela e a lista
// só de quem ainda não está nela; cada vínculo tem ✏️ (modal de edição) e 🗑️ (excluir).
// Dados: assets/js/turmas-professor-repositorio.js; avisos: assets/js/popup.js.
// A segurança fica no banco (RLS + eh_professor_administrador + trigger de perfil PROFESSOR).

const CODIGO_VINCULO_REPETIDO = "23505";
const TEXTO_SEM_LOGIN_TP = "Entre com a conta do Professor Administrador para gerenciar as turmas.";
const TEXTO_SEM_ADMIN_TP = "Acesso restrito ao Professor Administrador.";
const TEXTO_VINCULAR_PROFESSOR_TP = "➕ Vincular Professor";
const TEXTO_SEM_PROFESSOR_TP = "Nenhum professor vinculado.";
const COLUNAS_TABELA_TP = 4;
const ROTA_LOGIN_TP = "login.html";

const estadoTp = { repositorio: null, turmas: [], professores: [], vinculos: [] };

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoTp(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoTp(tag, classe, texto) {
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
function criarBotaoTp(opcoes) {
  const botao = criarElementoTp("button", opcoes.classe, opcoes.texto);
  botao.type = "button";
  if (opcoes.titulo) {
    botao.title = opcoes.titulo;
    botao.setAttribute("aria-label", opcoes.titulo);
  }
  botao.addEventListener("click", opcoes.aoClicar);
  return botao;
}

/**
 * Mostra a mensagem de bloqueio e esconde o conteúdo.
 * @param {string} texto - Mensagem.
 * @param {boolean} [comLogin] - Se mostra o link ENTRAR.
 */
function bloquearPaginaTp(texto, comLogin) {
  const bloqueio = elementoTp("tpBloqueio");
  bloqueio.replaceChildren(criarElementoTp("p", "", texto));
  if (comLogin) {
    const link = criarElementoTp("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_TP + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoTp("tpConteudo").hidden = true;
}

/**
 * Descreve uma turma: "122552 — AI OPIR 2026/1 V1 · TAIÓ TARDE" (assets/js/unidade.js).
 * @param {Object} turma - Linha da tabela turma.
 * @returns {string} Texto da turma.
 */
function descreverTurmaTp(turma) {
  return acrescentarUnidadeTurma(turma.codigo + " — " + (turma.nome || ""), turma);
}

/**
 * Descreve um professor: "Nome — e-mail".
 * @param {Object} professor - Linha da tabela usuario.
 * @returns {string} Texto do professor.
 */
function descreverProfessorTp(professor) {
  return (professor.nome_completo || professor.email) + " — " + professor.email;
}

/**
 * Preenche um <select> com opções.
 * @param {HTMLSelectElement} select - Lista a preencher.
 * @param {{valor: string, texto: string}[]} opcoes - Opções.
 * @param {string} [textoVazio] - Texto da primeira opção vazia (opcional).
 */
function preencherSelectTp(select, opcoes, textoVazio) {
  const itens = textoVazio === undefined ? [] : [{ valor: "", texto: textoVazio }];
  select.replaceChildren(...itens.concat(opcoes).map((opcao) => {
    const elemento = criarElementoTp("option", "", opcao.texto);
    elemento.value = opcao.valor;
    return elemento;
  }));
}

/**
 * Vínculos de uma turma, pelo nome do professor.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {Object[]} Vínculos da turma.
 */
function vinculosDaTurmaTp(turmaCodigo) {
  return estadoTp.vinculos
    .filter((vinculo) => vinculo.turma_codigo === turmaCodigo)
    .sort((a, b) => nomeDoProfessorTp(a.professor_id).localeCompare(nomeDoProfessorTp(b.professor_id),
      "pt-BR"));
}

/**
 * Nome do professor pelo id.
 * @param {string} professorId - Id do professor.
 * @returns {string} Nome (ou e-mail; "(usuário sem cadastro)" se não achar).
 */
function nomeDoProfessorTp(professorId) {
  const professor = estadoTp.professores.find((item) => item.id === professorId);
  return professor?.nome_completo || professor?.email || "(usuário sem cadastro)";
}

/**
 * Traduz o erro do banco em mensagem para o professor.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem.
 */
function mensagemErroTp(erro) {
  if (erro?.code === CODIGO_VINCULO_REPETIDO) return "Este professor já está vinculado a esta turma.";
  if (/PROFESSOR/.test(erro?.message || "")) return "Só usuários com perfil PROFESSOR podem ser vinculados.";
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Cria a etiqueta de um professor vinculado, com ✏️ (editar vínculo) e 🗑️ (excluir).
 * @param {Object} vinculo - Linha da turmaprofessor.
 * @returns {HTMLLIElement} Etiqueta.
 */
function criarEtiquetaVinculoTp(vinculo) {
  const item = criarElementoTp("li", "tp-professor");
  item.append(criarElementoTp("span", "", nomeDoProfessorTp(vinculo.professor_id)),
    criarBotaoTp({ texto: "✏️", classe: "tp-botao-icone", titulo: "Editar vínculo",
      aoClicar: () => abrirModalVinculoTp(vinculo) }),
    criarBotaoTp({ texto: "🗑️", classe: "tp-botao-icone", titulo: "Excluir vínculo",
      aoClicar: () => excluirVinculoTp(vinculo) }));
  return item;
}

/**
 * Cria a lista de professores vinculados (etiquetas) de uma turma.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {HTMLElement} Lista ou aviso de turma sem professor.
 */
function criarListaVinculosTp(turmaCodigo) {
  const vinculos = vinculosDaTurmaTp(turmaCodigo);
  if (!vinculos.length) return criarElementoTp("span", "tp-detalhe", TEXTO_SEM_PROFESSOR_TP);

  const lista = criarElementoTp("ul", "tp-lista-professores");
  lista.append(...vinculos.map(criarEtiquetaVinculoTp));
  return lista;
}

/**
 * Monta a linha de uma turma: Vincular Professor | Turma | Turno / horário | Professores.
 * @param {Object} turma - Linha da tabela turma.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaTurmaTp(turma) {
  const linha = criarElementoTp("tr");
  const celulaBotao = criarElementoTp("td", "tp-celula-acoes");
  celulaBotao.append(criarBotaoTp({ texto: TEXTO_VINCULAR_PROFESSOR_TP,
    classe: "guia-botao tp-botao-pequeno", aoClicar: () => abrirModalTurmaTp(turma.codigo) }));
  const celulaTurma = criarElementoTp("td", "", turma.codigo + " — " + (turma.nome || ""));
  celulaTurma.append(criarElementoTp("span", "tp-detalhe", montarUnidadeTurma(turma)));
  const celulaTurno = criarElementoTp("td", "", turma.turno || "");
  celulaTurno.append(criarElementoTp("span", "tp-detalhe", turma.horario || ""));
  const celulaProfessores = criarElementoTp("td");
  celulaProfessores.append(criarListaVinculosTp(turma.codigo));
  linha.append(celulaBotao, celulaTurma, celulaTurno, celulaProfessores);
  return linha;
}

/**
 * Diz se a turma combina com a busca (turma, unidade ou nome de professor vinculado).
 * @param {Object} turma - Linha da tabela turma.
 * @param {string} busca - Texto buscado, em minúsculas.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function turmaVisivelTp(turma, busca) {
  if (!busca) return true;
  const professores = vinculosDaTurmaTp(turma.codigo).map((v) => nomeDoProfessorTp(v.professor_id));
  const texto = [descreverTurmaTp(turma), turma.turno, ...professores].join(" ").toLowerCase();
  return texto.includes(busca);
}

/** Desenha a tabela de turmas aplicando a busca. */
function desenharTurmasTp() {
  const busca = elementoTp("tpBusca").value.trim().toLowerCase();
  const visiveis = estadoTp.turmas.filter((turma) => turmaVisivelTp(turma, busca));
  const corpo = elementoTp("tpLinhas");
  if (!visiveis.length) {
    const vazio = criarElementoTp("td", "tp-vazio", "Nenhuma turma encontrada.");
    vazio.colSpan = COLUNAS_TABELA_TP;
    corpo.replaceChildren(criarElementoTp("tr"));
    corpo.firstChild.append(vazio);
  } else {
    corpo.replaceChildren(...visiveis.map(criarLinhaTurmaTp));
  }
  elementoTp("tpResumo").textContent = visiveis.length + " de " + estadoTp.turmas.length +
    " turma(s) · " + estadoTp.vinculos.length + " vínculo(s)";
}

/** Recarrega os vínculos do banco e redesenha a tabela e o modal da turma aberto. */
async function recarregarVinculosTp() {
  estadoTp.vinculos = await estadoTp.repositorio.listarVinculos();
  desenharTurmasTp();
  atualizarModalTurmaTp();
}

/**
 * Exclui um vínculo depois da confirmação.
 * @param {Object} vinculo - Linha da turmaprofessor.
 */
async function excluirVinculoTp(vinculo) {
  const nome = nomeDoProfessorTp(vinculo.professor_id);
  const confirmou = await confirmarPopup(
    "Remover o acesso de " + nome + " à turma " + vinculo.turma_codigo + "?",
    { tipo: "pergunta", titulo: "Excluir vínculo" });
  if (!confirmou) return;
  try {
    await estadoTp.repositorio.excluirVinculo(vinculo.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroTp(erro), { tipo: "erro", titulo: "Vínculo não excluído" });
    return;
  }
  await recarregarVinculosTp();
  await mostrarPopup("Vínculo excluído.", { tipo: "sucesso" });
}

/** Carrega turmas, professores e vínculos e mostra a tela. */
async function carregarDadosTp() {
  const repositorio = estadoTp.repositorio;
  [estadoTp.turmas, estadoTp.professores, estadoTp.vinculos] = await Promise.all([
    repositorio.listarTurmas(), repositorio.listarProfessores(), repositorio.listarVinculos()]);
  desenharTurmasTp();
  elementoTp("tpConteudo").hidden = false;
}

/** Inicia a página: confere login e Professor Administrador e carrega os dados. */
async function iniciarPaginaTp() {
  try {
    estadoTp.repositorio = criarRepositorioTurmasProfessor(await obterClienteSupabase());
    const usuario = await estadoTp.repositorio.usuarioLogado();
    if (!usuario) {
      bloquearPaginaTp(TEXTO_SEM_LOGIN_TP, true);
      return;
    }
    if (!(await estadoTp.repositorio.ehAdministrador())) {
      bloquearPaginaTp(TEXTO_SEM_ADMIN_TP, false);
      return;
    }
    elementoTp("tpBusca").addEventListener("input", desenharTurmasTp);
    ligarEventosModaisTp();
    await carregarDadosTp();
  } catch (erro) {
    bloquearPaginaTp("Erro ao carregar as turmas: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaTp);
