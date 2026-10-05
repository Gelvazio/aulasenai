/**
 * Extrai um objeto JSON do texto devolvido pela IA (tolerando cercas de código e texto extra).
 */

/**
 * Tenta interpretar o texto como objeto JSON.
 * @param {string} texto - Texto da resposta da IA.
 * @returns {object|null} Objeto encontrado ou null.
 */
export function extrairJson(texto) {
  if (!texto) return null;

  const semCercas = texto.replace(/```(?:json)?/gi, '').trim();
  const inicio = semCercas.indexOf('{');
  const fim = semCercas.lastIndexOf('}');
  if (inicio < 0 || fim <= inicio) return null;

  try {
    const dados = JSON.parse(semCercas.slice(inicio, fim + 1));
    return dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : null;
  } catch {
    return null;
  }
}
