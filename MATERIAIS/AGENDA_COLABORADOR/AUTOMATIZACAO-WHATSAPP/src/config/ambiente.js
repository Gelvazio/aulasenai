/**
 * Leitura e validação das variáveis de ambiente (.env carregado via node --env-file).
 */
import { SERVIDOR, FUSO_PADRAO, MENSAGENS_ERRO } from './constantes.js';

/**
 * Lê o process.env e devolve a configuração de ambiente validada.
 * @param {NodeJS.ProcessEnv} [variaveis=process.env] - Fonte das variáveis.
 * @returns {Readonly<{
 *   chaveApiClaude: string, tokenDashboard: string, host: string, porta: number,
 *   meuNumero: string, fusoHorario: string, nivelLog: string, iaConfigurada: boolean
 * }>} Ambiente congelado.
 * @throws {Error} Se DASHBOARD_TOKEN não estiver definido.
 */
export function carregarAmbiente(variaveis = process.env) {
  const tokenDashboard = (variaveis.DASHBOARD_TOKEN || '').trim();
  if (!tokenDashboard) throw new Error(MENSAGENS_ERRO.TOKEN_AUSENTE);

  const chaveApiClaude = (variaveis.ANTHROPIC_API_KEY || '').trim();

  return Object.freeze({
    chaveApiClaude,
    tokenDashboard,
    host: variaveis.HOST_SERVIDOR || SERVIDOR.HOST_PADRAO,
    porta: Number(variaveis.PORTA_SERVIDOR) || SERVIDOR.PORTA_PADRAO,
    meuNumero: (variaveis.MEU_NUMERO || '').replace(/\D/g, ''),
    fusoHorario: variaveis.FUSO_HORARIO || FUSO_PADRAO,
    nivelLog: variaveis.NIVEL_LOG || 'info',
    iaConfigurada: chaveApiClaude.length > 0,
  });
}
