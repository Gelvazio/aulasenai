// Leitura da entrada dos hooks do Claude Code e saídas padronizadas (bloquear / avisar).
// Os hooks recebem um JSON pela entrada padrão (tool_name, tool_input…). Regra:
// .claude/rules/claude-code.md

const CODIGO_SAIDA_OK = 0;
const CODIGO_SAIDA_BLOQUEIO = 2;

/**
 * Lê toda a entrada padrão e converte em objeto.
 * @returns {Promise<object>} Entrada do hook, ou objeto vazio se não for JSON válido.
 */
async function lerEntradaHook() {
  const partes = [];
  for await (const parte of process.stdin) partes.push(parte);
  const texto = Buffer.concat(partes).toString("utf8").trim();
  if (!texto) return {};
  try {
    return JSON.parse(texto);
  } catch {
    return {};
  }
}

/**
 * Normaliza o caminho para barras "/" (Windows e Linux comparam igual).
 * @param {string} caminho Caminho de arquivo, possivelmente com "\".
 * @returns {string} Caminho com "/".
 */
function normalizarCaminho(caminho) {
  return String(caminho || "").replace(/\\/g, "/");
}

/**
 * Encerra o hook bloqueando a ação; a mensagem volta para o Claude.
 * @param {string} mensagem Motivo do bloqueio e o que fazer no lugar.
 * @returns {never} Encerra o processo com código 2.
 */
function bloquear(mensagem) {
  process.stderr.write(`${mensagem}\n`);
  process.exit(CODIGO_SAIDA_BLOQUEIO);
}

/**
 * Encerra o hook liberando a ação.
 * @returns {never} Encerra o processo com código 0.
 */
function liberar() {
  process.exit(CODIGO_SAIDA_OK);
}

module.exports = { lerEntradaHook, normalizarCaminho, bloquear, liberar };
