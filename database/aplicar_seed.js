var fs = require('fs');

var SUPABASE_URL = 'https://hxlvonriearllcmfqeri.supabase.co';
var SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY0NTU5NCwiZXhwIjoyMTA0MjIxNTk0fQ.ghhPX0CjvSZdstMzkVzac2P4KZ4JlC8TKU2kqv2MNuY';

async function aplicarSeed(arquivoSql) {
  var sql = fs.readFileSync(arquivoSql, 'utf-8');
  console.log('Aplicando seed: ' + arquivoSql);
  
  var response = await fetch(SUPABASE_URL + '/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql_text: sql }),
  });
  
  var data = await response.json();
  
  if (!response.ok) {
    console.error('Erro ao aplicar seed:', data);
    throw new Error(data.message || 'Erro desconhecido');
  }
  
  console.log('Seed aplicado com sucesso:', data);
  return data;
}

var arquivo = process.argv[2];
if (!arquivo) {
  console.error('Uso: node database/aplicar_seed.js <arquivo.sql>');
  process.exit(1);
}

aplicarSeed(arquivo).catch(function(err) {
  console.error(err);
  process.exit(1);
});
