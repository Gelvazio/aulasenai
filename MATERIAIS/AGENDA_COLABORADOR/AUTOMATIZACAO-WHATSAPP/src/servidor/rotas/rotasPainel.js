/**
 * Rotas gerais do painel: visão geral, busca, configurações, uso de IA e informações do sistema.
 */
import { IA, MODELOS_DISPONIVEIS, PRECOS_MODELOS } from '../../config/constantes.js';
import { inicioDoDia } from '../../utilitarios/datas.js';

const DIAS_PADRAO_USO = 30;

/**
 * Registra as rotas gerais.
 * @param {import('../roteador.js').Roteador} roteador - Roteador.
 * @param {{repositorios: object, servicoEstatisticas: object, servicoConfiguracoes: object,
 *   ambiente: object}} dependencias
 * @returns {void}
 */
export function registrarRotasPainel(roteador, dependencias) {
  const { repositorios, servicoEstatisticas, servicoConfiguracoes, ambiente } = dependencias;

  roteador.registrar('GET', '/sistema', () => ({
    iaConfigurada: ambiente.iaConfigurada,
    fusoHorario: ambiente.fusoHorario,
    modelos: MODELOS_DISPONIVEIS,
    precos: PRECOS_MODELOS,
    modeloPadrao: IA.MODELO_PADRAO,
  }));

  roteador.registrar('GET', '/visao-geral', () => servicoEstatisticas.obterVisaoGeral());

  roteador.registrar('GET', '/busca', ({ consulta }) =>
    repositorios.mensagens.buscarTexto({ termo: consulta.termo, grupoJid: consulta.grupo })
  );

  roteador.registrar('GET', '/configuracoes', () => servicoConfiguracoes.listar());

  roteador.registrar('PUT', '/configuracoes', ({ corpo }) => servicoConfiguracoes.atualizar(corpo));

  roteador.registrar('GET', '/uso-ia', ({ consulta }) => {
    const dias = Number(consulta.dias) || DIAS_PADRAO_USO;
    const desde = inicioDoDia(ambiente.fusoHorario, -(dias - 1)).toISOString();
    return { dias, ...repositorios.usoIa.resumirDesde(desde) };
  });
}
