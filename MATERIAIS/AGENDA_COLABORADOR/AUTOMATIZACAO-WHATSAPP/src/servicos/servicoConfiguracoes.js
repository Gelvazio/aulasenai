/**
 * Leitura e alteração validada das configurações do sistema.
 */
import {
  CHAVES_CONFIGURACAO,
  EVENTOS,
  LIMITES_CONFIGURACAO,
  MENSAGENS_ERRO,
  MODELOS_DISPONIVEIS,
} from '../config/constantes.js';
import { ErroAplicacao } from '../utilitarios/erros.js';

const PADRAO_HORARIO = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Cria um validador de número inteiro num intervalo.
 * @param {number} minimo - Valor mínimo.
 * @param {number} maximo - Valor máximo.
 * @returns {(valor: unknown) => boolean} Validador.
 */
function inteiroEntre(minimo, maximo) {
  return (valor) => Number.isInteger(valor) && valor >= minimo && valor <= maximo;
}

/**
 * Valida a lista de contatos VIP (números só com dígitos).
 * @param {unknown} valor - Valor a validar.
 * @returns {boolean} true se válido.
 */
function listaDeNumerosValida(valor) {
  if (!Array.isArray(valor)) return false;
  if (valor.length > LIMITES_CONFIGURACAO.MAXIMO_CONTATOS_VIP) return false;

  return valor.every((item) => typeof item === 'string' && /^\d{8,15}$/.test(item));
}

/** Mapa chave → validador (nova configuração = nova entrada). */
const VALIDADORES = Object.freeze({
  [CHAVES_CONFIGURACAO.HORARIO_RESUMO]: (valor) =>
    typeof valor === 'string' && PADRAO_HORARIO.test(valor),
  [CHAVES_CONFIGURACAO.MODELO_RESUMO]: (valor) => MODELOS_DISPONIVEIS.includes(valor),
  [CHAVES_CONFIGURACAO.MODELO_ANALISE]: (valor) => MODELOS_DISPONIVEIS.includes(valor),
  [CHAVES_CONFIGURACAO.RETENCAO_DIAS]: inteiroEntre(
    LIMITES_CONFIGURACAO.RETENCAO_MINIMA_DIAS,
    LIMITES_CONFIGURACAO.RETENCAO_MAXIMA_DIAS
  ),
  [CHAVES_CONFIGURACAO.ANALISE_IA_ATIVA]: (valor) => typeof valor === 'boolean',
  [CHAVES_CONFIGURACAO.INTERVALO_ANALISE_MIN]: inteiroEntre(
    LIMITES_CONFIGURACAO.INTERVALO_MINIMO_MIN,
    LIMITES_CONFIGURACAO.INTERVALO_MAXIMO_MIN
  ),
  [CHAVES_CONFIGURACAO.CONTATOS_VIP]: listaDeNumerosValida,
  [CHAVES_CONFIGURACAO.MINIMO_MENSAGENS_RESUMO]: inteiroEntre(
    1,
    LIMITES_CONFIGURACAO.MINIMO_MENSAGENS_MAXIMO
  ),
});

export class ServicoConfiguracoes {
  /**
   * @param {{repositorio: import('../banco/repositorios/configuracaoRepositorio.js')
   *   .ConfiguracaoRepositorio, barramento: import('node:events').EventEmitter}} dependencias
   */
  constructor(dependencias) {
    this.repositorio = dependencias.repositorio;
    this.barramento = dependencias.barramento;
  }

  /**
   * Retorna todas as configurações.
   * @returns {Record<string, unknown>} Configurações.
   */
  listar() {
    return this.repositorio.listarTodas();
  }

  /**
   * Retorna uma configuração.
   * @param {string} chave - Chave (CHAVES_CONFIGURACAO).
   * @returns {unknown} Valor.
   */
  obter(chave) {
    return this.repositorio.obter(chave);
  }

  /**
   * Valida e grava as configurações informadas (todas ou nenhuma).
   * @param {Record<string, unknown>} alteracoes - Pares chave → novo valor.
   * @returns {Record<string, unknown>} Configurações após a alteração.
   * @throws {ErroAplicacao} Se alguma chave for desconhecida ou o valor inválido.
   */
  atualizar(alteracoes) {
    const entradas = Object.entries(alteracoes || {});
    const invalida = entradas.find(([chave, valor]) => !VALIDADORES[chave]?.(valor));
    if (invalida) {
      throw new ErroAplicacao(`${MENSAGENS_ERRO.CONFIGURACAO_INVALIDA}: ${invalida[0]}`, 400);
    }

    entradas.forEach(([chave, valor]) => this.repositorio.definir(chave, valor));
    const configuracoes = this.listar();
    this.barramento.emit(EVENTOS.CONFIGURACAO_ALTERADA, {
      chaves: entradas.map(([chave]) => chave),
      configuracoes,
    });
    return configuracoes;
  }
}
