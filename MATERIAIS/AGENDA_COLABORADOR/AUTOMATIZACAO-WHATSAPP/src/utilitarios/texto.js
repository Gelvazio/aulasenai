/**
 * Utilitários de texto.
 */

/**
 * Remove acentos e converte para minúsculas (comparações tolerantes).
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
export function normalizarTexto(texto) {
  if (!texto) return '';

  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

/**
 * Extrai apenas os dígitos de um JID ou telefone.
 * @param {string} valor - JID (5549...@s.whatsapp.net) ou telefone.
 * @returns {string} Somente dígitos da parte do usuário.
 */
export function extrairDigitos(valor) {
  if (!valor) return '';

  return valor.split('@')[0].split(':')[0].replace(/\D/g, '');
}

/**
 * Corta o texto num tamanho máximo, adicionando reticências.
 * @param {string} texto - Texto original.
 * @param {number} tamanho - Tamanho máximo.
 * @returns {string} Texto cortado.
 */
export function resumirTexto(texto, tamanho) {
  if (!texto || texto.length <= tamanho) return texto || '';

  return `${texto.slice(0, tamanho - 1)}…`;
}
