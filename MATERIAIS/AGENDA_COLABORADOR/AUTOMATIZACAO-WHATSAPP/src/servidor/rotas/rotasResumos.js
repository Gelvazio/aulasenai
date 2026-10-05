/**
 * Rotas de resumos.
 */
import { MENSAGENS_ERRO } from '../../config/constantes.js';
import { ErroAplicacao } from '../../utilitarios/erros.js';

/**
 * Registra as rotas de resumos.
 * @param {import('../roteador.js').Roteador} roteador - Roteador.
 * @param {{repositorios: object, servicoResumo: import('../../ia/servicoResumo.js').ServicoResumo}}
 *   dependencias
 * @returns {void}
 */
export function registrarRotasResumos(roteador, dependencias) {
  const { repositorios, servicoResumo } = dependencias;

  roteador.registrar('GET', '/resumos', ({ consulta }) =>
    repositorios.resumos.listar({
      grupoJid: consulta.grupo,
      tipo: consulta.tipo,
      limite: Number(consulta.limite) || undefined,
    })
  );

  roteador.registrar('GET', '/resumos/:id', ({ parametros }) => {
    const resumo = repositorios.resumos.buscarPorId(Number(parametros.id));
    if (!resumo) throw new ErroAplicacao(MENSAGENS_ERRO.NAO_ENCONTRADO, 404);

    return resumo;
  });

  roteador.registrar('POST', '/resumos', ({ corpo }) =>
    servicoResumo.gerarResumo({
      grupoJid: corpo.grupo,
      desde: corpo.desde,
      ate: corpo.ate,
      modelo: corpo.modelo,
    })
  );
}
