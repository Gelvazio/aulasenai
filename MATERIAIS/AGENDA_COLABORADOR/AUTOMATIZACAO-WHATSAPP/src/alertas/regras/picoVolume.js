/**
 * Regra: volume de mensagens na última hora muito acima da média do grupo.
 */
import { ALERTAS, AGENDADOR, TIPOS_REGRA_ALERTA } from '../../config/constantes.js';

const MS_POR_HORA = 60 * AGENDADOR.MS_POR_MINUTO;
const FATOR_MAXIMO = 50;
const MINIMO_MAXIMO = 10_000;

/**
 * Lê um número dos parâmetros com valor padrão.
 * @param {unknown} valor - Valor informado.
 * @param {number} padrao - Valor padrão.
 * @returns {number} Número.
 */
function numeroOuPadrao(valor, padrao) {
  return Number.isFinite(valor) && valor > 0 ? valor : padrao;
}

export const regraPicoVolume = Object.freeze({
  tipo: TIPOS_REGRA_ALERTA.PICO_VOLUME,
  nome: 'Pico de mensagens',
  descricao: 'Avisa quando o grupo recebe muito mais mensagens na última hora que a média.',
  campos: [
    {
      nome: 'fator',
      rotulo: 'Vezes acima da média',
      tipo: 'numero',
      padrao: ALERTAS.FATOR_PICO_PADRAO,
    },
    {
      nome: 'minimo',
      rotulo: 'Mínimo de mensagens/hora',
      tipo: 'numero',
      padrao: ALERTAS.MINIMO_PICO_MENSAGENS,
    },
  ],

  /**
   * Valida os parâmetros (opcionais, números positivos dentro de limites).
   * @param {{fator?: unknown, minimo?: unknown}} parametros - Parâmetros.
   * @returns {boolean} true se válidos.
   */
  validarParametros(parametros) {
    const fator = parametros?.fator ?? ALERTAS.FATOR_PICO_PADRAO;
    const minimo = parametros?.minimo ?? ALERTAS.MINIMO_PICO_MENSAGENS;
    const fatorValido = Number.isFinite(fator) && fator >= 1 && fator <= FATOR_MAXIMO;
    return fatorValido && Number.isInteger(minimo) && minimo >= 1 && minimo <= MINIMO_MAXIMO;
  },

  /**
   * Avalia o volume do grupo da mensagem nova.
   * @param {object} mensagem - Mensagem normalizada.
   * @param {{regra: object, repositorios: object}} contexto - Regra e repositórios.
   * @returns {{titulo: string, detalhe: string}|null} Dados do alerta ou null.
   */
  avaliar(mensagem, contexto) {
    const fator = numeroOuPadrao(contexto.regra.parametros.fator, ALERTAS.FATOR_PICO_PADRAO);
    const minimo = numeroOuPadrao(contexto.regra.parametros.minimo, ALERTAS.MINIMO_PICO_MENSAGENS);
    const agora = Date.now();
    const repositorio = contexto.repositorios.mensagens;
    const ultimaHora = repositorio.contarDesde(
      new Date(agora - MS_POR_HORA).toISOString(),
      mensagem.grupoJid
    );
    if (ultimaHora < minimo) return null;

    const inicioMedia = new Date(
      agora - ALERTAS.DIAS_MEDIA_PICO * AGENDADOR.MS_POR_DIA
    ).toISOString();
    const mediaPorHora =
      repositorio.contarDesde(inicioMedia, mensagem.grupoJid) / (ALERTAS.DIAS_MEDIA_PICO * 24);
    if (ultimaHora < fator * mediaPorHora) return null;

    return {
      titulo: `Movimento intenso em ${mensagem.grupoNome || 'grupo'}`,
      detalhe: `${ultimaHora} mensagens na última hora (média: ${mediaPorHora.toFixed(1)}/hora).`,
    };
  },
});
