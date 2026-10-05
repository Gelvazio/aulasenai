/**
 * Fábrica dos repositórios: cria todos a partir de uma única conexão.
 */
import { GrupoRepositorio } from './grupoRepositorio.js';
import { MensagemRepositorio } from './mensagemRepositorio.js';
import { ResumoRepositorio } from './resumoRepositorio.js';
import { AlertaRepositorio } from './alertaRepositorio.js';
import { RegraAlertaRepositorio } from './regraAlertaRepositorio.js';
import { UsoIaRepositorio } from './usoIaRepositorio.js';
import { ConfiguracaoRepositorio } from './configuracaoRepositorio.js';

/**
 * Cria o conjunto de repositórios.
 * @param {import('node:sqlite').DatabaseSync} banco - Conexão aberta e migrada.
 * @returns {{grupos: GrupoRepositorio, mensagens: MensagemRepositorio,
 *   resumos: ResumoRepositorio, alertas: AlertaRepositorio, regras: RegraAlertaRepositorio,
 *   usoIa: UsoIaRepositorio, configuracoes: ConfiguracaoRepositorio}} Repositórios.
 */
export function criarRepositorios(banco) {
  return Object.freeze({
    grupos: new GrupoRepositorio(banco),
    mensagens: new MensagemRepositorio(banco),
    resumos: new ResumoRepositorio(banco),
    alertas: new AlertaRepositorio(banco),
    regras: new RegraAlertaRepositorio(banco),
    usoIa: new UsoIaRepositorio(banco),
    configuracoes: new ConfiguracaoRepositorio(banco),
  });
}
