/**
 * Formata mensagens como linhas de conversa e divide em blocos que cabem num pedido à IA.
 */

/**
 * Formata uma mensagem como "[dd/mm HH:MM] Autor: texto".
 * @param {object} mensagem - Linha da tabela `mensagens`.
 * @param {Intl.DateTimeFormat} formatador - Formatador de data/hora no fuso.
 * @returns {string} Linha formatada.
 */
function formatarLinha(mensagem, formatador) {
  const quando = formatador.format(new Date(mensagem.enviada_em));
  const autor = mensagem.autor_nome || mensagem.autor_jid.split('@')[0] || 'Desconhecido';
  const marcaMencao = mensagem.menciona_usuario === 1 ? ' (menciona você)' : '';
  const texto = mensagem.texto.replace(/\s*\n\s*/g, ' / ');
  return `[${quando}] ${autor}${marcaMencao}: ${texto}`;
}

/**
 * Converte mensagens em linhas de conversa.
 * @param {object[]} mensagens - Mensagens em ordem cronológica.
 * @param {string} fuso - Fuso IANA.
 * @returns {string[]} Linhas.
 */
export function formatarConversa(mensagens, fuso) {
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    timeZone: fuso,
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return mensagens.map((mensagem) => formatarLinha(mensagem, formatador));
}

/**
 * Divide as linhas em blocos de até `limite` caracteres (uma linha nunca é quebrada).
 * @param {string[]} linhas - Linhas da conversa.
 * @param {number} limite - Tamanho máximo de cada bloco.
 * @returns {string[]} Blocos de texto.
 */
export function dividirEmBlocos(linhas, limite) {
  const blocos = [];
  let atual = [];
  let tamanho = 0;
  linhas.forEach((linha) => {
    const ultrapassa = tamanho + linha.length + 1 > limite && atual.length > 0;
    if (ultrapassa) {
      blocos.push(atual.join('\n'));
      atual = [];
      tamanho = 0;
    }
    atual.push(linha.slice(0, limite));
    tamanho += linha.length + 1;
  });
  if (atual.length > 0) blocos.push(atual.join('\n'));
  return blocos;
}
