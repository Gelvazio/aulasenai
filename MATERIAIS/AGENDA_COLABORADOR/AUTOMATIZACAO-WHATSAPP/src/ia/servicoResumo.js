/**
 * Geração de resumos de grupos (diário e sob demanda) com a Claude API.
 */
import {
  CHAVES_CONFIGURACAO,
  EVENTOS,
  IA,
  MENSAGENS_ERRO,
  MODELOS_DISPONIVEIS,
  TIPOS_RESUMO,
} from '../config/constantes.js';
import { ehDataValida } from '../utilitarios/datas.js';
import { ErroAplicacao } from '../utilitarios/erros.js';
import { dividirEmBlocos, formatarConversa } from './divisorBlocos.js';
import { SISTEMA_RESUMO, montarConteudoResumo, validarResumo } from './prompts/promptResumo.js';
import { SISTEMA_CONSOLIDACAO, montarConteudoConsolidacao } from './prompts/promptConsolidacao.js';

const TIPOS_VALIDOS = new Set(Object.values(TIPOS_RESUMO));

export class ServicoResumo {
  /**
   * @param {{clienteClaude: import('./clienteClaude.js').ClienteClaude, repositorios: object,
   *   servicoConfiguracoes: object, barramento: import('node:events').EventEmitter,
   *   fusoHorario: string, logger: import('pino').Logger}} dependencias
   */
  constructor(dependencias) {
    this.clienteClaude = dependencias.clienteClaude;
    this.repositorios = dependencias.repositorios;
    this.servicoConfiguracoes = dependencias.servicoConfiguracoes;
    this.barramento = dependencias.barramento;
    this.fuso = dependencias.fusoHorario;
    this.logger = dependencias.logger.child({ modulo: 'resumos' });
    this.emAndamento = new Set();
  }

  /**
   * Valida e completa o pedido de resumo.
   * @param {{grupoJid: string, desde: string, ate: string, modelo?: string, tipo?: string}} pedido
   * @returns {{grupo: object, desde: string, ate: string, modelo: string, tipo: string}} Pedido.
   * @throws {ErroAplicacao} Se o grupo, o período, o tipo ou o modelo forem inválidos.
   */
  validarPedido(pedido) {
    const grupo = this.repositorios.grupos.buscarPorJid(pedido.grupoJid);
    if (!grupo) throw new ErroAplicacao(MENSAGENS_ERRO.GRUPO_INEXISTENTE, 404);

    const periodoValido =
      ehDataValida(pedido.desde) && ehDataValida(pedido.ate) && pedido.desde < pedido.ate;
    if (!periodoValido) throw new ErroAplicacao(MENSAGENS_ERRO.PERIODO_INVALIDO, 400);

    const tipo = pedido.tipo || TIPOS_RESUMO.SOB_DEMANDA;
    const modelo =
      pedido.modelo || this.servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.MODELO_RESUMO);
    const pedidoValido = TIPOS_VALIDOS.has(tipo) && MODELOS_DISPONIVEIS.includes(modelo);
    if (!pedidoValido) throw new ErroAplicacao(MENSAGENS_ERRO.CORPO_INVALIDO, 400);

    const desde = new Date(pedido.desde).toISOString();
    const ate = new Date(pedido.ate).toISOString();
    return { grupo, desde, ate, modelo, tipo };
  }

  /**
   * Gera, salva e publica o resumo de um grupo num período.
   * @param {{grupoJid: string, desde: string, ate: string, modelo?: string, tipo?: string}} pedido
   * @returns {Promise<object>} Resumo salvo.
   * @throws {ErroAplicacao} Se não houver mensagens suficientes ou a IA falhar.
   */
  async gerarResumo(pedido) {
    const valido = this.validarPedido(pedido);
    const chave = `${valido.grupo.jid}|${valido.desde}|${valido.ate}`;
    if (this.emAndamento.has(chave)) throw new ErroAplicacao('Resumo já está sendo gerado', 409);

    this.emAndamento.add(chave);
    try {
      return await this.executarResumo(valido);
    } finally {
      this.emAndamento.delete(chave);
    }
  }

  /**
   * Busca as mensagens, chama a IA (com blocos se preciso) e salva o resultado.
   * @param {{grupo: object, desde: string, ate: string, modelo: string, tipo: string}} pedido
   * @returns {Promise<object>} Resumo salvo.
   */
  async executarResumo(pedido) {
    const mensagens = this.repositorios.mensagens.listarPeriodo({
      grupoJid: pedido.grupo.jid,
      desde: pedido.desde,
      ate: pedido.ate,
    });
    const minimo = this.servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.MINIMO_MENSAGENS_RESUMO);
    if (mensagens.length < minimo) throw new ErroAplicacao(MENSAGENS_ERRO.SEM_MENSAGENS, 422);

    const linhas = formatarConversa(mensagens, this.fuso);
    const blocos = dividirEmBlocos(linhas, IA.CARACTERES_POR_BLOCO);
    const contexto = { grupoNome: pedido.grupo.nome, periodo: this.descreverPeriodo(pedido) };
    const { dados, modelo } = await this.resumirBlocos(blocos, {
      ...contexto,
      modelo: pedido.modelo,
    });

    const resumo = this.repositorios.resumos.salvar({
      grupoJid: pedido.grupo.jid,
      periodoInicio: pedido.desde,
      periodoFim: pedido.ate,
      tipo: pedido.tipo,
      totalMensagens: mensagens.length,
      conteudo: dados,
      modelo,
    });
    this.logger.info({ grupo: pedido.grupo.nome, blocos: blocos.length }, 'Resumo gerado');
    this.barramento.emit(EVENTOS.RESUMO_PRONTO, resumo);
    return resumo;
  }

  /**
   * Resume um ou vários blocos (vários → resumos parciais + consolidação).
   * @param {string[]} blocos - Blocos de conversa.
   * @param {{grupoNome: string, periodo: string, modelo: string}} contexto
   * @returns {Promise<{dados: object, modelo: string}>} Resumo final e modelo usado.
   */
  async resumirBlocos(blocos, contexto) {
    if (blocos.length === 1) return this.resumirTrecho(blocos[0], contexto);

    const parciais = [];
    for (const [indice, bloco] of blocos.entries()) {
      const parte = `${indice + 1} de ${blocos.length}`;
      const { dados } = await this.resumirTrecho(bloco, { ...contexto, parte });
      parciais.push(dados);
    }
    return this.clienteClaude.enviarJson({
      modelo: contexto.modelo,
      sistema: SISTEMA_CONSOLIDACAO,
      conteudo: montarConteudoConsolidacao({ ...contexto, resumosParciais: parciais }),
      finalidade: 'consolidacao',
      validar: validarResumo,
    });
  }

  /**
   * Resume um trecho da conversa.
   * @param {string} conversa - Texto do bloco.
   * @param {{grupoNome: string, periodo: string, modelo: string, parte?: string}} contexto
   * @returns {Promise<{dados: object, modelo: string}>} Resumo do trecho.
   */
  resumirTrecho(conversa, contexto) {
    return this.clienteClaude.enviarJson({
      modelo: contexto.modelo,
      sistema: SISTEMA_RESUMO,
      conteudo: montarConteudoResumo({ ...contexto, conversa }),
      finalidade: 'resumo',
      validar: validarResumo,
    });
  }

  /**
   * Descreve o período em texto legível no fuso.
   * @param {{desde: string, ate: string}} periodo - Limites ISO.
   * @returns {string} Ex.: "03/10/2026 00:00 a 04/10/2026 00:00".
   */
  descreverPeriodo(periodo) {
    const formatador = new Intl.DateTimeFormat('pt-BR', {
      timeZone: this.fuso,
      dateStyle: 'short',
      timeStyle: 'short',
    });
    return `${formatador.format(new Date(periodo.desde))} a ${formatador.format(new Date(periodo.ate))}`;
  }
}
