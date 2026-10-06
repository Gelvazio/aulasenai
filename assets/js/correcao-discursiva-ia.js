// ── Apoio da IA na página correcao-discursiva.html ─────────────────
// Monta o texto (prompt) para colar numa IA e lê a resposta dela no formato
// "ITEM 01-a: 0,3 | comentário". A página NÃO chama nenhuma API de IA (nenhuma chave no site);
// a nota sugerida só vale depois que o professor confirma e salva. O nome do aluno não vai no
// prompt (dados pessoais ficam fora da IA).

const LETRAS_TOPICO_IA = "abcdefghijklmnopqrstuvwxyz";
const PADRAO_LINHA_IA = /ITEM\s*(\d+)\s*-\s*([a-z])\s*[:=]\s*(\d+(?:[.,]\d+)?)\s*(?:\|\s*(.*))?$/i;
const REGRAS_PROMPT_IA = [
  "Você é o corretor de uma avaliação discursiva de um curso técnico do SENAI.",
  "Corrija CADA TÓPICO isoladamente, comparando a resposta do aluno com a resposta esperada " +
    "e os critérios do tópico.",
  "Dê somente uma destas notas: nota cheia, metade ou zero (valores em cada tópico).",
  "Aceite: ; ou , nas fórmulas, nomes de funções com ou sem acento, 0 ou FALSO na busca " +
    "exata, ponto ou vírgula decimal e arredondamento de até ± 0,01.",
  "Erros de português não descontam se a ideia estiver clara.",
  "Responda SOMENTE com uma linha por tópico, exatamente neste formato:",
  "ITEM 01-a: 0,3 | justificativa curta",
];

/**
 * Letra do tópico (1 → a, 2 → b...).
 * @param {number} topico - Número do tópico.
 * @returns {string} Letra.
 */
function letraTopicoIa(topico) {
  return LETRAS_TOPICO_IA.charAt(Number(topico) - 1) || String(topico);
}

/**
 * Formata um número com vírgula decimal (0.15 → "0,15").
 * @param {number} valor - Número.
 * @returns {string} Número formatado.
 */
function formatarNotaIa(valor) {
  return String(Number(valor)).replace(".", ",");
}

/**
 * Bloco do prompt de um tópico.
 * @param {Object} topico - Tópico (item, topico, enunciado, pontos, resposta_esperada, criterios).
 * @param {string} resposta - Resposta do aluno.
 * @returns {string} Texto do bloco.
 */
function blocoTopicoIa(topico, resposta) {
  const numeroItem = String(topico.item).padStart(2, "0");
  const rotulo = "ITEM " + numeroItem + "-" + letraTopicoIa(topico.topico);
  const pontos = formatarNotaIa(topico.pontos);
  return [
    "### " + rotulo + " (vale " + pontos + "; metade = " +
      formatarNotaIa(Number(topico.pontos) / 2) + ")",
    "Enunciado: " + topico.enunciado,
    "Resposta esperada: " + (topico.resposta_esperada || "(não informada)"),
    "Critérios: " + (topico.criterios || "(não informados)"),
    "Resposta do aluno: " + (resposta || "(em branco)"),
  ].join("\n");
}

/**
 * Monta o prompt completo da tentativa.
 * @param {string} titulo - Nome da avaliação.
 * @param {Object[]} topicos - Tópicos da avaliação.
 * @param {Map<string, string>} respostas - Texto por chave "item-topico".
 * @returns {string} Prompt para colar na IA.
 */
function montarPromptIa(titulo, topicos, respostas) {
  const blocos = topicos.map((topico) =>
    blocoTopicoIa(topico, respostas.get(topico.item + "-" + topico.topico)));
  return [...REGRAS_PROMPT_IA, "", "Avaliação: " + titulo, "", ...blocos].join("\n\n");
}

/**
 * Lê a resposta da IA e devolve as sugestões por tópico.
 * @param {string} texto - Texto colado pelo professor.
 * @returns {Map<string, {nota: number, comentario: string}>} Sugestão por chave "item-topico".
 */
function lerSugestoesIa(texto) {
  const sugestoes = new Map();
  String(texto || "").split(/\r?\n/).forEach((linha) => {
    const achado = linha.trim().replace(/^[-*#\s]+/, "").match(PADRAO_LINHA_IA);
    if (!achado) return;
    const topico = LETRAS_TOPICO_IA.indexOf(achado[2].toLowerCase()) + 1;
    sugestoes.set(Number(achado[1]) + "-" + topico, {
      nota: Number(achado[3].replace(",", ".")), comentario: (achado[4] || "").trim(),
    });
  });
  return sugestoes;
}
