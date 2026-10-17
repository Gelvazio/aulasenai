// Regras de bloqueio do hook PreToolUse. Cada regra é independente: recebe a entrada do hook e
// devolve a mensagem de bloqueio ou null. Regra nova = item novo na lista REGRAS_BLOQUEIO.
// Regra: .claude/rules/claude-code.md

const { normalizarCaminho } = require("./entrada-hook");
const { procurarChavesNoCommit } = require("./verificar-chaves");
const { procurarReservasForaDoModelo } = require("./verificar-modelo");

const FERRAMENTAS_DE_ARQUIVO = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
const CAMINHO_VISUALIZADOR = ".claude/rules/index.html";
const PADRAO_ARQUIVO_TESTE = /(\.(test|spec)\.[cm]?[jt]sx?$)|((^|\/)test_[^/]*\.py$)|(_test\.py$)/;
const PADRAO_TESTE_DE_BUG = /(^|\/)bugs?\/|bug/i;
// Início de comando: começo de linha ou depois de ; & | ( — não pega palavras dentro de textos
// (heredoc, mensagem de commit).
const INICIO_COMANDO = String.raw`(?:^|[;&|(])\s*(?:cd\s+\S+\s*&&\s*)?`;
const PADRAO_GIT_ADD_TUDO = new RegExp(
  INICIO_COMANDO + String.raw`git\s+add\s+(?:[^|;&\n]*\s)?(-A|--all|\.)(?=\s|$|;|&|\|)`, "m"
);
const PADRAO_GIT_COMMIT = new RegExp(INICIO_COMANDO + String.raw`git\s+commit\b`, "m");
const PADRAO_ABRIR_NAVEGADOR = new RegExp(
  INICIO_COMANDO +
    String.raw`(?:npx\s+|node\s+\S*)?(playwright|puppeteer|start\s+chrome|start-process|` +
    String.raw`xdg-open|open\s+-a)\b`,
  "im"
);
const PADRAO_FERRAMENTA_NAVEGADOR = /^mcp__.*(browser|chrome|computer)/i;

/**
 * Caminho do arquivo da ferramenta de arquivo (Write/Edit…), normalizado.
 * @param {object} entrada Entrada do hook.
 * @returns {string} Caminho, ou "" se não for ferramenta de arquivo.
 */
function caminhoDaEntrada(entrada) {
  if (!FERRAMENTAS_DE_ARQUIVO.includes(entrada.tool_name)) return "";
  const dados = entrada.tool_input || {};
  return normalizarCaminho(dados.file_path || dados.notebook_path);
}

/**
 * Comando do Bash da entrada.
 * @param {object} entrada Entrada do hook.
 * @returns {string} Comando, ou "" se não for Bash.
 */
function comandoDaEntrada(entrada) {
  if (entrada.tool_name !== "Bash") return "";
  return String((entrada.tool_input || {}).command || "");
}

const REGRAS_BLOQUEIO = [
  function bloquearGitAddTudo(entrada) {
    if (!PADRAO_GIT_ADD_TUDO.test(comandoDaEntrada(entrada))) return null;
    return "⛔ `git add .` / `-A` é proibido (git-quick.md). Adicione só os arquivos da tarefa.";
  },
  function bloquearChaveNoCommit(entrada) {
    const comando = comandoDaEntrada(entrada);
    if (!PADRAO_GIT_COMMIT.test(comando)) return null;
    const achados = procurarChavesNoCommit(comando);
    if (achados.length === 0) return null;
    return `⛔ Chave secreta no commit: ${achados.join(", ")}. Tire do commit (security-banco.md).`;
  },
  function bloquearReservaDeOutroModelo(entrada) {
    if (!PADRAO_GIT_COMMIT.test(comandoDaEntrada(entrada))) return null;
    let problemas = [];
    try {
      problemas = procurarReservasForaDoModelo();
    } catch {
      return null;
    }
    if (problemas.length === 0) return null;
    return `⛔ Nunca executar tarefa que não é do seu modelo (niveis.md): ${problemas.join("; ")}.`;
  },
  function bloquearVisualizadorAMao(entrada) {
    if (!caminhoDaEntrada(entrada).endsWith(CAMINHO_VISUALIZADOR)) return null;
    return "⛔ `.claude/rules/index.html` é gerado: rode " +
      "`python scripts/regras/gerar_visualizador_regras.py` (visualizador-regras.md).";
  },
  function bloquearArquivoDeTeste(entrada) {
    const caminho = caminhoDaEntrada(entrada);
    const ehTeste = PADRAO_ARQUIVO_TESTE.test(caminho);
    if (!ehTeste || PADRAO_TESTE_DE_BUG.test(caminho)) return null;
    return "⛔ Testes automatizados são proibidos (testes-validacao.md). Exceção: teste de bug " +
      "— o caminho precisa ter \"bug\" (ex.: bugs/bug-nota.test.js).";
  },
  function bloquearNavegador(entrada) {
    const usaFerramenta = PADRAO_FERRAMENTA_NAVEGADOR.test(String(entrada.tool_name || ""));
    const usaComando = PADRAO_ABRIR_NAVEGADOR.test(comandoDaEntrada(entrada));
    if (!usaFerramenta && !usaComando) return null;
    return "⛔ Sem navegador (testes-validacao.md): valide pelo código e peça ao usuário " +
      "para testar.";
  },
];

/**
 * Aplica as regras e devolve a primeira mensagem de bloqueio.
 * @param {object} entrada Entrada do hook.
 * @returns {string|null} Mensagem de bloqueio, ou null se a ação pode seguir.
 */
function verificarBloqueios(entrada) {
  for (const regra of REGRAS_BLOQUEIO) {
    const mensagem = regra(entrada);
    if (mensagem) return mensagem;
  }
  return null;
}

module.exports = { verificarBloqueios };
