/**
 * Aplica um arquivo SQL seed no banco Supabase usando a função RPC exec_sql.
 *
 * Uso (PowerShell, na raiz do projeto):
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<chave service_role>"
 *   node scripts/aplicar-seed-banco.js caminho/do/arquivo.sql
 *
 * Opções:
 *   [arquivo]                  Caminho do arquivo SQL (obrigatório).
 *
 * ⚠️ A chave service_role ignora o RLS: use só nesta máquina,
 *    nunca em páginas nem no repositório.
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const ROTA_REST = '/rest/v1/';
const VARIAVEL_CHAVE = 'SUPABASE_SERVICE_ROLE_KEY';

/**
 * Faz uma chamada autenticada com a chave service_role.
 * @param {string} rota - Caminho a partir da URL do projeto.
 * @param {{metodo?: string, corpo?: Object, headers?: Object}} opcoes - Método, corpo e headers.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<Object|null>} JSON da resposta (null sem corpo).
 * @throws {Error} Com status e mensagem da API.
 */
async function chamarApi(rota, opcoes, chaveServico) {
  const resposta = await fetch(SUPABASE_URL + rota, {
    method: opcoes.metodo || 'GET',
    headers: {
      apikey: chaveServico,
      Authorization: 'Bearer ' + chaveServico,
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    },
    body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
  });
  const texto = await resposta.text();
  const dados = texto ? JSON.parse(texto) : null;
  if (!resposta.ok) {
    throw new Error(resposta.status + ' ' + (dados?.msg || dados?.message || texto));
  }
  return dados;
}

/**
 * Executa um SQL via RPC usando a função exec_sql.
 * @param {string} sql - Conteúdo SQL a executar.
 * @param {string} chaveServico - Chave service_role.
 * @returns {Promise<string>} Mensagem de resultado.
 */
async function executarSql(sql, chaveServico) {
  const dados = await chamarApi(ROTA_REST + 'rpc/exec_sql', {
    metodo: 'POST',
    corpo: { sql_text: sql },
  }, chaveServico);
  return dados || 'SQL executado';
}

/**
 * Ponto de entrada: lê o arquivo SQL e aplica no banco.
 */
async function principal() {
  const caminhoArquivo = process.argv[2];
  if (!caminhoArquivo) {
    console.error('Informe o caminho do arquivo SQL: node scripts/aplicar-seed-banco.js arquivo.sql');
    process.exitCode = 1;
    return;
  }

  const caminhoAbsoluto = path.resolve(caminhoArquivo);
  if (!fs.existsSync(caminhoAbsoluto)) {
    console.error('Arquivo não encontrado: ' + caminhoAbsoluto);
    process.exitCode = 1;
    return;
  }

  const chaveServico = process.env[VARIAVEL_CHAVE];
  if (!chaveServico) {
    console.error('Defina a variável de ambiente ' + VARIAVEL_CHAVE + '.');
    process.exitCode = 1;
    return;
  }

  const sql = fs.readFileSync(caminhoAbsoluto, 'utf-8');
  console.log('Aplicando seed:', caminhoAbsoluto);
  console.log('Tamanho do SQL:', sql.length, 'caracteres');

  try {
    const resultado = await executarSql(sql, chaveServico);
    console.log('✅', resultado);
  } catch (erro) {
    console.error('❌ Erro ao aplicar seed:', erro.message);
    process.exitCode = 1;
  }
}

principal().catch((erro) => {
  console.error('Erro: ' + erro.message);
  process.exitCode = 1;
});
