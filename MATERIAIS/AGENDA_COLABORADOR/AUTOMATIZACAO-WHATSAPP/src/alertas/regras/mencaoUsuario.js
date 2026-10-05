/**
 * Regra: alguém mencionou o usuário (@) num grupo monitorado.
 */
import { TIPOS_REGRA_ALERTA } from '../../config/constantes.js';
import { resumirTexto } from '../../utilitarios/texto.js';

const TAMANHO_TRECHO = 160;

export const regraMencaoUsuario = Object.freeze({
  tipo: TIPOS_REGRA_ALERTA.MENCAO_USUARIO,
  nome: 'Menção a você',
  descricao: 'Avisa quando alguém menciona você (@) num grupo monitorado.',
  campos: [],

  /**
   * Esta regra não tem parâmetros.
   * @returns {boolean} Sempre true.
   */
  validarParametros() {
    return true;
  },

  /**
   * Avalia uma mensagem nova.
   * @param {object} mensagem - Mensagem normalizada.
   * @returns {{titulo: string, detalhe: string}|null} Dados do alerta ou null.
   */
  avaliar(mensagem) {
    if (!mensagem.mencionaUsuario) return null;

    return {
      titulo: `${mensagem.autorNome || 'Alguém'} mencionou você em ${mensagem.grupoNome || 'grupo'}`,
      detalhe: resumirTexto(mensagem.texto, TAMANHO_TRECHO),
    };
  },
});
