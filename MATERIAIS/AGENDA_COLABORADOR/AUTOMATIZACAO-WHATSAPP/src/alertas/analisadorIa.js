/**
 * Triagem periódica por IA das mensagens ainda não analisadas (gera alertas do tipo `ia`).
 */
import { CHAVES_CONFIGURACAO, IA, SEVERIDADES, TIPOS_REGRA_ALERTA } from '../config/constantes.js';
import { formatarConversa } from '../ia/divisorBlocos.js';
import {
  SISTEMA_ALERTAS,
  montarConteudoAlertas,
  validarAlertas,
} from '../ia/prompts/promptAlertas.js';
import { resumirTexto } from '../utilitarios/texto.js';

const SEVERIDADES_IA = new Set([SEVERIDADES.ATENCAO, SEVERIDADES.URGENTE]);
const TAMANHO_TITULO = 120;
const TAMANHO_DETALHE = 300;

/**
 * Agrupa mensagens por grupo.
 * @param {object[]} mensagens - Mensagens com `grupo_jid` e `grupo_nome`.
 * @returns {Map<string, object[]>} Mapa grupo → mensagens.
 */
function agruparPorGrupo(mensagens) {
  const grupos = new Map();
  mensagens.forEach((mensagem) => {
    const lista = grupos.get(mensagem.grupo_jid) || [];
    lista.push(mensagem);
    grupos.set(mensagem.grupo_jid, lista);
  });
  return grupos;
}

export class AnalisadorIa {
  /**
   * @param {{clienteClaude: object, repositorios: object, servicoConfiguracoes: object,
   *   motorAlertas: import('./motorAlertas.js').MotorAlertas, fusoHorario: string,
   *   logger: import('pino').Logger}} dependencias
   */
  constructor(dependencias) {
    this.clienteClaude = dependencias.clienteClaude;
    this.repositorios = dependencias.repositorios;
    this.servicoConfiguracoes = dependencias.servicoConfiguracoes;
    this.motorAlertas = dependencias.motorAlertas;
    this.fuso = dependencias.fusoHorario;
    this.logger = dependencias.logger.child({ modulo: 'analise-ia' });
    this.executando = false;
  }

  /**
   * Indica se a análise está habilitada (configuração + chave da IA).
   * @returns {boolean} true se pode executar.
   */
  estaHabilitado() {
    const ativa = this.servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.ANALISE_IA_ATIVA);
    return Boolean(ativa) && this.clienteClaude.estaConfigurado();
  }

  /**
   * Analisa um lote de mensagens pendentes, grupo a grupo.
   * @returns {Promise<number>} Quantidade de alertas gerados.
   */
  async analisarPendentes() {
    if (this.executando || !this.estaHabilitado()) return 0;

    this.executando = true;
    try {
      const pendentes = this.repositorios.mensagens.listarNaoAnalisadas(IA.LOTE_ANALISE_ALERTAS);
      let total = 0;
      for (const [grupoJid, mensagens] of agruparPorGrupo(pendentes)) {
        total += await this.analisarGrupo(grupoJid, mensagens);
      }
      return total;
    } finally {
      this.executando = false;
    }
  }

  /**
   * Analisa as mensagens de um grupo e registra os alertas apontados pela IA.
   * @param {string} grupoJid - Grupo.
   * @param {object[]} mensagens - Mensagens pendentes do grupo.
   * @returns {Promise<number>} Alertas gerados.
   */
  async analisarGrupo(grupoJid, mensagens) {
    const modelo = this.servicoConfiguracoes.obter(CHAVES_CONFIGURACAO.MODELO_RESUMO);
    try {
      const { dados } = await this.clienteClaude.enviarJson({
        modelo,
        sistema: SISTEMA_ALERTAS,
        conteudo: montarConteudoAlertas({
          grupoNome: mensagens[0].grupo_nome,
          linhas: formatarConversa(mensagens, this.fuso),
        }),
        finalidade: 'alertas',
        validar: validarAlertas,
      });
      this.repositorios.mensagens.marcarAnalisadas(mensagens);
      return this.registrarApontamentos(grupoJid, mensagens, dados.alertas);
    } catch (erro) {
      this.logger.error({ erro: erro.message, grupoJid }, 'Falha na análise por IA');
      return 0;
    }
  }

  /**
   * Converte os apontamentos da IA em alertas.
   * @param {string} grupoJid - Grupo.
   * @param {object[]} mensagens - Mensagens enviadas (para achar o número citado).
   * @param {object[]} apontamentos - Itens `alertas` da resposta.
   * @returns {number} Alertas registrados.
   */
  registrarApontamentos(grupoJid, mensagens, apontamentos) {
    const validos = apontamentos.filter((item) => {
      const mensagem = mensagens[Number(item?.numero) - 1];
      return mensagem && SEVERIDADES_IA.has(item.severidade) && typeof item.titulo === 'string';
    });
    validos.forEach((item) => {
      const mensagem = mensagens[Number(item.numero) - 1];
      this.motorAlertas.registrarAlerta({
        tipo: TIPOS_REGRA_ALERTA.IA,
        grupoJid,
        mensagemId: mensagem.id,
        severidade: item.severidade,
        titulo: resumirTexto(item.titulo, TAMANHO_TITULO),
        detalhe: resumirTexto(
          `${item.motivo || ''} — ${mensagem.autor_nome}: ${mensagem.texto}`,
          TAMANHO_DETALHE
        ),
      });
    });
    return validos.length;
  }
}
