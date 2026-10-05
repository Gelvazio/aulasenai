/**
 * Conexão com o WhatsApp como "aparelho conectado" (Baileys). SOMENTE LEITURA:
 * este módulo não envia mensagens, não marca como lido e não fica "online".
 */
import { EventEmitter } from 'node:events';
import { rm } from 'node:fs/promises';
import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { ESTADOS_CONEXAO, WHATSAPP } from '../config/constantes.js';
import { agoraIso } from '../utilitarios/datas.js';

export class ClienteWhatsapp extends EventEmitter {
  /**
   * @param {{logger: import('pino').Logger, caminhoSessao: string}} dependencias
   */
  constructor(dependencias) {
    super();
    this.logger = dependencias.logger.child({ modulo: 'whatsapp' });
    this.loggerBaileys = dependencias.logger.child({ modulo: 'baileys' }, { level: 'warn' });
    this.caminhoSessao = dependencias.caminhoSessao;
    this.socket = null;
    this.estado = ESTADOS_CONEXAO.INICIANDO;
    this.ultimoQr = null;
    this.atualizadoEm = agoraIso();
    this.esperaReconexao = WHATSAPP.RECONEXAO_INICIAL_MS;
    this.temporizadorReconexao = null;
    this.encerrando = false;
  }

  /**
   * Abre a conexão (cria o socket do Baileys e registra os eventos de conexão).
   * @returns {Promise<void>}
   */
  async conectar() {
    this.encerrando = false;
    this.definirEstado(ESTADOS_CONEXAO.CONECTANDO);
    const { state: autenticacao, saveCreds: salvarCredenciais } = await useMultiFileAuthState(
      this.caminhoSessao
    );
    const versao = await this.obterVersaoWhatsapp();

    this.socket = makeWASocket({
      auth: autenticacao,
      version: versao,
      logger: this.loggerBaileys,
      browser: Browsers.ubuntu(WHATSAPP.NOME_NAVEGADOR),
      markOnlineOnConnect: false,
      syncFullHistory: false,
      generateHighQualityLinkPreview: false,
      getMessage: async () => undefined,
    });

    this.socket.ev.on('creds.update', salvarCredenciais);
    this.socket.ev.on('connection.update', (atualizacao) => this.tratarAtualizacao(atualizacao));
    this.emit('socket', this.socket);
  }

  /**
   * Busca a versão atual do WhatsApp Web (se falhar, usa a padrão do Baileys).
   * @returns {Promise<[number, number, number]|undefined>} Versão ou undefined.
   */
  async obterVersaoWhatsapp() {
    try {
      const { version: versao } = await fetchLatestBaileysVersion();
      return versao;
    } catch (erro) {
      this.logger.warn({ erro: erro.message }, 'Não foi possível obter a versão do WhatsApp Web');
      return undefined;
    }
  }

  /**
   * Trata o evento `connection.update` (QR, aberto, fechado).
   * @param {Partial<import('@whiskeysockets/baileys').ConnectionState>} atualizacao
   * @returns {void}
   */
  tratarAtualizacao(atualizacao) {
    const { connection: conexao, lastDisconnect: ultimaDesconexao, qr } = atualizacao;

    if (qr) {
      this.ultimoQr = qr;
      this.definirEstado(ESTADOS_CONEXAO.AGUARDANDO_QR);
    }

    if (conexao === 'open') {
      this.ultimoQr = null;
      this.esperaReconexao = WHATSAPP.RECONEXAO_INICIAL_MS;
      this.definirEstado(ESTADOS_CONEXAO.CONECTADO);
      this.logger.info({ usuario: this.socket?.user?.id }, 'WhatsApp conectado');
      this.emit('conectado', this.socket);
    }

    if (conexao === 'close') this.tratarFechamento(ultimaDesconexao?.error);
  }

  /**
   * Decide entre reconectar ou apagar a sessão quando a conexão fecha.
   * @param {Error & {output?: {statusCode?: number}}|undefined} erro - Motivo do fechamento.
   * @returns {void}
   */
  tratarFechamento(erro) {
    const codigo = erro?.output?.statusCode;
    this.definirEstado(ESTADOS_CONEXAO.DESCONECTADO);
    if (this.encerrando) return;

    if (codigo === DisconnectReason.loggedOut) {
      this.logger.warn('Sessão encerrada pelo celular. Será necessário ler o QR novamente.');
      this.apagarSessaoEReiniciar();
      return;
    }

    const espera = codigo === DisconnectReason.restartRequired ? 0 : this.esperaReconexao;
    this.logger.info({ codigo, espera }, 'Conexão fechada, reconectando');
    this.esperaReconexao = Math.min(this.esperaReconexao * 2, WHATSAPP.RECONEXAO_MAXIMA_MS);
    this.agendarReconexao(espera);
  }

  /**
   * Agenda uma nova tentativa de conexão.
   * @param {number} espera - Tempo de espera em ms.
   * @returns {void}
   */
  agendarReconexao(espera) {
    clearTimeout(this.temporizadorReconexao);
    this.temporizadorReconexao = setTimeout(() => {
      this.conectar().catch((erroConexao) => {
        this.logger.error({ erro: erroConexao.message }, 'Falha ao reconectar');
        this.agendarReconexao(WHATSAPP.RECONEXAO_MAXIMA_MS);
      });
    }, espera);
  }

  /**
   * Apaga as credenciais locais e reinicia a conexão (gera novo QR).
   * @returns {Promise<void>}
   */
  async apagarSessaoEReiniciar() {
    await rm(this.caminhoSessao, { recursive: true, force: true });
    this.agendarReconexao(WHATSAPP.RECONEXAO_INICIAL_MS);
  }

  /**
   * Desconecta este aparelho do WhatsApp (logout) e apaga a sessão local.
   * @returns {Promise<void>}
   */
  async desconectarEApagarSessao() {
    try {
      await this.socket?.logout();
    } catch (erro) {
      this.logger.warn({ erro: erro.message }, 'Logout falhou; apagando sessão local mesmo assim');
    }
    this.encerrarSocket();
    await this.apagarSessaoEReiniciar();
  }

  /**
   * Fecha o socket sem reconectar (encerramento do sistema).
   * @returns {void}
   */
  encerrarSocket() {
    this.encerrando = true;
    clearTimeout(this.temporizadorReconexao);
    this.socket?.end(undefined);
    this.socket = null;
  }

  /**
   * Atualiza o estado e avisa os interessados.
   * @param {string} estado - Novo estado (ESTADOS_CONEXAO).
   * @returns {void}
   */
  definirEstado(estado) {
    this.estado = estado;
    this.atualizadoEm = agoraIso();
    this.emit('estado', this.obterSituacao());
  }

  /**
   * Retorna a situação atual da conexão (sem o QR em imagem).
   * @returns {{estado: string, qr: string|null, usuario: object|null, atualizadoEm: string}}
   */
  obterSituacao() {
    const usuario = this.socket?.user;
    return {
      estado: this.estado,
      qr: this.ultimoQr,
      usuario: usuario ? { id: usuario.id, nome: usuario.name || usuario.notify || '' } : null,
      atualizadoEm: this.atualizadoEm,
    };
  }

  /**
   * Retorna os identificadores do usuário conectado (formato PN e LID, normalizados).
   * @returns {string[]} JIDs do próprio usuário.
   */
  obterMeusJids() {
    const usuario = this.socket?.user;
    if (!usuario) return [];

    return [usuario.id, usuario.lid, usuario.phoneNumber]
      .filter(Boolean)
      .map((jid) => jidNormalizedUser(jid));
  }
}
