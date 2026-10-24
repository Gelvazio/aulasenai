/**
 * Lista todas as matérias no banco Supabase.
 *
 * Uso (PowerShell, na raiz do projeto):
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<chave service_role>"
 *   node scripts/listar-materias.js
 */

const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const ROTA_REST = '/rest/v1/';
const VARIAVEL_CHAVE = 'SUPABASE_SERVICE_ROLE_KEY';

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

async function principal() {
  const chaveServico = process.env[VARIAVEL_CHAVE];
  if (!chaveServico) {
    console.error('Defina a variável de ambiente ' + VARIAVEL_CHAVE + '.');
    process.exitCode = 1;
    return;
  }

  try {
    const materias = await chamarApi(
      ROTA_REST + 'materia?select=id,descricao&order=descricao.asc',
      {},
      chaveServico
    );
    console.log('Matérias no banco:');
    materias.forEach((m) => {
      console.log('  ID: ' + m.id + ' - ' + m.descricao);
    });
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
    process.exitCode = 1;
  }
}

principal().catch((erro) => {
  console.error('Erro: ' + erro.message);
  process.exitCode = 1;
});
