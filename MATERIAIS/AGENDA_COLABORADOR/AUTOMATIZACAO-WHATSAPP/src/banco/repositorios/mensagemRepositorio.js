/**
 * Acesso à tabela `mensagens` e ao índice de busca `mensagens_fts`.
 */
import { PAGINACAO } from '../../config/constantes.js';

/**
 * Converte o termo digitado em consulta FTS5 segura (cada palavra entre aspas, com prefixo).
 * @param {string} termo - Texto digitado pelo usuário.
 * @returns {string} Expressão FTS5 ou string vazia.
 */
function montarConsultaFts(termo) {
  const palavras = (termo || '')
    .replace(/["*^():]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  return palavras.map((palavra) => `"${palavra}"*`).join(' ');
}

/**
 * Limita o tamanho de página informado.
 * @param {number|undefined} limite - Limite pedido.
 * @returns {number} Limite válido.
 */
function limitarPagina(limite) {
  const valor = Number(limite) || PAGINACAO.LIMITE_PADRAO;
  return Math.min(Math.max(valor, 1), PAGINACAO.LIMITE_MAXIMO);
}

export class MensagemRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Insere a mensagem se ainda não existir.
   * @param {object} mensagem - Mensagem normalizada (ver normalizadorMensagem.js).
   * @returns {boolean} true se foi inserida agora.
   */
  inserirSeNaoExistir(mensagem) {
    const resultado = this.banco
      .prepare(
        `INSERT OR IGNORE INTO mensagens
          (id, grupo_jid, autor_jid, autor_nome, tipo, texto, citada_id, menciona_usuario,
           eh_pergunta, de_mim, enviada_em, recebida_em)
         VALUES (:id, :grupoJid, :autorJid, :autorNome, :tipo, :texto, :citadaId,
           :mencionaUsuario, :ehPergunta, :deMim, :enviadaEm, :recebidaEm)`
      )
      .run({
        id: mensagem.id,
        grupoJid: mensagem.grupoJid,
        autorJid: mensagem.autorJid,
        autorNome: mensagem.autorNome,
        tipo: mensagem.tipo,
        texto: mensagem.texto,
        enviadaEm: mensagem.enviadaEm,
        recebidaEm: mensagem.recebidaEm,
        citadaId: mensagem.citadaId || null,
        mencionaUsuario: mensagem.mencionaUsuario ? 1 : 0,
        ehPergunta: mensagem.ehPergunta ? 1 : 0,
        deMim: mensagem.deMim ? 1 : 0,
      });
    return resultado.changes > 0;
  }

  /**
   * Lista mensagens de um grupo, da mais nova para a mais antiga (paginação por cursor).
   * @param {{grupoJid: string, antesDe?: string, limite?: number}} filtro
   * @returns {object[]} Mensagens.
   */
  listarPorGrupo(filtro) {
    return this.banco
      .prepare(
        `SELECT * FROM mensagens
         WHERE grupo_jid = :grupoJid AND enviada_em < :antesDe
         ORDER BY enviada_em DESC LIMIT :limite`
      )
      .all({
        grupoJid: filtro.grupoJid,
        antesDe: filtro.antesDe || '9999',
        limite: limitarPagina(filtro.limite),
      });
  }

  /**
   * Lista as mensagens de um grupo num período, em ordem cronológica.
   * @param {{grupoJid: string, desde: string, ate: string}} periodo
   * @returns {object[]} Mensagens.
   */
  listarPeriodo(periodo) {
    return this.banco
      .prepare(
        `SELECT * FROM mensagens
         WHERE grupo_jid = :grupoJid AND enviada_em >= :desde AND enviada_em < :ate
         ORDER BY enviada_em ASC`
      )
      .all(periodo);
  }

  /**
   * Busca textual (FTS5) com trecho destacado.
   * @param {{termo: string, grupoJid?: string}} filtro
   * @returns {object[]} Mensagens encontradas com `trecho` e `grupo_nome`.
   */
  buscarTexto(filtro) {
    const consulta = montarConsultaFts(filtro.termo);
    if (!consulta) return [];

    return this.banco
      .prepare(
        `SELECT m.*, g.nome AS grupo_nome,
           snippet(mensagens_fts, 0, '[[', ']]', '…', 16) AS trecho
         FROM mensagens_fts
         JOIN mensagens m ON m.rowid = mensagens_fts.rowid
         JOIN grupos g ON g.jid = m.grupo_jid
         WHERE mensagens_fts MATCH :consulta
           AND (:grupoJid IS NULL OR m.grupo_jid = :grupoJid)
         ORDER BY m.enviada_em DESC LIMIT :limite`
      )
      .all({ consulta, grupoJid: filtro.grupoJid || null, limite: PAGINACAO.LIMITE_BUSCA });
  }

  /**
   * Conta mensagens desde uma data (opcionalmente de um grupo).
   * @param {string} desde - Data ISO inicial.
   * @param {string} [grupoJid] - Filtro de grupo.
   * @returns {number} Quantidade.
   */
  contarDesde(desde, grupoJid) {
    const linha = this.banco
      .prepare(
        `SELECT COUNT(*) AS total FROM mensagens
         WHERE enviada_em >= :desde AND (:grupoJid IS NULL OR grupo_jid = :grupoJid)`
      )
      .get({ desde, grupoJid: grupoJid || null });
    return linha.total;
  }

  /**
   * Lista as datas de envio desde uma data (agrupamento por dia/hora é feito no serviço, no fuso).
   * @param {string} desde - Data ISO inicial.
   * @param {string} [grupoJid] - Filtro de grupo.
   * @returns {{enviada_em: string}[]} Datas de envio.
   */
  listarDatasEnvio(desde, grupoJid) {
    return this.banco
      .prepare(
        `SELECT enviada_em FROM mensagens
         WHERE enviada_em >= :desde AND (:grupoJid IS NULL OR grupo_jid = :grupoJid)`
      )
      .all({ desde, grupoJid: grupoJid || null });
  }

  /**
   * Ranking de autores por quantidade de mensagens.
   * @param {{grupoJid: string, desde: string, limite?: number}} filtro
   * @returns {{autor_jid: string, autor_nome: string, total: number}[]} Ranking.
   */
  rankingAutores(filtro) {
    return this.banco
      .prepare(
        `SELECT autor_jid, MAX(autor_nome) AS autor_nome, COUNT(*) AS total
         FROM mensagens
         WHERE grupo_jid = :grupoJid AND enviada_em >= :desde
         GROUP BY autor_jid ORDER BY total DESC LIMIT :limite`
      )
      .all({ grupoJid: filtro.grupoJid, desde: filtro.desde, limite: filtro.limite || 10 });
  }

  /**
   * Lista os grupos com mensagens num período e suas quantidades.
   * @param {{desde: string, ate: string}} periodo
   * @returns {{grupo_jid: string, total: number}[]} Grupos e totais.
   */
  contarPorGrupoNoPeriodo(periodo) {
    return this.banco
      .prepare(
        `SELECT grupo_jid, COUNT(*) AS total FROM mensagens
         WHERE enviada_em >= :desde AND enviada_em < :ate
         GROUP BY grupo_jid`
      )
      .all(periodo);
  }

  /**
   * Busca mensagens ainda não analisadas pela IA (mais antigas primeiro).
   * @param {number} limite - Máximo de mensagens.
   * @returns {object[]} Mensagens com `grupo_nome`.
   */
  listarNaoAnalisadas(limite) {
    return this.banco
      .prepare(
        `SELECT m.*, g.nome AS grupo_nome FROM mensagens m
         JOIN grupos g ON g.jid = m.grupo_jid
         WHERE m.analisada_ia = 0 AND m.de_mim = 0 AND g.monitorado = 1
         ORDER BY m.enviada_em ASC LIMIT ?`
      )
      .all(limite);
  }

  /**
   * Marca mensagens como analisadas pela IA.
   * @param {{grupo_jid: string, id: string}[]} mensagens - Chaves das mensagens.
   * @returns {void}
   */
  marcarAnalisadas(mensagens) {
    const comando = this.banco.prepare(
      'UPDATE mensagens SET analisada_ia = 1 WHERE grupo_jid = ? AND id = ?'
    );
    mensagens.forEach((mensagem) => comando.run(mensagem.grupo_jid, mensagem.id));
  }

  /**
   * Lista perguntas que mencionam o usuário, enviadas num intervalo, sem resposta dele depois.
   * @param {{desde: string, ate: string}} janela - Intervalo de envio da pergunta.
   * @returns {object[]} Perguntas pendentes.
   */
  listarPerguntasSemResposta(janela) {
    return this.banco
      .prepare(
        `SELECT p.* FROM mensagens p
         WHERE p.eh_pergunta = 1 AND p.menciona_usuario = 1 AND p.de_mim = 0
           AND p.enviada_em >= :desde AND p.enviada_em < :ate
           AND NOT EXISTS (
             SELECT 1 FROM mensagens r
             WHERE r.grupo_jid = p.grupo_jid AND r.de_mim = 1 AND r.enviada_em > p.enviada_em
           )`
      )
      .all(janela);
  }

  /**
   * Apaga mensagens anteriores a uma data (retenção).
   * @param {string} data - Data ISO limite.
   * @returns {number} Quantidade apagada.
   */
  apagarAnterioresA(data) {
    return this.banco.prepare('DELETE FROM mensagens WHERE enviada_em < ?').run(data).changes;
  }
}
