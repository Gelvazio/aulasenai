/**
 * Prompt que junta resumos parciais (conversas grandes divididas em blocos) num único resumo.
 */
import { SISTEMA_RESUMO } from './promptResumo.js';

export const SISTEMA_CONSOLIDACAO = `${SISTEMA_RESUMO}

Agora você receberá vários resumos parciais (em JSON) de trechos consecutivos da mesma conversa, \
entre <resumos> e </resumos>. Combine-os num único resumo no mesmo formato: una assuntos \
repetidos, remova duplicidades e mantenha somente perguntas que continuam sem resposta.`;

/**
 * Monta o pedido de consolidação.
 * @param {{grupoNome: string, periodo: string, resumosParciais: object[]}} dados
 * @returns {string} Conteúdo do pedido.
 */
export function montarConteudoConsolidacao(dados) {
  const parciais = dados.resumosParciais
    .map((resumo, indice) => `Trecho ${indice + 1}:\n${JSON.stringify(resumo)}`)
    .join('\n\n');
  return `Grupo: ${dados.grupoNome}\nPeríodo: ${dados.periodo}\n\n<resumos>\n${parciais}\n</resumos>`;
}
