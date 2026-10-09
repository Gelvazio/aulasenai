// ── Página alunos.html: CRUD de turmaaluno ──────────────────────
// Tela dos professores para vincular alunos às turmas. Os dados vêm de
// assets/js/turmas-aluno-repositorio.js; avisos e confirmações usam assets/js/popup.js.
// A segurança fica no banco (RLS com eh_professor() + trigger de perfil ALUNO).

const CODIGO_VINCULO_REPETIDO_TA = "23505";
const TEXTO_SEM_LOGIN_TA = "Entre com uma conta de professor para gerenciar os alunos das turmas.";
const TEXTO_SEM_PROFESSOR_TA = "Acesso restrito aos professores.";
const TEXTO_BOTAO_VINCULAR_TA = "Vincular";
const TEXTO_BOTAO_SALVAR_TA = "Salvar alteração";
const TITULO_NOVO_TA = "Novo vínculo";
const TITULO_EDITAR_TA = "Editar vínculo";
const VALOR_TODAS_TURMAS_TA = "";
const ROTA_LOGIN_TA = "login.html";
const COLUNAS_TABELA_TA = 7;
const FILTRO_TURMA_OK_SIM_TA = "sim";
const FILTRO_TURMA_OK_NAO_TA = "nao";
const TEXTO_TURMA_OK_SIM_TA = "✅ Sim";

const estadoTa = {
  repositorio: null, turmas: [], alunos: [], vinculos: [], editandoId: null,
  sugestoes: [], avisoSugestoes: "",
};

/**
 * Atalho para document.getElementById.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento.
 */
function elementoTa(id) {
  return document.getElementById(id);
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoTa(tag, classe, texto) {
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
function bloquearPaginaTa(texto, comLogin) {
  const bloqueio = elementoTa("taBloqueio");
  bloqueio.replaceChildren(criarElementoTa("p", "", texto));
  if (comLogin) {
    const link = criarElementoTa("a", "guia-botao", "ENTRAR");
    link.href = ROTA_LOGIN_TA + "?voltar=" + encodeURIComponent(location.pathname);
    bloqueio.append(link);
  }
  bloqueio.hidden = false;
  elementoTa("taConteudo").hidden = true;
}

/**
 * Descreve uma turma para as listas: "122552 — AI OPIR 2026/1 V1 (Tarde)".
 * @param {Object} turma - Linha da tabela turma.
 * @returns {string} Texto da turma.
 */
function descreverTurmaTa(turma) {
  return acrescentarUnidadeTurma(turma.codigo + " — " + (turma.nome || ""), turma);
}

/**
 * Descreve um aluno: "Nome — e-mail".
 * @param {Object} aluno - Linha da tabela usuario.
 * @returns {string} Texto do aluno.
 */
function descreverAlunoTa(aluno) {
  return (aluno.nome_completo || aluno.email) + " — " + aluno.email;
}

/**
 * Preenche um <select> com opções.
 * @param {HTMLSelectElement} select - Lista a preencher.
 * @param {{valor: string, texto: string}[]} opcoes - Opções.
 * @param {string} [textoVazio] - Texto da primeira opção vazia (opcional).
 */
function preencherSelectTa(select, opcoes, textoVazio) {
  const itens = textoVazio === undefined ? [] : [{ valor: "", texto: textoVazio }];
  select.replaceChildren(...itens.concat(opcoes).map((opcao) => {
    const elemento = criarElementoTa("option", "", opcao.texto);
    elemento.value = opcao.valor;
    return elemento;
  }));
}

/** Preenche as listas de turma, aluno e filtro com os dados carregados. */
function preencherListasTa() {
  const turmas = estadoTa.turmas.map((t) => ({ valor: t.codigo, texto: descreverTurmaTa(t) }));
  const alunos = estadoTa.alunos.map((a) => ({ valor: a.id, texto: descreverAlunoTa(a) }));
  preencherSelectTa(elementoTa("taTurma"), turmas, "Escolha a turma");
  preencherSelectTa(elementoTa("taAluno"), alunos, "Escolha o aluno");
  preencherSelectTa(elementoTa("taFiltroTurma"), turmas, "Todas as turmas");
}

/**
 * Formata a data de criação no padrão brasileiro.
 * @param {string} iso - Data ISO.
 * @returns {string} Data e hora.
 */
function formatarDataTa(iso) {
  return iso ? new Date(iso).toLocaleString("pt-BR") : "";
}

/**
 * Cria uma célula com texto principal e detalhe menor.
 * @param {string} principal - Texto principal.
 * @param {string} [detalhe] - Texto secundário.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaTa(principal, detalhe) {
  const celula = criarElementoTa("td", "", principal);
  if (detalhe) celula.append(criarElementoTa("span", "tp-detalhe", detalhe));
  return celula;
}

/**
 * Cria a célula com os botões Editar e Excluir de um vínculo.
 * @param {Object} vinculo - Linha da turmaaluno.
 * @returns {HTMLTableCellElement} Célula de ações.
 */
function criarCelulaAcoesTa(vinculo) {
  const celula = criarElementoTa("td", "tp-celula-acoes");
  const editar = criarElementoTa("button", "guia-botao tp-botao-pequeno", "✏️ Editar");
  const excluir = criarElementoTa("button", "guia-botao tp-botao-pequeno tp-botao-perigo", "🗑️ Excluir");
  editar.type = "button";
  excluir.type = "button";
  editar.addEventListener("click", () => iniciarEdicaoTa(vinculo));
  excluir.addEventListener("click", () => excluirVinculoTa(vinculo));
  celula.append(editar, excluir);
  return celula;
}

/**
 * Busca a turma e o aluno de um vínculo nos dados carregados.
 * @param {Object} vinculo - Linha da turmaaluno.
 * @returns {{turma: Object, aluno: Object}} Turma e aluno (objetos vazios se não achar).
 */
function detalharVinculoTa(vinculo) {
  return {
    turma: estadoTa.turmas.find((t) => t.codigo === vinculo.turma_codigo) || {},
    aluno: estadoTa.alunos.find((a) => a.id === vinculo.aluno_id) || {},
  };
}

/**
 * Monta a linha da tabela de um vínculo.
 * @param {Object} vinculo - Linha da turmaaluno.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaVinculoTa(vinculo) {
  const { turma, aluno } = detalharVinculoTa(vinculo);
  const linha = criarElementoTa("tr", vinculo.id === estadoTa.editandoId ? "tp-linha--editando" : "");
  linha.append(
    criarCelulaTa(vinculo.turma_codigo + " — " + (turma.nome || ""), montarUnidadeTurma(turma)),
    criarCelulaTa(turma.turno || "", turma.horario || ""),
    criarCelulaTa(aluno.nome_completo || "(usuário sem cadastro)", aluno.email || vinculo.aluno_id),
    criarCelulaTa(TEXTO_TURMA_OK_SIM_TA),
    criarCelulaLiderTa(aluno),
    criarCelulaTa(formatarDataTa(vinculo.criado_em)),
    criarCelulaAcoesTa(vinculo),
  );
  return linha;
}

/**
 * Diz se o vínculo passa no filtro de turma e na busca por nome/e-mail.
 * @param {Object} vinculo - Linha da turmaaluno.
 * @param {string} filtro - Código da turma ("" = todas).
 * @param {string} busca - Texto buscado, em minúsculas.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function vinculoVisivelTa(vinculo, filtro, busca) {
  const turmaConfere = filtro === VALOR_TODAS_TURMAS_TA || vinculo.turma_codigo === filtro;
  if (!turmaConfere) return false;
  if (!busca) return true;
  const { aluno } = detalharVinculoTa(vinculo);
  return ((aluno.nome_completo || "") + " " + (aluno.email || "")).toLowerCase().includes(busca);
}

/**
 * Diz se o aluno sem turma passa no filtro de turma (turma sugerida) e na busca.
 * @param {Object} sugestao - Linha da função sugestoes_turmaaluno.
 * @param {string} filtro - Código da turma ("" = todas).
 * @param {string} busca - Texto buscado, em minúsculas.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function sugestaoVisivelTa(sugestao, filtro, busca) {
  const turmaConfere = filtro === VALOR_TODAS_TURMAS_TA || sugestao.turma_sugerida === filtro;
  if (!turmaConfere) return false;
  if (!busca) return true;
  const texto = (sugestao.nome_completo || "") + " " + (sugestao.email || "");
  return texto.toLowerCase().includes(busca);
}

/**
 * Código da turma usado no filtro da tabela: com "Só alunos da turma selecionada acima"
 * ligado, vale a turma do formulário; senão, a lista "Filtrar por turma".
 * @returns {string} Código da turma ("" = todas).
 */
function obterFiltroTurmaTa() {
  const seguirTurmaAcima = elementoTa("taFiltroTurmaAcima").checked;
  if (seguirTurmaAcima) return elementoTa("taTurma").value;
  return elementoTa("taFiltroTurma").value;
}

/** Liga/desliga o filtro pela turma do formulário e redesenha a tabela. */
function alternarFiltroTurmaAcimaTa() {
  elementoTa("taFiltroTurma").disabled = elementoTa("taFiltroTurmaAcima").checked;
  desenharVinculosTa();
}

/** Redesenha a tabela quando a turma do formulário muda e o filtro por ela está ligado. */
function aoMudarTurmaFormularioTa() {
  if (elementoTa("taFiltroTurmaAcima").checked) desenharVinculosTa();
}

/**
 * Monta as linhas visíveis: vínculos (Turma OK = Sim) e alunos sem turma (Turma OK = Não),
 * conforme os filtros de turma, Turma OK e busca, ordenadas pela turma.
 * @returns {{linhas: {turma: string, criar: Function}[], sim: number, nao: number}} Linhas
 *   e as quantidades visíveis de cada situação.
 */
function montarLinhasVisiveisTa() {
  const filtro = obterFiltroTurmaTa();
  const turmaOk = elementoTa("taFiltroTurmaOk").value;
  const busca = elementoTa("taBusca").value.trim().toLowerCase();
  const vinculos = turmaOk === FILTRO_TURMA_OK_NAO_TA ? []
    : estadoTa.vinculos.filter((v) => vinculoVisivelTa(v, filtro, busca));
  const sugestoes = turmaOk === FILTRO_TURMA_OK_SIM_TA ? []
    : estadoTa.sugestoes.filter((s) => sugestaoVisivelTa(s, filtro, busca));
  const linhasSim = vinculos.map((vinculo) => ({
    turma: vinculo.turma_codigo, criar: () => criarLinhaVinculoTa(vinculo) }));
  const linhasNao = sugestoes.map((sugestao) => ({
    turma: sugestao.turma_sugerida || "~", criar: () => criarLinhaSugestaoTa(sugestao) }));
  const linhas = linhasSim.concat(linhasNao);
  linhas.sort((a, b) => a.turma.localeCompare(b.turma));
  return { linhas, sim: vinculos.length, nao: sugestoes.length };
}

/** Desenha a tabela "Alunos por turma" aplicando os filtros de turma, Turma OK e a busca. */
function desenharVinculosTa() {
  const { linhas, sim, nao } = montarLinhasVisiveisTa();
  const corpo = elementoTa("taLinhas");
  if (!linhas.length) {
    const vazio = criarElementoTa("td", "tp-vazio", "Nenhum aluno encontrado.");
    vazio.colSpan = COLUNAS_TABELA_TA;
    const linha = criarElementoTa("tr");
    linha.append(vazio);
    corpo.replaceChildren(linha);
  } else {
    corpo.replaceChildren(...linhas.map((item) => item.criar()));
  }
  const total = estadoTa.vinculos.length + estadoTa.sugestoes.length;
  const resumo = linhas.length + " de " + total + " linha(s) · Turma OK: " + sim + " sim, " +
    nao + " não";
  elementoTa("taResumo").textContent = estadoTa.avisoSugestoes
    ? resumo + " · ⚠️ " + estadoTa.avisoSugestoes : resumo;
}

/** Volta o formulário para "Novo vínculo". */
function limparFormularioTa() {
  estadoTa.editandoId = null;
  elementoTa("taFormulario").reset();
  elementoTa("taTituloFormulario").textContent = TITULO_NOVO_TA;
  elementoTa("taSalvar").textContent = TEXTO_BOTAO_VINCULAR_TA;
  elementoTa("taCancelar").hidden = true;
  desenharVinculosTa();
}

/**
 * Coloca um vínculo no formulário para alteração.
 * @param {Object} vinculo - Linha da turmaaluno.
 */
function iniciarEdicaoTa(vinculo) {
  estadoTa.editandoId = vinculo.id;
  elementoTa("taTurma").value = vinculo.turma_codigo;
  elementoTa("taAluno").value = vinculo.aluno_id;
  elementoTa("taTituloFormulario").textContent = TITULO_EDITAR_TA;
  elementoTa("taSalvar").textContent = TEXTO_BOTAO_SALVAR_TA;
  elementoTa("taCancelar").hidden = false;
  desenharVinculosTa();
  elementoTa("taFormulario").scrollIntoView({ behavior: "smooth" });
}

/**
 * Traduz o erro do banco em mensagem para o professor.
 * @param {Object} erro - Erro do Supabase.
 * @returns {string} Mensagem.
 */
function mensagemErroTa(erro) {
  if (erro?.code === CODIGO_VINCULO_REPETIDO_TA) return "Este aluno já está vinculado a esta turma.";
  if (/ALUNO/.test(erro?.message || "")) return "Só usuários com perfil ALUNO podem ser vinculados.";
  return "Não foi possível gravar: " + (erro?.message || erro);
}

/**
 * Busca os alunos sem turma (sugestões) e guarda no estado, com o aviso se houver.
 * @returns {Promise<void>}
 */
async function carregarSugestoesPaginaTa() {
  const { sugestoes, aviso } = await carregarSugestoesTa(estadoTa.repositorio);
  estadoTa.sugestoes = sugestoes;
  estadoTa.avisoSugestoes = aviso;
}

/** Recarrega os vínculos e os alunos sem turma do banco e redesenha a tabela. */
async function recarregarVinculosTa() {
  estadoTa.vinculos = await estadoTa.repositorio.listarVinculos();
  await carregarSugestoesPaginaTa();
  desenharVinculosTa();
}

/**
 * Grava o formulário: cria um vínculo novo ou altera o que está em edição.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarVinculoTa(evento) {
  evento.preventDefault();
  const vinculo = { turma_codigo: elementoTa("taTurma").value, aluno_id: elementoTa("taAluno").value };
  const camposPreenchidos = vinculo.turma_codigo && vinculo.aluno_id;
  if (!camposPreenchidos) {
    await mostrarPopup("Escolha a turma e o aluno.", { tipo: "aviso" });
    return;
  }
  const editando = estadoTa.editandoId !== null;
  try {
    if (editando) await estadoTa.repositorio.alterarVinculo(estadoTa.editandoId, vinculo);
    else await estadoTa.repositorio.criarVinculo(vinculo);
  } catch (erro) {
    await mostrarPopup(mensagemErroTa(erro), { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  await recarregarVinculosTa();
  limparFormularioTa();
  await mostrarPopup(editando ? "Vínculo alterado." : "Aluno vinculado à turma.", { tipo: "sucesso" });
}

/**
 * Exclui um vínculo depois da confirmação.
 * @param {Object} vinculo - Linha da turmaaluno.
 */
async function excluirVinculoTa(vinculo) {
  const { aluno } = detalharVinculoTa(vinculo);
  const nome = aluno.nome_completo || aluno.email || "este aluno";
  const confirmou = await confirmarPopup(
    "Remover " + nome + " da turma " + vinculo.turma_codigo + "?",
    { tipo: "pergunta", titulo: "Excluir vínculo" });
  if (!confirmou) return;
  try {
    await estadoTa.repositorio.excluirVinculo(vinculo.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroTa(erro), { tipo: "erro", titulo: "Vínculo não excluído" });
    return;
  }
  if (estadoTa.editandoId === vinculo.id) limparFormularioTa();
  await recarregarVinculosTa();
  await mostrarPopup("Vínculo excluído.", { tipo: "sucesso" });
}

/** Carrega turmas, alunos, vínculos e alunos sem turma e mostra a tela. */
async function carregarDadosTa() {
  const repositorio = estadoTa.repositorio;
  [estadoTa.turmas, estadoTa.alunos, estadoTa.vinculos] = await Promise.all([
    repositorio.listarTurmas(), repositorio.listarAlunos(), repositorio.listarVinculos()]);
  configurarSugestoesTa({
    repositorio,
    obterTurmas: () => estadoTa.turmas,
    descreverTurma: descreverTurmaTa,
    mensagemErro: mensagemErroTa,
    aoConfirmar: recarregarVinculosTa,
  });
  await carregarSugestoesPaginaTa();
  preencherListasTa();
  desenharVinculosTa();
  elementoTa("taConteudo").hidden = false;
}

/** Liga os eventos do formulário, do filtro e da busca. */
function ligarEventosTa() {
  elementoTa("taFormulario").addEventListener("submit", salvarVinculoTa);
  elementoTa("taCancelar").addEventListener("click", limparFormularioTa);
  elementoTa("taFiltroTurma").addEventListener("change", desenharVinculosTa);
  elementoTa("taFiltroTurmaAcima").addEventListener("change", alternarFiltroTurmaAcimaTa);
  elementoTa("taTurma").addEventListener("change", aoMudarTurmaFormularioTa);
  elementoTa("taFiltroTurmaOk").addEventListener("change", desenharVinculosTa);
  elementoTa("taBusca").addEventListener("input", desenharVinculosTa);
}

/** Inicia a página: confere login e perfil PROFESSOR e carrega os dados. */
async function iniciarPaginaTa() {
  try {
    estadoTa.repositorio = criarRepositorioTurmasAluno(await obterClienteSupabase());
    const usuario = await estadoTa.repositorio.usuarioLogado();
    if (!usuario) {
      bloquearPaginaTa(TEXTO_SEM_LOGIN_TA, true);
      return;
    }
    if (!estadoTa.repositorio.ehProfessor(usuario)) {
      bloquearPaginaTa(TEXTO_SEM_PROFESSOR_TA, false);
      return;
    }
    ligarEventosTa();
    await carregarDadosTa();
  } catch (erro) {
    bloquearPaginaTa("Erro ao carregar os alunos: " + (erro?.message || erro), false);
  }
}

window.addEventListener("load", iniciarPaginaTa);
