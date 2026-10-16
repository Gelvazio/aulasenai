// Hook PostToolUse: depois de gravar um .js, confere a sintaxe com `node --check`.
// Erro de sintaxe volta para o Claude corrigir. Regra: .claude/rules/claude-code.md

const { execFileSync } = require("child_process");
const { lerEntradaHook, normalizarCaminho, bloquear, liberar } = require("./entrada-hook");

const PADRAO_JAVASCRIPT = /\.(c|m)?js$/;

/**
 * Roda `node --check` no arquivo e devolve o erro, se houver.
 * @param {string} caminho Arquivo .js gravado.
 * @returns {string|null} Saída de erro do node, ou null se a sintaxe está certa.
 */
function conferirSintaxe(caminho) {
  try {
    execFileSync(process.execPath, ["--check", caminho], { stdio: "pipe" });
    return null;
  } catch (erro) {
    return String(erro.stderr || erro.message);
  }
}

/**
 * Lê a entrada e, se for .js, confere a sintaxe.
 * @returns {Promise<void>}
 */
async function executar() {
  const entrada = await lerEntradaHook();
  const dados = entrada.tool_input || {};
  const caminho = normalizarCaminho(dados.file_path);
  if (!PADRAO_JAVASCRIPT.test(caminho)) liberar();
  const erro = conferirSintaxe(caminho);
  if (erro) bloquear(`❌ node --check falhou em ${caminho}:\n${erro}`);
  liberar();
}

executar();
