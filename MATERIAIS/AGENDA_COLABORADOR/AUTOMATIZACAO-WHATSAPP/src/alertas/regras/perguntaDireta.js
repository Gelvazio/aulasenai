/**
 * Regra periódica: pergunta que menciona o usuário e ficou sem resposta dele por X minutos.
 */
import { ALERTAS, AGENDADOR, TIPOS_REGRA_ALERTA } from '../../config/constantes.js';
import { resumirTexto } from '../../utilitarios/texto.js';

const TAMANHO_TRECHO = 160;
const MINUTOS_PADRAO = ALERTAS.PERGUNTA_SEM_RESPOSTA_MS / AGENDADOR.MS_POR_MINUTO;
const MINUTOS_MAXIMOS = 7 * 24 * 60;

export const regraPerguntaDireta = Object.freeze({
  tipo: TIPOS_REGRA_ALERTA.PERGUNTA_DIRETA,
  nome: 'Pergunta sem resposta',
  descricao: 'Avisa quando uma pergunta que menciona você fica sem resposta sua por um tempo.',
  campos: [
    { nome: 'minutos', rotulo: 'Minutos sem resposta', tipo: 'numero', padrao: MINUTOS_PADRAO },
  ],

  /**
   * Valida o parâmetro opcional `minutos`.
   * @param {{minutos?: unknown}} parametros - Parâmetros.
   * @returns {boolean} true se válido.
   */
  validarParametros(parametros) {
    const minutos = parametros?.minutos ?? MINUTOS_PADRAO;
    return Number.isInteger(minutos) && minutos >= 1 && minutos <= MINUTOS_MAXIMOS;
  },

  /**
   * Não avalia mensagens individuais (é verificada periodicamente).
   * @returns {null} Sempre null.
   */
  avaliar() {
    return null;
  },

  /**
   * Busca perguntas cujo prazo venceu desde a verificação anterior.
   * @param {{regra: object, repositorios: object}} contexto - Regra e repositórios.
   * @returns {{grupoJid: string, mensagemId: string, titulo: string, detalhe: string}[]} Alertas.
   */
  avaliarPeriodico(contexto) {
    const minutos = contexto.regra.parametros.minutos || MINUTOS_PADRAO;
    const ate = Date.now() - minutos * AGENDADOR.MS_POR_MINUTO;
    const desde = ate - ALERTAS.INTERVALO_VERIFICACAO_PERGUNTAS_MS;
    const perguntas = contexto.repositorios.mensagens.listarPerguntasSemResposta({
      desde: new Date(desde).toISOString(),
      ate: new Date(ate).toISOString(),
    });
    return perguntas.map((pergunta) => ({
      grupoJid: pergunta.grupo_jid,
      mensagemId: pergunta.id,
      titulo: `Pergunta de ${pergunta.autor_nome || 'alguém'} sem sua resposta há ${minutos} min`,
      detalhe: resumirTexto(pergunta.texto, TAMANHO_TRECHO),
    }));
  },
});
