/**
 * Cadastro validado de regras de alerta.
 */
import {
  LIMITES_CONFIGURACAO,
  MENSAGENS_ERRO,
  SEVERIDADES,
  SITUACOES_ALERTA,
} from '../config/constantes.js';
import { ErroAplicacao } from '../utilitarios/erros.js';

const SEVERIDADES_VALIDAS = new Set(Object.values(SEVERIDADES));
const SITUACOES_VALIDAS = new Set(Object.values(SITUACOES_ALERTA));

export class ServicoRegras {
  /**
   * @param {{repositorios: object, regras: Record<string, object>}} dependencias
   */
  constructor(dependencias) {
    this.repositorios = dependencias.repositorios;
    this.regras = dependencias.regras;
  }

  /**
   * Valida os dados de uma regra.
   * @param {{nome?: unknown, tipo?: unknown, parametros?: unknown, grupoJid?: unknown,
   *   severidade?: unknown, ativa?: unknown}} dados - Dados recebidos.
   * @returns {object} Dados normalizados.
   * @throws {ErroAplicacao} Se algum campo for inválido.
   */
  validar(dados) {
    const estrategia = this.regras[dados.tipo];
    const nome = typeof dados.nome === 'string' ? dados.nome.trim() : '';
    const parametros =
      dados.parametros && typeof dados.parametros === 'object' ? dados.parametros : {};
    const camposValidos =
      estrategia &&
      nome.length > 0 &&
      nome.length <= LIMITES_CONFIGURACAO.TAMANHO_MAXIMO_NOME &&
      SEVERIDADES_VALIDAS.has(dados.severidade) &&
      estrategia.validarParametros(parametros);
    if (!camposValidos) throw new ErroAplicacao(MENSAGENS_ERRO.REGRA_INVALIDA, 400);

    const grupoJid = dados.grupoJid || null;
    if (grupoJid && !this.repositorios.grupos.buscarPorJid(grupoJid)) {
      throw new ErroAplicacao(MENSAGENS_ERRO.GRUPO_INEXISTENTE, 400);
    }
    return {
      nome,
      tipo: dados.tipo,
      parametros,
      grupoJid,
      severidade: dados.severidade,
      ativa: dados.ativa !== false,
    };
  }

  /**
   * Busca a regra ou lança 404.
   * @param {number} id - Identificador.
   * @returns {object} Regra.
   * @throws {ErroAplicacao} Se não existir.
   */
  exigir(id) {
    const regra = this.repositorios.regras.buscarPorId(id);
    if (!regra) throw new ErroAplicacao(MENSAGENS_ERRO.NAO_ENCONTRADO, 404);

    return regra;
  }

  /**
   * Cria uma regra.
   * @param {object} dados - Dados recebidos.
   * @returns {object} Regra criada.
   */
  criar(dados) {
    return this.repositorios.regras.criar(this.validar(dados));
  }

  /**
   * Atualiza uma regra (o tipo é mantido).
   * @param {number} id - Identificador.
   * @param {object} dados - Novos dados.
   * @returns {object} Regra atualizada.
   */
  atualizar(id, dados) {
    const atual = this.exigir(id);
    const validos = this.validar({ ...dados, tipo: atual.tipo });
    return this.repositorios.regras.atualizar(id, validos);
  }

  /**
   * Remove uma regra.
   * @param {number} id - Identificador.
   * @returns {{ok: boolean}} Resultado.
   */
  remover(id) {
    this.exigir(id);
    return { ok: this.repositorios.regras.remover(id) };
  }

  /**
   * Altera a situação de um alerta.
   * @param {number} id - Identificador do alerta.
   * @param {unknown} situacao - aberto | lido | resolvido.
   * @returns {object} Alerta atualizado.
   * @throws {ErroAplicacao} Se a situação for inválida ou o alerta não existir.
   */
  alterarSituacaoAlerta(id, situacao) {
    if (!SITUACOES_VALIDAS.has(situacao))
      throw new ErroAplicacao(MENSAGENS_ERRO.CORPO_INVALIDO, 400);

    const alerta = this.repositorios.alertas.alterarSituacao(id, situacao);
    if (!alerta) throw new ErroAplicacao(MENSAGENS_ERRO.NAO_ENCONTRADO, 404);

    return alerta;
  }
}
