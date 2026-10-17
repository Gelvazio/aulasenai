// Trava "nunca executar tarefa que não é do seu modelo" (tarefa #247, global C22): antes do
// `git commit`, confere as reservas novas do `tasks/STATUS.md` — o modelo em "Em uso por" tem de
// ser o do nível da subtarefa (Haiku só LEVE, Sonnet só MEDIO, Opus/Fable só PESADO).
// Regra: .claude/rules/niveis.md

const { execSync } = require("child_process");
const { readFileSync } = require("fs");

const CAMINHO_QUADRO = "tasks/STATUS.md";
const COMANDO_DIFF_QUADRO = `git diff HEAD -U0 -- ${CAMINHO_QUADRO}`;
const TITULO_COLUNA_TITULO = "Título";
const TITULO_COLUNA_MODELO = "Modelo";
const TITULO_COLUNA_RESERVA = "Em uso por";
const PADRAO_LINHA_SUBTAREFA = /^\| #\d+\.\d+ \|/;
const PADRAO_CABECALHO = /^\| Tarefa \| Título \|.*$/m;
const PADRAO_NIVEL = /\b(LEVE|MEDIO|PESADO)\b/;
const PADRAO_MODELO_CLAUDE = /\b(Haiku|Sonnet|Opus|Fable)\b/i;
const PADRAO_CLAUDE_CODE = /^Claude Code\b/;
const RESERVAS_LIVRES = ["", "—", "— (não reservável)"];
const MODELO_DO_USUARIO = "Usuário";
const MODELOS_POR_NIVEL = { LEVE: ["haiku"], MEDIO: ["sonnet"], PESADO: ["opus", "fable"] };
const TAMANHO_MAXIMO_DIFF = 50 * 1024 * 1024;

/**
 * Divide uma linha de tabela Markdown nas células (sem as bordas).
 * @param {string} linha Linha que começa com "|".
 * @returns {string[]} Células sem espaços nas pontas.
 */
function dividirCelulas(linha) {
  return linha.trim().replace(/^\||\|$/g, "").split(" | ").map((celula) => celula.trim());
}

/**
 * Lê as colunas da tabela "📌 Tarefas" do quadro em disco.
 * @returns {string[]} Títulos das colunas, ou [] se não achar o quadro ou o cabeçalho.
 */
function lerColunas() {
  let texto = "";
  try {
    texto = readFileSync(CAMINHO_QUADRO, "utf8");
  } catch {
    return [];
  }
  const achado = texto.match(PADRAO_CABECALHO);
  return achado ? dividirCelulas(achado[0]) : [];
}

/**
 * Linhas de subtarefa acrescentadas ou mudadas no quadro desde o último commit.
 * @returns {string[]} Linhas (sem o "+").
 */
function lerLinhasNovasDoQuadro() {
  const diff = execSync(COMANDO_DIFF_QUADRO, { encoding: "utf8", maxBuffer: TAMANHO_MAXIMO_DIFF });
  return diff
    .split("\n")
    .filter((linha) => linha.startsWith("+") && !linha.startsWith("+++"))
    .map((linha) => linha.slice(1))
    .filter((linha) => PADRAO_LINHA_SUBTAREFA.test(linha));
}

/**
 * Nível exigido pela subtarefa: coluna Modelo (se existir) ou o nível escrito no título.
 * @param {Object<string, string>} celulas Células da linha pelo título da coluna.
 * @returns {string} "LEVE", "MEDIO", "PESADO", "Usuário" ou "" (sem nível).
 */
function nivelDaSubtarefa(celulas) {
  const modelo = celulas[TITULO_COLUNA_MODELO] || "";
  if (modelo.startsWith(MODELO_DO_USUARIO)) return MODELO_DO_USUARIO;
  const achado = (modelo + " " + (celulas[TITULO_COLUNA_TITULO] || "")).match(PADRAO_NIVEL);
  return achado ? achado[1] : "";
}

/**
 * Problema de uma reserva (modelo fora do nível), se houver.
 * @param {string} linha Linha da subtarefa no quadro.
 * @param {string[]} colunas Títulos das colunas da tabela.
 * @returns {string|null} Descrição do problema, ou null se a reserva está certa.
 */
function problemaDaReserva(linha, colunas) {
  const valores = dividirCelulas(linha);
  const celulas = Object.fromEntries(colunas.map((coluna, i) => [coluna, valores[i] || ""]));
  const reserva = celulas[TITULO_COLUNA_RESERVA] || "";
  const ehClaude = PADRAO_CLAUDE_CODE.test(reserva);
  if (RESERVAS_LIVRES.includes(reserva) || !ehClaude) return null;

  const codigo = valores[0];
  const nivel = nivelDaSubtarefa(celulas);
  const modelo = (reserva.match(PADRAO_MODELO_CLAUDE) || [])[1];
  if (nivel === MODELO_DO_USUARIO) return `${codigo} é do usuário (aceite)`;
  if (!nivel) return `${codigo} está sem nível (classificar antes)`;
  if (!modelo) return `${codigo}: a reserva não diz o modelo`;
  if (MODELOS_POR_NIVEL[nivel].includes(modelo.toLowerCase())) return null;
  return `${codigo} é ${nivel} e a reserva é de ${modelo}`;
}

/**
 * Lista as reservas novas do quadro feitas por modelo que não é o do nível.
 * @returns {string[]} Problemas encontrados (vazio = tudo certo).
 * @throws {Error} Se o git falhar (o hook trata como "sem bloqueio").
 */
function procurarReservasForaDoModelo() {
  const colunas = lerColunas();
  if (!colunas.includes(TITULO_COLUNA_RESERVA)) return [];
  return lerLinhasNovasDoQuadro()
    .map((linha) => problemaDaReserva(linha, colunas))
    .filter(Boolean);
}

module.exports = { procurarReservasForaDoModelo };
