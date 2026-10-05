/**
 * Abertura da conexão SQLite (node:sqlite nativo).
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

/**
 * Abre (ou cria) o banco SQLite com WAL e chaves estrangeiras.
 * @param {string} caminho - Caminho do arquivo .sqlite.
 * @returns {DatabaseSync} Conexão aberta.
 */
export function abrirBanco(caminho) {
  mkdirSync(path.dirname(caminho), { recursive: true });

  const banco = new DatabaseSync(caminho);
  banco.exec('PRAGMA journal_mode = WAL');
  banco.exec('PRAGMA foreign_keys = ON');
  banco.exec('PRAGMA busy_timeout = 5000');
  return banco;
}

/**
 * Executa uma função dentro de uma transação (COMMIT ou ROLLBACK automático).
 * @template T
 * @param {DatabaseSync} banco - Conexão.
 * @param {() => T} operacao - Operação síncrona a executar.
 * @returns {T} Retorno da operação.
 * @throws {Error} Repassa o erro após o ROLLBACK.
 */
export function emTransacao(banco, operacao) {
  banco.exec('BEGIN');
  try {
    const resultado = operacao();
    banco.exec('COMMIT');
    return resultado;
  } catch (erro) {
    banco.exec('ROLLBACK');
    throw erro;
  }
}
