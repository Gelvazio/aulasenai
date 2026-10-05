/**
 * Tarefa: apaga mensagens mais antigas que a retenção configurada (LGPD).
 */
import { AGENDADOR, CHAVES_CONFIGURACAO } from '../../config/constantes.js';

/**
 * Cria a função da tarefa de limpeza.
 * @param {{repositorios: object, servicoConfiguracoes: object,
 *   logger: import('pino').Logger}} dependencias
 * @returns {() => Promise<number>} Tarefa que devolve quantas mensagens apagou.
 */
export function criarTarefaLimpeza(dependencias) {
  const { repositorios, servicoConfiguracoes, logger } = dependencias;

  return async () => {
    const dias = servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.RETENCAO_DIAS);
    const limite = new Date(Date.now() - dias * AGENDADOR.MS_POR_DIA).toISOString();
    const apagadas = repositorios.mensagens.apagarAnterioresA(limite);
    logger.info({ apagadas, dias }, 'Limpeza por retenção concluída');
    return apagadas;
  };
}
