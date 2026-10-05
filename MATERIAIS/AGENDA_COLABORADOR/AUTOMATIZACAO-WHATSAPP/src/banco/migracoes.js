/**
 * Migrações versionadas do banco. Nova alteração de schema = nova entrada em MIGRACOES.
 */
import { emTransacao } from './conexao.js';
import { CONFIGURACOES_PADRAO, TIPOS_REGRA_ALERTA, SEVERIDADES } from '../config/constantes.js';
import { agoraIso } from '../utilitarios/datas.js';

const SQL_VERSAO_1 = `
CREATE TABLE grupos (
  jid TEXT PRIMARY KEY,
  nome TEXT NOT NULL DEFAULT '',
  descricao TEXT NOT NULL DEFAULT '',
  total_participantes INTEGER NOT NULL DEFAULT 0,
  monitorado INTEGER NOT NULL DEFAULT 0 CHECK (monitorado IN (0, 1)),
  criado_em TEXT NOT NULL,
  atualizado_em TEXT NOT NULL
);

CREATE TABLE mensagens (
  id TEXT NOT NULL,
  grupo_jid TEXT NOT NULL REFERENCES grupos(jid) ON DELETE CASCADE,
  autor_jid TEXT NOT NULL DEFAULT '',
  autor_nome TEXT NOT NULL DEFAULT '',
  tipo TEXT NOT NULL,
  texto TEXT NOT NULL DEFAULT '',
  citada_id TEXT,
  menciona_usuario INTEGER NOT NULL DEFAULT 0,
  eh_pergunta INTEGER NOT NULL DEFAULT 0,
  de_mim INTEGER NOT NULL DEFAULT 0,
  enviada_em TEXT NOT NULL,
  recebida_em TEXT NOT NULL,
  analisada_ia INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (grupo_jid, id)
);
CREATE INDEX idx_mensagens_grupo_data ON mensagens (grupo_jid, enviada_em);
CREATE INDEX idx_mensagens_data ON mensagens (enviada_em);
CREATE INDEX idx_mensagens_autor ON mensagens (autor_jid);
CREATE INDEX idx_mensagens_analise ON mensagens (analisada_ia, enviada_em);

CREATE VIRTUAL TABLE mensagens_fts USING fts5 (
  texto,
  content = 'mensagens',
  content_rowid = 'rowid',
  tokenize = 'unicode61 remove_diacritics 2'
);
CREATE TRIGGER mensagens_fts_inserir AFTER INSERT ON mensagens BEGIN
  INSERT INTO mensagens_fts (rowid, texto) VALUES (new.rowid, new.texto);
END;
CREATE TRIGGER mensagens_fts_apagar AFTER DELETE ON mensagens BEGIN
  INSERT INTO mensagens_fts (mensagens_fts, rowid, texto) VALUES ('delete', old.rowid, old.texto);
END;

CREATE TABLE resumos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grupo_jid TEXT NOT NULL REFERENCES grupos(jid) ON DELETE CASCADE,
  periodo_inicio TEXT NOT NULL,
  periodo_fim TEXT NOT NULL,
  tipo TEXT NOT NULL,
  total_mensagens INTEGER NOT NULL DEFAULT 0,
  conteudo_json TEXT NOT NULL,
  modelo TEXT NOT NULL,
  criado_em TEXT NOT NULL
);
CREATE INDEX idx_resumos_grupo ON resumos (grupo_jid, criado_em);

CREATE TABLE regras_alerta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL,
  parametros_json TEXT NOT NULL DEFAULT '{}',
  grupo_jid TEXT REFERENCES grupos(jid) ON DELETE CASCADE,
  severidade TEXT NOT NULL,
  ativa INTEGER NOT NULL DEFAULT 1,
  criado_em TEXT NOT NULL
);

CREATE TABLE alertas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  regra_id INTEGER REFERENCES regras_alerta(id) ON DELETE SET NULL,
  tipo TEXT NOT NULL,
  grupo_jid TEXT NOT NULL REFERENCES grupos(jid) ON DELETE CASCADE,
  mensagem_id TEXT,
  titulo TEXT NOT NULL,
  detalhe TEXT NOT NULL DEFAULT '',
  severidade TEXT NOT NULL,
  situacao TEXT NOT NULL,
  ocorrencias INTEGER NOT NULL DEFAULT 1,
  criado_em TEXT NOT NULL,
  atualizado_em TEXT NOT NULL
);
CREATE INDEX idx_alertas_situacao ON alertas (situacao, criado_em);
CREATE INDEX idx_alertas_grupo ON alertas (grupo_jid, criado_em);

CREATE TABLE uso_ia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modelo TEXT NOT NULL,
  finalidade TEXT NOT NULL,
  tokens_entrada INTEGER NOT NULL DEFAULT 0,
  tokens_saida INTEGER NOT NULL DEFAULT 0,
  custo_estimado REAL NOT NULL DEFAULT 0,
  criado_em TEXT NOT NULL
);
CREATE INDEX idx_uso_ia_data ON uso_ia (criado_em);

CREATE TABLE configuracoes (
  chave TEXT PRIMARY KEY,
  valor_json TEXT NOT NULL
);
`;

const REGRAS_PADRAO = [
  {
    nome: 'Mencionaram você',
    tipo: TIPOS_REGRA_ALERTA.MENCAO_USUARIO,
    severidade: SEVERIDADES.ATENCAO,
  },
  {
    nome: 'Pergunta sem resposta',
    tipo: TIPOS_REGRA_ALERTA.PERGUNTA_DIRETA,
    severidade: SEVERIDADES.ATENCAO,
  },
  { nome: 'Pico de mensagens', tipo: TIPOS_REGRA_ALERTA.PICO_VOLUME, severidade: SEVERIDADES.INFO },
  { nome: 'Contato importante', tipo: TIPOS_REGRA_ALERTA.AUTOR_VIP, severidade: SEVERIDADES.INFO },
];

/**
 * Insere as configurações e regras de alerta padrão.
 * @param {import('node:sqlite').DatabaseSync} banco - Conexão.
 * @returns {void}
 */
function inserirDadosPadrao(banco) {
  const inserirConfiguracao = banco.prepare(
    'INSERT OR IGNORE INTO configuracoes (chave, valor_json) VALUES (?, ?)'
  );
  Object.entries(CONFIGURACOES_PADRAO).forEach(([chave, valor]) => {
    inserirConfiguracao.run(chave, JSON.stringify(valor));
  });

  const inserirRegra = banco.prepare(
    `INSERT INTO regras_alerta (nome, tipo, parametros_json, severidade, ativa, criado_em)
     VALUES (?, ?, '{}', ?, 1, ?)`
  );
  REGRAS_PADRAO.forEach((regra) => {
    inserirRegra.run(regra.nome, regra.tipo, regra.severidade, agoraIso());
  });
}

const MIGRACOES = [
  { versao: 1, aplicar: (banco) => banco.exec(SQL_VERSAO_1), semear: inserirDadosPadrao },
];

/**
 * Aplica as migrações pendentes, cada uma em transação própria.
 * @param {import('node:sqlite').DatabaseSync} banco - Conexão.
 * @returns {number} Versão final do schema.
 */
export function aplicarMigracoes(banco) {
  banco.exec(
    'CREATE TABLE IF NOT EXISTS schema_versao (versao INTEGER PRIMARY KEY, aplicada_em TEXT)'
  );
  const linha = banco.prepare('SELECT MAX(versao) AS versao FROM schema_versao').get();
  const versaoAtual = linha?.versao ?? 0;

  const pendentes = MIGRACOES.filter((migracao) => migracao.versao > versaoAtual);
  pendentes.forEach((migracao) => {
    emTransacao(banco, () => {
      migracao.aplicar(banco);
      migracao.semear?.(banco);
      banco
        .prepare('INSERT INTO schema_versao (versao, aplicada_em) VALUES (?, ?)')
        .run(migracao.versao, agoraIso());
    });
  });

  return Math.max(versaoAtual, ...MIGRACOES.map((migracao) => migracao.versao));
}
