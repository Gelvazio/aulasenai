// ── Página turmas.html: CRUD de turmaprofessor ──────────────────
// Tela do Professor Administrador para vincular professores às turmas. Os dados vêm de
// assets/js/turmas-professor-repositorio.js; avisos e confirmações usam assets/js/popup.js.
// A segurança fica no banco (RLS + eh_professor_administrador + trigger de perfil PROFESSOR).

const CODIGO_VINCULO_REPETIDO = "23505";
const TEXTO_SEM_LOGIN_TP = "Entre com a conta do Professor Administrador para gerenciar as turmas.";
const TEXTO_SEM_ADMIN_TP = "Acesso restrito ao Professor Administrador.";
const TEXTO_BOTAO_VINCULAR = "Vincular";
const TEXTO_BOTAO_SALVAR = "Salvar alteração";
const TITULO_NOVO_VINCULO = "Novo vínculo";
const TITULO_EDITAR_VINCULO = "Editar vínculo";
const VALOR_TODAS_TURMAS = "";
const ROTA_LOGIN_TP = "login.html";

const estadoTp = { repositorio: null, turmas: [], professores: [], vinculos: [], editandoId: null };

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
 * Descreve uma turma para as listas: "122552 — AI OPIR 2026/1 V1 (Tarde)".
 * @param {Object} turma - Linha da tabela turma.
 * @returns {string} Texto da turma.
 */
function descreverTurmaTp(turma) {
  const turno = turma.turno ? " (" + turma.turno + ")" : "";
  return turma.codigo + " — " + (turma.nome || "") + turno;
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

/** Preenche as listas de turma, professor e filtro com os dados carregados. */
function preencherListasTp() {
  const turmas = estadoTp.turmas.map((t) => ({ valor: t.codigo, texto: descreverTurmaTp(t) }));
  const professores = estadoTp.professores.map((p) => ({ valor: p.id, texto: descreverProfessorTp(p) }));
  preencherSelectTp(elementoTp("tpTurma"), turmas, "Escolha a turma");
  preencherSelectTp(elementoTp("tpProfessor"), professores, "Escolha o professor");
  preencherSelectTp(elementoTp("tpFiltroTurma"), turmas, "Todas as turmas");
}

/**
 * Formata a data de criação no padrão brasileiro.
 * @param {string} iso - Data ISO.
 * @returns {string} Data e hora.
 */
function formatarDataTp(iso) {
  return iso ? new Date(iso).toLocaleString("pt-BR") : "";
}

/**
 * Cria uma célula com texto principal e detalhe menor.
 * @param {string} principal - Texto principal.
 * @param {string} [detalhe] - Texto secundário.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaTp(principal, detalhe) {
  const celula = criarElementoTp("td", "", principal);
  if (detalhe) celula.append(criarElementoTp("span", "tp-detalhe", detalhe));
  return celula;
}

/**
 * Cria a célula com os botões Editar e Excluir de um vínculo.
 * @param {Object} vinculo - Linha da turmaprofessor.
 * @returns {HTMLTableCellElement} Célula de ações.
 */
function criarCelulaAcoesTp(vinculo) {
  const celula = criarElementoTp("td", "tp-celula-acoes");
  const editar = criarElementoTp("button", "guia-botao tp-botao-pequeno", "✏️ Editar");
  const excluir = criarElementoTp("button", "guia-botao tp-botao-pequeno tp-botao-perigo", "🗑️ Excluir");
  editar.type = "button";
  excluir.type = "button";
  editar.addEventListener("click", () => iniciarEdicaoTp(vinculo));
  excluir.addEventListener("click", () => excluirVinculoTp(vinculo));
  celula.append(editar, excluir);
  return celula;
}

/**
 * Monta a linha da tabela de um vínculo.
 * @param {Object} vinculo - Linha da turmaprofessor.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaVinculoTp(vinculo) {
  const turma = estadoTp.turmas.find((t) => t.codigo === vinculo.turma_codigo) || {};
  const professor = estadoTp.professores.find((p) => p.id === vinculo.professor_id) || {};
  const linha = criarElementoTp("tr", vinculo.id === estadoTp.editandoId ? "tp-linha--editando" : "");
  linha.append(
    criarCelulaTp(vinculo.turma_codigo + " — " + (turma.nome || ""), turma.local || ""),
    criarCelulaTp(turma.turno || "", turma.horario || ""),
    criarCelulaTp(professor.nome_completo || "(usuário sem cadastro)", professor.email || vinculo.professor_id),
    criarCelulaTp(formatarDataTp(vinculo.criado_em)),
    criarCelulaAcoesTp(vinculo),
  );
  return linha;
}

/** Desenha a tabela de vínculos aplicando o filtro de turma. */
function desenharVinculosTp() {
  const filtro = elementoTp("tpFiltroTurma").value;
  const visiveis = estadoTp.vinculos.filter((v) => filtro === VALOR_TODAS_TURMAS || v.turma_codigo === filtro);
  const corpo = elementoTp("tpLinhas");
  if (!visiveis.length) {
    const vazio = criarElementoTp("td", "tp-vazio", "Nenhum vínculo cadastrado.");
    vazio.colSpan = 5;
    corpo.replaceChildren(criarElementoTp("tr"));
    corpo.firstChild.append(vazio);
  } else {
    corpo.replaceChildren(...visiveis.map(criarLinhaVinculoTp));
  }
  elementoTp("tpResumo").textContent = visiveis.length + " de " + estadoTp.vinculos.length + " vínculo(s)";
}

/** Volta o formulário para "Novo vínculo". */
function limparFormularioTp() {
  estadoTp.editandoId = null;
  elementoTp("tpFormulario").reset();
  elementoTp("tpTituloFormulario").textContent = TITULO_NOVO_VINCULO;
  elementoTp("tpSalvar").textContent = TEXTO_BOTAO_VINCULAR;
  elementoTp("tpCancelar").hidden = true;
  desenharVinculosTp();
}

/**
 * Coloca um vínculo no formulário para alteração.
 * @param {Object} vinculo - Linha da turmaprofessor.
 */
function iniciarEdicaoTp(vinculo) {
  estadoTp.editandoId = vinculo.id;
  elementoTp("tpTurma").value = vinculo.turma_codigo;
  elementoTp("tpProfessor").value = vinculo.professor_id;
  elementoTp("tpTituloFormulario").textContent = TITULO_EDITAR_VINCULO;
  elementoTp("tpSalvar").textContent = TEXTO_BOTAO_SALVAR;
  elementoTp("tpCancelar").hidden = false;
  desenharVinculosTp();
  elementoTp("tpFormulario").scrollIntoView({ behavior: "smooth" });
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

/** Recarrega os vínculos do banco e redesenha a tabela. */
async function recarregarVinculosTp() {
  estadoTp.vinculos = await estadoTp.repositorio.listarVinculos();
  desenharVinculosTp();
}

/**
 * Grava o formulário: cria um vínculo novo ou altera o que está em edição.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarVinculoTp(evento) {
  evento.preventDefault();
  const vinculo = { turma_codigo: elementoTp("tpTurma").value, professor_id: elementoTp("tpProfessor").value };
  const camposPreenchidos = vinculo.turma_codigo && vinculo.professor_id;
  if (!camposPreenchidos) {
    await mostrarPopup("Escolha a turma e o professor.", { tipo: "aviso" });
    return;
  }
  const editando = estadoTp.editandoId !== null;
  try {
    if (editando) await estadoTp.repositorio.alterarVinculo(estadoTp.editandoId, vinculo);
    else await estadoTp.repositorio.criarVinculo(vinculo);
  } catch (erro) {
    await mostrarPopup(mensagemErroTp(erro), { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  await recarregarVinculosTp();
  limparFormularioTp();
  await mostrarPopup(editando ? "Vínculo alterado." : "Professor vinculado à turma.", { tipo: "sucesso" });
}

/**
 * Exclui um vínculo depois da confirmação.
 * @param {Object} vinculo - Linha da turmaprofessor.
 */
async function excluirVinculoTp(vinculo) {
  const professor = estadoTp.professores.find((p) => p.id === vinculo.professor_id);
  const nome = professor?.nome_completo || professor?.email || "este professor";
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
  if (estadoTp.editandoId === vinculo.id) limparFormularioTp();
  await recarregarVinculosTp();
  await mostrarPopup("Vínculo excluído.", { tipo: "sucesso" });
}

/** Carrega turmas, professores e vínculos e mostra a tela. */
async function carregarDadosTp() {
  const repositorio = estadoTp.repositorio;
  [estadoTp.turmas, estadoTp.professores, estadoTp.vinculos] = await Promise.all([
    repositorio.listarTurmas(), repositorio.listarProfessores(), repositorio.listarVinculos()]);
  preencherListasTp();
  desenharVinculosTp();
  elementoTp("tpConteudo").hidden = false;
}

/** Liga os eventos do formulário e do filtro. */
function ligarEventosTp() {
  elementoTp("tpFormulario").addEventListener("submit", salvarVinculoTp);
  elementoTp("tpCancelar").addEventListener("click", limparFormularioTp);
  elementoTp("tpFiltroTurma").addEventListener("change", desenharVinculosTp);
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
    ligarEventosTp();
    await carregarDadosTp();
  } catch (erro) {
    bloquearPaginaTp("Erro ao carregar as turmas: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaTp);
