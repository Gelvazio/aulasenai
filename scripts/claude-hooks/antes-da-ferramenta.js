// Hook PreToolUse: bloqueia ações proibidas pelas regras do projeto antes de acontecerem.
// Configurado em .claude/settings.json. Regra: .claude/rules/claude-code.md

const { lerEntradaHook, bloquear, liberar } = require("./entrada-hook");
const { verificarBloqueios } = require("./regras-bloqueio");

/**
 * Lê a entrada, aplica as regras de bloqueio e encerra (bloqueia ou libera).
 * @returns {Promise<void>}
 */
async function executar() {
  const entrada = await lerEntradaHook();
  const mensagem = verificarBloqueios(entrada);
  if (mensagem) bloquear(mensagem);
  liberar();
}

executar();
