/**
 * Regra: mensagem enviada por um contato marcado como importante (configuração contatos_vip).
 */
import { CHAVES_CONFIGURACAO, TIPOS_REGRA_ALERTA } from '../../config/constantes.js';
import { extrairDigitos, resumirTexto } from '../../utilitarios/texto.js';

const TAMANHO_TRECHO = 160;

export const regraAutorVip = Object.freeze({
  tipo: TIPOS_REGRA_ALERTA.AUTOR_VIP,
  nome: 'Contato importante',
  descricao: 'Avisa quando um contato da lista "Contatos VIP" (Configurações) escreve.',
  campos: [],

  /**
   * Esta regra usa a lista das configurações; não tem parâmetros próprios.
   * @returns {boolean} Sempre true.
   */
  validarParametros() {
    return true;
  },

  /**
   * Avalia uma mensagem nova.
   * @param {object} mensagem - Mensagem normalizada.
   * @param {{configuracoes: Record<string, unknown>}} contexto - Configurações atuais.
   * @returns {{titulo: string, detalhe: string}|null} Dados do alerta ou null.
   */
  avaliar(mensagem, contexto) {
    const vips = contexto.configuracoes[CHAVES_CONFIGURACAO.CONTATOS_VIP] || [];
    const numeroAutor = extrairDigitos(mensagem.autorJid);
    const ehVip =
      numeroAutor && vips.some((vip) => numeroAutor.endsWith(vip) || vip.endsWith(numeroAutor));
    if (!ehVip) return null;

    return {
      titulo: `${mensagem.autorNome || numeroAutor} escreveu em ${mensagem.grupoNome || 'grupo'}`,
      detalhe: resumirTexto(mensagem.texto, TAMANHO_TRECHO),
    };
  },
});
