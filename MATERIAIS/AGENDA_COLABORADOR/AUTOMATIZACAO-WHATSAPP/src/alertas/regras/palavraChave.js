/**
 * Regra: mensagem contém alguma das palavras-chave cadastradas (sem acento/caixa).
 */
import { LIMITES_CONFIGURACAO, TIPOS_REGRA_ALERTA } from '../../config/constantes.js';
import { normalizarTexto, resumirTexto } from '../../utilitarios/texto.js';

const TAMANHO_TRECHO = 160;

export const regraPalavraChave = Object.freeze({
  tipo: TIPOS_REGRA_ALERTA.PALAVRA_CHAVE,
  nome: 'Palavra-chave',
  descricao: 'Avisa quando uma mensagem contém uma das palavras ou expressões informadas.',
  campos: [{ nome: 'palavras', rotulo: 'Palavras (uma por linha)', tipo: 'lista', padrao: [] }],

  /**
   * Valida os parâmetros da regra.
   * @param {{palavras?: unknown}} parametros - Parâmetros informados.
   * @returns {boolean} true se válidos.
   */
  validarParametros(parametros) {
    const palavras = parametros?.palavras;
    if (!Array.isArray(palavras) || palavras.length === 0) return false;

    const dentroDoLimite = palavras.length <= LIMITES_CONFIGURACAO.MAXIMO_PALAVRAS_CHAVE;
    return (
      dentroDoLimite && palavras.every((palavra) => typeof palavra === 'string' && palavra.trim())
    );
  },

  /**
   * Avalia uma mensagem nova.
   * @param {object} mensagem - Mensagem normalizada (com grupoNome).
   * @param {{regra: object}} contexto - Regra com parâmetros.
   * @returns {{titulo: string, detalhe: string}|null} Dados do alerta ou null.
   */
  avaliar(mensagem, contexto) {
    const texto = normalizarTexto(mensagem.texto);
    const encontrada = contexto.regra.parametros.palavras.find((palavra) =>
      texto.includes(normalizarTexto(palavra.trim()))
    );
    if (!encontrada) return null;

    return {
      titulo: `"${encontrada}" em ${mensagem.grupoNome || 'grupo'}`,
      detalhe: `${mensagem.autorNome}: ${resumirTexto(mensagem.texto, TAMANHO_TRECHO)}`,
    };
  },
});
