/**
 * Rotas de alertas e regras de alerta.
 */
import { listarTiposRegra } from '../../alertas/regras/index.js';

/**
 * Registra as rotas de alertas.
 * @param {import('../roteador.js').Roteador} roteador - Roteador.
 * @param {{repositorios: object, servicoRegras: import('../../alertas/servicoRegras.js')
 *   .ServicoRegras}} dependencias
 * @returns {void}
 */
export function registrarRotasAlertas(roteador, dependencias) {
  const { repositorios, servicoRegras } = dependencias;

  roteador.registrar('GET', '/alertas', ({ consulta }) =>
    repositorios.alertas.listar({
      situacao: consulta.situacao,
      grupoJid: consulta.grupo,
      severidade: consulta.severidade,
      limite: Number(consulta.limite) || undefined,
    })
  );

  roteador.registrar('PATCH', '/alertas/:id', ({ parametros, corpo }) =>
    servicoRegras.alterarSituacaoAlerta(Number(parametros.id), corpo.situacao)
  );

  roteador.registrar('POST', '/alertas/marcar-lidos', () => ({
    alterados: repositorios.alertas.marcarTodosLidos(),
  }));

  roteador.registrar('GET', '/regras', () => repositorios.regras.listar());
  roteador.registrar('GET', '/regras/tipos', () => listarTiposRegra());
  roteador.registrar('POST', '/regras', ({ corpo }) => servicoRegras.criar(corpo));
  roteador.registrar('PUT', '/regras/:id', ({ parametros, corpo }) =>
    servicoRegras.atualizar(Number(parametros.id), corpo)
  );
  roteador.registrar('DELETE', '/regras/:id', ({ parametros }) =>
    servicoRegras.remover(Number(parametros.id))
  );
}
