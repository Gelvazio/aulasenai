/**
 * Converte uma mensagem do Baileys no objeto de domínio gravado em `mensagens`.
 * Novos tipos de conteúdo = nova entrada em EXTRATORES (Open/Closed).
 */
import {
  getContentType,
  jidNormalizedUser,
  normalizeMessageContent,
} from '@whiskeysockets/baileys';
import { TIPOS_MENSAGEM, WHATSAPP } from '../config/constantes.js';
import { agoraIso, segundosParaIso } from '../utilitarios/datas.js';
import { extrairDigitos } from '../utilitarios/texto.js';

const SUFIXO_NUMERO = '@s.whatsapp.net';

/**
 * Monta o texto de uma mídia: "[tipo] legenda".
 * @param {string} rotulo - Rótulo da mídia.
 * @param {string|null|undefined} legenda - Legenda opcional.
 * @returns {string} Texto final.
 */
function textoMidia(rotulo, legenda) {
  return legenda ? `[${rotulo}] ${legenda}` : `[${rotulo}]`;
}

/**
 * Extrai o texto de uma enquete (pergunta + opções).
 * @param {{name?: string, options?: {optionName?: string}[]}} enquete
 * @returns {string} Texto da enquete.
 */
function textoEnquete(enquete) {
  const opcoes = (enquete.options || []).map((opcao) => opcao.optionName).join(' | ');
  return textoMidia('enquete', `${enquete.name || ''} — ${opcoes}`);
}

/** Mapa tipo de conteúdo do Baileys → extrator `{ tipo, texto }`. */
const EXTRATORES = Object.freeze({
  conversation: (c) => ({ tipo: TIPOS_MENSAGEM.TEXTO, texto: c.conversation }),
  extendedTextMessage: (c) => ({ tipo: TIPOS_MENSAGEM.TEXTO, texto: c.extendedTextMessage.text }),
  imageMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.IMAGEM,
    texto: textoMidia('imagem', c.imageMessage.caption),
  }),
  videoMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.VIDEO,
    texto: textoMidia('vídeo', c.videoMessage.caption),
  }),
  audioMessage: () => ({ tipo: TIPOS_MENSAGEM.AUDIO, texto: textoMidia('áudio') }),
  documentMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.DOCUMENTO,
    texto: textoMidia('documento', c.documentMessage.caption || c.documentMessage.fileName),
  }),
  stickerMessage: () => ({ tipo: TIPOS_MENSAGEM.FIGURINHA, texto: textoMidia('figurinha') }),
  locationMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.LOCALIZACAO,
    texto: textoMidia('localização', c.locationMessage.name || c.locationMessage.address),
  }),
  liveLocationMessage: () => ({
    tipo: TIPOS_MENSAGEM.LOCALIZACAO,
    texto: textoMidia('localização ao vivo'),
  }),
  contactMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.CONTATO,
    texto: textoMidia('contato', c.contactMessage.displayName),
  }),
  contactsArrayMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.CONTATO,
    texto: textoMidia('contatos', c.contactsArrayMessage.displayName),
  }),
  pollCreationMessage: (c) => ({
    tipo: TIPOS_MENSAGEM.ENQUETE,
    texto: textoEnquete(c.pollCreationMessage),
  }),
  pollCreationMessageV3: (c) => ({
    tipo: TIPOS_MENSAGEM.ENQUETE,
    texto: textoEnquete(c.pollCreationMessageV3),
  }),
});

/** Tipos de conteúdo ignorados (controle do protocolo, reações, votos etc.). */
const TIPOS_IGNORADOS = new Set([
  'protocolMessage',
  'senderKeyDistributionMessage',
  'reactionMessage',
  'pollUpdateMessage',
  'messageContextInfo',
  'keepInChatMessage',
  'pinInChatMessage',
]);

/**
 * Descobre o JID do autor, preferindo o formato de número de telefone (PN).
 * @param {import('@whiskeysockets/baileys').WAMessageKey} chave - Chave da mensagem.
 * @returns {string} JID normalizado do autor.
 */
function obterAutorJid(chave) {
  const alternativoEhNumero = chave.participantAlt?.endsWith(SUFIXO_NUMERO);
  const jid = alternativoEhNumero ? chave.participantAlt : chave.participant;
  return jid ? jidNormalizedUser(jid) : '';
}

/**
 * Verifica se a mensagem menciona o usuário (@menção ou número no texto).
 * @param {{mencionados: string[], texto: string}} conteudo - Menções e texto.
 * @param {{meusJids: string[], meuNumero: string}} identidade - Identificação do usuário.
 * @returns {boolean} true se mencionar.
 */
function mencionaUsuario(conteudo, identidade) {
  const mencionados = conteudo.mencionados.map((jid) => jidNormalizedUser(jid));
  const mencionadoPorJid = mencionados.some((jid) => identidade.meusJids.includes(jid));
  if (mencionadoPorJid) return true;

  const numero = identidade.meuNumero || extrairDigitos(identidade.meusJids[0]);
  const temNumeroValido = numero.length >= 8;
  return temNumeroValido && conteudo.texto.includes(`@${numero}`);
}

/**
 * Extrai tipo, texto e contexto (menções/citação) do conteúdo da mensagem.
 * @param {import('@whiskeysockets/baileys').proto.IMessage|null|undefined} mensagem
 * @returns {{tipo: string, texto: string, mencionados: string[], citadaId: string|null}|null}
 */
function extrairConteudo(mensagem) {
  const conteudo = normalizeMessageContent(mensagem);
  const tipoBaileys = getContentType(conteudo);
  if (!tipoBaileys || TIPOS_IGNORADOS.has(tipoBaileys)) return null;

  const extrator = EXTRATORES[tipoBaileys];
  const extraido = extrator
    ? extrator(conteudo)
    : { tipo: TIPOS_MENSAGEM.OUTRO, texto: textoMidia(tipoBaileys) };
  const contexto = conteudo[tipoBaileys]?.contextInfo;
  return {
    tipo: extraido.tipo,
    texto: (extraido.texto || '').trim(),
    mencionados: contexto?.mentionedJid || [],
    citadaId: contexto?.stanzaId || null,
  };
}

/**
 * Converte a mensagem do Baileys em mensagem do domínio.
 * @param {import('@whiskeysockets/baileys').WAMessage} mensagemBaileys - Mensagem recebida.
 * @param {{meusJids: string[], meuNumero: string}} identidade - Identificação do usuário.
 * @returns {object|null} Mensagem normalizada ou null se não for de grupo / for ignorada.
 */
export function normalizarMensagem(mensagemBaileys, identidade) {
  const chave = mensagemBaileys.key;
  const ehDeGrupo = chave?.remoteJid?.endsWith(WHATSAPP.SUFIXO_GRUPO);
  if (!ehDeGrupo || !chave.id) return null;

  const conteudo = extrairConteudo(mensagemBaileys.message);
  if (!conteudo || !conteudo.texto) return null;

  const deMim = Boolean(chave.fromMe);
  return {
    id: chave.id,
    grupoJid: chave.remoteJid,
    autorJid: deMim ? identidade.meusJids[0] || '' : obterAutorJid(chave),
    autorNome: deMim ? 'Você' : mensagemBaileys.pushName || '',
    tipo: conteudo.tipo,
    texto: conteudo.texto,
    citadaId: conteudo.citadaId,
    mencionaUsuario: !deMim && mencionaUsuario(conteudo, identidade),
    ehPergunta: conteudo.texto.includes('?'),
    deMim,
    enviadaEm: segundosParaIso(mensagemBaileys.messageTimestamp),
    recebidaEm: agoraIso(),
  };
}
