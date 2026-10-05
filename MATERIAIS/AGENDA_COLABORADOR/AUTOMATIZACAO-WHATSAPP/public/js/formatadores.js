/**
 * Formatação de datas, números e valores para exibição (pt-BR).
 */

const LOCALIDADE = 'pt-BR';
const FORMATO_DATA_HORA = new Intl.DateTimeFormat(LOCALIDADE, {
  dateStyle: 'short',
  timeStyle: 'short',
});
const FORMATO_HORA = new Intl.DateTimeFormat(LOCALIDADE, { hour: '2-digit', minute: '2-digit' });
const FORMATO_DIA = new Intl.DateTimeFormat(LOCALIDADE, { day: '2-digit', month: '2-digit' });
const FORMATO_NUMERO = new Intl.NumberFormat(LOCALIDADE);
const FORMATO_DOLAR = new Intl.NumberFormat(LOCALIDADE, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 4,
});
const RELATIVO = new Intl.RelativeTimeFormat(LOCALIDADE, { numeric: 'auto' });
const UNIDADES_RELATIVAS = [
  { limite: 60, divisor: 1, unidade: 'second' },
  { limite: 3600, divisor: 60, unidade: 'minute' },
  { limite: 86400, divisor: 3600, unidade: 'hour' },
  { limite: Infinity, divisor: 86400, unidade: 'day' },
];

/**
 * Formata data e hora curtas.
 * @param {string|Date|null} data - Data.
 * @returns {string} Ex.: "03/10/2026 14:05" (ou "—").
 */
export function formatarDataHora(data) {
  if (!data) return '—';

  return FORMATO_DATA_HORA.format(new Date(data));
}

/**
 * Formata somente a hora.
 * @param {string|Date} data - Data.
 * @returns {string} Ex.: "14:05".
 */
export function formatarHora(data) {
  return FORMATO_HORA.format(new Date(data));
}

/**
 * Formata "AAAA-MM-DD" como "dd/mm".
 * @param {string} dataIso - Data no formato AAAA-MM-DD.
 * @returns {string} Dia e mês.
 */
export function formatarDiaMes(dataIso) {
  return FORMATO_DIA.format(new Date(`${dataIso}T12:00:00`));
}

/**
 * Formata tempo relativo ("há 5 minutos").
 * @param {string|Date|null} data - Data.
 * @returns {string} Texto relativo (ou "—").
 */
export function formatarRelativo(data) {
  if (!data) return '—';

  const segundos = Math.round((new Date(data).getTime() - Date.now()) / 1000);
  const faixa = UNIDADES_RELATIVAS.find((item) => Math.abs(segundos) < item.limite);
  return RELATIVO.format(Math.round(segundos / faixa.divisor), faixa.unidade);
}

/**
 * Formata número inteiro com separador de milhar.
 * @param {number} valor - Número.
 * @returns {string} Número formatado.
 */
export function formatarNumero(valor) {
  return FORMATO_NUMERO.format(valor || 0);
}

/**
 * Formata valor em dólares.
 * @param {number} valor - Valor.
 * @returns {string} Ex.: "US$ 0,0123".
 */
export function formatarDolar(valor) {
  return FORMATO_DOLAR.format(valor || 0);
}

/**
 * Converte Date em valor de <input type="datetime-local"> no horário local.
 * @param {Date} data - Data.
 * @returns {string} "AAAA-MM-DDTHH:MM".
 */
export function paraEntradaDataHora(data) {
  const local = new Date(data.getTime() - data.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}
