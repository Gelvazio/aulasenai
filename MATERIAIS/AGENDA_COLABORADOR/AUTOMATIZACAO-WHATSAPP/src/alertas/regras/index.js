/**
 * Registro das regras de alerta (Strategy). Nova regra = novo arquivo + entrada neste mapa.
 *
 * Contrato de cada regra:
 * - `tipo`, `nome`, `descricao`, `campos` (metadados para o formulário do dashboard);
 * - `validarParametros(parametros) → boolean`;
 * - `avaliar(mensagem, contexto) → { titulo, detalhe } | null` (mensagem nova);
 * - opcional `avaliarPeriodico(contexto) → [{ grupoJid, mensagemId, titulo, detalhe }]`.
 */
import { regraPalavraChave } from './palavraChave.js';
import { regraMencaoUsuario } from './mencaoUsuario.js';
import { regraPerguntaDireta } from './perguntaDireta.js';
import { regraPicoVolume } from './picoVolume.js';
import { regraAutorVip } from './autorVip.js';

export const REGRAS_ALERTA = Object.freeze(
  Object.fromEntries(
    [
      regraPalavraChave,
      regraMencaoUsuario,
      regraPerguntaDireta,
      regraPicoVolume,
      regraAutorVip,
    ].map((regra) => [regra.tipo, regra])
  )
);

/**
 * Lista os metadados das regras para o dashboard.
 * @returns {{tipo: string, nome: string, descricao: string, campos: object[]}[]} Tipos.
 */
export function listarTiposRegra() {
  return Object.values(REGRAS_ALERTA).map(({ tipo, nome, descricao, campos }) => ({
    tipo,
    nome,
    descricao,
    campos,
  }));
}
