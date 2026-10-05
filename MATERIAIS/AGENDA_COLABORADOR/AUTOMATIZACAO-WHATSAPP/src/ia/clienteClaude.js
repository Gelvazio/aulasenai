/**
 * Cliente da Claude API (Messages API) via fetch nativo, com retry, timeout,
 * tratamento de recusa e registro de uso/custo em `uso_ia`.
 */
import { IA, MENSAGENS_ERRO, PRECOS_MODELOS } from '../config/constantes.js';
import { ErroAplicacao, esperar } from '../utilitarios/erros.js';
import { extrairJson } from './extratorJson.js';

const INSTRUCAO_CORRECAO =
  '\n\nIMPORTANTE: a resposta anterior não era JSON válido. Responda SOMENTE com o objeto JSON, ' +
  'sem texto antes ou depois e sem blocos de código.';

/**
 * Calcula o custo estimado (US$) de uma chamada.
 * @param {string} modelo - Modelo usado.
 * @param {{input_tokens?: number, output_tokens?: number}} uso - Campo `usage` da resposta.
 * @returns {number} Custo em dólares.
 */
function calcularCusto(modelo, uso) {
  const preco = PRECOS_MODELOS[modelo];
  if (!preco) return 0;

  const entrada = (uso.input_tokens || 0) * preco.entrada;
  const saida = (uso.output_tokens || 0) * preco.saida;
  return (entrada + saida) / 1_000_000;
}

/**
 * Monta o corpo da requisição para a Messages API.
 * @param {{modelo: string, sistema: string, conteudo: string, maxTokens?: number}} pedido
 * @returns {object} Corpo JSON.
 */
function montarCorpo(pedido) {
  const corpo = {
    model: pedido.modelo,
    max_tokens: pedido.maxTokens || IA.MAX_TOKENS_RESPOSTA,
    system: pedido.sistema,
    messages: [{ role: 'user', content: pedido.conteudo }],
  };
  if (IA.MODELOS_COM_ESFORCO.includes(pedido.modelo)) {
    corpo.output_config = { effort: IA.ESFORCO_ANALISE };
  }
  if (IA.MODELOS_COM_FALLBACK.includes(pedido.modelo)) corpo.fallbacks = 'default';
  return corpo;
}

/**
 * Calcula a espera antes de nova tentativa (usa retry-after quando houver).
 * @param {Response|null} resposta - Resposta HTTP (null em erro de rede).
 * @param {number} tentativa - Número da tentativa (1, 2, ...).
 * @returns {number} Espera em ms.
 */
function calcularEspera(resposta, tentativa) {
  const retryAfter = Number(resposta?.headers.get('retry-after'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) return retryAfter * 1000;

  return IA.ESPERA_INICIAL_MS * 2 ** (tentativa - 1);
}

export class ClienteClaude {
  /**
   * @param {{chaveApi: string, repositorioUso: object, logger: import('pino').Logger,
   *   requisitar?: typeof fetch}} dependencias - `requisitar` permite trocar o fetch.
   */
  constructor(dependencias) {
    this.chaveApi = dependencias.chaveApi;
    this.repositorioUso = dependencias.repositorioUso;
    this.logger = dependencias.logger.child({ modulo: 'ia' });
    this.requisitar = dependencias.requisitar || fetch;
  }

  /**
   * Indica se a chave da API foi configurada.
   * @returns {boolean} true se configurada.
   */
  estaConfigurado() {
    return Boolean(this.chaveApi);
  }

  /**
   * Monta os cabeçalhos HTTP da chamada.
   * @param {string} modelo - Modelo pedido.
   * @returns {Record<string, string>} Cabeçalhos.
   */
  montarCabecalhos(modelo) {
    const cabecalhos = {
      'x-api-key': this.chaveApi,
      'anthropic-version': IA.VERSAO_API,
      'content-type': 'application/json',
    };
    if (IA.MODELOS_COM_FALLBACK.includes(modelo)) cabecalhos['anthropic-beta'] = IA.BETA_FALLBACK;
    return cabecalhos;
  }

  /**
   * Faz a chamada HTTP com retry para erros temporários.
   * @param {object} corpo - Corpo da requisição.
   * @returns {Promise<object>} JSON da resposta.
   * @throws {ErroAplicacao} Em erro definitivo da API.
   */
  async chamarComRetry(corpo) {
    for (let tentativa = 1; ; tentativa += 1) {
      const resposta = await this.requisitar(IA.URL_API, {
        method: 'POST',
        headers: this.montarCabecalhos(corpo.model),
        body: JSON.stringify(corpo),
        signal: AbortSignal.timeout(IA.TIMEOUT_MS),
      }).catch((erro) => ({ erroRede: erro }));

      if (resposta.ok) return resposta.json();

      const podeRepetir = resposta.erroRede || IA.STATUS_REPETIVEIS.includes(resposta.status);
      if (!podeRepetir || tentativa >= IA.MAX_TENTATIVAS) {
        throw await this.converterFalha(resposta);
      }
      const espera = calcularEspera(resposta.erroRede ? null : resposta, tentativa);
      this.logger.warn({ status: resposta.status, tentativa, espera }, 'IA: nova tentativa');
      await esperar(espera);
    }
  }

  /**
   * Converte uma falha HTTP/rede em ErroAplicacao com mensagem útil.
   * @param {Response|{erroRede: Error}} resposta - Resposta ou erro de rede.
   * @returns {Promise<ErroAplicacao>} Erro.
   */
  async converterFalha(resposta) {
    if (resposta.erroRede)
      return new ErroAplicacao(`IA indisponível: ${resposta.erroRede.message}`, 502);

    const dados = await resposta.json().catch(() => ({}));
    const detalhe = dados?.error?.message || resposta.statusText;
    this.logger.error({ status: resposta.status, detalhe }, 'IA: erro definitivo');
    return new ErroAplicacao(`Erro da Claude API (${resposta.status}): ${detalhe}`, 502);
  }

  /**
   * Envia um pedido e devolve o texto da resposta, registrando o uso.
   * @param {{modelo: string, sistema: string, conteudo: string, finalidade: string,
   *   maxTokens?: number}} pedido
   * @returns {Promise<{texto: string, modelo: string, truncada: boolean}>} Resposta.
   * @throws {ErroAplicacao} Se a IA não estiver configurada, recusar ou falhar.
   */
  async enviar(pedido) {
    if (!this.estaConfigurado()) throw new ErroAplicacao(MENSAGENS_ERRO.IA_NAO_CONFIGURADA, 503);

    const dados = await this.chamarComRetry(montarCorpo(pedido));
    this.registrarUso(dados, pedido.finalidade);
    if (dados.stop_reason === IA.MOTIVO_RECUSA)
      throw new ErroAplicacao(MENSAGENS_ERRO.IA_RECUSOU, 422);

    const texto = (dados.content || [])
      .filter((bloco) => bloco.type === 'text')
      .map((bloco) => bloco.text)
      .join('');
    return { texto, modelo: dados.model, truncada: dados.stop_reason === IA.MOTIVO_LIMITE_TOKENS };
  }

  /**
   * Envia um pedido que deve retornar JSON; tenta uma correção se vier inválido.
   * @param {{modelo: string, sistema: string, conteudo: string, finalidade: string,
   *   validar?: (dados: object) => boolean}} pedido
   * @returns {Promise<{dados: object, modelo: string}>} JSON validado e modelo usado.
   * @throws {ErroAplicacao} Se o JSON continuar inválido.
   */
  async enviarJson(pedido) {
    const validar = pedido.validar || (() => true);
    const primeira = await this.enviar(pedido);
    const dadosPrimeira = extrairJson(primeira.texto);
    if (dadosPrimeira && validar(dadosPrimeira))
      return { dados: dadosPrimeira, modelo: primeira.modelo };

    this.logger.warn('IA: JSON inválido, pedindo correção');
    const segunda = await this.enviar({
      ...pedido,
      conteudo: pedido.conteudo + INSTRUCAO_CORRECAO,
    });
    const dadosSegunda = extrairJson(segunda.texto);
    if (dadosSegunda && validar(dadosSegunda))
      return { dados: dadosSegunda, modelo: segunda.modelo };

    throw new ErroAplicacao(MENSAGENS_ERRO.IA_RESPOSTA_INVALIDA, 502);
  }

  /**
   * Registra tokens e custo da chamada.
   * @param {{model?: string, usage?: object}} dados - Resposta da API.
   * @param {string} finalidade - Finalidade (resumo, alertas, ...).
   * @returns {void}
   */
  registrarUso(dados, finalidade) {
    const uso = dados.usage || {};
    this.repositorioUso.registrar({
      modelo: dados.model || 'desconhecido',
      finalidade,
      tokensEntrada: uso.input_tokens || 0,
      tokensSaida: uso.output_tokens || 0,
      custoEstimado: calcularCusto(dados.model, uso),
    });
  }
}
