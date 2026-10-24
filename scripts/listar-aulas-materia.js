/**
 * Lista as aulas de uma matéria no banco Supabase.
 *
 * Uso (PowerShell, na raiz do projeto):
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<chave service_role>"
 *   node scripts/listar-aulas-materia.js "Nome da matéria"
 *
 * Opções:
 *   [nome]                    Nome da matéria (obrigatório).
 */

const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const ROTA_REST = '/rest/v1/';
const VARIAVEL_CHAVE = 'SUPABASE_SERVICE_ROLE_KEY';

/**
 * Faz uma chamada autenticada com a chave service_role.
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

async function principal() {
  const nomeMateria = process.argv[2];
  if (!nomeMateria) {
    console.error('Informe o nome da matéria: node scripts/listar-aulas-materia.js "Nome da matéria"');
    process.exitCode = 1;
    return;
  }

  const chaveServico = process.env[VARIAVEL_CHAVE];
  if (!chaveServico) {
    console.error('Defina a variável de ambiente ' + VARIAVEL_CHAVE + '.');
    process.exitCode = 1;
    return;
  }

  try {
    const aulas = await chamarApi(
      ROTA_REST + 'aulas?materia=descricao.eq.' + encodeURIComponent(nomeMateria) + '&select=id,numero,tema&order=numero.asc',
      {},
      chaveServico
    );
    console.log('Aulas da matéria "' + nomeMateria + '":');
    aulas.forEach((aula) => {
      console.log('  ' + aula.numero + ' - ' + aula.tema + ' (ID: ' + aula.id + ')');
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
