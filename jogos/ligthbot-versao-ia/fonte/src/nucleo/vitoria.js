// Regra de vitória: todas as lâmpadas-objetivo do mundo precisam estar acesas.

/**
 * Informa se todas as lâmpadas-objetivo estão acesas.
 * @param {{objetivos: Set<string>, luzes: Set<string>}} mundo - Mundo atual.
 * @returns {boolean} true se há objetivos e todos estão acesos; false caso contrário.
 */
export function todasLuzesAcesas(mundo) {
  if (mundo.objetivos.size === 0) return false;

  return [...mundo.objetivos].every((chave) => mundo.luzes.has(chave));
}
