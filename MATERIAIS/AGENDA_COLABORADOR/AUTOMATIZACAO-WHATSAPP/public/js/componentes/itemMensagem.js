/**
 * Item da linha do tempo de mensagens de um grupo.
 */
import { criarElemento } from '../dom.js';
import { formatarDataHora, formatarHora } from '../formatadores.js';

/**
 * Cria o item de uma mensagem.
 * @param {{autor_nome: string, autor_jid: string, texto: string, enviada_em: string,
 *   de_mim: number, menciona_usuario: number}} mensagem - Linha da tabela mensagens.
 * @returns {HTMLLIElement} Item.
 */
export function itemMensagem(mensagem) {
  const classes = ['mensagem'];
  if (mensagem.de_mim === 1) classes.push('mensagem--minha');
  if (mensagem.menciona_usuario === 1) classes.push('mensagem--mencao');
  const autor = mensagem.autor_nome || mensagem.autor_jid.split('@')[0];
  return criarElemento('li', {
    classe: classes.join(' '),
    filhos: [
      criarElemento('div', {
        classe: 'mensagem__cabecalho',
        filhos: [
          criarElemento('strong', { classe: 'mensagem__autor', texto: autor }),
          criarElemento('time', {
            classe: 'mensagem__hora',
            texto: formatarHora(mensagem.enviada_em),
            atributos: { datetime: mensagem.enviada_em, title: formatarDataHora(mensagem.enviada_em) },
          }),
        ],
      }),
      criarElemento('p', { classe: 'mensagem__texto', texto: mensagem.texto }),
    ],
  });
}

/**
 * Converte a mensagem do evento SSE (camelCase) no formato da tabela (snake_case).
 * @param {object} evento - Dados do evento mensagem:nova.
 * @returns {object} Mensagem no formato da API.
 */
export function mensagemDoEvento(evento) {
  return {
    id: evento.id,
    grupo_jid: evento.grupoJid,
    autor_jid: evento.autorJid,
    autor_nome: evento.autorNome,
    texto: evento.texto,
    enviada_em: evento.enviadaEm,
    de_mim: evento.deMim ? 1 : 0,
    menciona_usuario: evento.mencionaUsuario ? 1 : 0,
  };
}
