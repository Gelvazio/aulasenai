// Hook SessionStart: coloca no contexto o checklist de início (essentials.md, seção 3).
// O que sai na saída padrão vira contexto da sessão. Regra: .claude/rules/claude-code.md

const fs = require("fs");
const path = require("path");

const CAMINHO_ESSENTIALS = path.join(__dirname, "..", "..", ".claude", "rules", "essentials.md");
const PADRAO_CHECKLIST = /## 3\. Checklist\s*```\s*([\s\S]*?)```/;
const TITULO = "⚡ Início de sessão (essentials.md) — antes de qualquer coisa:";
const LEMBRETE_TASK =
  "☐ Todo pedido que muda algo: criar → publicar → assumir a TASK (AGENTS.md, regra 1)";

/**
 * Lê o checklist do essentials.md.
 * @returns {string} Linhas do checklist, ou "" se o arquivo não existir.
 */
function lerChecklist() {
  try {
    const texto = fs.readFileSync(CAMINHO_ESSENTIALS, "utf8");
    const achado = texto.match(PADRAO_CHECKLIST);
    return achado ? achado[1].trim() : "";
  } catch {
    return "";
  }
}

process.stdout.write([TITULO, LEMBRETE_TASK, lerChecklist()].filter(Boolean).join("\n") + "\n");
