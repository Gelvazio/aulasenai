/**
 * Funções de data. O banco guarda ISO 8601 UTC; o fuso só é aplicado em cálculos de "dia".
 */
import { AGENDADOR } from '../config/constantes.js';

/**
 * Retorna o instante atual em ISO 8601 UTC.
 * @returns {string} Data ISO.
 */
export function agoraIso() {
  return new Date().toISOString();
}

/**
 * Converte segundos Unix (timestamp do WhatsApp) em ISO 8601.
 * @param {number|bigint|{toNumber: Function}|null|undefined} segundos - Timestamp em segundos.
 * @returns {string} Data ISO (agora, se o valor for inválido).
 */
export function segundosParaIso(segundos) {
  if (segundos === null || segundos === undefined) return agoraIso();

  const valor = typeof segundos === 'object' ? segundos.toNumber() : Number(segundos);
  if (!Number.isFinite(valor) || valor <= 0) return agoraIso();

  return new Date(valor * 1000).toISOString();
}

/**
 * Calcula o deslocamento (ms) entre UTC e o fuso informado num instante.
 * @param {Date} data - Instante de referência.
 * @param {string} fuso - Fuso IANA (ex.: America/Sao_Paulo).
 * @returns {number} Diferença em ms (horário local - UTC).
 */
function calcularDeslocamento(data, fuso) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: fuso,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(data);
  const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);
  const comoUtc = Date.UTC(
    valor('year'),
    valor('month') - 1,
    valor('day'),
    valor('hour'),
    valor('minute'),
    valor('second')
  );
  return comoUtc - Math.floor(data.getTime() / 1000) * 1000;
}

/**
 * Retorna o início (00:00) do dia local no fuso, com deslocamento opcional de dias.
 * @param {string} fuso - Fuso IANA.
 * @param {number} [deslocamentoDias=0] - Dias a somar (negativo = passado).
 * @returns {Date} Instante UTC correspondente às 00:00 locais.
 */
export function inicioDoDia(fuso, deslocamentoDias = 0) {
  const agora = new Date();
  const deslocamento = calcularDeslocamento(agora, fuso);
  const local = new Date(agora.getTime() + deslocamento);
  local.setUTCHours(0, 0, 0, 0);
  local.setUTCDate(local.getUTCDate() + deslocamentoDias);
  return new Date(local.getTime() - deslocamento);
}

/**
 * Calcula a próxima ocorrência de um horário "HH:MM" no fuso.
 * @param {string} horario - Horário no formato HH:MM.
 * @param {string} fuso - Fuso IANA.
 * @returns {Date} Próximo instante em que o horário ocorre.
 */
export function proximaOcorrencia(horario, fuso) {
  const [horas, minutos] = horario.split(':').map(Number);
  const inicioHoje = inicioDoDia(fuso);
  const alvo = new Date(inicioHoje.getTime() + (horas * 60 + minutos) * AGENDADOR.MS_POR_MINUTO);
  if (alvo.getTime() > Date.now()) return alvo;

  return new Date(alvo.getTime() + AGENDADOR.MS_POR_DIA);
}

/**
 * Retorna a data local (AAAA-MM-DD) de um instante no fuso.
 * @param {string|Date} data - Instante.
 * @param {string} fuso - Fuso IANA.
 * @returns {string} Data local.
 */
export function dataLocal(data, fuso) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: fuso }).format(new Date(data));
}

/**
 * Retorna a hora local (HH:MM) de um instante no fuso.
 * @param {string|Date} data - Instante.
 * @param {string} fuso - Fuso IANA.
 * @returns {string} Hora local.
 */
export function horaLocal(data, fuso) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: fuso,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(data));
}

/**
 * Valida se um texto é uma data ISO interpretável.
 * @param {unknown} valor - Valor a validar.
 * @returns {boolean} true se for data válida.
 */
export function ehDataValida(valor) {
  if (typeof valor !== 'string' || !valor) return false;

  return !Number.isNaN(new Date(valor).getTime());
}
