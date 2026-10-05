/**
 * Logger da aplicação (pino). A mesma instância é repassada ao Baileys.
 */
import pino from 'pino';

/**
 * Cria o logger principal.
 * @param {string} nivel - Nível mínimo de log (trace|debug|info|warn|error).
 * @returns {import('pino').Logger} Instância do logger.
 */
export function criarLogger(nivel) {
  return pino({ level: nivel, base: undefined, timestamp: pino.stdTimeFunctions.isoTime });
}
