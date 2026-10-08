// Coluna "Líder" da tela ALUNOS (alunos.html): interruptor ON/OFF com que o professor marca o
// aluno líder (usuario.lider = 1 ligado, 0 desligado), que passa a cadastrar e alterar as equipes
// da própria turma. Grava pela função do banco definir_lider_usuario (só o professor que vê o
// aluno). Plano: docs/aluno-lider-cadastra-equipes.md. Depende de turmas-aluno-pagina.js
// (estadoTa, criarElementoTa), de popup.js e do estilo .guia-interruptor
// (assets/css/criar-usuarios-comando.css).

const TEXTO_LIDER_ON_TA = "ON";
const TEXTO_LIDER_OFF_TA = "OFF";

/**
 * Atualiza o texto ON/OFF ao lado do interruptor.
 * @param {HTMLInputElement} interruptor - Caixa do interruptor.
 * @param {HTMLElement} rotulo - Texto ON/OFF.
 * @returns {void}
 */
function pintarLiderTa(interruptor, rotulo) {
  rotulo.textContent = interruptor.checked ? TEXTO_LIDER_ON_TA : TEXTO_LIDER_OFF_TA;
  rotulo.classList.toggle("ta-lider__texto--on", interruptor.checked);
}

/**
 * Grava a escolha de líder no banco; se falhar, volta ao valor anterior e avisa.
 * @param {{interruptor: HTMLInputElement, rotulo: HTMLElement}} controle - Interruptor e texto.
 * @param {Object} aluno - Aluno (linha de usuario já carregada).
 * @returns {Promise<void>}
 */
async function gravarLiderTa(controle, aluno) {
  const { interruptor, rotulo } = controle;
  const lider = interruptor.checked ? 1 : 0;
  interruptor.disabled = true;
  try {
    await estadoTa.repositorio.definirLider(aluno.id, lider);
    aluno.lider = lider;
    const texto = lider ? " agora é líder e pode cadastrar e alterar as equipes da turma."
      : " deixou de ser líder.";
    await mostrarPopup((aluno.nome_completo || "O aluno") + texto, { tipo: "sucesso" });
  } catch (erro) {
    interruptor.checked = aluno.lider === 1;
    await mostrarPopup("Não foi possível gravar o líder: " + (erro?.message || erro),
      { tipo: "erro" });
  } finally {
    interruptor.disabled = false;
    pintarLiderTa(interruptor, rotulo);
  }
}

/**
 * Cria a célula "Líder" (interruptor ON/OFF) de um aluno vinculado.
 * @param {Object} aluno - Aluno (linha de usuario com id e lider).
 * @returns {HTMLTableCellElement} Célula com o interruptor ("—" se o aluno não tem cadastro).
 */
function criarCelulaLiderTa(aluno) {
  if (!aluno?.id) return criarElementoTa("td", "", "—");

  const interruptor = criarElementoTa("input", "guia-interruptor");
  interruptor.type = "checkbox";
  interruptor.setAttribute("role", "switch");
  interruptor.setAttribute("aria-label", "Líder: " + (aluno.nome_completo || ""));
  interruptor.checked = aluno.lider === 1;
  const rotulo = criarElementoTa("span", "ta-lider__texto");
  pintarLiderTa(interruptor, rotulo);
  interruptor.addEventListener("change", () => gravarLiderTa({ interruptor, rotulo }, aluno));
  const caixa = criarElementoTa("label", "ta-lider");
  caixa.append(interruptor, rotulo);
  const celula = criarElementoTa("td");
  celula.append(caixa);
  return celula;
}
