/**
 * Tarefa: resumo diário de cada grupo monitorado, cobrindo as 24h que terminam no horário
 * configurado. É idempotente (não repete grupo/período já resumido), então também serve para
 * recuperar o resumo perdido quando o sistema estava desligado.
 */
import { AGENDADOR, CHAVES_CONFIGURACAO, TIPOS_RESUMO } from '../../config/constantes.js';
import { proximaOcorrencia } from '../../utilitarios/datas.js';

/**
 * Calcula a janela de 24h do último horário de resumo já ocorrido.
 * @param {string} horario - HH:MM.
 * @param {string} fuso - Fuso IANA.
 * @returns {{desde: string, ate: string}} Janela ISO.
 */
export function calcularUltimaJanela(horario, fuso) {
  const fim = proximaOcorrencia(horario, fuso).getTime() - AGENDADOR.MS_POR_DIA;
  return {
    desde: new Date(fim - AGENDADOR.MS_POR_DIA).toISOString(),
    ate: new Date(fim).toISOString(),
  };
}

/**
 * Cria a função da tarefa de resumo diário.
 * @param {{servicoResumo: object, servicoConfiguracoes: object, repositorios: object,
 *   fusoHorario: string, logger: import('pino').Logger}} dependencias
 * @returns {() => Promise<number>} Tarefa que devolve quantos resumos gerou.
 */
export function criarTarefaResumoDiario(dependencias) {
  const { servicoResumo, servicoConfiguracoes, repositorios, fusoHorario, logger } = dependencias;

  return async () => {
    if (!servicoResumo.clienteClaude.estaConfigurado()) return 0;

    const horario = servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.HORARIO_RESUMO);
    const minimo = servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.MINIMO_MENSAGENS_RESUMO);
    const janela = calcularUltimaJanela(horario, fusoHorario);
    const totais = new Map(
      repositorios.mensagens
        .contarPorGrupoNoPeriodo(janela)
        .map((linha) => [linha.grupo_jid, linha.total])
    );
    const pendentes = repositorios.grupos.listarMonitorados().filter((grupo) => {
      const temMensagens = (totais.get(grupo.jid) || 0) >= minimo;
      const chave = { grupoJid: grupo.jid, tipo: TIPOS_RESUMO.DIARIO, periodoInicio: janela.desde };
      return temMensagens && !repositorios.resumos.existe(chave);
    });

    let gerados = 0;
    for (const grupo of pendentes) {
      try {
        await servicoResumo.gerarResumo({
          grupoJid: grupo.jid,
          ...janela,
          tipo: TIPOS_RESUMO.DIARIO,
        });
        gerados += 1;
      } catch (erro) {
        logger.error({ grupo: grupo.nome, erro: erro.message }, 'Resumo diário falhou');
      }
    }
    logger.info({ gerados, pendentes: pendentes.length }, 'Resumo diário concluído');
    return gerados;
  };
}
