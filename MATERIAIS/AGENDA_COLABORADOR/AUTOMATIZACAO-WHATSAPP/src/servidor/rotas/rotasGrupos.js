/**
 * Rotas de grupos, mensagens e estatísticas por grupo.
 */
import { MENSAGENS_ERRO } from '../../config/constantes.js';
import { inicioDoDia } from '../../utilitarios/datas.js';
import { ErroAplicacao } from '../../utilitarios/erros.js';

/**
 * Busca o grupo ou lança 404.
 * @param {object} repositorioGrupos - Repositório de grupos.
 * @param {string} jid - JID do grupo.
 * @returns {object} Grupo.
 * @throws {ErroAplicacao} Se não existir.
 */
function exigirGrupo(repositorioGrupos, jid) {
  const grupo = repositorioGrupos.buscarPorJid(jid);
  if (!grupo) throw new ErroAplicacao(MENSAGENS_ERRO.GRUPO_INEXISTENTE, 404);

  return grupo;
}

/**
 * Registra as rotas de grupos.
 * @param {import('../roteador.js').Roteador} roteador - Roteador.
 * @param {{repositorios: object, servicoEstatisticas: object, fusoHorario: string}} dependencias
 * @returns {void}
 */
export function registrarRotasGrupos(roteador, dependencias) {
  const { repositorios, servicoEstatisticas, fusoHorario } = dependencias;

  roteador.registrar('GET', '/grupos', () =>
    repositorios.grupos.listarComTotais({
      inicioHoje: inicioDoDia(fusoHorario).toISOString(),
      inicioSemana: inicioDoDia(fusoHorario, -6).toISOString(),
    })
  );

  roteador.registrar('GET', '/grupos/:jid', ({ parametros }) =>
    exigirGrupo(repositorios.grupos, parametros.jid)
  );

  roteador.registrar('PATCH', '/grupos/:jid', ({ parametros, corpo }) => {
    exigirGrupo(repositorios.grupos, parametros.jid);
    if (typeof corpo.monitorado !== 'boolean') {
      throw new ErroAplicacao(MENSAGENS_ERRO.CORPO_INVALIDO, 400);
    }
    repositorios.grupos.alterarMonitoramento(parametros.jid, corpo.monitorado);
    return repositorios.grupos.buscarPorJid(parametros.jid);
  });

  roteador.registrar('GET', '/grupos/:jid/mensagens', ({ parametros, consulta }) => {
    exigirGrupo(repositorios.grupos, parametros.jid);
    return repositorios.mensagens.listarPorGrupo({
      grupoJid: parametros.jid,
      antesDe: consulta.antesDe,
      limite: consulta.limite,
    });
  });

  roteador.registrar('GET', '/grupos/:jid/estatisticas', ({ parametros, consulta }) => {
    exigirGrupo(repositorios.grupos, parametros.jid);
    return servicoEstatisticas.obterEstatisticasGrupo(parametros.jid, consulta.dias);
  });
}
