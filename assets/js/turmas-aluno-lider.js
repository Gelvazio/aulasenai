// Coluna "Líder (1/0)" da tela ALUNOS (alunos.html): o professor marca o aluno líder
// (usuario.lider = 1), que passa a cadastrar e alterar as equipes da própria turma.
// Grava pela função do banco definir_lider_usuario (só o professor que vê o aluno).
// Plano: docs/aluno-lider-cadastra-equipes.md. Depende de turmas-aluno-pagina.js (estadoTa,
// criarElementoTa) e de popup.js.

const VALOR_LIDER_SIM_TA = "1";
const VALOR_LIDER_NAO_TA = "0";
const CLASSE_LIDER_SIM_TA = "ta-lider--sim";

/**
 * Pinta a lista de escolha conforme o valor (1 = líder em destaque).
 * @param {HTMLSelectElement} escolha - Lista 1/0.
 * @returns {void}
 */
function pintarLiderTa(escolha) {
  escolha.classList.toggle(CLASSE_LIDER_SIM_TA, escolha.value === VALOR_LIDER_SIM_TA);
}

/**
 * Grava a escolha de líder no banco; se falhar, volta ao valor anterior e avisa.
 * @param {HTMLSelectElement} escolha - Lista 1/0.
 * @param {Object} aluno - Aluno (linha de usuario já carregada).
 * @returns {Promise<void>}
 */
async function gravarLiderTa(escolha, aluno) {
  const lider = Number(escolha.value);
  escolha.disabled = true;
  try {
    await estadoTa.repositorio.definirLider(aluno.id, lider);
    aluno.lider = lider;
    const texto = lider ? " agora é líder e pode cadastrar e alterar as equipes da turma."
      : " deixou de ser líder.";
    await mostrarPopup((aluno.nome_completo || "O aluno") + texto, { tipo: "sucesso" });
  } catch (erro) {
    escolha.value = String(aluno.lider || 0);
    await mostrarPopup("Não foi possível gravar o líder: " + (erro?.message || erro),
      { tipo: "erro" });
  } finally {
    escolha.disabled = false;
    pintarLiderTa(escolha);
  }
}

/**
 * Cria a célula "Líder (1/0)" de um aluno vinculado.
 * @param {Object} aluno - Aluno (linha de usuario com id e lider).
 * @returns {HTMLTableCellElement} Célula com a lista 1/0 ("—" se o aluno não tem cadastro).
 */
function criarCelulaLiderTa(aluno) {
  if (!aluno?.id) return criarElementoTa("td", "", "—");

  const escolha = criarElementoTa("select", "guia-filtro ta-lider");
  escolha.setAttribute("aria-label", "Líder: " + (aluno.nome_completo || ""));
  escolha.append(new Option("0", VALOR_LIDER_NAO_TA), new Option("1", VALOR_LIDER_SIM_TA));
  escolha.value = String(aluno.lider || 0);
  pintarLiderTa(escolha);
  escolha.addEventListener("change", () => gravarLiderTa(escolha, aluno));
  const celula = criarElementoTa("td");
  celula.append(escolha);
  return celula;
}
