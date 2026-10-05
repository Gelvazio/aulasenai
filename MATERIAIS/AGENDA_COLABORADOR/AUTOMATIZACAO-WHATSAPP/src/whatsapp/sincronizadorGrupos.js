/**
 * Mantém a tabela `grupos` em dia com os grupos dos quais o usuário participa.
 */
import { EVENTOS } from '../config/constantes.js';

/**
 * Converte os metadados do Baileys no formato do repositório.
 * @param {Partial<import('@whiskeysockets/baileys').GroupMetadata>} metadados
 * @returns {{jid: string, nome: string, descricao: string, totalParticipantes: number}}
 */
function converterMetadados(metadados) {
  return {
    jid: metadados.id,
    nome: metadados.subject || '',
    descricao: metadados.desc || '',
    totalParticipantes: metadados.size || metadados.participants?.length || 0,
  };
}

export class SincronizadorGrupos {
  /**
   * @param {{cliente: import('./clienteWhatsapp.js').ClienteWhatsapp,
   *   repositorioGrupos: import('../banco/repositorios/grupoRepositorio.js').GrupoRepositorio,
   *   barramento: import('node:events').EventEmitter, logger: import('pino').Logger}} dependencias
   */
  constructor(dependencias) {
    this.cliente = dependencias.cliente;
    this.repositorioGrupos = dependencias.repositorioGrupos;
    this.barramento = dependencias.barramento;
    this.logger = dependencias.logger.child({ modulo: 'grupos' });
  }

  /**
   * Registra os ouvintes: sincroniza ao conectar e acompanha mudanças.
   * @returns {void}
   */
  iniciar() {
    this.cliente.on('conectado', (socket) => {
      this.sincronizarTodos(socket).catch((erro) => {
        this.logger.error({ erro: erro.message }, 'Falha ao sincronizar grupos');
      });
    });
    this.cliente.on('socket', (socket) => this.ouvirAlteracoes(socket));
  }

  /**
   * Busca todos os grupos em que o usuário participa e grava no banco.
   * @param {import('@whiskeysockets/baileys').WASocket} socket - Socket conectado.
   * @returns {Promise<number>} Quantidade de grupos sincronizados.
   */
  async sincronizarTodos(socket) {
    const grupos = Object.values(await socket.groupFetchAllParticipating());
    grupos.forEach((metadados) => {
      this.repositorioGrupos.salvarOuAtualizar(converterMetadados(metadados));
    });
    this.logger.info({ total: grupos.length }, 'Grupos sincronizados');
    this.barramento.emit(EVENTOS.GRUPOS_ATUALIZADOS, { total: grupos.length });
    return grupos.length;
  }

  /**
   * Escuta alterações de nome/descrição de grupos.
   * @param {import('@whiskeysockets/baileys').WASocket} socket - Socket recém-criado.
   * @returns {void}
   */
  ouvirAlteracoes(socket) {
    socket.ev.on('groups.update', (atualizacoes) => this.aplicarAtualizacoes(atualizacoes));
    socket.ev.on('groups.upsert', (grupos) => this.aplicarAtualizacoes(grupos));
  }

  /**
   * Aplica atualizações parciais de grupos já conhecidos.
   * @param {Partial<import('@whiskeysockets/baileys').GroupMetadata>[]} atualizacoes
   * @returns {void}
   */
  aplicarAtualizacoes(atualizacoes) {
    atualizacoes.forEach((parcial) => {
      if (!parcial.id) return;

      const atual = this.repositorioGrupos.buscarPorJid(parcial.id);
      this.repositorioGrupos.salvarOuAtualizar({
        jid: parcial.id,
        nome: parcial.subject ?? atual?.nome ?? '',
        descricao: parcial.desc ?? atual?.descricao ?? '',
        totalParticipantes: parcial.size ?? atual?.total_participantes ?? 0,
      });
    });
    this.barramento.emit(EVENTOS.GRUPOS_ATUALIZADOS, { total: atualizacoes.length });
  }
}
