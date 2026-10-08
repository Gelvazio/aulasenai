// ── Página alunos.html: sugestões de vínculo aluno × turma ──────
// Alunos ainda sem turma na turmaaluno (função sugestoes_turmaaluno do banco), com a turma
// sugerida já escolhida e o botão "✅ Confirmar", que grava o vínculo. As linhas entram na
// tabela "Alunos por turma" com Turma OK = Não. A sugestão vem do user_metadata (o aluno pode
// alterá-lo): o professor confirma e o RLS da turmaaluno valida a turma.
// Dependências injetadas por configurarSugestoesTa (SOLID/DIP).

const CODIGO_FUNCAO_AUSENTE_TA = "PGRST202";
const TEXTO_FUNCAO_AUSENTE_TA =
  "Alunos sem turma não listados: aplique no Supabase o arquivo " +
  "database/2026-10-05-sugestoes-turmaaluno.sql.";
const TEXTO_BOTAO_CONFIRMAR_TA = "✅ Confirmar";
const TEXTO_BOTAO_GRAVANDO_TA = "Gravando...";
const TEXTO_TURMA_OK_NAO_TA = "❌ Não";

const estadoSugestoesTa = { contexto: null };

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoSugestaoTa(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/**
 * Guarda as dependências da página usadas pelas linhas de sugestão.
 * @param {{repositorio: Object, obterTurmas: Function, descreverTurma: Function,
 *   mensagemErro: Function, aoConfirmar: Function}} contexto - Repositório e funções da página.
 */
function configurarSugestoesTa(contexto) {
  estadoSugestoesTa.contexto = contexto;
}

/**
 * Busca no banco os alunos sem turma. Sem a função no banco, devolve lista vazia e o aviso.
 * @param {Object} repositorio - Repositório da página (listarSugestoes).
 * @returns {Promise<{sugestoes: Object[], aviso: string}>} Sugestões e aviso ("" = sem aviso).
 */
async function carregarSugestoesTa(repositorio) {
  try {
    return { sugestoes: await repositorio.listarSugestoes(), aviso: "" };
  } catch (erro) {
    const funcaoAusente = erro?.code === CODIGO_FUNCAO_AUSENTE_TA;
    if (funcaoAusente) return { sugestoes: [], aviso: TEXTO_FUNCAO_AUSENTE_TA };
    return { sugestoes: [], aviso: "Erro ao listar alunos sem turma: " + (erro?.message || erro) };
  }
}

/**
 * Cria a lista de turmas da linha, já com a turma sugerida escolhida.
 * @param {string} turmaSugerida - Código sugerido (vazio = nenhuma).
 * @returns {HTMLSelectElement} Lista de turmas.
 */
function criarSelectTurmaSugestaoTa(turmaSugerida) {
  const { obterTurmas, descreverTurma } = estadoSugestoesTa.contexto;
  const select = criarElementoSugestaoTa("select", "guia-filtro ta-sugestao-turma");
  const vazio = criarElementoSugestaoTa("option", "", "Escolha a turma");
  vazio.value = "";
  select.append(vazio, ...obterTurmas().map((turma) => {
    const opcao = criarElementoSugestaoTa("option", "", descreverTurma(turma));
    opcao.value = turma.codigo;
    return opcao;
  }));
  select.value = turmaSugerida || "";
  return select;
}

/**
 * Grava o vínculo do aluno com a turma escolhida na linha.
 * @param {Object} sugestao - Linha da sugestão.
 * @param {HTMLSelectElement} select - Lista de turmas da linha.
 * @param {HTMLButtonElement} botao - Botão Confirmar (desativado durante a gravação).
 */
async function confirmarSugestaoTa(sugestao, select, botao) {
  const { repositorio, mensagemErro, aoConfirmar } = estadoSugestoesTa.contexto;
  const turmaCodigo = select.value;
  if (!turmaCodigo) {
    await mostrarPopup("Escolha a turma antes de confirmar.", { tipo: "aviso" });
    return;
  }
  botao.disabled = true;
  botao.textContent = TEXTO_BOTAO_GRAVANDO_TA;
  try {
    await repositorio.criarVinculo({ turma_codigo: turmaCodigo, aluno_id: sugestao.aluno_id });
  } catch (erro) {
    botao.disabled = false;
    botao.textContent = TEXTO_BOTAO_CONFIRMAR_TA;
    await mostrarPopup(mensagemErro(erro), { tipo: "erro", titulo: "Vínculo não gravado" });
    return;
  }
  await aoConfirmar();
  const nome = sugestao.nome_completo || sugestao.email;
  await mostrarPopup(nome + " foi vinculado(a) à turma " + turmaCodigo + ".", { tipo: "sucesso" });
}

/**
 * Cria uma célula com texto principal e detalhe menor.
 * @param {string} principal - Texto principal.
 * @param {string} [detalhe] - Texto secundário.
 * @returns {HTMLTableCellElement} Célula.
 */
function criarCelulaSugestaoTa(principal, detalhe) {
  const celula = criarElementoSugestaoTa("td", "", principal);
  if (detalhe) celula.append(criarElementoSugestaoTa("span", "tp-detalhe", detalhe));
  return celula;
}

/**
 * Monta a linha de um aluno sem turma: lista de turmas, Turma OK = Não e botão Confirmar.
 * Colunas: Turma | Turno / horário | Aluno | Turma OK | Líder | Vinculado em | Ações.
 * @param {Object} sugestao - Linha da função sugestoes_turmaaluno.
 * @returns {HTMLTableRowElement} Linha.
 */
function criarLinhaSugestaoTa(sugestao) {
  const linha = criarElementoSugestaoTa("tr", "ta-linha-sugestao");
  const select = criarSelectTurmaSugestaoTa(sugestao.turma_sugerida);
  const celulaTurma = criarElementoSugestaoTa("td");
  const detalhe = sugestao.turma_sugerida ? "Turma sugerida" : "Sem sugestão — escolha a turma";
  celulaTurma.append(select, criarElementoSugestaoTa("span", "tp-detalhe", detalhe));
  const botao = criarElementoSugestaoTa("button", "guia-botao tp-botao-pequeno ta-botao-confirmar",
    TEXTO_BOTAO_CONFIRMAR_TA);
  botao.type = "button";
  botao.addEventListener("click", () => confirmarSugestaoTa(sugestao, select, botao));
  const celulaAcao = criarElementoSugestaoTa("td", "tp-celula-acoes");
  celulaAcao.append(botao);
  linha.append(
    celulaTurma,
    criarCelulaSugestaoTa(""),
    criarCelulaSugestaoTa(sugestao.nome_completo || "(sem nome)", sugestao.email || ""),
    criarCelulaSugestaoTa(TEXTO_TURMA_OK_NAO_TA),
    criarCelulaSugestaoTa("—"),
    criarCelulaSugestaoTa("—"),
    celulaAcao,
  );
  return linha;
}
