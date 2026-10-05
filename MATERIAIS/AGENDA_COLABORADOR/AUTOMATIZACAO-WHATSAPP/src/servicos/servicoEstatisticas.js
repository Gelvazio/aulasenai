/**
 * Estatísticas para o dashboard (visão geral e por grupo), agrupadas no fuso do usuário.
 */
import { ESTATISTICAS } from '../config/constantes.js';
import { dataLocal, inicioDoDia } from '../utilitarios/datas.js';

const FORMATADOR_HORA = (fuso) =>
  new Intl.DateTimeFormat('en-US', { timeZone: fuso, hour: 'numeric', hourCycle: 'h23' });

/**
 * Agrupa datas de envio por dia local, preenchendo dias sem mensagens com zero.
 * @param {{enviada_em: string}[]} linhas - Datas de envio.
 * @param {{dias: number, fuso: string}} opcoes - Quantidade de dias e fuso.
 * @returns {{data: string, total: number}[]} Série diária em ordem cronológica.
 */
function agruparPorDia(linhas, opcoes) {
  const contagem = new Map();
  for (let deslocamento = opcoes.dias - 1; deslocamento >= 0; deslocamento -= 1) {
    contagem.set(dataLocal(inicioDoDia(opcoes.fuso, -deslocamento), opcoes.fuso), 0);
  }
  linhas.forEach((linha) => {
    const dia = dataLocal(linha.enviada_em, opcoes.fuso);
    if (contagem.has(dia)) contagem.set(dia, contagem.get(dia) + 1);
  });
  return [...contagem].map(([data, total]) => ({ data, total }));
}

/**
 * Agrupa datas de envio por hora local (0–23).
 * @param {{enviada_em: string}[]} linhas - Datas de envio.
 * @param {string} fuso - Fuso IANA.
 * @returns {{hora: number, total: number}[]} Série com 24 posições.
 */
function agruparPorHora(linhas, fuso) {
  const formatador = FORMATADOR_HORA(fuso);
  const totais = new Array(ESTATISTICAS.HORAS_DIA).fill(0);
  linhas.forEach((linha) => {
    totais[Number(formatador.format(new Date(linha.enviada_em)))] += 1;
  });
  return totais.map((total, hora) => ({ hora, total }));
}

export class ServicoEstatisticas {
  /**
   * @param {{repositorios: object, fusoHorario: string}} dependencias
   */
  constructor(dependencias) {
    this.repositorios = dependencias.repositorios;
    this.fuso = dependencias.fusoHorario;
  }

  /**
   * Calcula o início do mês corrente no fuso.
   * @returns {Date} Início do mês.
   */
  inicioDoMes() {
    const diaDoMes = Number(dataLocal(new Date(), this.fuso).slice(8, 10));
    return inicioDoDia(this.fuso, -(diaDoMes - 1));
  }

  /**
   * Monta os dados da visão geral.
   * @returns {object} KPIs, atividade de 7 dias, top grupos e últimos alertas.
   */
  obterVisaoGeral() {
    const inicioHoje = inicioDoDia(this.fuso).toISOString();
    const dias = ESTATISTICAS.DIAS_ATIVIDADE;
    const inicioPeriodo = inicioDoDia(this.fuso, -(dias - 1)).toISOString();
    const grupos = this.repositorios.grupos.listarComTotais({
      inicioHoje,
      inicioSemana: inicioPeriodo,
    });
    const datas = this.repositorios.mensagens.listarDatasEnvio(inicioPeriodo);
    return {
      mensagensHoje: this.repositorios.mensagens.contarDesde(inicioHoje),
      grupos: this.repositorios.grupos.contar(),
      alertasAbertos: this.repositorios.alertas.contarAbertosPorSeveridade(),
      resumosHoje: this.repositorios.resumos.contarDesde(inicioHoje),
      usoIaMes: this.repositorios.usoIa.resumirDesde(this.inicioDoMes().toISOString()).total,
      atividade: agruparPorDia(datas, { dias, fuso: this.fuso }),
      porHoraHoje: agruparPorHora(
        datas.filter((linha) => linha.enviada_em >= inicioHoje),
        this.fuso
      ),
      topGrupos: grupos
        .filter((grupo) => grupo.monitorado === 1)
        .sort((a, b) => b.mensagens_hoje - a.mensagens_hoje)
        .slice(0, ESTATISTICAS.LIMITE_TOP_GRUPOS),
      ultimosAlertas: this.repositorios.alertas.listar({
        limite: ESTATISTICAS.LIMITE_ULTIMOS_ALERTAS,
      }),
    };
  }

  /**
   * Estatísticas de um grupo nos últimos N dias.
   * @param {string} grupoJid - JID do grupo.
   * @param {number} [diasPedidos] - Quantidade de dias (padrão 7, máximo 90).
   * @returns {object} Totais por dia, por hora e ranking de autores.
   */
  obterEstatisticasGrupo(grupoJid, diasPedidos) {
    const dias = Math.min(
      Math.max(Number(diasPedidos) || ESTATISTICAS.DIAS_ATIVIDADE, 1),
      ESTATISTICAS.DIAS_MAXIMOS
    );
    const desde = inicioDoDia(this.fuso, -(dias - 1)).toISOString();
    const datas = this.repositorios.mensagens.listarDatasEnvio(desde, grupoJid);
    return {
      dias,
      total: datas.length,
      porDia: agruparPorDia(datas, { dias, fuso: this.fuso }),
      porHora: agruparPorHora(datas, this.fuso),
      ranking: this.repositorios.mensagens.rankingAutores({
        grupoJid,
        desde,
        limite: ESTATISTICAS.LIMITE_RANKING,
      }),
    };
  }
}
