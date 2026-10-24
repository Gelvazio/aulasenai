const fs = require('fs');
const SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function chamarApi(rota, opcoes) {
  const resposta = await fetch(SUPABASE_URL + rota, {
    method: opcoes.metodo || 'GET',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
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

async function main() {
  try {
    const materias = await chamarApi('/rest/v1/materia?select=id,descricao', {});
    console.log('Matérias no banco:');
    materias.forEach(m => console.log(`  ${m.id}: ${m.descricao}`));
  } catch (erro) {
    console.error('Erro:', erro.message);
  }
}

main();
