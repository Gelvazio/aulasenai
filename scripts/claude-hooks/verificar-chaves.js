// Procura chaves secretas nas linhas que vão entrar no commit (antes do `git commit`).
// A chave anon do Supabase (pública, em js/supabase.js) é permitida; service_role e outras não.
// Regra: .claude/rules/claude-code.md

const { execSync } = require("child_process");

const PADRAO_JWT = /eyJ[A-Za-z0-9_-]{10,}\.([A-Za-z0-9_-]{10,})\.[A-Za-z0-9_-]{10,}/g;
const PAPEL_PUBLICO = "anon";
const PADROES_SEMPRE_SECRETOS = [
  { nome: "chave secreta do Supabase (sb_secret_)", padrao: /sb_secret_[A-Za-z0-9_-]{10,}/ },
  { nome: "chave de API (sk-)", padrao: /\bsk-[A-Za-z0-9_-]{20,}/ },
  {
    nome: "SUPABASE_SERVICE_ROLE_KEY preenchida",
    padrao: /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["'`][^"'`\s]{20,}/,
  },
  { nome: "chave privada", padrao: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];
const TAMANHO_MAXIMO_DIFF = 50 * 1024 * 1024;

/**
 * Lê o papel ("role") gravado no corpo de um JWT.
 * @param {string} corpoBase64 Segunda parte do JWT.
 * @returns {string} Papel, ou "" se não der para ler.
 */
function lerPapelDoJwt(corpoBase64) {
  try {
    const json = Buffer.from(corpoBase64, "base64url").toString("utf8");
    return String(JSON.parse(json).role || "");
  } catch {
    return "";
  }
}

/**
 * Lista os problemas de uma linha adicionada no commit.
 * @param {string} linha Linha adicionada (sem o "+").
 * @returns {string[]} Nomes das chaves encontradas.
 */
function procurarNaLinha(linha) {
  const achados = PADROES_SEMPRE_SECRETOS.filter((item) => item.padrao.test(linha)).map(
    (item) => item.nome
  );
  for (const jwt of linha.matchAll(PADRAO_JWT)) {
    const papel = lerPapelDoJwt(jwt[1]);
    if (papel !== PAPEL_PUBLICO) achados.push(`JWT com papel "${papel || "desconhecido"}"`);
  }
  return achados;
}

/**
 * Lê as linhas adicionadas do commit (staged, ou tudo se o commit usar -a/--all).
 * @param {string} comandoCommit Comando `git commit …` que o Claude vai rodar.
 * @returns {string[]} Linhas adicionadas, sem o "+".
 */
function lerLinhasAdicionadas(comandoCommit) {
  const incluiTudo = /\s(-a|--all|-[a-zA-Z]*a[a-zA-Z]*)(\s|$)/.test(comandoCommit);
  const comandoDiff = incluiTudo ? "git diff HEAD -U0" : "git diff --cached -U0";
  const diff = execSync(comandoDiff, { encoding: "utf8", maxBuffer: TAMANHO_MAXIMO_DIFF });
  return diff
    .split("\n")
    .filter((linha) => linha.startsWith("+") && !linha.startsWith("+++"))
    .map((linha) => linha.slice(1));
}

/**
 * Procura chaves secretas no que vai ser commitado.
 * @param {string} comandoCommit Comando `git commit …`.
 * @returns {string[]} Nomes das chaves encontradas (vazio = pode commitar).
 */
function procurarChavesNoCommit(comandoCommit) {
  let linhas;
  try {
    linhas = lerLinhasAdicionadas(comandoCommit);
  } catch {
    return [];
  }
  const achados = new Set(linhas.flatMap(procurarNaLinha));
  return [...achados];
}

module.exports = { procurarChavesNoCommit };
